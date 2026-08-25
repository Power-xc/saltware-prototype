// 등장 애니메이션 — Guardian feature-rows.js 패턴 계승.
//
// 원칙: 어떤 경우에도 본문이 숨겨진 채 남지 않는다.
//  - 숨김은 html.js-reveal 이 붙었을 때만 적용된다. 스크립트가 실패하면 그냥 보인다.
//  - IntersectionObserver 미지원·모션 최소화면 즉시 전부 노출한다.
//  - 관찰이 어떤 이유로든 발화하지 않아도 SAFETY_MS 후 전부 노출한다.

const SAFETY_MS = 2000;

export function initReveal() {
  const items = [...document.querySelectorAll('.reveal')];
  if (!items.length) return;

  const showAll = () => items.forEach((el) => el.classList.add('is-in'));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduced) {
    showAll();
    return;
  }

  document.documentElement.classList.add('js-reveal');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));

  // 관찰이 발화하지 않는 환경(백그라운드 탭·렌더 억제 등)에서도 본문은 보여야 한다.
  setTimeout(() => {
    showAll();
    io.disconnect();
  }, SAFETY_MS);
}
