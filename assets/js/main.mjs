import { initAnalytics } from "./analytics.mjs?v=e7fd279f5d1a";
import { initNav } from "./nav.mjs?v=e7fd279f5d1a";
import { initReveal } from "./reveal.mjs?v=e7fd279f5d1a";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=e7fd279f5d1a";
import { initContactForm } from "./contact-form.mjs?v=e7fd279f5d1a";
import { initSlider } from "./slider.mjs?v=e7fd279f5d1a";
import { initDroplets } from "./droplets.mjs?v=e7fd279f5d1a";
import { initAssistant } from "./assistant.mjs?v=e7fd279f5d1a";

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
