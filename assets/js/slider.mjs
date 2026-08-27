// 홈 캐러셀 — 점 이동, 자동 넘김, 포커스·호버 안전장치.
//
// 이동은 transform 이 아니라 track 의 가로 스크롤로 한다. 컨테이너가
// overflow-x 스크롤러라 transform 을 걸면 카드가 스크롤 영역 밖으로 밀려난다.
// JS 가 없어도 같은 스크롤러로 4장이 그대로 읽힌다.

const AUTO_MS = 6000;

export function initSlider() {
  for (const root of document.querySelectorAll("[data-slider]")) {
    const track = root.querySelector(".slider__track");
    const cards = track ? [...track.children] : [];
    if (cards.length < 2) continue;

    // 점은 마크업에 이미 있다. 없을 때만 만든다 — 두 벌이 생기면 안 된다.
    const dots = root.querySelector("[data-slider-dots]");
    let buttons = dots ? [...dots.querySelectorAll(".slider__dot")] : [];
    if (dots && buttons.length !== cards.length) {
      dots.replaceChildren(
        ...cards.map((_, i) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "slider__dot";
          b.setAttribute("aria-label", `슬라이드 ${i + 1}`);
          return b;
        }),
      );
      buttons = [...dots.querySelectorAll(".slider__dot")];
    }

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null;
    let index = 0;

    const mark = (i) => {
      index = i;
      buttons.forEach((b, n) => {
        b.setAttribute("aria-pressed", String(n === i));
        b.classList.toggle("is-active", n === i);
      });
    };

    const goTo = (i) => {
      const next = (i + cards.length) % cards.length;
      track.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft });
      mark(next);
    };

    const stop = () => {
      clearTimeout(timer);
      timer = null;
    };
    const start = () => {
      stop();
      if (reduced) return;
      timer = setTimeout(() => goTo(index + 1), AUTO_MS);
    };

    buttons.forEach((b, i) =>
      b.addEventListener("click", () => {
        goTo(i);
        start();
      }),
    );

    // 명세 §29 — 캐러셀은 키보드로 조작할 수 있어야 한다.
    track.setAttribute("tabindex", "0");
    track.setAttribute("role", "group");
    track.setAttribute("aria-roledescription", "캐러셀");
    track.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      goTo(index + step);
      start();
    });

    // 자동 넘김이 있으면 멈출 수단이 있어야 한다(§29 autoplay pause).
    if (!reduced && dots) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "slider__pause";
      const label = () => {
        const on = timer !== null;
        toggle.setAttribute("aria-pressed", String(!on));
        toggle.setAttribute("aria-label", on ? "자동 넘김 멈춤" : "자동 넘김 시작");
        toggle.textContent = on ? "❙❙" : "▶";
      };
      toggle.addEventListener("click", () => {
        if (timer) stop();
        else start();
        label();
      });
      dots.after(toggle);
      label();
      root.addEventListener("mouseleave", label);
      root.addEventListener("mouseenter", label);
    }

    // 손으로 스크롤하면 그 위치를 정답으로 삼는다.
    track.addEventListener("scroll", () => {
      const base = cards[0].offsetLeft;
      const at = cards.findIndex((c) => c.offsetLeft - base >= track.scrollLeft - 8);
      if (at >= 0) mark(at);
    }, { passive: true });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", () => {
      if (!root.matches(":hover")) start();
    });

    mark(0);
    start();
  }
}
