function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function withCors(response, env) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders(env))) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function upstreamHttpUrl(request, env) {
  const incoming = new URL(request.url);
  const upstream = new URL(env.UPSTREAM_HTTP || 'https://tkmninja-mit.onrender.com');
  upstream.pathname = incoming.pathname;
  upstream.search = incoming.search;
  return upstream.toString();
}

function upstreamWsUrl(request, env) {
  const incoming = new URL(request.url);
  const upstream = new URL(env.UPSTREAM_WS || 'wss://tkmninja-mit.onrender.com');
  upstream.pathname = incoming.pathname;
  upstream.search = incoming.search;
  return upstream.toString();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        ok: true,
        service: 'cataso-edge',
        upstream_http: env.UPSTREAM_HTTP,
        upstream_ws: env.UPSTREAM_WS,
      }), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...corsHeaders(env),
        },
      });
    }

    const isWebSocket = (request.headers.get('Upgrade') || '').toLowerCase() === 'websocket';
    if (isWebSocket) {
      // Cloudflare Workers can proxy WebSocket upgrade requests with fetch().
      // This keeps the current Node backend usable through a Cloudflare endpoint
      // while the native Durable Objects backend is ported.
      return fetch(upstreamWsUrl(request, env), request);
    }

    const response = await fetch(upstreamHttpUrl(request, env), request);
    return withCors(response, env);
  },
};
