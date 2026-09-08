import { initAnalytics } from "./analytics.mjs?v=f72b12ade8df";
import { initNav } from "./nav.mjs?v=f72b12ade8df";
import { initReveal } from "./reveal.mjs?v=f72b12ade8df";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
} from "./disclosure.mjs?v=f72b12ade8df";
import { initContactForm } from "./contact-form.mjs?v=f72b12ade8df";
import { initAttribution } from "./attribution.mjs?v=f72b12ade8df";
import { initHeroObject } from "./hero-object.mjs?v=f72b12ade8df";
import { initNewsletter } from "./newsletter.mjs?v=f72b12ade8df";
import { initDroplets } from "./droplets.mjs?v=f72b12ade8df";
import { initRails } from "./rail.mjs?v=f72b12ade8df";
import { initFilters } from "./filters.mjs?v=f72b12ade8df";
import { initCounters } from "./counter.mjs?v=f72b12ade8df";

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
