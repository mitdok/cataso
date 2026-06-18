# Cloudflare migration plan

Cataso currently has two parts:

- `frontend/`: static HTML/CSS/JS. This can move to Cloudflare Pages or Workers Static Assets almost directly.
- `backend/`: Node.js WebSocket server using `ws`, Redis, and PostgreSQL. This cannot be deployed to Cloudflare Workers as-is.

## Recommended target architecture

```text
Cloudflare Pages or Workers Static Assets
  frontend/

Cloudflare Worker
  HTTP API: /logs, /stats, health check
  WebSocket upgrade endpoint

Durable Objects
  one room object per room id
  keeps live WebSocket sessions and room state

D1
  chat_logs
  game_sessions
  game_participants
  app_users

KV or Durable Object storage
  small latest-room-state snapshots
```

Cloudflare Workers support WebSocket handling, and Cloudflare's recommended stateful WebSocket pattern is Durable Objects. A plain Node `ws` server must be rewritten because Workers do not run a long-lived Node HTTP server process.

## Stage 1: frontend migration

`frontend/js/const.js` now supports runtime endpoint switching.

Priority:

1. `window.CATASO_WSURL`
2. `?ws=wss://example.com`
3. `localStorage.CATASO_WSURL`
4. current Render default

Example:

```text
https://<pages-domain>/index.html?ws=wss://api.example.com
```

After opening once with `?ws=...`, the value is kept in `localStorage`.

## Stage 2: Cloudflare Pages setup

Cloudflare Pages settings:

```text
Build command: none
Build output directory: frontend
Root directory: / or frontend depending on setup UI
```

If using Git integration, set the project to deploy from `main`.

## Stage 3: backend migration strategy

Do not try to directly deploy `backend/app.js` to Workers. Instead:

1. Create a new `worker/` project with Wrangler.
2. Implement a Worker entrypoint that routes:
   - `/room/:id/websocket` or `/websocket?room=0` to a Durable Object
   - `/logs` to D1
   - `/stats` to D1
3. Port the existing protocol messages gradually:
   - index `100`: room status list
   - login `b`
   - user list `a`
   - chat `c`
   - game message `d`
   - bell `e`
   - dice `f`
   - silent grant `g`
4. Move room state from Redis/Postgres to Durable Object storage or D1.
5. Move chat logs and game stats from PostgreSQL to D1.

## D1 schema draft

```sql
CREATE TABLE IF NOT EXISTS app_users (
  trip TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  first_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  login_count INTEGER NOT NULL DEFAULT 0,
  ip_hash TEXT
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  symbol TEXT NOT NULL,
  started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ended_at TEXT,
  winner_uid TEXT,
  winner_trip TEXT,
  end_reason TEXT,
  start_payload TEXT,
  end_payload TEXT
);

CREATE TABLE IF NOT EXISTS game_participants (
  game_id INTEGER NOT NULL,
  seat_index INTEGER NOT NULL,
  uid TEXT NOT NULL,
  trip TEXT,
  color_name TEXT,
  is_winner INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(game_id, seat_index)
);

CREATE TABLE IF NOT EXISTS chat_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  uid TEXT NOT NULL,
  trip TEXT,
  color TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS chat_logs_room_created_idx
  ON chat_logs(room_id, created_at DESC);
```

## Codex + Cloudflare MCP

Codex supports MCP via `~/.codex/config.toml` or project-scoped `.codex/config.toml`. Streamable HTTP MCP servers can be configured with a `url`, and OAuth-capable servers can be logged into with `codex mcp login <server-name>`.

For Cloudflare's Remote MCP server template:

```bash
npm create cloudflare@latest -- remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
cd remote-mcp-server-authless
npm start
```

For authenticated production, prefer Cloudflare Access or OAuth rather than authless MCP.

Codex config example:

```toml
[mcp_servers.cloudflare]
url = "https://<your-mcp-worker-domain>/mcp"
tool_timeout_sec = 60
default_tools_approval_mode = "prompt"
```

If OAuth is enabled:

```bash
codex mcp login cloudflare
```
