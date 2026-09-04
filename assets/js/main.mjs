import { initAnalytics } from "./analytics.mjs?v=adca50b67fda";
import { initNav } from "./nav.mjs?v=adca50b67fda";
import { initReveal } from "./reveal.mjs?v=adca50b67fda";
import { initFaq, initCaseFilter, initFooterGroups } from "./disclosure.mjs?v=adca50b67fda";
import { initContactForm } from "./contact-form.mjs?v=adca50b67fda";
import { initAttribution } from "./attribution.mjs?v=adca50b67fda";
import { initHeroObject } from "./hero-object.mjs?v=adca50b67fda";
import { initNewsletter } from "./newsletter.mjs?v=adca50b67fda";
import { initDroplets } from "./droplets.mjs?v=adca50b67fda";
import { initCases } from "./cases.mjs?v=adca50b67fda";

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
