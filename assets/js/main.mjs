import { initAnalytics } from "./analytics.mjs?v=92edc73466a7";
import { initNav } from "./nav.mjs?v=92edc73466a7";
import { initReveal } from "./reveal.mjs?v=92edc73466a7";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
} from "./disclosure.mjs?v=92edc73466a7";
import { initContactForm } from "./contact-form.mjs?v=92edc73466a7";
import { initAttribution } from "./attribution.mjs?v=92edc73466a7";
import { initHeroObject } from "./hero-object.mjs?v=92edc73466a7";
import { initNewsletter } from "./newsletter.mjs?v=92edc73466a7";
import { initDroplets } from "./droplets.mjs?v=92edc73466a7";
import { initRails } from "./rail.mjs?v=92edc73466a7";
import { initFilters } from "./filters.mjs?v=92edc73466a7";
import { initCounters } from "./counter.mjs?v=92edc73466a7";

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
  initFilters();
} catch (e) {
  console.warn("Filters failed:", e);
}
try {
  initCounters();
} catch (e) {
  console.warn("Counters failed:", e);
}
try {
  initRails();
} catch (e) {
  console.warn("Rails failed:", e);
}
