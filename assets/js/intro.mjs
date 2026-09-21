// 인트로 — 넘겨주는 순간 · 점의 비행 · 뒷정리.
//
// 움직임의 대부분은 CSS 다(styles/pages/home.css). 이 모듈이 못 내려와도 가림막은
// 제 애니메이션의 forwards 로 걷히고 사라진다. 여기서만 할 수 있는 일은 셋이다.
//  1. 면이 걷히기 시작할 때 intro-done 을 붙여, 히어로 등장이 그때 처음부터 흐르게 한다.
//  2. 점을 히어로 제목의 마침표 자리로 날린다 — 목적지가 글자 위치라 CSS 로는 못 적는다.
//  3. 끝난 가림막을 지운다.
//  4. 건너뛰기를 받는다 — 시계를 마무리 직전으로 밀고 남은 구간을 배속으로 돌린다.

// CSS 와 같은 값이다. 한쪽만 고치면 넘겨주는 순간이 어긋난다.
// VEIL_MS 는 WIPE_AT + FLIGHT_MS 보다 짧으면 안 된다 — 점이 마침표에 닿기 전에 지워진다.
const VEIL_MS = 3760;
const WIPE_AT = 2920; // 면이 걷히기 시작하는 지점 — 히어로는 그때 같이 선다.
const FLIGHT_MS = 820; // 착지가 히어로 dot-in(2920+820)과 같은 순간이다.

// 건너뛰기가 착지하는 지점 — 글자가 가라앉기 직전이다. 여기로 시계를 밀면 남는 건
// '마무리'뿐이다: 가라앉기 → 점만 남기 → 면 걷히기 → 점의 비행. 곧장 WIPE_AT 으로
// 밀지 않는 이유: 글자가 한 프레임에 증발하면 넘어간 게 아니라 끊긴 것으로 보인다.
const SKIP_AT = 2640;
// 그 마무리를 이 배속으로 돌린다. 1.0 이면 건너뛰고도 1.1초를 더 봐야 해서 안 눌린 줄 안다.
// 가림막 안 애니메이션과 점의 비행에 같은 배속이 걸린다 — 한쪽만 빠르면 점이 면보다
// 늦게 도착하고, clean 이 나는 점을 지운다.
const SKIP_RATE = 1.6;

/** 인트로의 점이 제목 끝의 마침표가 된다. 둘은 같은 주황이라, 나는 동안 한 점으로 읽힌다. */
function flyDot(veil, rate = 1) {
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
    {
      duration: FLIGHT_MS / rate,
      easing: "cubic-bezier(0.62, 0, 0.2, 1)",
      fill: "forwards",
    },
  );
}

export function initIntro() {
  const veil = document.querySelector("[data-intro]");
  if (!veil) return;

  const root = document.documentElement;
  // 부팅 스크립트가 "틀지 않기로" 정했으면 가림막은 애초에 display:none 이다.
  if (!root.classList.contains("js-intro")) return;

  let rate = 1;
  let timers = [];
  const at = (fn, ms) => timers.push(setTimeout(fn, Math.max(0, ms)));

  // 모듈은 본문을 다 읽은 뒤에 온다 — 그 사이 가림막은 이미 흐르고 있다.
  // 남은 시간을 애니메이션에게 직접 묻는다. 못 물으면 처음부터로 친다.
  const clock = () => {
    const a =
      typeof veil.getAnimations === "function" ? veil.getAnimations()[0] : null;
    return Number(a?.currentTime) || 0;
  };

  const keys = new Set(["Escape", "Enter", " ", "Spacebar"]);
  const onKey = (e) => {
    if (keys.has(e.key)) skip();
  };

  const handoff = () => {
    if (root.classList.contains("intro-done")) return;
    root.classList.add("intro-done");
    flyDot(veil, rate);
  };
  const clean = () => {
    veil.remove();
    root.classList.remove("js-intro");
    // 가림막과 함께 사라지지 않는 것들 — 창에 걸어 둔 손은 직접 뗀다.
    removeEventListener("keydown", onKey);
    removeEventListener("wheel", skip);
    removeEventListener("touchmove", skip);
  };

  /** 시계를 마무리 직전으로 밀고, 남은 구간을 배속으로 돌린다.
   *  끊고 지우는 게 아니라 '빨리 감기'다 — 점은 끝까지 제목의 마침표로 날아간다.
   *  예약해 둔 두 시점도 같은 배속으로 다시 잡는다. 애니메이션만 당기면 handoff 가
   *  제자리에 남아, 면은 이미 걷혔는데 히어로가 1초 뒤에 서는 꼴이 된다. */
  const skip = () => {
    const jump = SKIP_AT - clock();
    if (jump <= 0) return; // 이미 마무리 중이다 — 당길 게 없다. 두 번 눌러도 무해하다.
    rate = SKIP_RATE;
    try {
      for (const a of veil.getAnimations({ subtree: true })) {
        if (a.currentTime != null) a.currentTime = Number(a.currentTime) + jump;
        a.playbackRate = SKIP_RATE;
      }
    } catch (e) {
      // 시계를 못 미는 브라우저면 그냥 제 속도로 끝난다 — 건너뛰기는 편의지 기능이 아니다.
    }
    timers.forEach(clearTimeout);
    timers = [];
    at(handoff, (WIPE_AT - SKIP_AT) / SKIP_RATE);
    at(clean, (VEIL_MS - SKIP_AT) / SKIP_RATE);
  };

  const elapsed = clock();
  at(handoff, WIPE_AT - elapsed);
  at(clean, VEIL_MS - elapsed);

  // 표적은 화면 전부다. 답답한 사람의 손은 단추를 찾기 전에 이미 화면을 누르거나
  // 스크롤을 굴린다 — 그 셋을 다 받는다. 힌트와 손가락 커서는 이 클래스가 켠다:
  // 스크립트가 여기까지 왔을 때만 진짜로 눌리기 때문이다.
  veil.classList.add("intro--skippable");
  veil.addEventListener("pointerdown", skip);
  addEventListener("keydown", onKey);
  addEventListener("wheel", skip, { passive: true });
  addEventListener("touchmove", skip, { passive: true });
}
