// 헤더 — 메가메뉴 · 모바일 서랍.
// 헤더 마크업은 이미 HTML 안에 있다. 이 스크립트는 열고 닫기만 한다.

function initMegamenu(header) {
  const triggers = [...header.querySelectorAll("[data-mega]")];
  const panels = new Map(
    [...header.querySelectorAll("[data-mega-panel]")].map((p) => [
      p.dataset.megaPanel,
      p,
    ]),
  );
  let openedBy = null;
  let closeTimer = 0;
  // Escape 뒤에 초점을 돌려줄 때 focus 핸들러가 메뉴를 도로 여는 것을 막는다(실측 2026-09-14).
  let returning = false;

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
    t.addEventListener("focus", () => {
      if (!returning) open(t.dataset.mega, "focus");
    });
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
  header.addEventListener("focusout", (e) => {
    if (openedBy === "focus" && !header.contains(e.relatedTarget)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = triggers.find(
      (t) => t.getAttribute("aria-expanded") === "true",
    );
    close();
    returning = true;
    open?.focus();
    returning = false;
  });
}

function initDrawer() {
  const drawer = document.getElementById("drawer");
  const openBtn = document.querySelector("[data-drawer-open]");
  const closeBtn = document.querySelector("[data-drawer-close]");
  if (!drawer || !openBtn) return;

  const FOCUSABLE =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusables = () =>
    [...drawer.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null,
    );

  const setDrawer = (on) => {
    drawer.hidden = !on;
    openBtn.setAttribute("aria-expanded", String(on));
    document.documentElement.style.overflow = on ? "hidden" : "";
    if (on) focusables()[0]?.focus();
    else openBtn.focus();
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

export function initNav() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  initMegamenu(header);
  initDrawer();

  document.querySelector("[data-to-top]")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
