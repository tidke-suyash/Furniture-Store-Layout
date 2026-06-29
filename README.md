# Furniture Store — Website Template

A single-page furniture store website built for a client project. No framework, no backend, no complicated setup. Cart works via localStorage, orders go straight to WhatsApp. Just edit the HTML and it's ready to use.

---

## What's inside

- Product grid with add-to-cart, quantity control, and INR pricing
- Slide-in cart sidebar that persists on page refresh
- Checkout form that sends a full order summary (name, phone, address, items, total) as a WhatsApp message
- Optional GPS location capture on the checkout form
- Material explorer — click to preview different material types
- Room visualizer — switch between lighting moods and room types
- Fade-up scroll animations using Intersection Observer
- Fully responsive

---

## Files

```
├── index.html    # all the markup
├── style.css     # layout, animations, responsive styles
└── script.js     # cart, visualizer, WhatsApp checkout
```

No build step. No dependencies. Open `index.html` and it works.

---

## How to customize

Everything that needs changing has a comment above it in the code. Here's the quick version:

**Store name**
Search `YOUR BRAND` in `index.html` and replace it everywhere.

**WhatsApp number**
In `script.js`, find `WA_NUMBER` and set your number (country code + digits, no `+` sign):
```js
const WA_NUMBER = '91XXXXXXXXXX';
```

Also update the footer link in `index.html`:
```html
<a href="https://wa.me/91XXXXXXXXXX">WhatsApp Us: +91 XXXXXXXXXX</a>
```

**Products**
Each card has `data-name` and `data-price` on the button. Edit the `<h3>`, the description `<p>`, and those two attributes:
```html
<button class="btn-add" data-id="p1" data-name="Your Product" data-price="450000">
```

**Material and visualizer images**
In `script.js`, update the `materials` object and `visualizerDB` object with your own image URLs.

---

## Deploying

It's a static site so you can host it anywhere:

- **Netlify Drop** — drag the folder to netlify.com/drop
- **GitHub Pages** — push to a repo, enable Pages in settings
- **Vercel** — import repo, deploy

Nothing to configure.

---

## About

Made by Suyash Tidke — BCA student at MET Institute of Technology, Nashik. I build client websites and web apps on the side. This one was made for a furniture store that needed something simple, fast, and WhatsApp-friendly — no Shopify, no monthly fees, just a page that works.

GitHub: [@tidke-suyash](https://github.com/tidke-suyash)
