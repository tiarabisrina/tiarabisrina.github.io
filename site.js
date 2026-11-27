/* Tiara Bisrina portfolio · small progressive enhancements.
   Without JS: all tab panels show, menus are plain links. */
(function () {
  // --- Tabs (My Super Indo 07) ---
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var buttons = box.querySelectorAll('[role="tab"]');
    var panels = box.querySelectorAll('[role="tabpanel"]');
    function select(i) {
      buttons.forEach(function (b, j) {
        b.setAttribute('aria-selected', String(i === j));
        b.tabIndex = i === j ? 0 : -1;
      });
      panels.forEach(function (p, j) { p.hidden = i !== j; });
    }
    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var n = (i + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
          select(n); buttons[n].focus();
        }
      });
    });
    select(0);
  });

  // --- "On this page": highlight the section in view ---
  var links = document.querySelectorAll('.toc a, .jump ol a');
  var current = document.querySelector('.jump__current');
  var jump = document.querySelector('.jump');
  var sections = Array.prototype.map.call(document.querySelectorAll('.toc a'), function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  function setCurrent(id) {
    links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + id); });
    var a = document.querySelector('.toc a[href="#' + id + '"]');
    if (current && a) current.textContent = a.textContent;
  }
  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setCurrent(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
  if (jump) {
    jump.querySelectorAll('ol a').forEach(function (a) {
      a.addEventListener('click', function () { jump.open = false; });
    });
  }
})();
