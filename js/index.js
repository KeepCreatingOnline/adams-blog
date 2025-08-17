(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    if (!window.umami) return;

    // On post pages, your content is rendered inside <article> via Markdown(type="article")
    var articleEl = document.querySelector('article');
    if (!articleEl) return;

    var fired = false;

    function fireReadEvent() {
      if (fired) return;
      fired = true;
      var title = (document.querySelector('h1') || {}).textContent || document.title;
      window.umami.track('article_read', { path: location.pathname, title: title });
    }

    // Fire when half the article is visible
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) fireReadEvent();
        });
      }, { threshold: [0.5] });
      io.observe(articleEl);
    } catch (e) {
      // Fallback for older browsers: time-based
      setTimeout(fireReadEvent, 30000);
    }

    // Also fire after 30s as a fallback
    setTimeout(fireReadEvent, 30000);
  });
})();
