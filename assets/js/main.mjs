import { initAnalytics } from "./analytics.mjs?v=ba59475b3855";
import { initNav } from "./nav.mjs?v=ba59475b3855";
import { initReveal } from "./reveal.mjs?v=ba59475b3855";
import { initFaq, initCaseFilter, initFooterGroups } from "./disclosure.mjs?v=ba59475b3855";
import { initContactForm } from "./contact-form.mjs?v=ba59475b3855";
import { initAttribution } from "./attribution.mjs?v=ba59475b3855";
import { initHeroObject } from "./hero-object.mjs?v=ba59475b3855";
import { initNewsletter } from "./newsletter.mjs?v=ba59475b3855";
import { initDroplets } from "./droplets.mjs?v=ba59475b3855";
import { initCases } from "./cases.mjs?v=ba59475b3855";

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
  initFooterGroups();
} catch (e) {
  console.warn("Footer groups failed:", e);
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
  initNewsletter();
} catch (e) {
  console.warn("Newsletter failed:", e);
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
