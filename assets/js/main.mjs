import { initAnalytics } from "./analytics.mjs?v=e34b6f0aab85";
import { initNav } from "./nav.mjs?v=e34b6f0aab85";
import { initReveal } from "./reveal.mjs?v=e34b6f0aab85";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=e34b6f0aab85";
import { initContactForm } from "./contact-form.mjs?v=e34b6f0aab85";
import { initSlider } from "./slider.mjs?v=e34b6f0aab85";

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
