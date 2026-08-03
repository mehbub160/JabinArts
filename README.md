# Jabin Arts — Portfolio & Shop

A three-page cinematic site for Jabin Arts: original Islamic calligraphy presented
inside one continuous illustrated UAE world — mosque → dunes → oasis → home —
with a light gallery theme by day and a painted night by dark mode.

## Run locally

```bash
python3 serve.py
```

Then open http://localhost:4173. (`serve.py` disables caching so edits show on refresh.)

## Deploy

Static hosting only — upload:

```
index.html  shop.html  commissions.html
css/  js/  assets/
```

`Paintings/`, `New_Images_videos/` and `serve.py` are source/dev material and need
not be deployed. GSAP/ScrollTrigger/Lenis load from jsDelivr; if blocked, every page
falls back to a complete static version (native scroll galleries, visible captions).

## Structure

- `index.html` — mosque opening, intro, scroll journey (camera-locked chapters,
  arch-wipe transitions, home-interior finale with the real painting), featured works,
  3D "anatomy of a painting", cinema gallery, links
- `shop.html` — pinned showcase rail (scroll-driven spatial gallery) + full grid,
  live prices, add-to-cart
- `commissions.html` — artist-holding hero, philosophy, process, studio clip, examples
- `js/products.js` — **single source of truth for prices/sizes** (provisional; the
  pricing structure is documented at the top of the file — edit there only)
- `js/cart.js` — cart drawer: localStorage persistence, unique-original quantity lock,
  subtotal, order-enquiry checkout via email or Instagram DM
- `js/world.js` — the panorama: painted day/night chapters + vector palms/caravan/
  foreground, scroll camera with cross-page continuity, `__jaWorld` camera API
- `js/main.js` — motion system: transitions, journey, 3D sequence, rail, tilt,
  video gallery, cursor + click ripple, focus-trapped menu

## Editing content

- **Prices / sizes / availability** → `js/products.js` (one object per painting).
- **Artworks** → duplicate a card in `shop.html` and add a matching entry in products.js.
- **Links / contact** → search for `jabin_arts__` and `jabinakhterb@gmail.com`.
- **Cache busting** → bump `?v=` on the css/js tags after deployed edits.

Theme persists via `localStorage("ja-theme")`; cart via `localStorage("ja-cart")`.
