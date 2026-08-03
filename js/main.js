/* ═══════════════════════════════════════════════════════════════
   JABIN ARTS · v2 engine
   Essentials run everywhere (no dependencies); motion only when
   GSAP is present and the user allows it. Every scrubbed tween is
   a fromTo with immediateRender:false — no captured-start bugs.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var page = document.body.getAttribute("data-page") || "";
  var lenis = null;

  /* ─────────────── THEME ─────────────── */
  var themeBtn = document.getElementById("themeBtn");
  function themeLabel() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (themeBtn) themeBtn.setAttribute("aria-label", dark ? "Switch to day theme" : "Switch to night theme");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ja-theme", next); } catch (e) {}
      themeLabel();
    });
    themeLabel();
  }

  /* ─────────────── PAGE TRANSITIONS ─────────────── */
  var arriving = false;
  try { arriving = sessionStorage.getItem("ja-arrive") === "1"; sessionStorage.removeItem("ja-arrive"); } catch (e) {}
  if (arriving && !reduced) {
    document.documentElement.classList.add("arriving");
    setTimeout(function () { document.documentElement.classList.remove("arriving"); }, 950);
  }

  function isCurrent(a) { return a.getAttribute("aria-current") === "page"; }

  document.querySelectorAll("a[data-nav]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (isCurrent(a)) { e.preventDefault(); closeMenu(); window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); return; }
      if (reduced) return; /* plain navigation */
      e.preventDefault();
      closeMenu();
      document.documentElement.classList.add("leaving");
      try { sessionStorage.setItem("ja-arrive", "1"); } catch (err) {}
      setTimeout(function () { window.location.href = a.href; }, 560);
    });
  });

  /* ─────────────── LOADER — the illuminated seal ───────────────
     Holds for MIN_MS so the seal choreography completes, lifts as
     soon as the page is ready after that, and never past MAX_MS.  */
  var loader = document.getElementById("loader");
  var loaderShown = false;
  if (loader) {
    var hideLoader = function () {
      loader.classList.add("is-done");
      document.documentElement.classList.remove("preloading");
      document.dispatchEvent(new CustomEvent("ja:loader-done"));
    };
    if (arriving || reduced) {
      loader.classList.add("is-done");
    } else {
      loaderShown = true;
      document.documentElement.classList.add("preloading");
      var MIN_MS = 2400, MAX_MS = 3200;
      var t0 = Date.now(), loaded = false, loaderDone = false;
      var pctEl = document.getElementById("loadPct");
      var pctTimer = setInterval(function () {
        var p = Math.min(1, (Date.now() - t0) / MIN_MS);
        var eased = 1 - Math.pow(1 - p, 3);
        if (pctEl) pctEl.textContent = String(Math.round(eased * 100));
        if (p >= 1) clearInterval(pctTimer);
      }, 40);
      var finish = function () {
        if (loaderDone) return;
        loaderDone = true;
        clearInterval(pctTimer);
        if (pctEl) pctEl.textContent = "100";
        hideLoader();
      };
      var maybe = function () {
        var elapsed = Date.now() - t0;
        if (elapsed >= MIN_MS && loaded) finish();
        else if (loaded) setTimeout(finish, MIN_MS - elapsed);
      };
      window.addEventListener("load", function () { loaded = true; maybe(); });
      setTimeout(function () { if (document.readyState === "complete") { loaded = true; } maybe(); }, MIN_MS);
      setTimeout(finish, MAX_MS); /* hard cap */
    }
  }

  /* ─────────────── MENU (focus-trapped) ─────────────── */
  var menuBtn = document.getElementById("menuBtn");
  var menuEl = document.getElementById("menu");
  var mainEl = document.getElementById("main");
  var lastFocus = null;

  function menuFocusables() {
    return menuEl ? Array.prototype.slice.call(menuEl.querySelectorAll("a[href]")) : [];
  }
  function openMenu() {
    document.body.classList.add("menu-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuEl.setAttribute("aria-hidden", "false");
    if (mainEl) mainEl.setAttribute("inert", "");
    lastFocus = document.activeElement;
    var f = menuFocusables();
    if (f.length) setTimeout(function () { f[0].focus(); }, 60);
    if (lenis) lenis.stop();
  }
  function closeMenu() {
    if (!document.body.classList.contains("menu-open")) return;
    document.body.classList.remove("menu-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    if (menuEl) menuEl.setAttribute("aria-hidden", "true");
    if (mainEl) mainEl.removeAttribute("inert");
    if (menuBtn && (lastFocus === null || menuEl.contains(lastFocus) || menuEl.contains(document.activeElement))) menuBtn.focus();
    if (lenis) lenis.start();
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
    if (e.key === "Tab" && document.body.classList.contains("menu-open")) {
      var f = menuFocusables().concat(menuBtn ? [menuBtn] : []);
      if (!f.length) return;
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && (i === 0 || i === -1)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ─────────────── VIDEO CONTROLS ─────────────── */
  var allVideos = Array.prototype.slice.call(document.querySelectorAll("video"));
  function pauseOthers(current) {
    allVideos.forEach(function (v) { if (v !== current && !v.paused) v.pause(); });
  }
  document.querySelectorAll(".vplay").forEach(function (btn) {
    var v = document.getElementById(btn.getAttribute("data-video"));
    if (!v) return;
    v.addEventListener("play", function () { btn.classList.add("is-playing"); btn.setAttribute("aria-label", "Pause video"); });
    v.addEventListener("pause", function () { btn.classList.remove("is-playing"); btn.setAttribute("aria-label", "Play video"); });
    btn.addEventListener("click", function () {
      if (v.paused) { pauseOthers(v); v.play(); } else { v.pause(); }
    });
  });
  /* ── video gallery: featured stage + promote-on-click thumbs ── */
  var CLIPS = [
    { src: "assets/video/process-1.mp4", poster: "assets/video/process-1-poster.jpg", cap: "wet ink & raised gold, up close" },
    { src: "assets/video/studio-feature.mp4", poster: "assets/video/studio-feature-poster.jpg", cap: "ayat al-kursi · gold on white" },
    { src: "assets/video/process-2.mp4", poster: "assets/video/process-2-poster.jpg", cap: "the 99 names" }
  ];
  var vMain = document.getElementById("vMain");
  var vgalMain = document.getElementById("vgalMain");
  var vgalSide = document.getElementById("vgalSide");
  var vCap = document.getElementById("vCap");
  var vCurrent = 0, vUserControls = false;

  function renderThumbs() {
    if (!vgalSide) return;
    var others = [0, 1, 2].filter(function (i) { return i !== vCurrent; });
    Array.prototype.forEach.call(vgalSide.querySelectorAll(".vthumb"), function (btn, k) {
      var i = others[k];
      btn.setAttribute("data-clip", String(i));
      btn.querySelector("img").src = CLIPS[i].poster;
      btn.querySelector("span").textContent = CLIPS[i].cap;
      btn.setAttribute("aria-label", "Show video: " + CLIPS[i].cap);
    });
  }
  function promote(i) {
    if (!vMain || i === vCurrent) return;
    vUserControls = true;
    vgalMain.classList.add("swap");
    setTimeout(function () {
      vMain.pause();
      vCurrent = i;
      vMain.src = CLIPS[i].src;
      vMain.poster = CLIPS[i].poster;
      vMain.muted = false;
      vMain.loop = false;
      if (vCap) vCap.textContent = CLIPS[i].cap;
      renderThumbs();
      vgalMain.classList.remove("swap");
      pauseOthers(vMain);
      var p = vMain.play();
      if (p && p.catch) p.catch(function () {});
    }, 280);
  }
  if (vgalSide) {
    renderThumbs();
    vgalSide.addEventListener("click", function (e) {
      var btn = e.target.closest(".vthumb");
      if (btn) promote(parseInt(btn.getAttribute("data-clip"), 10));
    });
  }
  /* gentle muted autoplay for the stage until the user takes over */
  if (vMain && !reduced && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && vMain.paused && !vUserControls) {
          vMain.muted = true;
          var p = vMain.play();
          if (p && p.catch) p.catch(function () {});
        } else if (!en.isIntersecting && !vMain.paused) {
          vMain.pause();
        }
      });
    }, { threshold: 0.45 }).observe(vMain);
  }

  /* ─────────────── MOTION (GSAP) ─────────────── */
  if (!window.gsap || !window.ScrollTrigger || reduced) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("has-motion");

  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
  }

  /* editorial headings: masked line reveals (SplitText is free as of GSAP 3.13) */
  if (window.SplitText) {
    gsap.registerPlugin(SplitText);
    gsap.utils.toArray(".display").forEach(function (h) {
      var host = h.closest("[data-rise]");
      if (host) {
        /* the heading now animates itself; hand the small bits back to the rise system */
        host.removeAttribute("data-rise");
        gsap.set(host, { opacity: 1, clearProps: "transform" });
        host.querySelectorAll(".eyebrow, .lead").forEach(function (el) {
          if (el !== h) el.setAttribute("data-rise", "");
        });
      }
      var split = new SplitText(h, { type: "lines", mask: "lines", linesClass: "sl" });
      gsap.fromTo(split.lines, { yPercent: 118 }, {
        yPercent: 0, duration: 1.15, ease: "power4.out", stagger: 0.09, immediateRender: true,
        scrollTrigger: { trigger: h, start: "top 86%", toggleActions: "play none none reverse" }
      });
    });
  }

  /* nav hide/show */
  var nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: 140, end: "max",
    onUpdate: function (self) {
      nav.classList.toggle("is-hidden",
        self.direction === 1 && self.scroll() > 320 && !document.body.classList.contains("menu-open"));
    }
  });

  /* generic rises */
  gsap.utils.toArray("[data-rise]").forEach(function (el) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.15, ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none reverse" }
    });
  });

  /* word splitter */
  function splitWords(root) {
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(" "));
            else { var s = document.createElement("span"); s.className = "w"; s.textContent = p; frag.appendChild(s); }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) walk(child);
      });
    }
    walk(root);
    return root.querySelectorAll(".w");
  }

  /* ═══════ HOME ═══════ */
  if (page === "home") {

    /* hero intro — waits for the seal to lift when the loader ran */
    var rows = gsap.utils.toArray(".hero__title .row > span");
    gsap.set(rows, { yPercent: 112 });
    var introTl = gsap.timeline({ defaults: { ease: "power4.out" }, paused: true })
      .fromTo("#heroVisual", { scale: 1.12 }, { scale: 1.04, duration: 2.6, ease: "power2.out" }, 0)
      .to(".hero__bismillah", { opacity: 1, duration: 1.1 }, 0.2)
      .to(rows, { yPercent: 0, duration: 1.3, stagger: 0.12 }, 0.3)
      .to(".hero__sub", { opacity: 1, y: 0, duration: 1, startAt: { y: 18 } }, 0.9)
      .to(".hero__cta", { opacity: 1, y: 0, duration: 1, startAt: { y: 18 } }, 1.05)
      .to(".hero__scroll", { opacity: 1, duration: 0.8 }, 1.5);
    if (loaderShown) {
      document.addEventListener("ja:loader-done", function () { introTl.play(); }, { once: true });
    } else {
      gsap.delayedCall(0.15, function () { introTl.play(); });
    }

    /* hero exit — content lifts, image drifts deeper */
    gsap.fromTo(".hero__content",
      { y: 0, opacity: 1 },
      { y: -70, opacity: 0, ease: "power1.in", immediateRender: false,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "75% top", scrub: 0.6 } });
    gsap.fromTo(".hero__visual", { yPercent: 0 },
      { yPercent: 10, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 } });
    gsap.fromTo(".hero__scroll", { opacity: 1 }, { opacity: 0, immediateRender: false,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "16% top", scrub: true } });

    /* intro words */
    var introText = document.getElementById("introText");
    if (introText) {
      var words = splitWords(introText);
      gsap.to(words, {
        opacity: 1, ease: "none", stagger: 0.55,
        scrollTrigger: { trigger: ".intro", start: "top 68%", end: "center 40%", scrub: 0.5 }
      });
    }

    /* journey — each caption gets its own scene; crossfades hide under arch wipes */
    var jcaps = gsap.utils.toArray(".journey__cap");
    var jscs = gsap.utils.toArray(".jsc");
    if (jcaps.length === 4 && jscs.length === 4) {
      var wipeX = function (m) { return function () { return window.innerWidth * 1.4 * m; }; };
      gsap.set(".jwipe", { x: wipeX(1) });
      gsap.set(jscs[0], { opacity: 1 });

      var jt = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".journey", start: "top top", end: "bottom bottom",
          scrub: 0.6, invalidateOnRefresh: true
        }
      });

      function wipe(at) {
        jt.fromTo(".jwipe", { x: wipeX(1) }, {
          x: wipeX(-1), duration: 1.2, ease: "power1.inOut", immediateRender: false
        }, at);
      }
      function capIn(i, at) {
        jt.fromTo(jcaps[i], { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, at);
      }
      function capOut(i, at) {
        jt.to(jcaps[i], { opacity: 0, y: -24, duration: 0.6 }, at);
      }
      /* scene swap centred while the arch covers the screen */
      function swap(from, to, at) {
        jt.to(jscs[from], { opacity: 0, duration: 0.5 }, at)
          .fromTo(jscs[to], { opacity: 0 }, { opacity: 1, duration: 0.5, immediateRender: false }, at);
      }
      /* slow painterly drift while a scene is on stage (reversible, scrubbed) */
      function drift(i, at, dur, fromScale, toScale, xFrom, xTo) {
        jt.fromTo(jscs[i].querySelectorAll("img"),
          { scale: fromScale, xPercent: xFrom, transformOrigin: "50% 60%" },
          { scale: toScale, xPercent: xTo, duration: dur, immediateRender: false }, at);
      }

      /* i — it begins at the mosque */
      drift(0, 0, 3.4, 1.12, 1.02, 1.5, -1.5);
      capIn(0, 0.2); capOut(0, 2.0);
      wipe(2.4); swap(0, 1, 2.95);
      /* ii — across the dunes */
      drift(1, 2.95, 3.9, 1.04, 1.14, -1.5, 1.5);
      capIn(1, 3.8); capOut(1, 5.6);
      wipe(6.0); swap(1, 2, 6.55);
      /* iii — past the oasis */
      drift(2, 6.55, 3.6, 1.12, 1.02, 1.5, -1.5);
      capIn(2, 7.4); capOut(2, 9.0);
      wipe(9.4); swap(2, 3, 9.95);
      /* iv — and home to your walls (the real painting, installed) */
      drift(3, 9.95, 2.1, 1.1, 1.0, 0, 0);
      capIn(3, 10.8);
      jt.to({}, { duration: 0.01 }, 12);
    }

    /* featured media drift */
    gsap.utils.toArray(".feat__media img").forEach(function (img) {
      gsap.fromTo(img, { y: 30 }, { y: -30, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1 } });
    });

    /* ═══ 3D anatomy ═══ */
    var p3d = document.getElementById("p3d");
    if (p3d) {
      var stage = ".exploded__stage";
      var caps = gsap.utils.toArray(".exploded__cap");
      var link = document.getElementById("explodedLink");

      var mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", function () {
        gsap.set(stage, { scale: 2.3, transformOrigin: "50% 46%" });
        gsap.set(p3d, { rotationY: 0, rotationX: 0 });
        gsap.set(".p3d__shadow", { opacity: 0.5 });

        var tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".exploded", start: "top top", end: "bottom bottom",
            scrub: 0.9, invalidateOnRefresh: true }
        });
        tl.to(stage, { scale: 1, duration: 1.6 }, 0)
          .to(p3d, { rotationY: -16, rotationX: 5, duration: 1.6 }, 1.6)
          .to(".p3d__frame",  { z: 200,  duration: 1.6 }, 1.6)
          .to(".p3d__glass",  { z: 130,  duration: 1.6 }, 1.6)
          .to(".p3d__back",   { z: -150, duration: 1.6 }, 1.6)
          .to(".p3d__shadow", { z: -280, opacity: 0.85, duration: 1.6 }, 1.6)
          .to(p3d, { rotationY: 14, duration: 1.4 }, 3.2)
          .to(".p3d__detail", { opacity: 1, duration: 0.7 }, 4.6)
          .fromTo(".p3d__detail img", { xPercent: -5 }, { xPercent: 5, duration: 2.0, immediateRender: false }, 4.6)
          .to(".p3d__detail", { opacity: 0, duration: 0.7 }, 6.6)
          .to(p3d, { rotationY: 0, rotationX: 0, duration: 1.4 }, 7.4)
          .to(".p3d__frame",  { z: 84,   duration: 1.4 }, 7.4)
          .to(".p3d__glass",  { z: 46,   duration: 1.4 }, 7.4)
          .to(".p3d__back",   { z: -60,  duration: 1.4 }, 7.4)
          .to(".p3d__shadow", { z: -140, opacity: 0.5, duration: 1.4 }, 7.4)
          .to(stage, { scale: 0.92, duration: 1.2 }, 8.8)
          .to({}, { duration: 0.01 }, 10);
        /* captions */
        tl.fromTo(caps[0], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, 0.25)
          .to(caps[0], { opacity: 0, y: -18, duration: 0.5 }, 1.3)
          .fromTo(caps[1], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, 2.1)
          .to(caps[1], { opacity: 0, y: -18, duration: 0.5 }, 4.0)
          .fromTo(caps[2], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, 8.9);
        if (link) {
          gsap.fromTo(link, { opacity: 0 }, { opacity: 1, immediateRender: false, ease: "none",
            scrollTrigger: { trigger: ".exploded", start: "88% bottom", end: "96% bottom", scrub: true,
              onUpdate: function (self) { link.classList.toggle("is-on", self.progress > 0.5); } } });
        }
        return function () {};
      });

      mm.add("(max-width: 899px)", function () {
        gsap.set(stage, { scale: 1.55, transformOrigin: "50% 44%" });
        var tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".exploded", start: "top top", end: "bottom bottom",
            scrub: 0.8, invalidateOnRefresh: true }
        });
        tl.to(stage, { scale: 0.96, duration: 2.2 }, 0)
          .to(".p3d__detail", { opacity: 1, duration: 0.5 }, 2.4)
          .fromTo(".p3d__detail img", { xPercent: -5 }, { xPercent: 5, duration: 1.4, immediateRender: false }, 2.4)
          .to(".p3d__detail", { opacity: 0, duration: 0.5 }, 3.6)
          .to({}, { duration: 0.01 }, 4.6);
        tl.fromTo(caps[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, 0.2)
          .to(caps[0], { opacity: 0, duration: 0.4 }, 1.6)
          .fromTo(caps[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, 2.0)
          .to(caps[1], { opacity: 0, duration: 0.4 }, 3.4)
          .fromTo(caps[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, 3.9);
        if (link) {
          gsap.fromTo(link, { opacity: 0 }, { opacity: 1, immediateRender: false, ease: "none",
            scrollTrigger: { trigger: ".exploded", start: "86% bottom", end: "95% bottom", scrub: true,
              onUpdate: function (self) { link.classList.toggle("is-on", self.progress > 0.5); } } });
        }
        return function () {};
      });
    }

    /* instagram grid — staggered reveal + pointer depth */
    var igGrid = document.getElementById("igGrid");
    if (igGrid) {
      var tiles = gsap.utils.toArray(".ig__tile", igGrid);
      gsap.fromTo(tiles,
        { opacity: 0, y: 26, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out",
          stagger: { each: 0.07, grid: [3, 3], from: "start" }, immediateRender: false,
          scrollTrigger: { trigger: igGrid, start: "top 82%", toggleActions: "play none none reverse" } });

      if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
        var setters = tiles.map(function (t) {
          return {
            x: gsap.quickTo(t, "x", { duration: 0.6, ease: "power3.out" }),
            y: gsap.quickTo(t, "y", { duration: 0.6, ease: "power3.out" }),
            d: parseFloat(t.getAttribute("data-depth") || "1")
          };
        });
        igGrid.addEventListener("pointermove", function (e) {
          var r = igGrid.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width - 0.5;
          var ny = (e.clientY - r.top) / r.height - 0.5;
          setters.forEach(function (s) { s.x(nx * 10 * s.d); s.y(ny * 8 * s.d); });
        });
        igGrid.addEventListener("pointerleave", function () {
          setters.forEach(function (s) { s.x(0); s.y(0); });
        });
      }
      var igVid = igGrid.querySelector("video");
      if (igVid && "IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { igVid.muted = true; var p = igVid.play(); if (p && p.catch) p.catch(function () {}); }
            else igVid.pause();
          });
        }, { threshold: 0.3 }).observe(igVid);
      }
    }
  }

  /* ═══════ SHOP — showcase rail ═══════ */
  if (page === "shop") {
    var rail = document.querySelector(".rail");
    if (rail) {
      var mmShop = gsap.matchMedia();
      mmShop.add("(min-width: 900px)", function () {
        var track = rail.querySelector(".rail__track");
        var pin = rail.querySelector(".rail__pin");
        var panels = gsap.utils.toArray(".rp", rail);
        var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };

        /* cache geometry once per refresh; per-frame work is pure math + quick setters */
        var geo = [];
        function measureRail() {
          geo = panels.map(function (p) {
            return {
              el: p,
              center: p.offsetLeft + p.offsetWidth / 2,
              ry: gsap.quickSetter(p, "rotationY", "deg"),
              z: gsap.quickSetter(p, "z", "px")
            };
          });
          gsap.set(panels, { transformPerspective: 1200 });
        }
        var lastBest = null;
        function setActive() {
          if (!geo.length) return;
          var trackX = gsap.getProperty(track, "x");
          var viewCenter = window.innerWidth / 2 - trackX;
          var best = null, bestD = Infinity;
          geo.forEach(function (g) {
            var d = g.center - viewCenter;
            if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = g.el; }
            var nx = Math.max(-1, Math.min(1, d / window.innerWidth));
            g.ry(nx * -13);
            g.z(-Math.abs(nx) * 140);
          });
          if (best !== lastBest) {
            if (lastBest) lastBest.classList.remove("is-active");
            best.classList.add("is-active");
            lastBest = best;
          }
        }
        measureRail();

        gsap.to(track, {
          x: function () { return -dist(); },
          ease: "none",
          scrollTrigger: {
            trigger: rail, start: "top top",
            end: function () { return "+=" + dist(); },
            pin: pin, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
            snap: {
              snapTo: function (v) {
                var n = panels.length;
                if (n < 2) return v;
                return Math.round(v * (n - 1)) / (n - 1);
              },
              duration: { min: 0.15, max: 0.5 }, ease: "power2.out", directional: true
            },
            onUpdate: setActive,
            onRefresh: function () { measureRail(); setActive(); }
          }
        });
        setActive();
        return function () {
          panels.forEach(function (p) { p.classList.remove("is-active"); });
        };
      });

      /* touch / small screens: native snap scroll, focus by scroll position */
      mmShop.add("(max-width: 899px)", function () {
        var track = rail.querySelector(".rail__track");
        var panels = gsap.utils.toArray(".rp", rail);
        var t = null;
        function setActive() {
          var center = track.getBoundingClientRect().left + track.clientWidth / 2;
          panels.forEach(function (p) {
            var r = p.getBoundingClientRect();
            p.classList.toggle("is-active", Math.abs(r.left + r.width / 2 - center) < r.width / 2);
          });
        }
        function onScroll() { clearTimeout(t); t = setTimeout(setActive, 80); }
        track.addEventListener("scroll", onScroll, { passive: true });
        setActive();
        return function () { track.removeEventListener("scroll", onScroll); };
      });
    }
  }

  /* shop cards: tilt + travelling spotlight (fine pointers) */
  if (page === "shop" && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.querySelectorAll(".piece").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--mx", ((nx + 0.5) * 100).toFixed(1) + "%");
        card.style.setProperty("--my", ((ny + 0.5) * 100).toFixed(1) + "%");
        gsap.to(card, { rotationY: nx * 7, rotationX: ny * -6, y: -6,
          transformPerspective: 900, duration: 0.5, ease: "power2.out" });
      });
      card.addEventListener("pointerleave", function () {
        gsap.to(card, { rotationY: 0, rotationX: 0, y: 0, duration: 0.7, ease: "power3.out" });
      });
    });
  }

  /* ═══════ COMMISSIONS ═══════ */
  if (page === "commissions") {
    var heroImg = document.getElementById("commHeroImg");
    if (heroImg) {
      gsap.set(heroImg, { scale: 1.06, transformOrigin: "50% 30%" });
      gsap.fromTo(heroImg, { yPercent: -3 }, { yPercent: 3, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: ".comm-hero", start: "top top", end: "bottom top", scrub: 0.8 } });
    }
  }

  /* ═══════ custom cursor + click ripple (fine pointers only) ═══════ */
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.documentElement.classList.add("has-cursor");
    var cur = document.createElement("div");
    cur.className = "cur";
    cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = '<span class="cur__ring"></span><span class="cur__dot"></span>';
    document.body.appendChild(cur);

    var dot = cur.querySelector(".cur__dot");
    var ring = cur.querySelector(".cur__ring");
    var dx = gsap.quickTo(dot,  "x", { duration: 0.12, ease: "power2.out" });
    var dy = gsap.quickTo(dot,  "y", { duration: 0.12, ease: "power2.out" });
    var rx = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    var ry = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });
    window.addEventListener("mousemove", function (e) {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    }, { passive: true });

    var LINK_SEL = "a, button, [role='button'], summary";
    var MEDIA_SEL = ".piece__media, .feat__media, .rp__media, video, .p3d, .path, .vplay";
    document.addEventListener("mouseover", function (e) {
      cur.classList.toggle("is-media", !!e.target.closest(MEDIA_SEL));
      cur.classList.toggle("is-link", !e.target.closest(MEDIA_SEL) && !!e.target.closest(LINK_SEL));
    }, { passive: true });
    document.addEventListener("mousedown", function () { cur.classList.add("is-down"); });
    document.addEventListener("mouseup", function () { cur.classList.remove("is-down"); });

    /* water-ripple on interactive clicks */
    document.addEventListener("click", function (e) {
      if (!e.target.closest(LINK_SEL) && !e.target.closest(MEDIA_SEL)) return;
      var r = document.createElement("span");
      r.className = "ripple";
      r.style.left = e.clientX + "px";
      r.style.top = e.clientY + "px";
      document.body.appendChild(r);
      setTimeout(function () { r.remove(); }, 1100);
    }, { passive: true });
  }

  /* layout is reserved via width/height attributes everywhere, so triggers only
     need re-measuring twice: once fonts settle, once everything has loaded.
     (Per-image refreshes caused visible mid-scroll snaps.) */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });

})();
