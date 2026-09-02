import { initAnalytics } from "./analytics.mjs?v=f949245d266e";
import { initNav } from "./nav.mjs?v=f949245d266e";
import { initReveal } from "./reveal.mjs?v=f949245d266e";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=f949245d266e";
import { initContactForm } from "./contact-form.mjs?v=f949245d266e";
import { initAttribution } from "./attribution.mjs?v=f949245d266e";
import { initHeroObject } from "./hero-object.mjs?v=f949245d266e";
import { initSlider } from "./slider.mjs?v=f949245d266e";
import { initDroplets } from "./droplets.mjs?v=f949245d266e";
import { initCases } from "./cases.mjs?v=f949245d266e";

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
  initAttribution();
} catch (e) {
  console.warn("Attribution failed:", e);
}
try {
  initHeroObject();
} catch (e) {
  console.warn("Hero object failed:", e);
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
} catch (e) {
  console.warn("Assistant failed:", e);
}
try {
  initCases();
} catch (e) {
  console.warn("Cases failed:", e);
}
