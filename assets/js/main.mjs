import { initAnalytics } from "./analytics.mjs?v=c66ef10fa538";
import { initNav } from "./nav.mjs?v=c66ef10fa538";
import { initReveal } from "./reveal.mjs?v=c66ef10fa538";
import { initFaq, initCaseFilter } from "./disclosure.mjs?v=c66ef10fa538";
import { initContactForm } from "./contact-form.mjs?v=c66ef10fa538";
import { initAttribution } from "./attribution.mjs?v=c66ef10fa538";
import { initHeroObject } from "./hero-object.mjs?v=c66ef10fa538";
import { initSlider } from "./slider.mjs?v=c66ef10fa538";
import { initDroplets } from "./droplets.mjs?v=c66ef10fa538";
import { initAssistant } from "./assistant.mjs?v=c66ef10fa538";

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
  initAssistant();
} catch (e) {
  console.warn("Assistant failed:", e);
}
