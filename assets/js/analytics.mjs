// dataLayer 이벤트 — data-ga-event 속성 하나로 배선한다.
// 이벤트명은 명세 v0.2 taxonomy 를 그대로 쓴다. 이름을 바꾸면 GTM 태그가 조용히 깨진다.

export function initAnalytics() {
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', (e) => {
    const el = e.target.closest?.('[data-ga-event]');
    if (!el) return;
    window.dataLayer.push({ event: el.dataset.gaEvent });
  });
}

export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
