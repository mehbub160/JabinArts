/* ═══════════════════════════════════════════════════════════════
   JABIN ARTS · the world — an illustrated UAE panorama
   Five depth layers, scroll-driven camera, day/night via CSS vars.
   Self-contained: needs no GSAP; respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var host = document.getElementById("world");
  if (!host) return;

  /* deterministic star positions (x%, y%) */
  var STARS = [[4,18],[9,42],[14,8],[19,55],[24,26],[31,12],[36,48],[41,20],[47,60],[52,6],
               [57,34],[62,52],[67,16],[72,40],[78,10],[83,58],[88,28],[93,44],[97,14],[45,80]];

  function stars() {
    return STARS.map(function (s) {
      return '<i style="left:' + s[0] + '%;top:' + s[1] + '%"></i>';
    }).join("");
  }

  /* painted panorama chapters (day + night pairs, generated for this project) */
  function chapter(base, flip) {
    return '<div class="wp-ch' + (flip ? " wp-ch--flip" : "") + '">' +
      '<img src="assets/world/' + base + '.jpg" alt="" loading="eager" decoding="async">' +
      '<img class="n" src="assets/world/' + base + '-night.jpg" alt="" loading="lazy" decoding="async">' +
    "</div>";
  }
  var PAINT = '<div class="wp-strip">' +
    chapter("uae-horizon") + chapter("uae-courtyard") + chapter("uae-horizon", true) +
  "</div>";

  /* a real crescent: mask-built, no occluding disc; soft halo behind the lit limb */
  var MOON =
    '<svg class="moon" viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="jaMglow" cx=".40" cy=".52" r=".5">' +
          '<stop offset="0" stop-color="#f2e7c2" stop-opacity=".42"/>' +
          '<stop offset=".55" stop-color="#e8d9a2" stop-opacity=".13"/>' +
          '<stop offset="1" stop-color="#e8d9a2" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<mask id="jaMcres">' +
          '<circle cx="52" cy="62" r="27" fill="#fff"/>' +
          '<circle cx="65" cy="53" r="25.5" fill="#000"/>' +
        '</mask>' +
      '</defs>' +
      '<circle cx="48" cy="62" r="56" fill="url(#jaMglow)"/>' +
      '<circle cx="52" cy="62" r="27" fill="#f4ead0" mask="url(#jaMcres)"/>' +
    '</svg>';

  /* birds — small painterly swifts, day skies only */
  function bird(x, y, s, dl) {
    return '<svg class="bird" style="left:' + x + '%;top:' + y + '%;width:' + s + 'px;animation-delay:' + dl + 's" viewBox="0 0 34 14" aria-hidden="true">' +
      '<path d="M1 9 C7 3 12 3 17 8 C22 3 27 3 33 9" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>';
  }
  var BIRDS =
    '<div class="flock flock--a" aria-hidden="true">' +
      bird(0, 0, 26, 0) + bird(9, 34, 20, .22) + bird(17, 10, 23, .1) +
      bird(26, 42, 17, .34) + bird(34, 22, 20, .05) +
    "</div>" +
    '<div class="flock flock--b" aria-hidden="true">' +
      bird(0, 20, 18, .15) + bird(11, 0, 22, 0) + bird(21, 30, 16, .28) +
    "</div>";

  host.innerHTML =
    '<div class="wl wl--sky">' +
      '<div class="stars" aria-hidden="true">' + stars() + "</div>" +
      '<div class="sun" aria-hidden="true"></div>' + MOON + BIRDS +
      "</div>" +
    '<div class="wl wl--paint">' + PAINT + "</div>";

  /* ── camera — deeper layers travel less, foreground travels more ── */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var layers = [
    { el: host.querySelector(".wl--paint"), f: 1.0 }
  ];
  var bias = 0;

  /* cross-page continuity: pick up roughly where the last page left the camera */
  try {
    var saved = parseFloat(sessionStorage.getItem("ja-world") || "0");
    if (saved > 0.02) bias = Math.min(saved, 0.9);
    window.addEventListener("pagehide", function () {
      sessionStorage.setItem("ja-world", String(lastP));
    });
  } catch (e) { /* storage unavailable — fine */ }

  var lastP = 0, ticking = false, biasStart = null, override = null;

  /* camera API — lets page scripts lock the world to story landmarks */
  window.__jaWorld = {
    set: function (p) { override = Math.min(1, Math.max(0, p)); queue(); },
    release: function () {
      if (override !== null) {
        bias = override - progress();
        biasStart = null;
        override = null;
      }
      queue();
    }
  };

  function measure(l) {
    l.w = l.el.firstElementChild.getBoundingClientRect().width;
  }
  function measureAll() { layers.forEach(measure); }

  function apply(p) {
    var vw = window.innerWidth;
    layers.forEach(function (l) {
      if (!l.w) return;
      var range = Math.max(0, l.w - vw);
      var x = -Math.min(range, p * range * (l.f || 1));
      l.el.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
    });
  }

  function progress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }

  function frame(ts) {
    ticking = false;
    if (override !== null) {
      lastP = override;
      apply(override);
      return;
    }
    var p = progress();
    /* ease the cross-page bias away over ~1.4s */
    if (Math.abs(bias) > 0.001) {
      if (biasStart === null) biasStart = ts || performance.now();
      var t = Math.min(1, ((ts || performance.now()) - biasStart) / 1400);
      var eased = 1 - Math.pow(1 - t, 3);
      var b = bias * (1 - eased);
      p = Math.min(1, Math.max(0, p + b));
      if (t < 1) queue();
      else bias = 0;
    }
    lastP = p;
    apply(p);
  }
  function queue() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  measureAll();
  if (reduced) {
    /* static, mid-journey composition; no scroll coupling */
    apply(0.3);
    
  } else {
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", function () { measureAll(); queue(); }, { passive: true });
    queue();
  }

})();
