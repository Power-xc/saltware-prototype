// 가로 레일의 ‹ › 넘김 — 애플식. 스크롤은 브라우저가 스냅으로 하고, 버튼은 카드 하나만큼 민다.
// 서버는 버튼을 숨긴 채 내보내고(is-ready 전) 여기서 켠다 — JS 가 없으면 손가락·트랙패드로 넘긴다.
// 넘칠 것이 없으면 is-static 으로 버튼 줄을 접는다(넓은 화면의 세 장짜리 레일).
export function initRails() {
  for (const wrap of document.querySelectorAll("[data-rail]")) {
    const track = wrap.querySelector("[data-rail-track]");
    const prev = wrap.querySelector("[data-rail-prev]");
    const next = wrap.querySelector("[data-rail-next]");
    if (!track || !prev || !next) continue;
    const step = () => {
      const card = track.querySelector(".rail__card");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card
        ? card.getBoundingClientRect().width + gap
        : track.clientWidth * 0.8;
    };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      wrap.classList.toggle("is-static", max <= 1);
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };
    prev.addEventListener("click", () =>
      track.scrollBy({ left: -step(), behavior: "smooth" }),
    );
    next.addEventListener("click", () =>
      track.scrollBy({ left: step(), behavior: "smooth" }),
    );
    track.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    wrap.classList.add("is-ready");
    sync();
  }
}
