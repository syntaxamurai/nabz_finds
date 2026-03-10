// ═══════════════════════════════════════════════════
// config.js — Runtime configuration for Nabz Findz
// ───────────────────────────────────────────────────
// SECURITY NOTE:
//   This file is safe to commit to GitHub.
//   It contains no passwords, API keys or secrets.
//   The admin password is stored ONLY in the browser's
//   localStorage under the key "nf_adm_pw" and is
//   set/changed from within the Admin > Settings panel.
//   Default first-run password: see SETUP.md (not committed)
// ═══════════════════════════════════════════════════

const CONFIG = {
  // ── Site identity ──
  siteName:    'Nabz Findz',
  siteTagline: 'Your Glow, Elevated.',
  siteUrl:     'https://YOUR-USERNAME.github.io/nabz-findz',

  // ── WhatsApp (safe to be public — it's your public channel number) ──
  // Change this to your real number in Admin > Settings
  // Format: country code + number, no + or spaces e.g. '254712345678'
  defaultWhatsApp: '254700000000',

  // ── Member discount ──
  memberDiscountPct: 10,   // percent off for logged-in customers

  // ── Admin email (the login email for the admin panel) ──
  // Change this in js/auth.js line ~12 after cloning
  adminEmail: 'admin@nabzfindz.com',

  // ── Low stock default threshold ──
  defaultLowStockAt: 3,

  // ── Feature flags ──
  features: {
    memberPricing:  true,
    wishlistSync:   true,
    guestCheckout:  true,
  },
};
