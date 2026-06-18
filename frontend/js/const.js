// Backend endpoint selection.
// Priority:
// 1. window.CATASO_WSURL set before this file is loaded
// 2. ?ws=wss://example.com query parameter
// 3. ?backend=render|cloudflare|custom query parameter
// 4. localStorage backend profile settings
// 5. default Render endpoint for current compatibility
(function () {
  var defaultRenderWsUrl = 'wss://tkmninja-mit.onrender.com';
  var query = new URLSearchParams(window.location.search);
  var queryWsUrl = query.get('ws');
  var queryBackend = query.get('backend');

  if (queryBackend) {
    localStorage.setItem('CATASO_BACKEND_PROFILE', queryBackend);
  }
  if (queryWsUrl) {
    localStorage.setItem('CATASO_WSURL', queryWsUrl);
  }

  var profile = queryBackend || localStorage.getItem('CATASO_BACKEND_PROFILE') || 'render';
  var renderWsUrl = localStorage.getItem('CATASO_RENDER_WSURL') || defaultRenderWsUrl;
  var cloudflareWsUrl = localStorage.getItem('CATASO_CLOUDFLARE_WSURL') || '';
  var customWsUrl = localStorage.getItem('CATASO_CUSTOM_WSURL') || localStorage.getItem('CATASO_WSURL') || '';

  var selectedWsUrl = renderWsUrl;
  if (profile === 'cloudflare') {
    selectedWsUrl = cloudflareWsUrl || renderWsUrl;
  } else if (profile === 'custom') {
    selectedWsUrl = customWsUrl || renderWsUrl;
  }

  window.CATASO_BACKEND_PROFILE = profile;
  window.WSURL = window.CATASO_WSURL || queryWsUrl || selectedWsUrl;
  window.CATASO_API_BASE =
    window.CATASO_API_BASE ||
    window.WSURL.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:').replace(/\/$/, '');
})();
