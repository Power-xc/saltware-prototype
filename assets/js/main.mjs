import { initAnalytics } from "./analytics.mjs?v=b02cb270a5ef";
import { initNav } from "./nav.mjs?v=b02cb270a5ef";
import { initReveal } from "./reveal.mjs?v=b02cb270a5ef";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=b02cb270a5ef";
import { initContactForm } from "./contact-form.mjs?v=b02cb270a5ef";
import { initSlider } from "./slider.mjs?v=b02cb270a5ef";
import { initDroplets } from "./droplets.mjs?v=b02cb270a5ef";
import { initAssistant } from "./assistant.mjs?v=b02cb270a5ef";

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
