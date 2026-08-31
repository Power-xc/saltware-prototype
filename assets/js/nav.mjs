// 헤더 — 메가메뉴 · 모바일 서랍.
// 헤더 마크업은 이미 HTML 안에 있다. 이 스크립트는 열고 닫기만 한다.

export function initNav() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const triggers = [...header.querySelectorAll("[data-mega]")];
  const panels = new Map(
    [...header.querySelectorAll("[data-mega-panel]")].map((p) => [
      p.dataset.megaPanel,
      p,
    ]),
  );

  // 어떻게 열렸는지 기억한다. 키보드로 연 패널을 마우스가 닫으면
  // 초점은 메뉴에 있는데 메뉴가 사라진다 — .focus() 가 스크롤을 일으키면
  // 헤더가 커서 밑에서 빠져나가면서 실제로 그 일이 난다.
  let openedBy = null;

  // 이탈 유예. 커서가 패널 모서리를 스치기만 해도 바로 닫히면
  // 메뉴→패널로 내려가는 대각선 이동이 매번 끊긴다(메가존도 유예를 둔다).
  let closeTimer = 0;
  const cancelClose = () => clearTimeout(closeTimer);

  const close = () => {
    cancelClose();
    triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
    panels.forEach((p) => (p.hidden = true));
    openedBy = null;
  };
  const open = (key, how) => {
    close();
    const t = triggers.find((x) => x.dataset.mega === key);
    const p = panels.get(key);
    if (!t || !p) return;
    t.setAttribute("aria-expanded", "true");
    p.hidden = false;
    openedBy = how;
  };

  triggers.forEach((t) => {
    t.addEventListener("mouseenter", () => open(t.dataset.mega, "hover"));
    t.addEventListener("focus", () => open(t.dataset.mega, "focus"));
    t.addEventListener("click", () =>
      t.getAttribute("aria-expanded") === "true"
        ? close()
        : open(t.dataset.mega, "hover"),
    );
  });
  header.addEventListener("mouseenter", cancelClose);
  header.addEventListener("mouseleave", () => {
    if (openedBy !== "hover") return;
    cancelClose();
    closeTimer = setTimeout(close, 160);
  });
  // 초점이 헤더 밖으로 나가면 닫는다 — 키보드로 연 패널의 짝이다.
  header.addEventListener("focusout", (e) => {
    if (openedBy === "focus" && !header.contains(e.relatedTarget)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = triggers.find(
      (t) => t.getAttribute("aria-expanded") === "true",
    );
    close();
    open?.focus();
  });

  // 모바일 서랍
  const drawer = document.getElementById("drawer");
  const openBtn = document.querySelector("[data-drawer-open]");
  const closeBtn = document.querySelector("[data-drawer-close]");
  if (drawer && openBtn) {
    const FOCUSABLE =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    // 서랍이 열려 있는 동안 초점이 뒤 페이지로 새면 보이지 않는 것을 조작하게 된다.
    const focusables = () =>
      [...drawer.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );

    const setDrawer = (on) => {
      drawer.hidden = !on;
      openBtn.setAttribute("aria-expanded", String(on));
      document.documentElement.style.overflow = on ? "hidden" : "";
      if (on) focusables()[0]?.focus();
      else openBtn.focus(); // 연 자리로 초점을 돌려준다
    };

    openBtn.addEventListener("click", () => setDrawer(true));
    closeBtn?.addEventListener("click", () => setDrawer(false));
    drawer.addEventListener(
      "click",
      (e) => e.target.closest("a") && setDrawer(false),
    );

    drawer.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawer.hidden) setDrawer(false);
    });

    drawer.querySelectorAll(".drawer__toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const on = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!on));
        btn.nextElementSibling.hidden = on;
      });
    });
  }

  document.querySelector("[data-to-top]")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
