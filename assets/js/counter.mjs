// 수행 이력의 수 — 판이 화면에 들어올 때 0 에서 세어 올린다(사령관 2026-09-08 "숫자가 늘어나면서
// 성장하고 있구나 느낌"). 세는 건 수량뿐이다 — 연도(2022 · 2003)는 데이터에서 data-count 를
// 달지 않는다. 연도를 0 부터 세면 늘어난 적 없는 것이 늘어난 것처럼 읽힌다.
// 한 번만 돈다. reduced-motion 이면 최종값 그대로 두고 아무것도 하지 않는다.
import { scrollStage } from "./frame.mjs?v=613762e7ce07";

const DUR = 1400;

// 무대 위에서는 시간이 아니라 스크롤이 수를 정한다(features/home-proof-stage §C).
// 네 수는 pages/home.css 의 박자표와 같은 값이다 — 한쪽만 고치면 수가 칸보다 먼저 차거나
// 칸이 선 뒤에도 0 으로 남는다. spec.test.mjs 가 두 파일을 대조한다.
const SPAN = 0.52; // --q = --p / SPAN
const GAP = 0.16; // 칸 사이 간격
const RUN = 0.1; // 칸 하나가 서는 길이
const STAGE_MIN = 1080; // 이 아래에서는 무대가 없다 — CSS 의 @media 와 같은 값


export function initCounters() {
  const nodes = [...document.querySelectorAll("[data-count]")];
  if (!nodes.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // 숫자 노드만 바꾼다 — 단위 첨자(<span>)는 마크업 그대로 둔다.
  const numText = (el) => [...el.childNodes].find((n) => n.nodeType === 3);

  const run = (el) => {
    const end = Number(el.dataset.count);
    if (!Number.isFinite(end)) return;
    const text = numText(el);
    if (!text) return;
    const write = (v) => (text.nodeValue = String(v));
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / DUR);
      // 끝에서 감속 — 마지막 한 자리가 천천히 멎어야 "도달"로 읽힌다.
      const eased = 1 - (1 - p) ** 3;
      write(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    write(0);
    requestAnimationFrame(step);
  };

  // ── 무대 위의 수 — 스크롤이 정한다 ─────────────────────
  // 타이머로 세면 판이 이미 다 보이는데 수가 0 인 프레임이 존재한다(실측 2026-09-21).
  // 진행률이 수를 정하면 그 틈이 구조적으로 사라진다 — 칸이 서기 시작해야 수도 오른다.
  const onStage = new Map();
  for (const n of nodes) {
    const stage = n.closest("[data-stage]");
    if (!stage) continue;
    if (!onStage.has(stage)) onStage.set(stage, []);
    onStage.get(stage).push(n);
  }

  if (onStage.size) {
    // 칸 순서는 격자에서의 자리다 — CSS 의 :nth-child 가 세는 것과 같은 수여야 한다.
    const order = (el) => {
      const cell = el.closest(".bento__cell");
      if (!cell?.parentNode) return 0;
      return [...cell.parentNode.children].indexOf(cell);
    };
    scrollStage([...onStage.keys()], (stage) => {
      // 폭이 무대 아래로 내려가면 CSS 가 칸을 전부 세워 둔다 — 수도 최종값으로 되돌린다.
      // 이 확인이 없으면 창을 좁혔을 때 칸은 보이는데 수만 0 에 멎는다.
      const staged = innerWidth >= STAGE_MIN;
      // stage.mjs 가 인라인으로 적어 둔 값을 그대로 읽는다 — getComputedStyle 을 매
      // 프레임 부르면 강제 배치가 한 번 더 걸린다.
      const p = staged ? Number(stage.style.getPropertyValue("--p")) || 0 : 1;
      const q = Math.min(1, Math.max(0, p / SPAN));
      for (const el of onStage.get(stage)) {
        const end = Number(el.dataset.count);
        const text = numText(el);
        if (!text || !Number.isFinite(end)) continue;
        if (!staged) {
          text.nodeValue = String(end);
          continue;
        }
        const run = Math.min(1, Math.max(0, (q - order(el) * GAP) / RUN));
        text.nodeValue = String(Math.round(end * run));
      }
    });
  }

  // ── 무대 밖의 수 — 판이 들어오면 시간이 센다 ─────────────
  // 낱장이 아니라 판 단위로 센다. 숫자마다 따로 걸면 맨 아래 칸이 화면 밑선에 걸치는 순간
  // 그 숫자만 먼저 돌아 흩어지고, 스크롤이 빠르면 눈이 닿을 때는 이미 끝나 있다.
  // 판이 화면 아래 15% 선을 넘어 들어왔을 때 여섯이 같이 오른다.
  const free = nodes.filter((n) => !n.closest("[data-stage]"));
  if (!free.length) return;
  const boards = new Set(free.map((n) => n.closest(".bento") ?? n));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        for (const n of e.target.querySelectorAll?.("[data-count]") ?? []) run(n);
        if (e.target.matches("[data-count]")) run(e.target);
      }
    },
    { threshold: 0.25, rootMargin: "0px 0px -15% 0px" },
  );
  for (const b of boards) io.observe(b);
}
