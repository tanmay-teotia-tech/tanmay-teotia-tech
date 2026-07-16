function() {
    const el = document.getElementById('typed-code');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = [
      { k: 'name', v: '"Tanmay Teotia"' },
      { k: 'role', v: '"Aspiring Software Engineer"' },
      { k: 'focus', v: '["Full-Stack", "AI", "DSA"]' },
      { k: 'location', v: '"Ghaziabad, India"' },
      { k: 'status', v: '"always building, always solving"' }
    ];

    function styledHTML() {
      let html = '<span class="code-punct">const</span> <span class="code-var">tanmay</span> <span class="code-punct">= {</span>\n';
      lines.forEach((l, i) => {
        html += '  <span class="code-key">' + l.k + '</span><span class="code-punct">:</span> <span class="code-str">' + l.v + '</span><span class="code-punct">' + (i < lines.length - 1 ? ',' : '') + '</span>\n';
      });
      html += '<span class="code-punct">};</span>';
      return html;
    }

    const plainText = ['const tanmay = {']
      .concat(lines.map((l, i) => '  ' + l.k + ': ' + l.v + (i < lines.length - 1 ? ',' : '')))
      .concat(['};'])
      .join('\n');

    if (prefersReduced) {
      el.innerHTML = styledHTML() + '<span class="cursor"></span>';
    } else {
      let i = 0;
      (function type() {
        if (i <= plainText.length) {
          el.textContent = plainText.slice(0, i);
          el.insertAdjacentHTML('beforeend', '<span class="cursor"></span>');
          i += 2;
          setTimeout(type, 12);
        } else {
          el.innerHTML = styledHTML() + '<span class="cursor"></span>';
        }
      })();
    }
  })();

  // Achievements log — staggered reveal on scroll
  (function() {
    const lines = document.querySelectorAll('.log-line');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !lines.length) {
      lines.forEach(function(l) { l.classList.add('revealed'); });
      return;
    }
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          lines.forEach(function(l, idx) {
            setTimeout(function() { l.classList.add('revealed'); }, idx * 90);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(lines[0].closest('.window'));
  })();

  // Tab bar — highlight active section on scroll
  (function() {
    const ids = ['about', 'stack', 'projects', 'log', 'contact'];
    const sections = ids.map(function(id) { return document.getElementById(id); }).filter(Boolean);
    const tabs = document.querySelectorAll('.tabbar a');
    const map = {};
    tabs.forEach(function(t) { map[t.getAttribute('href').slice(1)] = t; });

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          tabs.forEach(function(t) { t.classList.remove('active'); });
          const tab = map[entry.target.id];
          if (tab) tab.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(function(s) { observer.observe(s); });
  })();
