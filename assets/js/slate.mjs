// 대표 수행 영역의 사업 탭 — 누른 사업의 판만 남긴다.
// 서버는 첫 판만 열고 나머지를 hidden 으로 내보낸다. JS 가 없으면 첫 판이 그대로 보이고
// 판 끝의 "사업 전체 보기" 링크가 나머지를 대신한다 — 탭이 죽어도 내용이 사라지지 않는다.
export function initSlates() {
  for (const slate of document.querySelectorAll("[data-slate]")) {
    const tabs = [...slate.querySelectorAll("[data-slate-tab]")];
    const panels = [...slate.querySelectorAll("[data-slate-panel]")];
    if (tabs.length !== panels.length || tabs.length < 2) continue;

    const show = (n, focus) => {
      tabs.forEach((t, i) => {
        t.setAttribute("aria-selected", String(i === n));
        t.tabIndex = i === n ? 0 : -1;
      });
      panels.forEach((p, i) => {
        p.hidden = i !== n;
      });
      if (focus) tabs[n].focus();
    };

    tabs.forEach((t, n) => t.addEventListener("click", () => show(n)));
    // 탭 줄 안에서는 좌우 키로 옮긴다(WAI-ARIA tablist).
    slate.querySelector("[role=tablist]").addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const at = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      show((at + step + tabs.length) % tabs.length, true);
    });
    slate.classList.add("is-ready");
  }
}
