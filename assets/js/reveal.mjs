// 등장 애니메이션 — Guardian feature-rows.js 패턴 계승.
//
// 원칙: 어떤 경우에도 본문이 숨겨진 채 남지 않는다.
//  - 숨김은 html.js-reveal 이 붙었을 때만 적용된다. 스크립트가 실패하면 그냥 보인다.
//  - IntersectionObserver 미지원·모션 최소화면 즉시 전부 노출한다.
//  - 관찰이 한 번도 발화하지 않으면 SAFETY_MS 후 전부 노출한다. 예전엔 무조건 전부 열어서
//    2초 뒤에 닿는 섹션은 등장이 없었다(2026-09-08) — 관찰이 살아 있으면 그쪽에 맡긴다.
//
// 낱장(.reveal)은 제 몸이, 묶음([data-reveal])은 자식이 순서대로 올라온다 — 순번 --i 를
// 여기서 주고 늦추는 건 CSS 다(components.css 모션 구획). 토스 메인 실측(2026-09-08).

const SAFETY_MS = 2000;

export function initReveal() {
  const items = [...document.querySelectorAll(".reveal, [data-reveal]")];
  if (!items.length) return;

  const showAll = () => items.forEach((el) => el.classList.add("is-in"));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduced) {
    showAll();
    return;
  }

  for (const el of items) {
    if (!el.hasAttribute("data-reveal")) continue;
    [...el.children].forEach((c, n) => c.style.setProperty("--i", n));
  }
  document.documentElement.classList.add("js-reveal");

  // 관찰이 살아 있는지는 body 로 잰다 — body 는 늘 화면에 걸쳐 있어 첫 알림이 바로 온다.
  // 묶음 중 하나가 발화했는지로 재면 첫 화면이 히어로뿐일 때 아무것도 안 걸려 전부 열린다.
  let alive = false;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === document.body) {
          alive = true;
          io.unobserve(document.body);
          return;
        }
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  io.observe(document.body);
  items.forEach((el) => io.observe(el));

  // 빠른 플링은 관찰 프레임 사이로 섹션을 지나칠 수 있다(실측 2026-09-08: 600px/90ms 로 훑으면
  // 열넷 중 열이 닫힌 채 남았다). 스크롤마다 남은 것 중 화면 위쪽에 닿았거나 지나간 것을 연다 —
  // 열린 것은 셈에서 빠지므로 다 열리면 듣기를 그만둔다.
  // rAF 로 미루지 않는다 — 프레임이 안 오는 환경에서는 미룬 청소가 영영 안 돌았다.
  // 스크롤 뒤라 레이아웃은 이미 최신이고, 재는 건 남은 열몇 개뿐이다.
  let left = items.filter((el) => !el.classList.contains("is-in"));
  const sweep = () => {
    const line = innerHeight * 0.92;
    left = left.filter((el) => {
      if (el.getBoundingClientRect().top > line) return true;
      el.classList.add("is-in");
      io.unobserve(el);
      return false;
    });
    if (!left.length) removeEventListener("scroll", sweep);
  };
  addEventListener("scroll", sweep, { passive: true });

  // 관찰이 발화하지 않는 환경(백그라운드 탭·렌더 억제 등)에서도 본문은 보여야 한다.
  setTimeout(() => {
    if (alive) return;
    showAll();
    io.disconnect();
  }, SAFETY_MS);
}
