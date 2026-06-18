# Cataso Cloudflare operations runbook

This runbook covers the current Cloudflare operation mode.

## Current production-ready mode

```text
Cloudflare Pages
  serves frontend/

Cloudflare Worker: cloudflare/
  /health
  /logs
  /stats
  WebSocket proxy

Render backend
  still runs the current Node.js game server
  can run without Redis if DATABASE_URL is present
```

This mode moves the public entrypoint to Cloudflare while keeping the current full game logic on Render. It is the safest first Cloudflare operation step.

## Why not full Workers yet?

The current backend is a Node.js `http` + `ws` server with in-memory room objects. Cloudflare Workers do not run this kind of long-lived Node server directly. A native Cloudflare backend requires Durable Objects for per-room WebSocket/session state and D1 for logs/stats.

## Cloudflare Pages setup

In Cloudflare dashboard:

```text
Workers & Pages
→ Create application
→ Pages
→ Connect to Git
→ Repository: mitdok/cataso
→ Production branch: main
→ Framework preset: None
→ Build command: exit 0
→ Build output directory: frontend
→ Root directory: / 
```

Cloudflare Pages docs say that when not using a framework preset, `exit 0` can be used as the build command, and Pages uploads the configured build output directory.

## GitHub Actions Pages deployment option

This repository also includes:

```text
.github/workflows/cloudflare-pages.yml
```

Required GitHub repository secrets:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Optional GitHub repository variable:

```text
CLOUDFLARE_PAGES_PROJECT=cataso
```

If using Cloudflare's direct Git integration, the GitHub Actions workflow is optional.

## Cloudflare Worker edge proxy setup

From local repository root:

```bash
cd cloudflare
npm install
npx wrangler login
npm run deploy
```

After deploy, note the Worker URL:

```text
https://cataso-edge.<your-account>.workers.dev
```

Smoke test:

```bash
CATASO_EDGE_URL=https://cataso-edge.<your-account>.workers.dev npm run test:smoke
```

Expected:

```text
OK /health
OK /logs?room=0&limit=1
OK /stats?limit=1
```

WebSocket smoke test can be done in browser DevTools:

```js
const ws = new WebSocket('wss://cataso-edge.<your-account>.workers.dev');
ws.onopen = () => ws.send(String.fromCharCode(100));
ws.onmessage = (e) => console.log(e.data);
```

Expected: a room status packet beginning with character code 100.

## Frontend switch to Cloudflare edge

Edit:

```text
frontend/js/const.js
```

Set:

```js
var BACKEND_PROFILE = 'cloudflare';
var CLOUDFLARE_WSURL = 'wss://cataso-edge.<your-account>.workers.dev';
```

Commit and deploy Pages.

## Render Redis removal

Render can run without Redis now.

Keep:

```text
DATABASE_URL
```

Remove if desired:

```text
REDIS_URL
REDIS_TLS_URL
```

When Redis is absent, the backend logs:

```text
Redis disabled: using PostgreSQL room state fallback only
```

## Full native Cloudflare backend future work

The next phase is a real Workers/Durable Objects backend:

```text
Worker
  routes /logs and /stats to D1
  routes WebSocket traffic to Durable Object

Durable Object
  owns room state and WebSocket sessions

D1
  chat_logs
  game_sessions
  game_participants
  app_users
```

Until then, the Worker in `cloudflare/` is an edge proxy that lets the service be operated from a Cloudflare URL while preserving the current game logic.
