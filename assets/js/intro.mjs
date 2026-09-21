// 인트로 — 넘겨주는 순간 · 점의 비행 · 뒷정리.
//
// 움직임의 대부분은 CSS 다(styles/pages/home.css). 이 모듈이 못 내려와도 가림막은
// 제 애니메이션의 forwards 로 걷히고 사라진다. 여기서만 할 수 있는 일은 셋이다.
//  1. 면이 걷히기 시작할 때 intro-done 을 붙여, 히어로 등장이 그때 처음부터 흐르게 한다.
//  2. 점을 히어로 제목의 마침표 자리로 날린다 — 목적지가 글자 위치라 CSS 로는 못 적는다.
//  3. 끝난 가림막을 지운다.

// CSS 와 같은 값이다. 한쪽만 고치면 넘겨주는 순간이 어긋난다.
// VEIL_MS 는 WIPE_AT + FLIGHT_MS 보다 짧으면 안 된다 — 점이 마침표에 닿기 전에 지워진다.
const VEIL_MS = 4060;
const WIPE_AT = 3220; // 면이 걷히기 시작하는 지점 — 히어로는 그때 같이 선다.
const FLIGHT_MS = 820; // 착지가 히어로 dot-in(3220+820)과 같은 순간이다.

/** 인트로의 점이 제목 끝의 마침표가 된다. 둘은 같은 주황이라, 나는 동안 한 점으로 읽힌다. */
function flyDot(veil) {
  const dot = veil.querySelector(".intro__dot");
  const target = document.querySelector(".hero__dot");
  if (!dot || !target || typeof dot.animate !== "function") return;

  const from = dot.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  // 제목이 아직 자리를 안 잡았으면 날리지 않는다 — 엉뚱한 곳으로 가느니 그냥 사라지는 게 낫다.
  if (!to.width || !from.width) return;

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  // WAAPI 는 CSS 애니메이션보다 우선한다 — intro-dot 이 끝에 걸어둔 scale 을 이쪽이 덮는다.
  dot.animate(
    [
      { translate: "0 0", scale: 1, opacity: 1 },
      { translate: `${dx}px ${dy}px`, scale: 0.6, opacity: 1, offset: 0.88 },
      { translate: `${dx}px ${dy}px`, scale: 0.6, opacity: 0 },
    ],
    { duration: FLIGHT_MS, easing: "cubic-bezier(0.62, 0, 0.2, 1)", fill: "forwards" },
  );
}

export function initIntro() {
  const veil = document.querySelector("[data-intro]");
  if (!veil) return;

  const root = document.documentElement;
  // 부팅 스크립트가 "틀지 않기로" 정했으면 가림막은 애초에 display:none 이다.
  if (!root.classList.contains("js-intro")) return;

  const handoff = () => {
    if (root.classList.contains("intro-done")) return;
    root.classList.add("intro-done");
    flyDot(veil);
  };
  const clean = () => {
    veil.remove();
    root.classList.remove("js-intro");
  };

  // 모듈은 본문을 다 읽은 뒤에 온다 — 그 사이 가림막은 이미 흐르고 있다.
  // 남은 시간을 애니메이션에게 직접 묻는다. 못 물으면 처음부터로 친다.
  const anim = typeof veil.getAnimations === "function" ? veil.getAnimations()[0] : null;
  const elapsed = Number(anim?.currentTime) || 0;
  setTimeout(handoff, Math.max(0, WIPE_AT - elapsed));
  setTimeout(clean, Math.max(0, VEIL_MS - elapsed));
}
