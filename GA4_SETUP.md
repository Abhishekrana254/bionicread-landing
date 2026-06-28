# GA4 Setup — BionicRead

## What you get (honest split)

| Data | Tool | Demographics | Retention | Real-time |
|------|------|--------------|-----------|-----------|
| Landing visits, country, device | **GA4** (website) | ✅ Yes* | ✅ New vs returning visitors | ~5 min |
| "Add to Chrome" clicks | **GA4** + Google Ads | — | — | GA4 ~5 min |
| Extension popup / toggles | **GA4** (extension events) | — | ✅ Event counts | ~5 min |
| **Total installs** | **Chrome Dev Console** | ✅ Region, language, OS | Weekly users chart | 1–3 day lag |
| Ad spend, CPA | **Google Ads** | — | — | 3–24h lag |

\* Enable **Google signals** in GA4 Admin → Data collection for age/gender/interest (thresholds apply).

**GA4 does NOT** read what articles users browse in the extension. Only anonymous events you configured.

---

## Step 1 — Create GA4 property (5 min)

1. https://analytics.google.com/
2. **Admin** (gear) → **Create** → **Property**
3. Name: `BionicRead`
4. Time zone: India | Currency: INR
5. **Web stream** → URL: `https://bionicread.vercel.app`
6. Copy **Measurement ID** → `G-XXXXXXXXXX`

---

## Step 2 — Paste ID in code (2 places)

### Landing site
`bionicread-landing/analytics.js` line 8:
```javascript
GA4_MEASUREMENT_ID: "G-XXXXXXXXXX",
```

### Extension (keep same ID)
`bionidread/src/analytics.js` line 2:
```javascript
export const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

Push landing → Vercel auto-deploys.  
Extension → zip + Chrome Store update when ready.

---

## Step 3 — Link GA4 ↔ Google Ads

1. Google Ads → **Tools** → **Linked accounts** → **Google Analytics (GA4)**
2. Link `BionicRead` property
3. **Goals → Conversions → Import** → import `chrome_store_click` from GA4 (optional)

---

## Step 4 — Enable demographics

GA4 → **Admin** → **Data collection and modification** → **Data collection**  
→ Turn on **Google signals**

---

## Events tracked automatically

### Website (`bionicread.vercel.app`)
| Event | When |
|-------|------|
| `page_view` | Every page load |
| `chrome_store_click` | Add to Chrome button |
| `install_click` | Same click (legacy name) |
| `purchase` | Pro payment success |

### Extension
| Event | When |
|-------|------|
| `extension_installed` | First install / update |
| `extension_popup_open` | User opens popup |
| `bionic_toggle` | User enables bionic (popup or keyboard) |

---

## Where to look in GA4

| Question | GA4 path |
|----------|----------|
| Live users right now | **Reports → Real-time** |
| Store button clicks today | **Reports → Real-time** or **Engagement → Events** → `chrome_store_click` |
| Which country | **Reports → User → Demographics → Country** |
| New vs returning | **Reports → Acquisition → User acquisition** |
| Retention (site visitors) | **Reports → Retention** |

### Extension active users
Filter **Engagement → Events** by `extension_popup_open` or `bionic_toggle`.

For **install totals + store demographics**, use **Chrome Web Store Developer Console → Analytics**.

---

## Daily routine (2 min)

```
Morning:
1. GA4 Real-time → yesterday's chrome_store_click count
2. Google Ads → cost yesterday
3. Chrome Dev Console → total installs delta

CPA (install) = Ads cost ÷ new installs (Console)
CPA (click)   = Ads cost ÷ chrome_store_click (GA4)  ← faster signal
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No data in GA4 | Measurement ID pasted? Hard refresh site |
| Real-time empty | Ad blocker off, test in normal window |
| Extension events missing | Same G-ID in `bionidread/src/analytics.js` + store update |
| Demographics empty | Need 100+ users + Google signals on |
