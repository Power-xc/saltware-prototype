import { initAnalytics } from "./analytics.mjs?v=e34128c54e2f";
import { initNav } from "./nav.mjs?v=e34128c54e2f";
import { initReveal } from "./reveal.mjs?v=e34128c54e2f";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
} from "./disclosure.mjs?v=e34128c54e2f";
import { initContactForm } from "./contact-form.mjs?v=e34128c54e2f";
import { initAttribution } from "./attribution.mjs?v=e34128c54e2f";
import { initHeroObject } from "./hero-object.mjs?v=e34128c54e2f";
import { initNewsletter } from "./newsletter.mjs?v=e34128c54e2f";
import { initDroplets } from "./droplets.mjs?v=e34128c54e2f";
import { initRails } from "./rail.mjs?v=e34128c54e2f";
import { initFilters } from "./filters.mjs?v=e34128c54e2f";
import { initCounters } from "./counter.mjs?v=e34128c54e2f";

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
