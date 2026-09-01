// 대표 수행 영역 — 오른쪽 목록을 누르면 하나뿐인 컷·본문이 그 영역으로 바뀐다.
// 둘째 이후 패널은 서버가 hidden 으로 내보낸다 — JS 가 없어도 이미지 영역은
// 언제나 하나고, 목록은 사업 상세로 가는 실제 링크로 남는다.
export function initCases() {
  for (const root of document.querySelectorAll("[data-cases]")) {
    const medias = [...root.querySelectorAll("[data-case-media]")];
    const bodies = [...root.querySelectorAll("[data-case-body]")];
    const tabs = [...root.querySelectorAll("[data-case-tab]")];
    if (tabs.length < 2 || medias.length !== tabs.length) continue;
    const show = (idx) => {
      medias.forEach((m, n) => {
        m.hidden = n !== idx;
      });
      bodies.forEach((b, n) => {
        b.hidden = n !== idx;
      });
      tabs.forEach((t, n) => {
        t.classList.toggle("is-active", n === idx);
        if (n === idx) t.setAttribute("aria-current", "true");
        else t.removeAttribute("aria-current");
      });
    };
    tabs.forEach((t, n) =>
      t.addEventListener("click", (e) => {
        e.preventDefault();
        show(n);
      }),
    );
  }
}
