// Operator-managed backend endpoint selection.
// Change BACKEND_PROFILE and endpoint constants here when switching production backend.
// Users should not need to configure anything in localStorage.
(function () {
  var BACKEND_PROFILE = 'render'; // 'render' or 'cloudflare'

  var RENDER_WSURL = 'wss://tkmninja-mit.onrender.com';
  var CLOUDFLARE_WSURL = ''; // Example: 'wss://api.example.com'

  var selectedWsUrl = BACKEND_PROFILE === 'cloudflare' && CLOUDFLARE_WSURL
    ? CLOUDFLARE_WSURL
    : RENDER_WSURL;

  window.CATASO_BACKEND_PROFILE = BACKEND_PROFILE;
  window.WSURL = window.CATASO_WSURL || selectedWsUrl;
  window.CATASO_API_BASE =
    window.CATASO_API_BASE ||
    window.WSURL.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:').replace(/\/$/, '');
})();
