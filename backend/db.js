const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
const enabled = !!connectionString;
const LOG_RETENTION_ROWS = Number(process.env.LOG_RETENTION_ROWS || 20000);
const LOG_RETENTION_DAYS = Number(process.env.LOG_RETENTION_DAYS || 30);
let logPruneCounter = 0;

const pool = enabled
  ? new Pool({
      connectionString,
      ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
      max: Number(process.env.PG_POOL_MAX || 4),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })
  : null;

let initPromise = null;
let ready = false;
let lastError = null;

async function init() {
  if (!enabled) return false;
  if (initPromise) return initPromise;
  initPromise = (async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS app_users (
          trip text PRIMARY KEY,
          display_name text NOT NULL,
          first_seen_at timestamptz NOT NULL DEFAULT now(),
          last_seen_at timestamptz NOT NULL DEFAULT now(),
          login_count integer NOT NULL DEFAULT 0,
          ip_hash text
        );

        CREATE TABLE IF NOT EXISTS room_states (
          room_id integer PRIMARY KEY,
          symbol text NOT NULL,
          payload jsonb NOT NULL,
          updated_at timestamptz NOT NULL DEFAULT now(),
          source text NOT NULL DEFAULT 'server'
        );

        CREATE TABLE IF NOT EXISTS game_sessions (
          id bigserial PRIMARY KEY,
          room_id integer NOT NULL,
          symbol text NOT NULL,
          started_at timestamptz NOT NULL DEFAULT now(),
          ended_at timestamptz,
          winner_uid text,
          winner_trip text,
          end_reason text,
          start_payload jsonb,
          end_payload jsonb
        );

        CREATE INDEX IF NOT EXISTS game_sessions_room_started_idx
          ON game_sessions(room_id, started_at DESC);

        CREATE TABLE IF NOT EXISTS game_participants (
          game_id bigint NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
          seat_index integer NOT NULL,
          uid text NOT NULL,
          trip text,
          color_name text,
          is_winner boolean NOT NULL DEFAULT false,
          PRIMARY KEY(game_id, seat_index)
        );

        CREATE INDEX IF NOT EXISTS game_participants_trip_idx
          ON game_participants(trip);

        CREATE TABLE IF NOT EXISTS chat_logs (
          id bigserial PRIMARY KEY,
          room_id integer NOT NULL,
          uid text NOT NULL,
          trip text,
          color text,
          message text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        );

        CREATE INDEX IF NOT EXISTS chat_logs_room_created_idx
          ON chat_logs(room_id, created_at DESC);

        CREATE OR REPLACE VIEW user_game_stats AS
        SELECT
          p.trip,
          max(p.uid) AS latest_uid,
          count(*)::integer AS games,
          sum(CASE WHEN p.is_winner THEN 1 ELSE 0 END)::integer AS wins,
          CASE WHEN count(*) = 0 THEN 0 ELSE round((sum(CASE WHEN p.is_winner THEN 1 ELSE 0 END)::numeric / count(*)) * 100, 2) END AS win_rate_percent,
          min(s.started_at) AS first_game_at,
          max(s.ended_at) AS last_game_at
        FROM game_participants p
        JOIN game_sessions s ON s.id = p.game_id
        WHERE s.ended_at IS NOT NULL
        GROUP BY p.trip;
      `);
      ready = true;
      console.log('[pg] ready');
      return true;
    } catch (err) {
      ready = false;
      lastError = err;
      console.error('[pg] init failed', err);
      return false;
    }
  })();
  return initPromise;
}

async function query(sql, params) {
  if (!enabled) return null;
  await init();
  if (!ready) return null;
  try {
    return await pool.query(sql, params);
  } catch (err) {
    lastError = err;
    console.error('[pg] query failed', err);
    return null;
  }
}

async function upsertUser({ trip, uid, displayName, ip }) {
  if (!trip) return;
  const ipHash = ip ? require('crypto').createHash('sha256').update(String(ip)).digest('hex') : null;
  await query(
    `INSERT INTO app_users (trip, display_name, login_count, ip_hash)
     VALUES ($1, $2, 1, $3)
     ON CONFLICT (trip) DO UPDATE SET
       display_name = EXCLUDED.display_name,
       last_seen_at = now(),
       login_count = app_users.login_count + 1,
       ip_hash = COALESCE(EXCLUDED.ip_hash, app_users.ip_hash)`,
    [trip, displayName || uid || trip, ipHash]
  );
}

async function saveRoomState(roomId, symbol, payload, source = 'server') {
  await query(
    `INSERT INTO room_states (room_id, symbol, payload, updated_at, source)
     VALUES ($1, $2, $3::jsonb, now(), $4)
     ON CONFLICT (room_id) DO UPDATE SET
       symbol = EXCLUDED.symbol,
       payload = EXCLUDED.payload,
       updated_at = now(),
       source = EXCLUDED.source`,
    [roomId, symbol, payload, source]
  );
}

async function loadRoomState(roomId) {
  const res = await query('SELECT payload, updated_at FROM room_states WHERE room_id = $1', [roomId]);
  if (!res || res.rows.length === 0) return null;
  return res.rows[0];
}

async function startGameSession(room, snapshot, participants) {
  const res = await query(
    `INSERT INTO game_sessions (room_id, symbol, start_payload)
     VALUES ($1, $2, $3::jsonb) RETURNING id`,
    [room.roomId, room.symbol, JSON.stringify(snapshot || {})]
  );
  if (!res || res.rows.length === 0) return null;
  const gameId = res.rows[0].id;
  for (const p of participants || []) {
    await query(
      `INSERT INTO game_participants (game_id, seat_index, uid, trip, color_name)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (game_id, seat_index) DO UPDATE SET uid = EXCLUDED.uid, trip = EXCLUDED.trip, color_name = EXCLUDED.color_name`,
      [gameId, p.seatIndex, p.uid, p.trip || null, p.colorName || null]
    );
  }
  return gameId;
}

async function finishGameSession(gameId, { winnerUid, winnerTrip, reason, snapshot }) {
  if (!gameId) return;
  await query(
    `UPDATE game_sessions SET ended_at = now(), winner_uid = $2, winner_trip = $3, end_reason = $4, end_payload = $5::jsonb
     WHERE id = $1 AND ended_at IS NULL`,
    [gameId, winnerUid || null, winnerTrip || null, reason || 'finished', JSON.stringify(snapshot || {})]
  );
  if (winnerUid || winnerTrip) {
    await query(
      `UPDATE game_participants SET is_winner = true
       WHERE game_id = $1 AND (($2::text IS NOT NULL AND uid = $2) OR ($3::text IS NOT NULL AND trip = $3))`,
      [gameId, winnerUid || null, winnerTrip || null]
    );
  }
}

async function pruneChatLogs(force = false) {
  if (!enabled) return;
  logPruneCounter++;
  if (!force && logPruneCounter % 100 !== 0) return;

  if (LOG_RETENTION_DAYS > 0) {
    await query(
      `DELETE FROM chat_logs
       WHERE created_at < now() - ($1::int * interval '1 day')`,
      [LOG_RETENTION_DAYS]
    );
  }

  if (LOG_RETENTION_ROWS > 0) {
    await query(
      `DELETE FROM chat_logs
       WHERE id IN (
         SELECT id FROM chat_logs
         ORDER BY created_at DESC, id DESC
         OFFSET $1
       )`,
      [LOG_RETENTION_ROWS]
    );
  }
}

async function logChat(roomId, uid, trip, color, message) {
  await query(
    `INSERT INTO chat_logs (room_id, uid, trip, color, message) VALUES ($1, $2, $3, $4, $5)`,
    [roomId, uid || '?', trip || null, color || null, String(message || '').slice(0, 500)]
  );
  pruneChatLogs(false).catch((err) => console.error('[pg] failed to prune chat_logs', err));
}

async function getRecentChatLogs(roomId, limit = 200) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 200, 1000));
  const params = [];
  let where = '';
  if (roomId !== undefined && roomId !== null && roomId !== '') {
    params.push(Number(roomId));
    where = 'WHERE room_id = $1';
  }
  params.push(safeLimit);
  const limitParam = params.length;
  const res = await query(
    `SELECT room_id, uid, trip, color, message, created_at
     FROM chat_logs
     ${where}
     ORDER BY created_at DESC, id DESC
     LIMIT $${limitParam}`,
    params
  );
  if (!res) return [];
  return res.rows.reverse();
}

module.exports = {
  enabled,
  init,
  query,
  upsertUser,
  saveRoomState,
  loadRoomState,
  startGameSession,
  finishGameSession,
  logChat,
  pruneChatLogs,
  getRecentChatLogs,
  get lastError() { return lastError; },
};
