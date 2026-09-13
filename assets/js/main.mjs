import { initAnalytics } from "./analytics.mjs?v=ae3d8af6ca1e";
import { initNav } from "./nav.mjs?v=ae3d8af6ca1e";
import { initReveal } from "./reveal.mjs?v=ae3d8af6ca1e";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
} from "./disclosure.mjs?v=ae3d8af6ca1e";
import { initContactForm } from "./contact-form.mjs?v=ae3d8af6ca1e";
import { initAttribution } from "./attribution.mjs?v=ae3d8af6ca1e";
import { initHeroObject } from "./hero-object.mjs?v=ae3d8af6ca1e";
import { initNewsletter } from "./newsletter.mjs?v=ae3d8af6ca1e";
import { initDroplets } from "./droplets.mjs?v=ae3d8af6ca1e";
import { initRails } from "./rail.mjs?v=ae3d8af6ca1e";
import { initFilters } from "./filters.mjs?v=ae3d8af6ca1e";
import { initCounters } from "./counter.mjs?v=ae3d8af6ca1e";
import { initPagers } from "./pager.mjs?v=ae3d8af6ca1e";

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
  initPagers();
} catch (e) {
  console.warn("Pager failed:", e);
}
try {
  initRails();
} catch (e) {
  console.warn("Rails failed:", e);
}
