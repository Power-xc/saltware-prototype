import { initAnalytics } from "./analytics.mjs?v=f252b473dada";
import { initNav } from "./nav.mjs?v=f252b473dada";
import { initReveal } from "./reveal.mjs?v=f252b473dada";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=f252b473dada";
import { initContactForm } from "./contact-form.mjs?v=f252b473dada";
import { initSlider } from "./slider.mjs?v=f252b473dada";
import { initDroplets } from "./droplets.mjs?v=f252b473dada";
import { initAssistant } from "./assistant.mjs?v=f252b473dada";

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
