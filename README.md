# Nabz Findz

> Luxury e-commerce website for a Nairobi-based beauty and style brand.

**Live site:** [https://syntaxamurai.github.io/nabz_finds/]
**Admin panel:** sign in with `admin@nabzfindz.com` *(set password on first run — see SETUP.md)*

---

## Features

- Midnight dark editorial UI with warm gold accents
- Customer sign up / sign in / session management  
- Member pricing — 10% discount for logged-in customers  
- Wishlist with per-account sync across sessions  
- Shopping cart with real-time stock enforcement  
- WhatsApp checkout integration  
- Admin dashboard: products, orders, customers  
- Image upload per product (base64, stored locally)  
- Instant sold-out updates without page refresh  
- Live stock movement chart  
- Export orders to CSV and PDF  
- Fully responsive — mobile-first

## Tech Stack

| Layer      | Choice                                    |
|------------|-------------------------------------------|
| Markup     | HTML5                                     |
| Styles     | CSS3 (custom properties, Grid, Flexbox)   |
| Logic      | Vanilla JavaScript ES6+                   |
| Fonts      | Cormorant Garamond + Outfit (Google Fonts)|
| Persistence| Browser localStorage                      |
| Hosting    | GitHub Pages (free)                       |
| Build tools| None — zero dependencies                  |

## File Structure

```
nabz-findz/
├── index.html              # Entry point — loads all CSS + JS
├── config.js               # Runtime config (no secrets)
├── .gitignore              # Keeps secrets off GitHub
├── README.md               # This file
│
├── css/
│   ├── base/
│   │   ├── tokens.css      # Design tokens (colours, shadows)
│   │   ├── global.css      # Scrollbar + reset
│   │   ├── typography.css  # Font helpers
│   │   ├── layout.css      # Layout utilities
│   │   └── placeholders.css# Gradient swatches
│   ├── components/
│   │   ├── nav.css         # Site navigation
│   │   ├── drawers.css     # Cart + wishlist drawers
│   │   ├── auth.css        # Login/signup modal
│   │   ├── hero.css        # Hero section
│   │   ├── buttons.css     # Button styles
│   │   ├── marquee.css     # Scrolling ticker
│   │   ├── cards.css       # Product + category cards
│   │   ├── misc.css        # VIP band, perks, reviews
│   │   ├── footer.css      # Footer
│   │   └── toast.css       # Toast notification
│   ├── pages/
│   │   ├── shop.css        # Shop listing page
│   │   ├── product.css     # Product detail page
│   │   ├── about.css       # About + contact pages
│   │   └── account.css     # Customer account page
│   └── admin/
│       └── admin.css       # Full admin dashboard styles
│
├── js/
│   ├── config.js           # Runtime config (safe to commit)
│   ├── data/
│   │   └── products.js     # Default product catalogue + storage keys
│   ├── auth.js             # Login, signup, session management
│   ├── navigation.js       # Page routing
│   ├── utils.js            # Shared helpers (image render, card HTML)
│   ├── cart.js             # Cart state + drawer rendering
│   ├── checkout.js         # WhatsApp checkout + order logging
│   ├── wishlist.js         # Wishlist state + sync
│   ├── misc.js             # Subscribe, toast, contact form
│   ├── pages/
│   │   ├── home.js         # Home page rendering
│   │   ├── shop.js         # Shop filter + sort + render
│   │   ├── product.js      # Product detail page
│   │   └── account.js      # Customer account tabs
│   ├── admin/
│   │   └── admin.js        # Full admin panel logic
│   └── init.js             # Bootstrap — runs on page load
│
└── assets/
    └── images/
        └── .gitkeep        # Keeps folder tracked by Git
```

## Local Development

No build tools, no server needed:

```bash
# Clone
git clone https://github.com/YOUR-USERNAME/nabz-findz.git
cd nabz-findz

# Open in browser
open index.html   # Mac
start index.html  # Windows
```

Or use VS Code's Live Server extension for auto-reload.

## Deployment

Hosted on GitHub Pages — any push to `main` auto-deploys.  
Live within ~60 seconds of committing.

## Security Notes

- No server, no database — all data lives in the visitor's browser localStorage
- Admin password is set in-browser (Admin > Settings) and never written to any file
- No API keys or secrets anywhere in the codebase
- `.gitignore` excludes `SETUP.md` (first-run credential notes) and `.env` files

## License

Built by Syntaxamurai. All rights reserved.
