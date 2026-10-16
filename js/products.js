/* ═══════════════════════════════════════════════════════════════
   JABIN ARTS · product catalog — single source of truth
   ─────────────────────────────────────────────────────────────
   ALL PRICES ARE PROVISIONAL and follow one structure so they can
   be corrected in this one file:

     base by size class   S ₹6,500 · M ₹9,500 · L ₹14,500 · XL ₹22,000
     + framed & glazed    ₹2,500   (ornate gilt frame ₹4,500)
     + high detailing     ₹3,000   (gold leafing, raised florals,
                                    dense multi-register script)

   `size` values are approximate, read from the photographs —
   confirm real dimensions before publishing them as final.
   `status`: available | commission (made-to-order, not addable)
   Every painting is an original (unique: true → quantity locked at 1).
   ═══════════════════════════════════════════════════════════════ */
window.JA_PRODUCTS = [
  { id: "garden-arrival",   title: "The Garden of Arrival",    img: "assets/img/shop/garden-arrival.jpg",
    price: 16500, size: "size on request", materials: "Acrylic on canvas — painted once, never repeated",
    desc: "The Sacred House, in a dreaming garden. Acrylic on canvas · ornate gilt frame, double mat · painted once — this scene will never be made again",
    framed: "Ornate gilt frame, double mat, glazed", status: "available", unique: true },

  { id: "golden-qul",       title: "The Golden Qul",           img: "assets/img/shop/golden-qul.jpg",
    price: 19500, size: "size on request", materials: "Gold-toned ground, midnight roundel",
    desc: "A midnight roundel of circular script centred on \u2018Qul\u2019, set in a gilded field \u00b7 ornate dark-gold frame \u2014 photographed installed in a panelled lounge.",
    framed: "Ornate dark-gold frame, glazed", status: "available", unique: true },

  { id: "lilies-lapis",     title: "Whatever Good You Send",   img: "assets/img/lilies-lapis.jpg",
    price: 17500, size: "≈ 61 × 46 cm (approx.)", materials: "Gouache & gold on canvas",
    desc: "Qur’an 28:24. Gouache & gold on canvas · raised florals",
    framed: "Unframed canvas", status: "available", unique: true },

  { id: "teal-piece",       title: "Al-Kursi — Turquoise Tide", img: "assets/img/teal-piece.jpg",
    price: 12000, size: "≈ 45 × 60 cm (approx.)", materials: "Ink & gold over wash",
    desc: "The Throne Verse. Ink & gold over wash · framed in white",
    framed: "White frame, glazed", status: "available", unique: true },

  { id: "lilac-piece",      title: "Al-Kursi — Lilac Hour",    img: "assets/img/lilac-piece.jpg",
    price: 12000, size: "≈ 45 × 60 cm (approx.)", materials: "Ink over violet wash",
    desc: "The Throne Verse. Ink over violet wash · framed in white",
    framed: "White frame, glazed", status: "available", unique: true },

  { id: "rose-kursi-front", title: "Midnight & Roses",         img: "assets/img/rose-kursi-front.jpg",
    price: 22000, size: "≈ 70 × 95 cm (approx.)", materials: "Gold & white on black",
    desc: "Ayat al-Kursi. Gold & white script rising from a garden of deep red roses · ornate gilt frame, glazed",
    framed: "Ornate gilt frame, glazed", status: "available", unique: true },

  { id: "kursi-emerald",    title: "Al-Kursi — Emerald",       img: "assets/img/kursi-emerald.jpg",
    price: 12000, size: "≈ 45 × 60 cm (approx.)", materials: "White-gold script on sea green",
    desc: "The Throne Verse. White-gold script on sea green · framed",
    framed: "Ivory frame, glazed", status: "available", unique: true },

  { id: "kursi-bloom",      title: "Al-Kursi in Bloom",        img: "assets/img/kursi-bloom.jpg",
    price: 12500, size: "≈ 45 × 60 cm (approx.)", materials: "Ink & gold over stencilled blossoms",
    desc: "The Throne Verse. Ink & gold over stencilled blossoms",
    framed: "White frame", status: "available", unique: true },

  { id: "prayer-parents",   title: "For My Parents",           img: "assets/img/prayer-parents.jpg",
    price: 12000, size: "≈ 50 × 60 cm (approx.)", materials: "Ink over acrylic wash",
    desc: "Qur’an 71:28. Ink over acrylic wash · white frame",
    framed: "White frame, glazed", status: "available", unique: true },

  { id: "illuminated-dome", title: "The Illuminated Dome",     img: "assets/img/illuminated-dome.jpg",
    price: 15000, size: "≈ 55 × 75 cm (approx.)", materials: "Ink on lapis",
    desc: "Calligraphic architecture. Ink on lapis · dark frame",
    framed: "Dark frame", status: "available", unique: true },

  { id: "kursi-sky",        title: "Roundel in Sky",           img: "assets/img/kursi-sky.jpg",
    price: 12000, size: "≈ 55 × 70 cm (approx.)", materials: "Ink on hand-toned blue",
    desc: "Ayat al-Kursi. Ink on hand-toned blue · black frame",
    framed: "Black frame", status: "available", unique: true },

  { id: "dhikr-vortex",     title: "Dhikr",                    img: "assets/img/dhikr-vortex.jpg",
    price: 14500, size: "≈ 75 × 55 cm (approx.)", materials: "Acrylic & silver on canvas",
    desc: "The Name at the still center. Acrylic & silver on canvas",
    framed: "Unframed canvas", status: "available", unique: true },

  { id: "lavender-dusk",    title: "Lavender Dusk",            img: "assets/img/lavender-dusk.jpg",
    price: 13000, size: "≈ 45 × 60 cm (approx.)", materials: "Gold & gouache on canvas",
    desc: "Sacred verse at the violet hour. Gold & gouache on canvas · framed",
    framed: "White frame", status: "available", unique: true },

  { id: "yasin-roses",      title: "Ya-Sin",                   img: "assets/img/yasin-roses.jpg",
    price: 15500, size: "≈ 60 × 80 cm (approx.)", materials: "Gold on black, painted roses",
    desc: "Sūrah Yā-Sīn. Gold on black · roses · glazed frame",
    framed: "Glazed frame", status: "available", unique: true },

  { id: "midnight-roses",   title: "Garden of Night",          img: "assets/img/midnight-roses.jpg",
    price: 18500, size: "≈ 60 × 85 cm (approx.)", materials: "Gold script over midnight roses",
    desc: "Gilded roundel. Gold script over midnight roses · framed",
    framed: "Dark frame, glazed", status: "available", unique: true },

  { id: "easel-blackgold",  title: "Al-Kursi — Silver & Gold", img: "assets/img/easel-blackgold.jpg",
    price: 24000, size: "≈ 90 × 120 cm (approx.)", materials: "Silver & gold on black",
    desc: "The Throne Verse. Silver & gold on black · ornate frame",
    framed: "Ornate frame, glazed", status: "available", unique: true },

  { id: "love-mercy",       title: "Love & Mercy",             img: "assets/img/love-mercy.jpg",
    price: 26000, size: "made to order", materials: "Gold leaf & gouache — wedding commission",
    desc: "Qur’an 30:21 — “And He placed between you love and mercy.” A wedding commission: two souls before the Kaaba. Commission your own around your names and date.",
    framed: "Ornate gilt frame", status: "commission", unique: true },

  /* ── from the first gallery (jabinarts.in) — re-photographed originals ── */
  { id: "kursi-blush", title: "Al-Kursi — Blush Roses", img: "assets/img/shop/kursi-blush.jpg",
    price: 13500, size: "size on request", materials: "Ink on a rose-bordered blush ground",
    desc: "The Throne Verse. Ink on a rose-bordered blush ground · white frame, glazed",
    framed: "White frame, glazed", status: "available", unique: true },

  { id: "wisteria-veil", title: "Wisteria Veil", img: "assets/img/shop/wisteria-veil.jpg",
    price: 16500, size: "size on request", materials: "Ombré green to violet with hanging wisteria",
    desc: "Sacred roundel. Ombré green to violet with hanging wisteria · glazed frame",
    framed: "Black-gold frame, glazed", status: "available", unique: true },

  { id: "alif-verdigris", title: "Alif — Verdigris", img: "assets/img/shop/alif-verdigris.jpg",
    price: 9500, size: "size on request", materials: "Deep maroon strokes over verdigris with ghost script",
    desc: "Modern letterform study. Deep maroon strokes over verdigris with ghost script",
    framed: "Slim gold frame", status: "available", unique: true },

  { id: "roses-roundel", title: "Roundel with Roses", img: "assets/img/shop/roses-roundel.jpg",
    price: 11000, size: "size on request", materials: "Ink roundel between rose garlands on cream",
    desc: "Circular composition. Ink roundel between rose garlands on cream",
    framed: "Walnut frame", status: "available", unique: true },

  { id: "amethyst-allah", title: "Amethyst Halo", img: "assets/img/shop/amethyst-allah.jpg",
    price: 11500, size: "size on request", materials: "Violet wash and gold speckle around a ringed Name",
    desc: "The Name. Violet wash and gold speckle around a ringed Name",
    framed: "Gold frame", status: "available", unique: true },

  { id: "kursi-meadow", title: "Kursi in the Meadow", img: "assets/img/shop/kursi-meadow.jpg",
    price: 12500, size: "size on request", materials: "Green-gold washes flecked with rose",
    desc: "The Throne Verse. Green-gold washes flecked with rose · black frame",
    framed: "Black frame", status: "available", unique: true },

  { id: "ikhlas-bloom", title: "Ikhlas in Bloom", img: "assets/img/shop/ikhlas-bloom.jpg",
    price: 12500, size: "size on request", materials: "Sky blue with white blossoms",
    desc: "Sūrah al-Ikhlāṣ. Sky blue with white blossoms · gold frame",
    framed: "Gold frame", status: "available", unique: true },

  { id: "alif-teal-gold", title: "The Standing Alif", img: "assets/img/shop/alif-teal-gold.jpg",
    price: 21000, size: "size on request", materials: "A single alif on teal silk within a gold script border",
    desc: "Bordered composition. A single alif on teal silk within a gold script border",
    framed: "Ornate black-gold frame", status: "available", unique: true },

  { id: "halo-of-gold", title: "Halo of Gold", img: "assets/img/shop/halo-of-gold.jpg",
    price: 23000, size: "size on request", materials: "Dense gold ring on midnight black with gold dust",
    desc: "The Name, ringed. Dense gold ring on midnight black with gold dust",
    framed: "Black frame", status: "available", unique: true },

  { id: "golden-verses", title: "Golden Verses", img: "assets/img/shop/golden-verses.jpg",
    price: 24500, size: "size on request", materials: "Gold registers within an illuminated border",
    desc: "The Throne Verse. Gold registers within an illuminated border",
    framed: "Gilt-and-walnut frame", status: "available", unique: true },

  { id: "kiswah", title: "After the Kiswah", img: "assets/img/shop/kiswah.jpg",
    price: 38000, size: "size on request", materials: "Embroidery-style gold script on black, after the Kiswah",
    desc: "The Throne Verse. Embroidery-style gold script on black, after the Kiswah",
    framed: "Black frame, glazed", status: "available", unique: true },

  { id: "kursi-poppies", title: "Kursi with Poppies", img: "assets/img/shop/kursi-poppies.jpg",
    price: 14500, size: "size on request", materials: "Coral ground with hand-raised poppies at the foot",
    desc: "The Throne Verse. Coral ground with hand-raised poppies at the foot",
    framed: "Tall canvas, unframed", status: "available", unique: true },

  { id: "rosegold-clouds", title: "Rose-Gold Clouds", img: "assets/img/shop/rosegold-clouds.jpg",
    price: 13000, size: "size on request", materials: "Black roundel amid blush and gold cloud washes",
    desc: "The Throne Verse. Black roundel amid blush and gold cloud washes",
    framed: "White frame", status: "available", unique: true },

  { id: "yasin-emerald", title: "Ya-Sin — Emerald Mist", img: "assets/img/shop/yasin-emerald.jpg",
    price: 26000, size: "size on request", materials: "The sūrah over teal-gold mists",
    desc: "Sūrah Yā-Sīn. The sūrah over teal-gold mists · wide format",
    framed: "White frame", status: "available", unique: true },

  { id: "bismillah-ember", title: "Bismillah — Ember Night", img: "assets/img/shop/bismillah-ember.jpg",
    price: 18500, size: "size on request", materials: "White spiral script meets a gold basmala over ember black",
    desc: "The Basmala. White spiral script meets a gold basmala over ember black",
    framed: "Black frame, glazed", status: "available", unique: true },

  { id: "feathered-kursi", title: "Feathers of Light", img: "assets/img/shop/feathered-kursi.jpg",
    price: 19500, size: "size on request", materials: "Gold roundel with radiating feather strokes on black",
    desc: "The Throne Verse. Gold roundel with radiating feather strokes on black",
    framed: "Unframed canvas", status: "available", unique: true },

  { id: "names-99", title: "The 99 Names", img: "assets/img/shop/names-99.jpg",
    price: 42000, size: "size on request", materials: "All ninety-nine Names in gold registers",
    desc: "Asmāʾ al-Ḥusnā. All ninety-nine Names in gold registers · large format",
    framed: "Dark frame", status: "available", unique: true },

  { id: "golden-drop", title: "The Golden Drop", img: "assets/img/shop/golden-drop.jpg",
    price: 22000, size: "size on request", materials: "Silver script bands around a gold teardrop Name",
    desc: "Layered script bands. Silver script bands around a gold teardrop Name",
    framed: "Gold-line frame", status: "available", unique: true },

  { id: "the-triptych", title: "The Triptych", img: "assets/img/shop/the-triptych.jpg",
    price: 28000, size: "size on request", materials: "Three roundels on grey and gold wash",
    desc: "Three roundels. Three roundels on grey and gold wash · wide format",
    framed: "Black frame", status: "available", unique: true },

  { id: "lapis-panel", title: "Lapis Panel", img: "assets/img/shop/lapis-panel.jpg",
    price: 8500, size: "size on request", materials: "Gold letterform on lapis in a silver-gold border",
    desc: "The Name. Gold letterform on lapis in a silver-gold border",
    framed: "Unframed canvas", status: "available", unique: true },

  { id: "kursi-royale", title: "Kursi Royale", img: "assets/img/shop/kursi-royale.jpg",
    price: 25000, size: "size on request", materials: "Gold-and-silver roundel with corner ornaments",
    desc: "The Throne Verse. Gold-and-silver roundel with corner ornaments",
    framed: "Ornate gilt frame", status: "available", unique: true },

  { id: "damask-kursi", title: "Damask Rose", img: "assets/img/shop/damask-kursi.jpg",
    price: 17500, size: "size on request", materials: "Silver roundel over magenta damask",
    desc: "The Throne Verse. Silver roundel over magenta damask",
    framed: "Gilt-edged black frame", status: "available", unique: true },

  { id: "heart-pairs", title: "In Pairs", img: "assets/img/shop/heart-pairs.jpg",
    price: 30000, size: "size on request", materials: "Heart-formed gold script with your names & date — made to order",
    desc: "Wedding commission. Heart-formed gold script with your names & date — made to order",
    framed: "Black-gold frame", status: "commission", unique: true }
];

/* Coupon codes — empty by default so no discount ever applies until the
   studio adds one here. Example:
     "EID10": { type: "percent", value: 10, label: "Eid — 10% off" }
     "SHIPFREE": { type: "flat", value: 1500, label: "₹1,500 off" }        */
window.JA_COUPONS = {
  "WELCOME10": { type: "percent", value: 10, label: "Welcome — extra 10% off" }
};

window.JA_WHATSAPP = "918638527602";  /* studio order number (wa.me) */

/* Everything sells at 20% below the listed MRP; MRP stays as the struck price. */
window.JA_SALE_RATE = 0.20;
window.JA_SALE = function (mrp) {
  return Math.round(mrp * (1 - window.JA_SALE_RATE) / 100) * 100;
};

window.JA_FORMAT = function (n) {
  try { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n); }
  catch (e) { return "₹" + n; }
};
