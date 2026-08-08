/* ═══════════════════════════════════════════════════════════════
   JABIN ARTS · cart — no framework, no payment processor.
   Checkout composes an order enquiry (email / Instagram DM); the
   studio confirms availability, shipping and payment personally.
   Originals are one of one → quantity is locked at 1 per piece.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  if (!window.JA_PRODUCTS) return;

  var KEY = "ja-cart";
  var products = {};
  window.JA_PRODUCTS.forEach(function (p) { products[p.id] = p; });

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter(function (id) { return products[id]; }); }
    catch (e) { return []; }
  }
  function save(ids) {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) {}
  }
  var items = load();

  /* ── nav button ── */
  var nav = document.getElementById("nav");
  var themeBtn = document.getElementById("themeBtn");
  var cartBtn = document.createElement("button");
  cartBtn.className = "cart-btn";
  cartBtn.setAttribute("aria-label", "Open cart");
  cartBtn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5.5 8.5h13l-1.2 11a1.8 1.8 0 0 1-1.8 1.6H8.5a1.8 1.8 0 0 1-1.8-1.6z"/><path d="M8.6 8.2V7a3.4 3.4 0 0 1 6.8 0v1.2"/></svg>' +
    '<span class="cart-count" aria-hidden="true"></span>';
  if (nav && themeBtn) nav.insertBefore(cartBtn, themeBtn);

  /* ── drawer ── */
  var drawer = document.createElement("aside");
  drawer.className = "cartd";
  drawer.id = "cartd";
  drawer.setAttribute("aria-label", "Cart");
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML =
    '<div class="cartd__bg" data-cart-close></div>' +
    '<div class="cartd__panel" role="dialog" aria-modal="true" aria-labelledby="cartdTitle">' +
      '<header class="cartd__head">' +
        '<h2 id="cartdTitle">Your selection</h2>' +
        '<button class="cartd__x" data-cart-close aria-label="Close cart">✕</button>' +
      "</header>" +
      '<p class="cartd__note">Every painting is an original — one of one, so quantities are fixed.</p>' +
      '<ul class="cartd__list"></ul>' +
      '<div class="cartd__empty">Your selection is empty.<br><a href="shop.html" data-nav>Browse the paintings →</a></div>' +
      '<footer class="cartd__foot">' +
        '<div class="cartd__total"><span>Subtotal</span><b class="cartd__sum"></b></div>' +
        '<p class="cartd__small">Prices confirmed with your order, along with shipping.</p>' +
        '<button class="btn btn--solid cartd__send" type="button">Checkout</button>' +
        '<a class="btn btn--line" href="https://ig.me/m/jabin_arts__" target="_blank" rel="noopener">Order via Instagram DM</a>' +
      "</footer>" +
    "</div>";
  document.body.appendChild(drawer);

  var listEl = drawer.querySelector(".cartd__list");
  var emptyEl = drawer.querySelector(".cartd__empty");
  var footEl = drawer.querySelector(".cartd__foot");
  var sumEl = drawer.querySelector(".cartd__sum");
  var sendEl = drawer.querySelector(".cartd__send");
  var countEl = cartBtn.querySelector(".cart-count");
  var lastFocus = null;

  function sale(p) { return window.JA_SALE ? window.JA_SALE(p.price) : p.price; }
  function subtotal() {
    return items.reduce(function (s, id) { return s + (products[id] ? sale(products[id]) : 0); }, 0);
  }
  function mrpTotal() {
    return items.reduce(function (s, id) { return s + (products[id] ? products[id].price : 0); }, 0);
  }

  /* ═════════ CHECKOUT ═════════ */
  var FORM_KEY = "ja-checkout";
  var chk = null, coupon = null;

  function discountFor(sub) {
    if (!coupon) return 0;
    var d = coupon.type === "percent" ? Math.round(sub * coupon.value / 100) : coupon.value;
    return Math.min(d, sub);
  }

  function buildCheckout() {
    if (chk) return;
    chk = document.createElement("div");
    chk.className = "chk";
    chk.setAttribute("aria-hidden", "true");
    chk.innerHTML =
      '<div class="chk__bg" data-chk-close></div>' +
      '<div class="chk__panel" role="dialog" aria-modal="true" aria-labelledby="chkTitle">' +
        '<button class="chk__x" data-chk-close aria-label="Close checkout">✕</button>' +
        '<div class="chk__form">' +
          '<p class="eyebrow">Checkout</p>' +
          '<h2 id="chkTitle" class="chk__title">Where should the <i>paintings travel?</i></h2>' +
          '<form id="chkForm" novalidate>' +
            '<label class="fld"><input name="name" type="text" required autocomplete="name" placeholder=" "><span>Full name</span></label>' +
            '<label class="fld"><input name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder=" "><span>Phone number</span></label>' +
            '<label class="fld"><input name="address" type="text" required autocomplete="street-address" placeholder=" "><span>Address</span></label>' +
            '<div class="fld-row">' +
              '<label class="fld"><input name="city" type="text" required autocomplete="address-level2" placeholder=" "><span>City</span></label>' +
              '<label class="fld"><input name="pincode" type="text" required inputmode="numeric" autocomplete="postal-code" placeholder=" "><span>Pincode</span></label>' +
            "</div>" +
            '<label class="fld fld--select"><span class="fld__tag">Payment</span>' +
              '<select name="payment">' +
                '<option value="COD">Cash on Delivery</option>' +
                '<option value="UPI / bank transfer">UPI / bank transfer (details on WhatsApp)</option>' +
              "</select></label>" +
          "</form>" +
          '<p class="chk__note">Nothing is charged online — your order opens in WhatsApp and the studio confirms availability, shipping and payment personally.</p>' +
        "</div>" +
        '<aside class="chk__side">' +
          '<h3>Your order</h3>' +
          '<ul class="chk__items"></ul>' +
          '<div class="chk__coupon"><input type="text" id="chkCoupon" placeholder="Coupon code — try WELCOME10" aria-label="Coupon code"><button type="button" class="chk__apply">Apply</button></div>' +
          '<p class="chk__cmsg" aria-live="polite"></p>' +
          '<dl class="chk__sums">' +
            '<div><dt>Subtotal</dt><dd class="chk__sub"></dd></div>' +
            '<div><dt>Discount</dt><dd class="chk__disc">— </dd></div>' +
            '<div><dt>Shipping</dt><dd>confirmed on WhatsApp</dd></div>' +
            '<div class="chk__final"><dt>Final payable</dt><dd class="chk__pay"></dd></div>' +
          "</dl>" +
          '<button class="btn btn--wa chk__place" type="button">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7a11 11 0 0 0 4.2 3.7c1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z"/></svg>' +
            "Place order on WhatsApp</button>" +
          '<p class="chk__alt">prefer email? <a class="chk__mail" href="#">send the same order to jabinakhterb@gmail.com</a></p>' +
        "</aside>" +
      "</div>";
    document.body.appendChild(chk);

    /* restore saved details */
    try {
      var saved = JSON.parse(localStorage.getItem(FORM_KEY) || "{}");
      Object.keys(saved).forEach(function (k) {
        var f = chk.querySelector('[name="' + k + '"]');
        if (f) f.value = saved[k];
      });
    } catch (e) {}

    chk.addEventListener("click", function (e) {
      if (e.target.closest("[data-chk-close]")) closeCheckout();
    });
    chk.querySelector(".chk__apply").addEventListener("click", applyCoupon);
    chk.querySelector("#chkCoupon").addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); applyCoupon(); }
    });
    chk.querySelector(".chk__place").addEventListener("click", placeOrder);
    chk.querySelector(".chk__mail").addEventListener("click", function (e) {
      e.preventDefault();
      var o = readForm(false);
      window.location.href = "mailto:jabinakhterb@gmail.com?subject=" +
        encodeURIComponent("New order — Jabin Arts") + "&body=" + encodeURIComponent(orderText(o, false));
    });
    chk.querySelector("#chkForm").addEventListener("input", function () {
      var o = readForm(false);
      try { localStorage.setItem(FORM_KEY, JSON.stringify(o)); } catch (e) {}
    });
  }

  function applyCoupon() {
    var inp = chk.querySelector("#chkCoupon");
    var msg = chk.querySelector(".chk__cmsg");
    var code = (inp.value || "").trim().toUpperCase();
    var table = window.JA_COUPONS || {};
    if (!code) { coupon = null; msg.textContent = ""; renderCheckout(); return; }
    if (table[code]) {
      coupon = table[code]; coupon.code = code;
      msg.textContent = "✓ " + (coupon.label || code + " applied");
      msg.className = "chk__cmsg is-ok";
    } else {
      coupon = null;
      msg.textContent = "That code isn’t valid right now.";
      msg.className = "chk__cmsg is-err";
      inp.classList.remove("shake"); void inp.offsetWidth; inp.classList.add("shake");
    }
    renderCheckout();
  }

  function readForm(validate) {
    var f = chk.querySelector("#chkForm");
    var o = {
      name: f.name.value.trim(), phone: f.phone.value.trim(),
      address: f.address.value.trim(), city: f.city.value.trim(),
      pincode: f.pincode.value.trim(), payment: f.payment.value
    };
    if (!validate) return o;
    var ok = true;
    [["name", o.name.length > 1],
     ["phone", /^[+\d][\d\s-]{8,14}$/.test(o.phone)],
     ["address", o.address.length > 3],
     ["city", o.city.length > 1],
     ["pincode", /^\d{6}$/.test(o.pincode)]].forEach(function (pair) {
      var el = f[pair[0]].closest(".fld");
      el.classList.toggle("is-bad", !pair[1]);
      if (!pair[1]) ok = false;
    });
    return ok ? o : null;
  }

  function orderText(o, forWA) {
    var b = forWA ? "*" : "";
    var lines = ["🛒 " + b + "New Order" + b, ""];
    items.forEach(function (id, i) {
      var p = products[id];
      lines.push((i + 1) + ". " + p.title + " x1 = " + window.JA_FORMAT(sale(p)));
    });
    var sub = subtotal(), disc = discountFor(sub), mrp = mrpTotal();
    lines.push("", "💰 Total: " + window.JA_FORMAT(sub));
    if (mrp > sub) lines.push("🏷️ MRP " + window.JA_FORMAT(mrp) + " — you save " + window.JA_FORMAT(mrp - sub) + " (20% off)");
    if (disc > 0) {
      lines.push("🎟️ Coupon " + coupon.code + ": −" + window.JA_FORMAT(disc));
      lines.push("✅ Final payable: " + window.JA_FORMAT(sub - disc));
    }
    lines.push("",
      "👤 Name: " + o.name,
      "📍 Address: " + o.address + ", " + o.city + " - " + o.pincode,
      "📞 Phone: " + o.phone,
      "💳 Payment: " + o.payment);
    return lines.join("\n");
  }

  function placeOrder() {
    var o = readForm(true);
    if (!o) {
      var bad = chk.querySelector(".fld.is-bad input");
      if (bad) bad.focus();
      return;
    }
    var url = "https://wa.me/" + (window.JA_WHATSAPP || "918638527602") +
      "?text=" + encodeURIComponent(orderText(o, true));
    window.open(url, "_blank", "noopener");
    var btn = chk.querySelector(".chk__place");
    btn.textContent = "Opening WhatsApp…";
    setTimeout(function () {
      btn.innerHTML = "✓ Order sent — we’ll confirm on WhatsApp";
      btn.classList.add("is-done");
    }, 900);
  }

  function renderCheckout() {
    if (!chk) return;
    var ul = chk.querySelector(".chk__items");
    ul.innerHTML = items.map(function (id) {
      var p = products[id];
      return '<li><img src="' + p.img + '" alt="" width="52" height="64" loading="lazy">' +
        "<span>" + p.title + "<em>qty 1 · original</em></span><b>" + window.JA_FORMAT(sale(p)) + "</b></li>";
    }).join("");
    var sub = subtotal(), disc = discountFor(sub);
    chk.querySelector(".chk__sub").textContent = window.JA_FORMAT(sub);
    chk.querySelector(".chk__disc").textContent = disc ? "− " + window.JA_FORMAT(disc) : "—";
    chk.querySelector(".chk__pay").textContent = window.JA_FORMAT(sub - disc);
  }

  function openCheckout() {
    if (!items.length) return;
    buildCheckout();
    renderCheckout();
    closeCart();
    chk.classList.add("is-open");
    chk.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    if (window.__lenis) window.__lenis.stop();
    setTimeout(function () { chk.querySelector('[name="name"]').focus(); }, 80);
  }
  function closeCheckout() {
    if (!chk || !chk.classList.contains("is-open")) return;
    chk.classList.remove("is-open");
    chk.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    if (window.__lenis) window.__lenis.start();
  }

  function render() {
    countEl.textContent = items.length || "";
    cartBtn.classList.toggle("has-items", items.length > 0);
    listEl.innerHTML = items.map(function (id) {
      var p = products[id];
      return '<li class="cartd__item">' +
        '<img src="' + p.img + '" alt="" width="64" height="80" loading="lazy">' +
        '<div><b>' + p.title + "</b><span>" + p.size + " · qty 1</span></div>" +
        "<em>" + window.JA_FORMAT(sale(p)) + "</em>" +
        '<button class="cartd__rm" data-remove="' + id + '" aria-label="Remove ' + p.title + '">✕</button>' +
      "</li>";
    }).join("");
    var has = items.length > 0;
    emptyEl.style.display = has ? "none" : "block";
    footEl.style.display = has ? "block" : "none";
    listEl.style.display = has ? "block" : "none";
    if (has) { sumEl.textContent = window.JA_FORMAT(subtotal()); }
    renderCheckout();
    /* reflect state on all add buttons */
    document.querySelectorAll("[data-add]").forEach(function (b) {
      var inCart = items.indexOf(b.getAttribute("data-id")) !== -1;
      b.classList.toggle("in-cart", inCart);
      b.textContent = inCart ? "In cart ✓" : (b.getAttribute("data-label") || "Add to cart");
    });
  }

  function openCart() {
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    if (window.__lenis) window.__lenis.stop();
    setTimeout(function () { drawer.querySelector(".cartd__x").focus(); }, 60);
  }
  function closeCart() {
    if (!drawer.classList.contains("is-open")) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    if (window.__lenis) window.__lenis.start();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.JA_CART = {
    add: function (id) {
      if (!products[id] || products[id].status !== "available") return;
      if (items.indexOf(id) === -1) { items.push(id); save(items); render(); }
      cartBtn.classList.remove("bump");
      void cartBtn.offsetWidth;
      cartBtn.classList.add("bump");
    },
    remove: function (id) {
      items = items.filter(function (x) { return x !== id; });
      save(items); render();
    },
    open: openCart, close: closeCart
  };

  cartBtn.addEventListener("click", openCart);
  sendEl.addEventListener("click", openCheckout);
  drawer.addEventListener("click", function (e) {
    if (e.target.closest("[data-cart-close]")) closeCart();
    var rm = e.target.closest("[data-remove]");
    if (rm) window.JA_CART.remove(rm.getAttribute("data-remove"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closePdp(); closeCheckout(); closeCart(); }
  });
  document.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add) { e.preventDefault(); window.JA_CART.add(add.getAttribute("data-id")); }
  });


  /* ═════════ PRODUCT DETAIL — quick view ═════════ */
  var pdp = null, pdpZoomed = false;
  function buildPdp() {
    if (pdp) return;
    pdp = document.createElement("div");
    pdp.className = "pdp";
    pdp.setAttribute("aria-hidden", "true");
    pdp.innerHTML =
      '<div class="pdp__bg" data-pdp-close></div>' +
      '<div class="pdp__panel" role="dialog" aria-modal="true" aria-labelledby="pdpTitle">' +
        '<button class="pdp__x" data-pdp-close aria-label="Close">✕</button>' +
        '<figure class="pdp__stage"><img alt=""><span class="pdp__hint">click to zoom</span></figure>' +
        '<div class="pdp__info">' +
          '<p class="eyebrow">Original · one of one</p>' +
          '<h2 id="pdpTitle"></h2>' +
          '<p class="pdp__desc"></p>' +
          '<dl class="pdp__specs">' +
            '<div><dt>Size</dt><dd data-f="size"></dd></div>' +
            '<div><dt>Materials</dt><dd data-f="materials"></dd></div>' +
            '<div><dt>Framing</dt><dd data-f="framed"></dd></div>' +
          "</dl>" +
          '<div class="pdp__price"></div>' +
          '<div class="pdp__row">' +
            '<button class="btn btn--solid pdp__add" type="button"></button>' +
            '<a class="btn btn--line pdp__enq" href="#">Enquire</a>' +
          "</div>" +
          '<p class="pdp__note">Hand-painted original — never reprinted, never repeated. Extra 10% off with code <b>WELCOME10</b> at checkout.</p>' +
        "</div>" +
      "</div>";
    document.body.appendChild(pdp);
    pdp.addEventListener("click", function (e) {
      if (e.target.closest("[data-pdp-close]")) closePdp();
    });
    var img = pdp.querySelector(".pdp__stage img");
    img.addEventListener("click", function (e) {
      pdpZoomed = !pdpZoomed;
      var r = img.getBoundingClientRect();
      img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100).toFixed(1) + "% " +
        ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%";
      pdp.querySelector(".pdp__stage").classList.toggle("is-zoomed", pdpZoomed);
    });
    pdp.querySelector(".pdp__add").addEventListener("click", function () {
      var id = pdp.getAttribute("data-id");
      var p = products[id];
      if (!p) return;
      if (p.status === "available") { window.JA_CART.add(id); renderPdp(id); }
      else { window.location.href = "commissions.html"; }
    });
  }
  function renderPdp(id) {
    var p = products[id];
    if (!p) return;
    pdp.setAttribute("data-id", id);
    var img = pdp.querySelector(".pdp__stage img");
    img.src = p.img; img.alt = p.title;
    pdp.querySelector("#pdpTitle").textContent = p.title;
    pdp.querySelector(".pdp__desc").textContent = p.desc || p.materials;
    ["size", "materials", "framed"].forEach(function (k) {
      pdp.querySelector('[data-f="' + k + '"]').textContent = p[k] || "—";
    });
    pdp.querySelector(".pdp__price").innerHTML =
      "<s>" + window.JA_FORMAT(p.price) + "</s><b>" + window.JA_FORMAT(sale(p)) +
      '</b><em class="off">20% off</em>';
    var add = pdp.querySelector(".pdp__add");
    if (p.status === "available") add.textContent = items.indexOf(id) !== -1 ? "In cart ✓" : "Add to cart";
    else add.textContent = "Commission similar";
    pdp.querySelector(".pdp__enq").href = "mailto:jabinakhterb@gmail.com?subject=" +
      encodeURIComponent("Enquiry — " + p.title);
  }
  function openPdp(id) {
    buildPdp();
    renderPdp(id);
    pdpZoomed = false;
    pdp.querySelector(".pdp__stage").classList.remove("is-zoomed");
    pdp.classList.add("is-open");
    pdp.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    if (window.__lenis) window.__lenis.stop();
    setTimeout(function () { pdp.querySelector(".pdp__x").focus(); }, 80);
  }
  function closePdp() {
    if (!pdp || !pdp.classList.contains("is-open")) return;
    pdp.classList.remove("is-open");
    pdp.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    if (window.__lenis) window.__lenis.start();
  }
  document.addEventListener("click", function (e) {
    var host = e.target.closest(".piece, .rp");
    if (!host) return;
    /* buttons and links inside the card keep their own behaviour */
    if (e.target.closest("a, button")) return;
    var ref = host.querySelector("[data-add]") || host.querySelector("[data-price]") || host.querySelector("[data-size]");
    var id = ref && (ref.getAttribute("data-id") || ref.getAttribute("data-price") || ref.getAttribute("data-size"));
    if (id && products[id]) openPdp(id);
  });

  /* fill any static price slots */
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var p = products[el.getAttribute("data-price")];
    if (p) el.innerHTML = "<s>" + window.JA_FORMAT(p.price) + "</s> <b>" +
      window.JA_FORMAT(sale(p)) + "</b> <em class=\"off\">20% off</em>";
  });
  document.querySelectorAll("[data-size]").forEach(function (el) {
    var p = products[el.getAttribute("data-size")];
    if (p) el.textContent = p.size;
  });

  render();
})();
