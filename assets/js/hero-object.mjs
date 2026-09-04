// 메인 히어로 카드 — 큰 카드 3(영상 고정) + 작은 카드 3. 작은 카드나 층 띠의 탭을 누르면
// 그 층의 카피 블록이 가로 카드로 들어오고, 있던 층의 블록이 작은 카드로 나간다 — 영상은
// 그대로 돈다. 접근성·배터리 배려: reduced-motion 은 재생하지 않고, 화면 밖이면 멈춘다.

export function initHeroObject() {
  const track = document.querySelector("[data-hcards]");
  if (!track) return;
  const wide = track.querySelector("[data-hwide]");
  const minis = [...track.querySelectorAll("[data-hmini]")];
  const tabs = [...document.querySelectorAll("[data-hlayer]")];
  if (!wide || !minis.length) return;

  // 카드가 지금 품은 층의 번호 · 이름 · 링크를 카피 블록에서 다시 읽어 붙인다.
  const label = (card) => {
    const t = card.querySelector(".hcard__text");
    if (!t) return;
    card.href = t.dataset.href || "#";
    card.querySelector(".hcard__n").textContent = t.dataset.n;
    const side = card.querySelector(".hcard__side");
    if (side) side.textContent = t.dataset.name;
    if (t.dataset.event) card.dataset.gaEvent = t.dataset.event;
    t.classList.remove("is-in");
    void t.offsetWidth;
    t.classList.add("is-in");
  };
  const layerOf = (card) => Number(card.querySelector(".hcard__text")?.dataset.layer);
  const bigLayers = () => [...track.querySelectorAll("[data-hcard]")].map(layerOf);
  const syncTabs = () => {
    const on = new Set(bigLayers());
    tabs.forEach((t, i) => {
      t.classList.toggle("is-active", on.has(i));
      if (on.has(i)) t.setAttribute("aria-current", "true");
      else t.removeAttribute("aria-current");
    });
  };

  const swap = (mini) => {
    const a = wide.querySelector(".hcard__text");
    const b = mini.querySelector(".hcard__text");
    if (!a || !b) return;
    mini.appendChild(a);
    wide.appendChild(b);
    label(wide);
    label(mini);
    syncTabs();
  };

  minis.forEach((m) => {
    m.addEventListener("click", (e) => {
      e.preventDefault();
      swap(m);
    });
  });
  tabs.forEach((t, i) =>
    t.addEventListener("click", () => {
      const mini = minis.find((m) => layerOf(m) === i);
      if (mini) swap(mini);
    }),
  );

  const videos = [...track.querySelectorAll("video")];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    videos.forEach((v) => {
      v.removeAttribute("autoplay");
      v.pause();
    });
  } else {
    const io = new IntersectionObserver(
      ([entry]) => videos.forEach((v) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause())),
      { threshold: 0.05 },
    );
    io.observe(track);
  }
  syncTabs();
}
