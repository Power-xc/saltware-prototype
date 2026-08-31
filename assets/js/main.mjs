import { initAnalytics } from "./analytics.mjs?v=cb8bcaeaab96";
import { initNav } from "./nav.mjs?v=cb8bcaeaab96";
import { initReveal } from "./reveal.mjs?v=cb8bcaeaab96";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=cb8bcaeaab96";
import { initContactForm } from "./contact-form.mjs?v=cb8bcaeaab96";
import { initSlider } from "./slider.mjs?v=cb8bcaeaab96";
import { initDroplets } from "./droplets.mjs?v=cb8bcaeaab96";
import { initAssistant } from "./assistant.mjs?v=cb8bcaeaab96";

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
try {
  initDroplets();
} catch (e) {
  console.warn("Droplets failed:", e);
}
try {
  initAssistant();
} catch (e) {
  console.warn("Assistant failed:", e);
}
