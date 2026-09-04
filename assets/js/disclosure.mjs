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

/** 푸터 링크 열 — 데스크톱은 열린 표, 모바일만 접는다. 마크업은 open 으로 나가
    JS 가 없어도 전부 보인다. 폭 경계는 토큰(--bp-md)에서 읽는다 — 스타일시트와
    어긋난 숫자를 여기 따로 두지 않는다. */
export function initFooterGroups() {
  const groups = document.querySelectorAll('.footer__group');
  if (!groups.length) return;
  const bp = getComputedStyle(document.documentElement).getPropertyValue('--bp-md').trim();
  const narrow = window.matchMedia(`(max-width: ${bp})`);
  const apply = () => {
    groups.forEach((g) => {
      g.open = !narrow.matches;
      const s = g.querySelector('summary');
      if (s) s.tabIndex = narrow.matches ? 0 : -1;
    });
  };
  apply();
  narrow.addEventListener('change', apply);
}

/** AI Full Stack — 폰에서는 04 ~ 06 이 번호 + 이름 한 줄로 접히고, 그중 하나만 펼쳐진다.
    하나를 열면 열려 있던 것이 접히므로 섹션 높이가 그대로다(히어로 카드와 같은 규칙).
    접힌 카드가 위에서 접히면 화면이 밀리므로 그만큼 스크롤을 보정해 누른 카드가 제자리에 있게 한다.
    마크업은 펼친 채로 나가 JS 가 없으면 여섯 장이 다 보인다. 폭 경계는 토큰(--bp-sm)에서 읽는다. */
export function initStackFold() {
  const cards = [...document.querySelectorAll('.stk__card--fold')];
  if (!cards.length) return;
  const bp = getComputedStyle(document.documentElement).getPropertyValue('--bp-sm').trim();
  const narrow = window.matchMedia(`(max-width: ${bp})`);
  const apply = () => cards.forEach((c) => c.classList.toggle('is-folded', narrow.matches));
  apply();
  narrow.addEventListener('change', apply);
  cards.forEach((card) => {
    // 접힌 카드의 첫 탭은 펼침, 펼친 카드의 탭은 이동.
    card.addEventListener('click', (e) => {
      if (!card.classList.contains('is-folded')) return;
      e.preventDefault();
      const before = card.getBoundingClientRect().top;
      cards.forEach((c) => c.classList.toggle('is-folded', c !== card));
      const shift = card.getBoundingClientRect().top - before;
      if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
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
