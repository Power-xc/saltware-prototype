// 펼침 UI — FAQ 아코디언, 사례 필터 칩.
// 마크업의 aria 상태를 정본으로 삼고 hidden 을 따라 움직인다.

import { track } from './analytics.mjs';

export function initFaq() {
  document.querySelectorAll('[data-faq]').forEach((root) => {
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq__q');
      if (!btn || !root.contains(btn)) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      const panel = btn.nextElementSibling;
      if (panel) panel.hidden = open;
    });
  });
}

export function initCaseFilter() {
  document.querySelectorAll('[data-case-filter]').forEach((root) => {
    const chips = [...root.querySelectorAll('.chip')];
    root.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      track('case_filter_click', { filter: chip.textContent.trim() });
    });
  });
}
