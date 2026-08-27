import { initAnalytics } from "./analytics.mjs?v=51f97ce9cbec";
import { initNav } from "./nav.mjs?v=51f97ce9cbec";
import { initReveal } from "./reveal.mjs?v=51f97ce9cbec";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=51f97ce9cbec";
import { initContactForm } from "./contact-form.mjs?v=51f97ce9cbec";
import { initSlider } from "./slider.mjs?v=51f97ce9cbec";

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
