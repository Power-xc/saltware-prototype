// 분류 칩 — 누른 분류만 남긴다(사령관 UX 시안 2026-09-08).
// 칩 줄 바로 뒤의 묶음에서 [data-filter-group] 을 켜고 끈다. 목표 레일과 프로젝트 뉴스가
// 같은 코드를 쓴다 — 레일은 걸린 뒤 눈금·번호를 다시 세야 하므로 filterchange 로 알린다.
// 대표 카드가 있는 묶음(data-stories)은 남은 첫 장을 대표로 올린다 — 대표가 걸러지면
// 왼쪽 큰 칸이 통째로 비어 고장으로 보인다.
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
        box.dispatchEvent(new CustomEvent("filterchange", { bubbles: true }));
      });
    }
  }
}
