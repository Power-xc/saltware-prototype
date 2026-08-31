import { initAnalytics } from "./analytics.mjs?v=4680d7c1545c";
import { initNav } from "./nav.mjs?v=4680d7c1545c";
import { initReveal } from "./reveal.mjs?v=4680d7c1545c";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=4680d7c1545c";
import { initContactForm } from "./contact-form.mjs?v=4680d7c1545c";
import { initSlider } from "./slider.mjs?v=4680d7c1545c";
import { initDroplets } from "./droplets.mjs?v=4680d7c1545c";
import { initAssistant } from "./assistant.mjs?v=4680d7c1545c";

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
