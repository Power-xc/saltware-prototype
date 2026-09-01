import { initAnalytics } from "./analytics.mjs?v=fd09e5f62542";
import { initNav } from "./nav.mjs?v=fd09e5f62542";
import { initReveal } from "./reveal.mjs?v=fd09e5f62542";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=fd09e5f62542";
import { initContactForm } from "./contact-form.mjs?v=fd09e5f62542";
import { initAttribution } from "./attribution.mjs?v=fd09e5f62542";
import { initHeroObject } from "./hero-object.mjs?v=fd09e5f62542";
import { initSlider } from "./slider.mjs?v=fd09e5f62542";
import { initDroplets } from "./droplets.mjs?v=fd09e5f62542";
import { initCases } from "./cases.mjs?v=fd09e5f62542";

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
