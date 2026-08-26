import { initAnalytics } from "./analytics.mjs";
import { initNav } from "./nav.mjs";
import { initReveal } from "./reveal.mjs";
import { initFaq, initCaseFilter } from "./disclosure.mjs";
import { initContactForm } from "./contact-form.mjs";
import { initSlider } from "./slider.mjs";

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
