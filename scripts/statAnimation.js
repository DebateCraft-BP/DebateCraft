effectTime = 1200

// Count-up for .stats-section numbers
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stats-section .stat-item h3');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // optional: format function (commas)
  const fmt = n => Math.round(n).toLocaleString();

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, duration = effectTime) {
    if (reduceMotion) {
      el.textContent = fmt(target) + (el._suffix || '');
      return;
    }

    const start = performance.now();
    const from = 0;
    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(from + (target - from) * eased);
      el.textContent = fmt(current) + (el._suffix || '');
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        // final value (ensure exact)
        el.textContent = fmt(target) + (el._suffix || '');
      }
    }
    requestAnimationFrame(frame);
  }

  // IntersectionObserver to trigger when in view
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const h = entry.target;
      if (h._animated) { observer.unobserve(h); return; }
      h._animated = true;

      // If you prefer explicit control, you can set data-target on the <h3>.
      // Example: <h3 data-target="80">80+</h3>
      let targetVal = null;
      if (h.dataset && h.dataset.target) {
        targetVal = parseFloat(h.dataset.target.replace(/,/g, ''));
      } else {
        // parse number from the visible text and preserve suffix (e.g. "+", "%", etc.)
        const raw = h.textContent.trim();
        const match = raw.match(/^([\d,\.]+)(.*)$/);
        if (match) {
          targetVal = match[1].replace(/,/g, '');
          h._suffix = match[2] || '';
          targetVal = targetVal.includes('.') ? parseFloat(targetVal) : parseInt(targetVal, 10);
        } else {
          // fallback: find first numeric substring
          const digits = raw.match(/[\d,\.]+/);
          if (digits) {
            targetVal = digits[0].replace(/,/g, '');
            h._suffix = raw.replace(digits[0], '') || '';
            targetVal = targetVal.includes('.') ? parseFloat(targetVal) : parseInt(targetVal, 10);
          }
        }
      }

      if (isFinite(targetVal) && targetVal !== null) {
        animateCount(h, Number(targetVal), effectTime);
      } else {
        // nothing parseable — just leave it
        h.textContent = h.textContent;
      }

      observer.unobserve(h);
    });
  }, { threshold: 0.5 });

  counters.forEach(h => {
    // expose to screen readers as it updates
    h.setAttribute('aria-live', 'polite');
    io.observe(h);
  });
});
