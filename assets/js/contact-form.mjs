// 문의 폼 — 필수값 검증과 제출.
//
// data-endpoint 가 비어 있으면 dry-run 이다. 운영 이식 시점에 값을 넣고
// 그때 레이트리밋·캡차를 함께 건다 (docs/site-separation/03 §2-5 L-4).
// 엔드포인트를 빌드에 박지 않는다 — 배포 대상마다 달라진다.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 받침이 있으면 "을", 없으면 "를". 한글 음절은 0xAC00 부터 28자씩 한 묶음이고
// 그 안의 마지막 자리가 종성이다.
const objectParticle = (word) => {
  const last = word.trim().slice(-1).charCodeAt(0);
  if (last < 0xac00 || last > 0xd7a3) return "을";
  return (last - 0xac00) % 28 === 0 ? "를" : "을";
};

const formatPhone = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

const track = (name, params = {}) => {
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...params });
};

function fieldError(input, message) {
  const wrap = input.closest(".field");
  if (!wrap) return;
  wrap.querySelector(".field__error")?.remove();
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (!message) return;
  const p = document.createElement("p");
  p.className = "field__error";
  p.textContent = message;
  wrap.appendChild(p);
}

function validate(form) {
  const bad = [];
  for (const input of form.querySelectorAll(".field input, .field textarea")) {
    const label = input.closest(".field")?.querySelector("label")?.textContent.replace(" *", "").trim() ?? "";
    const value = input.value.trim();
    let message = "";
    if (input.required && !value)
      message = `${label}${objectParticle(label)} 입력해 주세요.`;
    else if (input.name === "email" && value && !EMAIL.test(value)) message = "이메일 형식을 확인해 주세요.";
    fieldError(input, message);
    if (message) bad.push(input);
  }
  return bad;
}

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  // 브라우저 기본 말풍선 대신 한국어 인라인 오류를 쓴다. JS 가 죽으면
  // novalidate 가 걸리지 않아 required 속성이 그대로 남는다.
  form.setAttribute("novalidate", "");

  const endpoint = form.dataset.endpoint || "";
  const submit = form.querySelector("[data-submit]");
  const state = form.querySelector("[data-form-state]");
  const chips = [...form.querySelectorAll("[data-topic]")];
  let busy = false;

  const say = (text, kind = "") => {
    if (!state) return;
    state.textContent = text;
    state.className = `state${kind ? ` state--${kind}` : ""}`;
    state.hidden = !text;
  };

  form.querySelector('[name="phone"]')?.addEventListener("input", (e) => {
    e.target.value = formatPhone(e.target.value);
  });

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      for (const c of chips) c.setAttribute("aria-pressed", "false");
      chip.setAttribute("aria-pressed", "true");
    });
  }

  const topic = () =>
    form.querySelector('[data-topic][aria-pressed="true"]')?.dataset.topic ?? "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;

    const bad = validate(form);
    if (bad.length) {
      say("입력하지 않은 항목이 있습니다.", "error");
      track("contact_validation_error");
      bad[0].focus();
      return;
    }
    if (!form.querySelector('[name="consent"]')?.checked) {
      say("개인정보 수집·이용 동의가 필요합니다.", "error");
      return;
    }

    busy = true;
    submit?.setAttribute("aria-disabled", "true");
    say("보내는 중…");

    if (!endpoint) {
      // 엔드포인트 배선 전에는 흐름만 확인한다. 아무 데도 보내지 않는다.
      track("generate_lead", { lead_category: topic(), transport: "dry-run" });
      say("확인했습니다. 지금은 접수 경로가 연결되지 않아 실제로 전송되지 않았습니다.", "ok");
      busy = false;
      submit?.removeAttribute("aria-disabled");
      return;
    }

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, topic: topic() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { lead_category: topic() });
      say("문의가 접수되었습니다. 영업일 기준 1일 내 회신드립니다.", "ok");
      form.reset();
    } catch {
      say("전송에 실패했습니다. 잠시 후 다시 시도해 주세요.", "error");
    } finally {
      busy = false;
      submit?.removeAttribute("aria-disabled");
    }
  });
}
