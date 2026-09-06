import { initAnalytics } from "./analytics.mjs?v=6bffb9c0793a";
import { initNav } from "./nav.mjs?v=6bffb9c0793a";
import { initReveal } from "./reveal.mjs?v=6bffb9c0793a";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
  initStackFold,
} from "./disclosure.mjs?v=6bffb9c0793a";
import { initContactForm } from "./contact-form.mjs?v=6bffb9c0793a";
import { initAttribution } from "./attribution.mjs?v=6bffb9c0793a";
import { initHeroObject } from "./hero-object.mjs?v=6bffb9c0793a";
import { initNewsletter } from "./newsletter.mjs?v=6bffb9c0793a";
import { initDroplets } from "./droplets.mjs?v=6bffb9c0793a";
import { initCases } from "./cases.mjs?v=6bffb9c0793a";

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
  initStackFold();
} catch (e) {
  console.warn("Stack fold failed:", e);
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
