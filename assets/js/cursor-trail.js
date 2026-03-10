(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var root = document.documentElement;
  var body = document.body;
  if (!body) return;

  var trails = [
    createTrail('cursor-trail cursor-trail--1'),
    createTrail('cursor-trail cursor-trail--2'),
    createTrail('cursor-trail cursor-trail--3'),
    createTrail('cursor-trail cursor-trail--4')
  ];

  var points = [
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 }
  ];

  var target = { x: points[0].x, y: points[0].y };
  var active = false;

  function createTrail(className) {
    var el = document.createElement('div');
    el.className = className;
    body.appendChild(el);
    return el;
  }

  function setActive(value) {
    active = value;
    trails.forEach(function (el) {
      el.classList.toggle('is-visible', value);
    });
  }

  document.addEventListener('pointermove', function (e) {
    target.x = e.clientX;
    target.y = e.clientY;
    root.style.setProperty('--cursor-x', target.x + 'px');
    root.style.setProperty('--cursor-y', target.y + 'px');
    if (!active) setActive(true);
  });

  document.addEventListener('pointerleave', function () {
    setActive(false);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) setActive(false);
  });

  function tick() {
    points[0].x += (target.x - points[0].x) * 0.22;
    points[0].y += (target.y - points[0].y) * 0.22;

    points[1].x += (points[0].x - points[1].x) * 0.18;
    points[1].y += (points[0].y - points[1].y) * 0.18;

    points[2].x += (points[1].x - points[2].x) * 0.15;
    points[2].y += (points[1].y - points[2].y) * 0.15;

    points[3].x += (points[2].x - points[3].x) * 0.12;
    points[3].y += (points[2].y - points[3].y) * 0.12;

    trails.forEach(function (el, index) {
      el.style.transform = 'translate3d(' + points[index].x + 'px,' + points[index].y + 'px,0)';
    });

    window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
})();
