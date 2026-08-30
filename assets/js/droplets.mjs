// 물방울 오브젝트 — 로고의 원에서 온 솔트웨어 브랜드 오브젝트.
// 소금물의 방울들이 서로 붙었다 떨어지고(구이 필터), 커서를 밀어내며 제자리로 돌아온다.
// 장식이라 실패해도 본문에 영향이 없어야 한다 — 모든 진입점은 main.mjs 의 try 안이다.

const NS = "http://www.w3.org/2000/svg";
const VIEW_W = 1000;
const VIEW_H = 600;

// 로고 도트 클러스터를 히어로 오른쪽에 흩어 놓은 배치. [x, y, r] (뷰박스 좌표)
const DOTS = [
  [730, 170, 60],
  [820, 250, 42],
  [700, 268, 34],
  [790, 330, 24],
  [668, 205, 20],
  [872, 185, 24],
  [742, 96, 16],
  [630, 300, 14],
  [900, 296, 14],
  [850, 104, 11],
];

const K_HOME = 0.012; // 제자리로 끄는 스프링
const DAMP = 0.86; // 감쇠 — 튀지 않고 물처럼 가라앉는다
const REPEL_R = 170; // 커서 반응 반경
const REPEL_F = 2.6;

function el(name, attrs) {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

function buildSvg() {
  const svg = el("svg", {
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true",
  });
  // 구이(goo) — 블러 후 알파 대비를 키우면 가까운 원끼리 물처럼 이어진다.
  const filter = el("filter", { id: "drops-goo" });
  filter.append(
    el("feGaussianBlur", {
      in: "SourceGraphic",
      stdDeviation: "14",
      result: "b",
    }),
    el("feColorMatrix", {
      in: "b",
      mode: "matrix",
      result: "g",
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -15",
    }),
    el("feBlend", { in: "SourceGraphic", in2: "g" }),
  );
  const defs = el("defs", {});
  defs.append(filter);

  // 유리 방울의 볼륨 — 좌상단 빛을 받는 구형 그라디언트. 색은 CSS 토큰이 정한다.
  const body = el("radialGradient", {
    id: "drop-body",
    cx: "0.5",
    cy: "0.5",
    r: "0.5",
  });
  body.append(
    el("stop", { offset: "0", class: "drops__stop-core" }),
    el("stop", { offset: "0.72", class: "drops__stop-mid" }),
    el("stop", { offset: "0.9", class: "drops__stop-edge" }),
    el("stop", { offset: "1", class: "drops__stop-lip" }),
  );
  // 바닥에서 올라오는 되비침 — 유리가 바닥광을 머금은 것처럼.
  const under = el("radialGradient", {
    id: "drop-under",
    cx: "0.5",
    cy: "0.98",
    r: "0.7",
  });
  under.append(
    el("stop", { offset: "0", class: "drops__stop-under" }),
    el("stop", { offset: "1", class: "drops__stop-fade" }),
  );
  const soft = el("filter", {
    id: "drop-soft",
    x: "-40%",
    y: "-40%",
    width: "180%",
    height: "180%",
  });
  soft.append(el("feGaussianBlur", { stdDeviation: "2.2" }));
  defs.append(body, under, soft);
  svg.append(defs);

  // 실루엣(구이)이 액체의 몸통을 잇고, 그 위에 방울마다 유리 렌더를 얹는다.
  const group = el("g", { filter: "url(#drops-goo)", class: "drops__goo" });
  const glass = el("g", { class: "drops__glass" });
  const dots = DOTS.map(([x, y, r]) => {
    const c = el("circle", { cx: x, cy: y, r, class: "drops__dot" });
    group.append(c);

    const g = el("g", { transform: `translate(${x} ${y})` });
    g.append(
      el("circle", { cx: 0, cy: 0, r, fill: "url(#drop-body)" }),
      el("circle", { cx: 0, cy: 0, r, fill: "url(#drop-under)" }),
      // 림 라이트 — 왼쪽 위 가장자리가 빛을 문다.
      el("circle", {
        cx: 0,
        cy: 0,
        r: r * 0.92,
        class: "drops__rim",
        "stroke-width": Math.max(1, r * 0.07),
        "stroke-dasharray": `${r * 2.6} ${r * 6}`,
        "stroke-dashoffset": r * 0.6,
        filter: "url(#drop-soft)",
      }),
      // 스펙큘러 — 작고 또렷한 점 + 넓고 흐린 판
      el("ellipse", {
        cx: -r * 0.34,
        cy: -r * 0.4,
        rx: r * 0.2,
        ry: r * 0.12,
        class: "drops__hl",
        filter: "url(#drop-soft)",
        transform: `rotate(-32 ${-r * 0.34} ${-r * 0.4})`,
      }),
      el("circle", {
        cx: -r * 0.26,
        cy: -r * 0.48,
        r: Math.max(1.6, r * 0.06),
        class: "drops__spark",
      }),
    );
    glass.append(g);
    return { c, g, x, y, r, hx: x, hy: y, vx: 0, vy: 0 };
  });
  svg.append(group, glass);
  return { svg, dots };
}

export function initDroplets() {
  const host = document.querySelector("[data-drops]");
  if (!host) return;
  const { svg, dots } = buildSvg();
  host.append(svg);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const section = host.closest(".hero") ?? host;
  let cursor = null;
  let running = false;
  let raf = 0;
  let t = 0;

  const toView = (ev) => {
    const b = svg.getBoundingClientRect();
    // slice 프리저브 — 짧은 축 기준으로 스케일이 잡힌다.
    const s = Math.max(VIEW_W / b.width, VIEW_H / b.height);
    return {
      x: (ev.clientX - b.left - b.width / 2) * s + VIEW_W / 2,
      y: (ev.clientY - b.top - b.height / 2) * s + VIEW_H / 2,
    };
  };

  const step = () => {
    t += 0.016;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      // 숨쉬기 — 방울마다 위상이 다른 느린 부유
      const bx = d.hx + Math.sin(t * 0.5 + i * 1.7) * 9;
      const by = d.hy + Math.cos(t * 0.42 + i * 2.3) * 11;
      d.vx += (bx - d.x) * K_HOME;
      d.vy += (by - d.y) * K_HOME;
      if (cursor) {
        const dx = d.x - cursor.x;
        const dy = d.y - cursor.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < REPEL_R + d.r) {
          const f = (REPEL_F * (REPEL_R + d.r - dist)) / (REPEL_R + d.r);
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
      }
      d.vx *= DAMP;
      d.vy *= DAMP;
      d.x += d.vx;
      d.y += d.vy;
      d.c.setAttribute("cx", d.x);
      d.c.setAttribute("cy", d.y);
      d.g.setAttribute("transform", `translate(${d.x} ${d.y})`);
    }
    raf = requestAnimationFrame(step);
  };

  // 히어로가 보일 때만 돈다 — 스크롤 아래에서 rAF 를 태우지 않는다.
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) {
      running = true;
      raf = requestAnimationFrame(step);
    } else if (!e.isIntersecting && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  });
  io.observe(section);

  section.addEventListener("pointermove", (ev) => {
    cursor = toView(ev);
  });
  section.addEventListener("pointerleave", () => {
    cursor = null;
  });
}
