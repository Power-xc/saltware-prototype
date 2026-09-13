import { initAnalytics } from "./analytics.mjs?v=da94ff262031";
import { initNav } from "./nav.mjs?v=da94ff262031";
import { initReveal } from "./reveal.mjs?v=da94ff262031";
import {
  initFaq,
  initCaseFilter,
  initFooterGroups,
} from "./disclosure.mjs?v=da94ff262031";
import { initContactForm } from "./contact-form.mjs?v=da94ff262031";
import { initAttribution } from "./attribution.mjs?v=da94ff262031";
import { initHeroObject } from "./hero-object.mjs?v=da94ff262031";
import { initNewsletter } from "./newsletter.mjs?v=da94ff262031";
import { initDroplets } from "./droplets.mjs?v=da94ff262031";
import { initRails } from "./rail.mjs?v=da94ff262031";
import { initFilters } from "./filters.mjs?v=da94ff262031";
import { initCounters } from "./counter.mjs?v=da94ff262031";
import { initPagers } from "./pager.mjs?v=da94ff262031";
import { initParallax } from "./parallax.mjs?v=da94ff262031";
import { initYearStage } from "./year-stage.mjs?v=da94ff262031";
import { initStage } from "./stage.mjs?v=da94ff262031";
import { initAmbientVideo } from "./ambient-video.mjs?v=da94ff262031";

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
  initYearStage();
} catch (e) {
  console.warn("Year stage failed:", e);
}
try {
  initRails();
} catch (e) {
  console.warn("Rails failed:", e);
}
try {
  initParallax();
} catch (e) {
  console.warn("Parallax failed:", e);
}
try {
  initStage();
} catch (e) {
  console.warn("Stage failed:", e);
}
try {
  initAmbientVideo();
} catch (e) {
  console.warn("Ambient video failed:", e);
}
