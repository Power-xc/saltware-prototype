// 메인 히어로 영상 — 오브젝트 루프와 카드 3장. 접근성·배터리 배려.
// reduced-motion 사용자는 루프를 재생하지 않고 첫 프레임(포스터)만 본다.
// 화면 밖으로 나가면 멈춘다 — 히어로를 지나친 뒤에도 돌 이유가 없다.

export function initHeroObject() {
  const videos = document.querySelectorAll(".hero video");
  if (!videos.length) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  videos.forEach((video) => {
    if (reduced) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
  });
}
