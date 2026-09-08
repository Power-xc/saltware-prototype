// 가로 레일 — 제목 줄 오른쪽 ‹ › 와 트랙 아래 눈금·번호(사령관 UX 시안 2026-09-08).
// 스크롤은 브라우저가 스냅으로 하고 버튼은 카드 하나만큼 민다. 서버는 버튼을 숨긴 채 내보내고
// (is-ready 전) 여기서 켠다 — JS 가 없으면 손가락·트랙패드로 넘기고 카드는 전부 읽힌다.
// 넘칠 것이 없으면 is-static 으로 버튼·눈금을 접는다(넓은 화면의 세 장짜리 레일).

const pad = (n) => String(n).padStart(2, "0");

/** 지금 몇 번째 장인지 — 트랙 왼쪽 선에 가장 가까운 카드가 기준이다. */
function currentIndex(cards, track) {
  const left = track.scrollLeft;
  let best = 0;
  let gap = Infinity;
  cards.forEach((card, n) => {
    const d = Math.abs(card.offsetLeft - track.offsetLeft - left);
    if (d < gap) {
      gap = d;
      best = n;
    }
  });
  return best;
}

function wire(wrap) {
  const track = wrap.querySelector("[data-rail-track]");
  const prev = wrap.querySelector("[data-rail-prev]");
  const next = wrap.querySelector("[data-rail-next]");
  if (!track || !prev || !next) return;
  const ticks = [...wrap.querySelectorAll(".rail__tick")];
  const count = wrap.querySelector("[data-rail-count]");

  // 걸러진 뒤에도 남아 있는 카드만 센다 — 번호가 화면과 어긋나면 눈금이 거짓말이 된다.
  const shown = () =>
    [...track.querySelectorAll(".rail__card")].filter((c) => !c.hidden);

  const step = () => {
    const card = shown()[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card
      ? card.getBoundingClientRect().width + gap
      : track.clientWidth * 0.8;
  };

  const sync = () => {
    const cards = shown();
    const max = track.scrollWidth - track.clientWidth;
    const at = currentIndex(cards, track);
    wrap.classList.toggle("is-static", max <= 1);
    wrap.classList.toggle("is-start", track.scrollLeft <= 1);
    wrap.classList.toggle("is-end", track.scrollLeft >= max - 1);
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max - 1;
    if (count)
      count.textContent = `${pad(cards.length ? at + 1 : 0)} / ${pad(cards.length)}`;
    // 눈금은 서버가 전체 장 수만큼 찍어 뒀다 — 걸렀을 때는 남은 수만 켜 둔다.
    ticks.forEach((t, n) => {
      t.hidden = n >= cards.length;
      t.classList.toggle("is-on", n === at);
    });
  };

  prev.addEventListener("click", () =>
    track.scrollBy({ left: -step(), behavior: "smooth" }),
  );
  next.addEventListener("click", () =>
    track.scrollBy({ left: step(), behavior: "smooth" }),
  );
  track.addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);

  // 거르는 건 filters.mjs 가 한다 — 여기서는 남은 장 수로 눈금·번호를 다시 센다.
  // 거른 뒤에는 처음으로 돌아간다: 남은 두 장을 스크롤 끝에서 만나면 빈 판으로 보인다.
  wrap.addEventListener("filterchange", () => {
    track.scrollTo({ left: 0, behavior: "auto" });
    sync();
  });

  wrap.classList.add("is-ready");
  sync();
}

export function initRails() {
  for (const wrap of document.querySelectorAll("[data-rail]")) wire(wrap);
}
