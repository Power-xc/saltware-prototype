// 헤더 — 메가메뉴 · 모바일 서랍.
// 헤더 마크업은 이미 HTML 안에 있다. 이 스크립트는 열고 닫기만 한다.

export function initNav() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const triggers = [...header.querySelectorAll('[data-mega]')];
  const panels = new Map(
    [...header.querySelectorAll('[data-mega-panel]')].map((p) => [p.dataset.megaPanel, p]),
  );

  const close = () => {
    triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
    panels.forEach((p) => (p.hidden = true));
  };
  const open = (key) => {
    close();
    const t = triggers.find((x) => x.dataset.mega === key);
    const p = panels.get(key);
    if (!t || !p) return;
    t.setAttribute('aria-expanded', 'true');
    p.hidden = false;
  };

  triggers.forEach((t) => {
    t.addEventListener('mouseenter', () => open(t.dataset.mega));
    t.addEventListener('focus', () => open(t.dataset.mega));
    t.addEventListener('click', () =>
      t.getAttribute('aria-expanded') === 'true' ? close() : open(t.dataset.mega),
    );
  });
  header.addEventListener('mouseleave', close);
  document.addEventListener('keydown', (e) => e.key === 'Escape' && close());

  // 모바일 서랍
  const drawer = document.getElementById('drawer');
  const openBtn = document.querySelector('[data-drawer-open]');
  const closeBtn = document.querySelector('[data-drawer-close]');
  if (drawer && openBtn) {
    const setDrawer = (on) => {
      drawer.hidden = !on;
      openBtn.setAttribute('aria-expanded', String(on));
      document.documentElement.style.overflow = on ? 'hidden' : '';
    };
    openBtn.addEventListener('click', () => setDrawer(true));
    closeBtn?.addEventListener('click', () => setDrawer(false));
    drawer.addEventListener('click', (e) => e.target.closest('a') && setDrawer(false));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setDrawer(false));

    drawer.querySelectorAll('.drawer__toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const on = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!on));
        btn.nextElementSibling.hidden = on;
      });
    });
  }

  document.querySelector('[data-to-top]')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
