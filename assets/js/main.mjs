import { initAnalytics } from "./analytics.mjs?v=e1cc30bf106c";
import { initNav } from "./nav.mjs?v=e1cc30bf106c";
import { initReveal } from "./reveal.mjs?v=e1cc30bf106c";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=e1cc30bf106c";
import { initContactForm } from "./contact-form.mjs?v=e1cc30bf106c";
import { initAttribution } from "./attribution.mjs?v=e1cc30bf106c";
import { initHeroObject } from "./hero-object.mjs?v=e1cc30bf106c";
import { initSlider } from "./slider.mjs?v=e1cc30bf106c";
import { initDroplets } from "./droplets.mjs?v=e1cc30bf106c";
import { initCases } from "./cases.mjs?v=e1cc30bf106c";

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
