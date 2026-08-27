import { initAnalytics } from "./analytics.mjs?v=6ca0d3d0a9f6";
import { initNav } from "./nav.mjs?v=6ca0d3d0a9f6";
import { initReveal } from "./reveal.mjs?v=6ca0d3d0a9f6";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=6ca0d3d0a9f6";
import { initContactForm } from "./contact-form.mjs?v=6ca0d3d0a9f6";
import { initSlider } from "./slider.mjs?v=6ca0d3d0a9f6";
import { initAssistant } from "./assistant.mjs?v=6ca0d3d0a9f6";

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
  initAssistant();
} catch (e) {
  console.warn("Assistant failed:", e);
}
