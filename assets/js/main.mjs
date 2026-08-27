import { initAnalytics } from "./analytics.mjs?v=fdb124ce1dc3";
import { initNav } from "./nav.mjs?v=fdb124ce1dc3";
import { initReveal } from "./reveal.mjs?v=fdb124ce1dc3";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=fdb124ce1dc3";
import { initContactForm } from "./contact-form.mjs?v=fdb124ce1dc3";
import { initSlider } from "./slider.mjs?v=fdb124ce1dc3";

try {
  initAnalytics();
} catch (e) {
  console.warn("Analytics failed:", e);
}
try {
  initNav();
} catch (e) {
  console.warn("Nav failed:", e);
}
try {
  initReveal();
} catch (e) {
  console.warn("Reveal failed:", e);
}
try {
  initFaq();
} catch (e) {
  console.warn("FAQ failed:", e);
}
try {
  initCaseFilter();
} catch (e) {
  console.warn("Case filter failed:", e);
}
try {
  initContactForm();
} catch (e) {
  console.warn("Contact form failed:", e);
}
try {
  initSlider();
} catch (e) {
  console.warn("Slider failed:", e);
}
