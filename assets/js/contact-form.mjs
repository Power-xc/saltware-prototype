// 문의 폼.
// 계약은 docs/site-separation/03-logic-data-api.md §2 를 정본으로 한다.
// 현행 contact.html 에서 계승한 것:
//   - 전화번호 자동 하이픈
//   - GTM eventCallback + 타임아웃 이중 안전장치 (콜백이 안 와도 완료 화면으로 넘어간다)
// 현행에서 고친 것:
//   - onclick 전역 함수 → 이벤트 리스너 (CSP 적용 가능)
//   - 실패 시 즉시 재활성화되어 연타 가능하던 문제 → 쿨다운
//
// ENDPOINT 는 빌드 시 주입하지 않는다. 운영 이식 시점에 data-endpoint 로 넣는다.

import { track } from "./analytics.mjs";

const RULES = [
  { name: "name", message: "성명을 입력해 주세요.", test: (v) => v.length > 0 },
  {
    name: "phone",
    message: "올바른 휴대폰 번호를 입력해 주세요.",
    test: (v) => v.replace(/\D/g, "").length >= 10,
  },
  {
    name: "email",
    message: "올바른 이메일 주소를 입력해 주세요.",
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  },
  {
    name: "company",
    message: "회사명을 입력해 주세요.",
    test: (v) => v.length > 0,
  },
];

const CALLBACK_TIMEOUT_MS = 2100;
const RESUBMIT_COOLDOWN_MS = 1500;

export function formatPhone(raw) {
  const d = String(raw).replace(/\D/g, "").slice(0, 11);
  if (d.length > 7) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length > 3) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return d;
}

export function validate(values) {
  return RULES.filter((r) => !r.test((values[r.name] ?? "").trim())).map(
    (r) => ({
      field: r.name,
      message: r.message,
    }),
  );
}

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const endpoint = form.dataset.endpoint || "";
  const submit = form.querySelector("[data-submit]");
  const banner = form.querySelector("[data-banner]");
  const step1 = form.querySelector('[data-step="1"]');
  const step2 = form.querySelector('[data-step="2"]');
  const chips = [...form.querySelectorAll("[data-category]")];
  let busy = false;

  form.querySelector("#field-phone")?.addEventListener("input", (e) => {
    e.target.value = formatPhone(e.target.value);
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      track("contact_type_click", { lead_category: chip.dataset.category });
    });
  });

  const showErrors = (errors) => {
    form
      .querySelectorAll("[data-invalid]")
      .forEach((f) => f.removeAttribute("data-invalid"));
    form.querySelectorAll(".field__error").forEach((n) => n.remove());
    errors.forEach(({ field, message }) => {
      const wrap = form.querySelector(`[data-field="${field}"]`);
      if (!wrap) return;
      wrap.setAttribute("data-invalid", "true");
      const p = document.createElement("p");
      p.className = "field__error";
      p.textContent = message;
      wrap.append(p);
    });
    errors[0] && form.querySelector(`#field-${errors[0].field}`)?.focus();
  };

  const goToDone = (() => {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      step1.hidden = true;
      step2.hidden = false;
      form
        .querySelector('[data-dot="2"]')
        ?.setAttribute("aria-current", "step");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  })();

  const fail = () => {
    banner.hidden = false;
    setTimeout(() => {
      busy = false;
      submit.removeAttribute("aria-disabled");
      submit.textContent = "문의 접수하기";
    }, RESUBMIT_COOLDOWN_MS);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  submit.addEventListener("click", async () => {
    if (busy) return;

    const values = Object.fromEntries(
      RULES.map((r) => [
        r.name,
        form.querySelector(`#field-${r.name}`)?.value ?? "",
      ]),
    );
    const errors = validate(values);
    if (errors.length) {
      showErrors(errors);
      track("contact_validation_error");
      return;
    }

    busy = true;
    banner.hidden = true;
    submit.setAttribute("aria-disabled", "true");
    submit.textContent = "전송 중…";

    const category =
      form.querySelector('[data-category][aria-pressed="true"]')?.dataset
        .category ?? "";
    const payload = {
      category,
      ...Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, v.trim()]),
      ),
      message: form.querySelector("#field-message")?.value.trim() ?? "",
    };

    // 엔드포인트가 아직 배선되지 않은 단계에서는 완료 화면까지 흐름만 확인한다.
    if (!endpoint) {
      track("generate_lead", { lead_category: category, transport: "dry-run" });
      goToDone();
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) return fail();

      track("generate_lead", {
        lead_category: category,
        eventCallback: goToDone,
        eventTimeout: CALLBACK_TIMEOUT_MS,
      });
      setTimeout(goToDone, CALLBACK_TIMEOUT_MS);
    } catch {
      fail();
    }
  });
}
