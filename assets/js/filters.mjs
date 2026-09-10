// 분류 칩 — 누른 분류만 남긴다(사령관 UX 시안 2026-09-08).
// 칩 줄 바로 뒤의 묶음에서 [data-filter-group] 을 켜고 끈다. 목표 레일과 프로젝트 뉴스가
// 같은 코드를 쓴다 — 레일은 걸린 뒤 눈금·번호를 다시 세야 하므로 filterchange 로 알린다.
// 대표 카드가 있는 묶음(data-stories)은 남은 첫 장을 대표로 올린다 — 대표가 걸러지면
// 왼쪽 큰 칸이 통째로 비어 고장으로 보인다.
import { markFirstVisible } from "./rows.mjs?v=1eb58a17050c";

export function initFilters() {
  for (const row of document.querySelectorAll("[data-filter]")) {
    const box = row.nextElementSibling;
    if (!box) continue;
    const chips = [...row.querySelectorAll("[data-filter-key]")];
    const items = [...box.querySelectorAll("[data-filter-group]")];
    if (!chips.length || !items.length) continue;

    // 대표가 걸러지면 왼쪽 큰 칸이 통째로 빈다 — 남은 첫 장을 그 자리로 옮긴다.
    const side = box.querySelector(".stories__side");
    const promote = () => {
      if (!side) return;
      const shown = items.filter((el) => !el.hidden);
      let first = true;
      for (const el of items) {
        const lead = first && el === shown[0];
        if (lead) first = false;
        el.classList.toggle("story--lead", lead);
        el.classList.toggle("story--row", !lead);
        // 순서는 원래 순서를 지킨다 — 대표만 앞으로 나오고 나머지는 뒤따른다.
        if (lead) box.prepend(el);
        else side.append(el);
      }
    };

    for (const chip of chips) {
      chip.addEventListener("click", () => {
        const key = chip.dataset.filterKey;
        for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
        for (const el of items) {
          el.hidden = key !== "all" && el.dataset.filterGroup !== key;
        }
        promote();
        // 줄 목록(.presses)에서는 감춘 뒤 맨 윗줄 표시를 다시 매긴다 — 그러지 않으면
        // 걸러낸 목록 맨 위에 실선 하나가 뜬다(rows.mjs). 카드 묶음은 그 규칙이 없고,
        // 대표를 옮기느라 자식이 행이 아닐 수도 있어 줄 목록만 손댄다.
        if (box.classList.contains("presses")) markFirstVisible(box);
        box.dispatchEvent(new CustomEvent("filterchange", { bubbles: true }));
      });
    }
  }
}
