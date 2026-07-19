/* ShedReset v3 — cinematic motion (GSAP ScrollTrigger) + first-party tracking + waitlist.
   No third-party pixels. No fingerprinting. No cross-site cookies.
   Respects prefers-reduced-motion. Same backend endpoints as v2 (/api/signup, /api/event). */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var API = "https://shedreset.pplx.app/port/8000";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var pageStart = Date.now();
  var maxScroll = 0;
  var scrollFired = { 25: false, 50: false, 75: false, 100: false };
  var referrer = document.referrer || "direct";

  function timeOnPage() { return Math.round((Date.now() - pageStart) / 100) / 10; }

  function send(type, value, keepalive) {
    try {
      fetch(API + "/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: type, value: value == null ? null : String(value), referrer: referrer }),
        keepalive: !!keepalive
      }).catch(function () {});
    } catch (e) {}
  }

  // ---------- Tracking ----------
  send("pageview", window.innerWidth + "x" + window.innerHeight);

  function onScroll() {
    var doc = document.documentElement;
    var scrolled = window.scrollY + window.innerHeight;
    var total = doc.scrollHeight;
    var pct = total <= window.innerHeight ? 100 : Math.min(100, Math.round((scrolled / total) * 100));
    if (pct > maxScroll) maxScroll = pct;
    [25, 50, 75, 100].forEach(function (mark) {
      if (pct >= mark && !scrollFired[mark]) { scrollFired[mark] = true; send("scroll", mark); }
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  function onLeave() { send("timeonpage", JSON.stringify({ t: timeOnPage(), scroll: maxScroll }), true); }
  window.addEventListener("pagehide", onLeave);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") onLeave();
  });

  // ---------- Nav stuck ----------
  var nav = document.querySelector(".nav");
  function navState() { if (nav) nav.classList.toggle("is-stuck", window.scrollY > 40); }
  window.addEventListener("scroll", navState, { passive: true });
  navState();

  // ---------- Motion ----------
  function showAll() {
    document.querySelectorAll("[data-reveal],[data-hero],[data-m]").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none";
    });
    // waitlist should still land on dark ground even without motion
    var wl = document.querySelector(".waitlist-section");
    if (wl) wl.classList.add("is-dark");
  }

  function initMotion() {
    if (reduce || !window.gsap || !window.ScrollTrigger) { showAll(); return; }
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    // set initial hidden states
    gsap.set("[data-hero]", { opacity: 0, y: 40 });
    gsap.set("[data-reveal]", { opacity: 0, y: 32 });
    gsap.set(".m-line", { opacity: 0, y: 26 });

    // --- HERO cascade: title lines 0.15s stagger, accent word slower + scale ---
    var heroLines = document.querySelectorAll(".hero__title [data-hero]");
    var tl = gsap.timeline({ delay: 0.25 });
    tl.to(heroLines[0], { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
      .to(heroLines[1], { opacity: 1, y: 0, scale: 1, duration: 1.35, ease: "power2.out",
            startAt: { scale: 1.12 } }, "-=0.75")   // "after" italic accent — slower, scale settle
      .to(heroLines[2], { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=1.0")
      .to(".hero__caption[data-hero]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.5")
      .to(".hero__cta[data-hero]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.6");

    // hero image slow drift
    gsap.to(".hero__media img", {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    // --- Generic section reveals (non-hero, non-manifesto) ---
    document.querySelectorAll("section:not(.hero):not(.manifesto), footer").forEach(function (sec) {
      var items = sec.querySelectorAll("[data-reveal]");
      if (!items.length) return;
      gsap.to(items, {
        opacity: 1, y: 0, duration: 1.0, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sec, start: "top 80%" }
      });
    });

    // --- MANIFESTO: pinned cinematic hold, lines reveal sequentially ---
    var mLines = gsap.utils.toArray(".m-line");
    var mtl = gsap.timeline({
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top top",
        end: "+=200%",     // long scroll distance = held pin
        pin: ".manifesto__pin",
        scrub: 0.8
      }
    });
    mtl.to(".manifesto__index", { opacity: 1, y: 0, duration: 0.4 });
    mLines.forEach(function (line) {
      mtl.to(line, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
         .to({}, { duration: 0.55 }); // HOLD each line before advancing
    });

    // --- Parallax (retriever slower than surroundings) ---
    document.querySelectorAll("[data-parallax]").forEach(function (img) {
      var speed = parseFloat(img.getAttribute("data-speed")) || 0.2;
      gsap.fromTo(img, { yPercent: -speed * 50 }, {
        yPercent: speed * 50, ease: "none",
        scrollTrigger: { trigger: img.closest("section, footer"), start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // --- WAITLIST color transition: cream -> deep forest shadow on entry ---
    var waitlist = document.querySelector(".waitlist-section");
    if (waitlist) {
      ScrollTrigger.create({
        trigger: waitlist,
        start: "top 62%",
        onEnter: function () { waitlist.classList.add("is-dark"); },
        onLeaveBack: function () { waitlist.classList.remove("is-dark"); }
      });
    }

    ScrollTrigger.refresh();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initMotion, 0);
  } else {
    window.addEventListener("DOMContentLoaded", initMotion);
  }
  window.addEventListener("load", function () { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });

  // ---------- "Add mobile" toggle ----------
  var addMobileBtn = document.getElementById("add-mobile");
  var mobileField = document.getElementById("mobile-field");
  if (addMobileBtn && mobileField) {
    addMobileBtn.addEventListener("click", function () {
      mobileField.hidden = false;
      addMobileBtn.setAttribute("aria-expanded", "true");
      addMobileBtn.parentNode.style.display = "none";
      var mi = mobileField.querySelector("input");
      if (mi) mi.focus();
    });
  }

  // ---------- Waitlist form ----------
  function bindForm(form) {
    var source = form.getAttribute("data-source") || "waitlist";
    var emailEl = form.querySelector('input[type=email]');
    var mobileEl = form.querySelector('input[type=tel]');
    var consentEl = form.querySelector('input[type=checkbox]');
    var msgEl = form.querySelector(".form-msg");
    var btn = form.querySelector("button[type=submit]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msgEl.textContent = ""; msgEl.className = "form-msg";

      var email = (emailEl.value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        msgEl.textContent = "Please enter a valid email address.";
        msgEl.className = "form-msg err"; emailEl.focus(); return;
      }

      var payload = {
        email: email,
        mobile: mobileEl ? (mobileEl.value || "").trim() : null,
        consent: consentEl ? consentEl.checked : false,
        source: source,
        referrer: referrer,
        time_on_page: timeOnPage(),
        max_scroll: maxScroll
      };

      btn.disabled = true;
      var oldLabel = btn.textContent;
      btn.textContent = "Adding…";

      fetch(API + "/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
        .then(function () {
          send("signup", source);
          var wrap = form.closest(".waitlist");
          wrap.innerHTML =
            '<div class="form-success" role="status">' +
            '<p class="fs-title">You\u2019re on the list.</p>' +
            "<p>We\u2019ll write once \u2014 when ShedReset launches. Nothing before then.</p>" +
            "</div>";
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = oldLabel;
          msgEl.textContent = "Something went wrong. Please try again.";
          msgEl.className = "form-msg err";
        });
    });
  }
  document.querySelectorAll("form.wform").forEach(bindForm);
})();
