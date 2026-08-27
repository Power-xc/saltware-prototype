import { initAnalytics } from "./analytics.mjs?v=130df3bce0ea";
import { initNav } from "./nav.mjs?v=130df3bce0ea";
import { initReveal } from "./reveal.mjs?v=130df3bce0ea";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=130df3bce0ea";
import { initContactForm } from "./contact-form.mjs?v=130df3bce0ea";
import { initSlider } from "./slider.mjs?v=130df3bce0ea";

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
