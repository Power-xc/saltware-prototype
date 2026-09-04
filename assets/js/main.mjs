import { initAnalytics } from "./analytics.mjs?v=6aaa70ca0795";
import { initNav } from "./nav.mjs?v=6aaa70ca0795";
import { initReveal } from "./reveal.mjs?v=6aaa70ca0795";
import { initFaq, initCaseFilter, initFooterGroups } from "./disclosure.mjs?v=6aaa70ca0795";
import { initContactForm } from "./contact-form.mjs?v=6aaa70ca0795";
import { initAttribution } from "./attribution.mjs?v=6aaa70ca0795";
import { initHeroObject } from "./hero-object.mjs?v=6aaa70ca0795";
import { initNewsletter } from "./newsletter.mjs?v=6aaa70ca0795";
import { initDroplets } from "./droplets.mjs?v=6aaa70ca0795";
import { initCases } from "./cases.mjs?v=6aaa70ca0795";

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
