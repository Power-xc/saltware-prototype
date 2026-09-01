// 대표 수행 영역 — 오른쪽 목록에서 고르면 왼쪽 컷·본문이 그 영역으로 바뀐다.
// 패널 숨김은 여기서만 건다 — JS 가 죽으면 전 패널이 펼쳐진 채 남아 본문이 보인다.
export function initCases() {
  for (const root of document.querySelectorAll("[data-cases]")) {
    const panes = [...root.querySelectorAll("[data-case-pane]")];
    const tabs = [...root.querySelectorAll("[data-case-tab]")];
    if (panes.length < 2 || tabs.length !== panes.length) continue;
    const show = (idx) => {
      panes.forEach((p, n) => {
        p.hidden = n !== idx;
      });
      tabs.forEach((t, n) => {
        t.classList.toggle("is-active", n === idx);
        t.setAttribute("aria-pressed", String(n === idx));
      });
    };
    tabs.forEach((t, n) => t.addEventListener("click", () => show(n)));
    show(0);
  }
}
