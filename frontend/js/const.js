// Backend endpoint selection.
// Priority:
// 1. window.CATASO_WSURL set before this file is loaded
// 2. ?ws=wss://example.com query parameter
// 3. localStorage.CATASO_WSURL
// 4. default Render endpoint for current compatibility
(function () {
  var defaultWsUrl = 'wss://tkmninja-mit.onrender.com';
  var query = new URLSearchParams(window.location.search);
  var queryWsUrl = query.get('ws');

  if (queryWsUrl) {
    localStorage.setItem('CATASO_WSURL', queryWsUrl);
  }

  window.WSURL =
    window.CATASO_WSURL ||
    queryWsUrl ||
    localStorage.getItem('CATASO_WSURL') ||
    defaultWsUrl;

  window.CATASO_API_BASE =
    window.CATASO_API_BASE ||
    window.WSURL.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:').replace(/\/$/, '');
})();
