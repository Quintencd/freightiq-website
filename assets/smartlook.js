window.smartlook || (function(d) {
  var o = smartlook = function() {
    o.api.push(arguments);
  };
  var h = d.getElementsByTagName('head')[0];
  var c = d.createElement('script');
  o.api = [];
  c.async = true;
  c.type = 'text/javascript';
  c.charset = 'utf-8';
  c.src = 'https://web-sdk.smartlook.com/recorder.js';
  h.appendChild(c);
})(document);

smartlook('init', 'c58e2339f3ef5eef657f0a32764f5689dffe2446', { region: 'eu' });
