# Vercel ↔ GitHub Auto-Deploy (one-time, 2 min)

**Repo:** https://github.com/Abhishekrana254/bionicread-landing  
**Goal:** Push GitHub → Vercel auto-deploy → `bionicread.vercel.app`

---

## Step 1 — Vercel open karo

1. https://vercel.com/login → **Continue with GitHub** (Abhishekrana254)
2. https://vercel.com/new

---

## Step 2 — Purana project (agar hai)

Agar pehle se `bionicread` project hai alag code se:

- **Option A:** Project → Settings → **Git** → Connect Repository → `bionicread-landing`
- **Option B:** Purana delete karo → Step 3 se fresh import

---

## Step 3 — Import repo

1. **Import Git Repository** → `Abhishekrana254/bionicread-landing`
2. **Project Name:** `bionicread` (taaki URL `bionicread.vercel.app` mile)
3. Framework: **Other** (static HTML)
4. Root Directory: `./`
5. **Deploy**

---

## Step 4 — Verify (2 min baad)

Browser mein kholo:
- https://bionicread.vercel.app/
- Page source mein search: `AW-18278709652` ✅

Google Ads → **Test installation** → same URL

---

## Ab se flow (automatic)

```
Code edit → git push → Vercel auto-deploy (1–2 min)
```

Main code push kar dunga GitHub pe — tum sirf ek baar Vercel connect karo upar.

---

## Backup URL (already live NOW)

Tag abhi GitHub Pages pe bhi live:

https://abhishekrana254.github.io/bionicread-landing/

Agar Vercel connect se pehle ads test karna ho — ye URL bhi chalega.
