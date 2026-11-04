(() => {
  'use strict';
  const WA = '918815639703';
  const MSG = {
    general: 'Hello KRISHAN WEBDESIGNERC, I want to create a professional website. Please share your pricing and details.',
    price: 'Hello KRISHAN WEBDESIGNERC, I’m interested in a website starting from ₹6,949. Please share the details and a quotation for my requirements.',
  };
  const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // WhatsApp links with pre-filled messages
  $$('[data-wa]').forEach((a) => { a.href = wa(MSG[a.dataset.wa] || MSG.general); });

  // theme toggle
  const root = document.documentElement;
  const themeBtn = $('#themeBtn');
  const syncTheme = () => {
    const light = root.dataset.theme === 'light';
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    const m = $('meta[name="theme-color"]'); if (m) m.content = light ? '#f6f3ff' : '#0b0716';
  };
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage unavailable */ }
    syncTheme();
  });
  syncTheme();

  // mobile menu
  const burger = $('#burger'), links = $('#navLinks');
  const setMenu = (open) => { links.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // rotating role tag
  const roles = ['Web Designer', 'Web Developer', 'UI Designer', 'Brand Website Builder'];
  const roleText = $('#roleText');
  let ri = 0;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      roleText.classList.add('out');
      setTimeout(() => { ri = (ri + 1) % roles.length; roleText.textContent = roles[ri]; roleText.classList.remove('out'); }, 320);
    }, 2600);
  }

  // doors: click/tap toggles (one open at a time)
  const doorBtns = $$('.door');
  doorBtns.forEach((d) => d.addEventListener('click', () => {
    const open = d.getAttribute('aria-expanded') !== 'true';
    doorBtns.forEach((o) => o.setAttribute('aria-expanded', 'false'));
    d.setAttribute('aria-expanded', String(open));
  }));

  // scroll reveal
  const revealEls = $$('.section .kicker, .section .h2, .sub, .door-slot, .price, .mega, .contact .cta-row');
  revealEls.forEach((el) => el.classList.add('rv'));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  revealEls.forEach((el, i) => { el.style.transitionDelay = el.classList.contains('door-slot') ? `${(i % 4) * 90}ms` : '0ms'; io.observe(el); });

  // process steps highlight + big number
  const steps = $$('.step'), big = $('#bigNum');
  const so = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { steps.forEach((s) => s.classList.remove('on')); e.target.classList.add('on'); big.textContent = e.target.dataset.n; }
  }), { rootMargin: '-40% 0px -40% 0px' });
  steps.forEach((s) => so.observe(s));

  // active nav link
  const secs = $$('main section[id]');
  const no = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => no.observe(s));

  // project preview dialog
  const PROJECTS = [
    { name: 'Apex Consulting', desc: 'A clean corporate website with service sections, a team area and an enquiry form.', f: ['Service pages', 'Enquiry form', 'WhatsApp button', 'SEO-ready structure'] },
    { name: 'Urban Cart', desc: 'A product-led online store with category browsing, a cart and a simple checkout flow.', f: ['Product grid', 'Cart & checkout', 'Category filters', 'Admin panel'] },
    { name: 'Spice Route', desc: 'An appetising restaurant website with a digital menu, gallery, map and click-to-call.', f: ['Digital menu', 'Photo gallery', 'Google Maps', 'Click-to-call'] },
    { name: 'LaunchPad', desc: 'A conversion-focused landing page with a strong hero, feature blocks and a clear call to action.', f: ['Hero & CTA', 'Feature blocks', 'Lead capture', 'Fast loading'] },
  ];
  const modal = $('#modal');
  const openProject = (i) => {
    const p = PROJECTS[i];
    $('#mTitle').textContent = p.name;
    $('#mDesc').textContent = p.desc;
    const ul = $('#mList'); ul.replaceChildren(...p.f.map((t) => Object.assign(document.createElement('li'), { textContent: t })));
    $('#mWa').href = wa(`Hello KRISHAN WEBDESIGNERC, I saw the "${p.name}" demo concept and want something similar for my business. Please share details and pricing.`);
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  };
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => openProject(+b.dataset.open)));
  const closeModal = () => (modal.close ? modal.close() : modal.removeAttribute('open'));
  $('#mClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // copy number
  const copyBtn = $('#copyBtn'), copyLabel = $('#copyLabel');
  copyBtn.addEventListener('click', async () => {
    let ok = false;
    try { await navigator.clipboard.writeText('8815639703'); ok = true; } catch (e) {
      const t = document.createElement('textarea'); t.value = '8815639703'; document.body.appendChild(t); t.select();
      try { ok = document.execCommand('copy'); } catch (_) { /* ignore */ } t.remove();
    }
    copyLabel.textContent = ok ? 'Copied!' : '8815639703';
    setTimeout(() => (copyLabel.textContent = 'Copy number'), 2000);
  });

  $('#yr').textContent = new Date().getFullYear();
})();
