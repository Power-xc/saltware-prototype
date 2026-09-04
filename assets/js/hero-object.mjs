// 메인 히어로 카드 6장 — 펼침 상태와 영상 재생. 접근성·배터리 배려.
// 호버 펼침은 CSS 가 맡고, 여기서는 클릭 · 층 띠 탭 · 포커스로 is-active 를 옮기며
// 펼친 카드의 영상만 재생한다(나머지는 포스터). reduced-motion 은 재생하지 않는다.
// 화면 밖으로 나가면 멈춘다 — 히어로를 지나친 뒤에도 돌 이유가 없다.

export function initHeroObject() {
  const cards = [...document.querySelectorAll("[data-hcard]")];
  if (!cards.length) return;
  const tabs = [...document.querySelectorAll("[data-hlayer]")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = true;

  const sync = () => {
    cards.forEach((c) => {
      const v = c.querySelector("video");
      if (!v) return;
      const on = c.classList.contains("is-active") && visible && !reduced;
      if (on) v.play().catch(() => {});
      else v.pause();
    });
  };
  const activate = (i) => {
    cards.forEach((c, n) => c.classList.toggle("is-active", n === i));
    tabs.forEach((t, n) => {
      t.classList.toggle("is-active", n === i);
      if (n === i) t.setAttribute("aria-current", "true");
      else t.removeAttribute("aria-current");
    });
    sync();
  };

  cards.forEach((c, i) => {
    c.addEventListener("mouseenter", () => activate(i));
    c.addEventListener("focusin", () => activate(i));
    // 터치에서는 첫 탭이 펼치고, 펼친 카드의 탭이 이동한다.
    c.addEventListener("click", (e) => {
      if (c.classList.contains("is-active")) return;
      e.preventDefault();
      activate(i);
    });
  });
  tabs.forEach((t, i) => t.addEventListener("click", () => activate(i)));

  if (reduced) {
    cards.forEach((c) => c.querySelector("video")?.removeAttribute("autoplay"));
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.05 },
  );
  io.observe(cards[0].parentElement);
  sync();
}
