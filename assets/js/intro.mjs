// 인트로 — 넘겨주는 순간과 뒷정리만 맡는다.
//
// 움직임은 전부 CSS 다(styles/pages/home.css). 이 모듈이 못 내려와도 가림막은
// 제 애니메이션의 forwards 로 사라진다 — 여기서 하는 일은 둘뿐이다.
//  1. 가림막이 올라가기 시작할 때 intro-done 을 붙여, 히어로 등장이 그때 처음부터 흐르게 한다.
//  2. 끝난 가림막을 지운다.

// CSS 의 intro-veil 과 같은 값이다. 한쪽만 고치면 넘겨주는 순간이 어긋난다.
const VEIL_MS = 1920;
// intro-veil 의 68% — 가림막이 올라가기 시작하는 지점. 히어로는 그때 같이 선다.
const HANDOFF = 0.68;

export function initIntro() {
  const veil = document.querySelector("[data-intro]");
  if (!veil) return;

  const root = document.documentElement;
  // 부팅 스크립트가 "틀지 않기로" 정했으면 가림막은 애초에 display:none 이다.
  if (!root.classList.contains("js-intro")) return;

  const handoff = () => root.classList.add("intro-done");
  const clean = () => {
    veil.remove();
    root.classList.remove("js-intro");
  };

  // 모듈은 본문을 다 읽은 뒤에 온다 — 그 사이 가림막은 이미 흐르고 있다.
  // 남은 시간을 애니메이션에게 직접 묻는다. 못 물으면 처음부터로 친다.
  const anim = typeof veil.getAnimations === "function" ? veil.getAnimations()[0] : null;
  const elapsed = Number(anim?.currentTime) || 0;
  setTimeout(handoff, Math.max(0, VEIL_MS * HANDOFF - elapsed));

  veil.addEventListener("animationend", clean, { once: true });
  // 배경 탭처럼 애니메이션 알림이 오지 않는 환경 — 시간이 지나면 그냥 치운다.
  setTimeout(() => {
    handoff();
    clean();
  }, VEIL_MS + 400);
}
