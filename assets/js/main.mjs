import { initAnalytics } from "./analytics.mjs?v=b405b1df4ac9";
import { initNav } from "./nav.mjs?v=b405b1df4ac9";
import { initReveal } from "./reveal.mjs?v=b405b1df4ac9";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
} from "./disclosure.mjs?v=b405b1df4ac9";
import { initContactForm } from "./contact-form.mjs?v=b405b1df4ac9";
import { initAttribution } from "./attribution.mjs?v=b405b1df4ac9";
import { initHeroObject } from "./hero-object.mjs?v=b405b1df4ac9";
import { initNewsletter } from "./newsletter.mjs?v=b405b1df4ac9";
import { initDroplets } from "./droplets.mjs?v=b405b1df4ac9";
import { initRails } from "./rail.mjs?v=b405b1df4ac9";
import { initSlates } from "./slate.mjs?v=b405b1df4ac9";

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
  initSlates();
} catch (e) {
  console.warn("Slates failed:", e);
}
try {
  initRails();
} catch (e) {
  console.warn("Rails failed:", e);
}
