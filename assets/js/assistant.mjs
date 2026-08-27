// 떠 있는 문의 진입점.
//
// 대화형 어시스턴트 백엔드가 없다. 그래서 답을 지어내는 챗 UI 를 만들지 않는다 —
// 여는 것은 사실만 적힌 작은 패널이고, 거기서 실제로 동작하는 문의 창구로 보낸다.
// 승인된 위젯 URL 이 생기면 이 파일의 패널 대신 그 위젯을 띄우면 된다.
//
// 패널은 대화상자다. 열면 초점이 들어가고, 갇히고, 닫으면 연 버튼으로 돌아온다.

export function initAssistant() {
  const root = document.querySelector('[data-assistant]');
  if (!root) return;
  const trigger = root.querySelector('[data-assistant-open]');
  const panel = root.querySelector('[data-assistant-panel]');
  const closeBtn = root.querySelector('[data-assistant-close]');
  if (!trigger || !panel) return;

  const FOCUSABLE = 'a[href], button:not([disabled])';
  const focusables = () =>
    [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);

  const setOpen = (on) => {
    panel.hidden = !on;
    trigger.setAttribute('aria-expanded', String(on));
    if (on) focusables()[0]?.focus();
    else trigger.focus();
  };

  trigger.addEventListener('click', () => setOpen(panel.hidden));
  closeBtn?.addEventListener('click', () => setOpen(false));

  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const list = focusables();
    if (!list.length) return;
    const [first, last] = [list[0], list[list.length - 1]];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) setOpen(false);
  });
  // 패널 밖을 누르면 닫는다. 화면을 덮지 않는 작은 패널이라 배경은 막지 않는다.
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !root.contains(e.target)) setOpen(false);
  });
}
