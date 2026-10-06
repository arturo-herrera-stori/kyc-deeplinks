# 🔗 KYC Deeplinks Builder

> **Build, preview, copy, and open** Stori KYC deeplinks for **DEV** and **QA** — no build step, no PROD.

🌐 **Live app:** [arturo-herrera-stori.github.io/kyc-deeplinks](https://arturo-herrera-stori.github.io/kyc-deeplinks/)

---

## ✨ What it does

| Step | You do | You get |
|------|--------|---------|
| 1️⃣ | Pick **environment**, **link type**, and options | A live `stori://kyc?...` URL |
| 2️⃣ | Tap **Open in app** (phone) or **Copy** | Deeplink ready for QA |

```
  ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
  │  Select     │ --> │   Preview    │ --> │ Open / Copy     │
  │  DEV | QA   │     │ stori://kyc  │     │ on device       │
  └─────────────┘     └──────────────┘     └─────────────────┘
```

⚠️ **PROD is intentionally excluded** — only non-production environments and IDs.

---

## 🚀 Quick start (local)

The app uses ES modules; `file://` will **not** work.

```bash
npm start
# → http://localhost:3000
```

📱 **On your phone (same Wi‑Fi):** open `http://<your-computer-ip>:3000`, build the link, then **Open in app**.

---

## 🧭 How to use the UI

### 🌍 Environment

| UI label | Stored value | Notes |
|----------|--------------|--------|
| **DEV** | `DEV` | Default on first visit |
| **QA** | `QA` | Remembered in `localStorage` |

Changing environment updates **destination IDs** in the URL (same destination name, different ID).

### 🧩 Link type (pick one)

| Type in UI | Query parameters | Example shape |
|------------|------------------|---------------|
| **Flow** | `flow` | `stori://kyc?flow=CREDIT_L1_MX` |
| **Flow + Destination + Level** | `flow`, `destination`, `level` | `stori://kyc?flow=...&destination=...&level=L1` |
| **Destination + Level** | `destination`, `level` | `stori://kyc?destination=...&level=L2` |

Only controls for the active type are shown.

### 🏷️ Flows (`flow` query value)

| Label in UI | URL value (`flow=`) | Default level* | Color group |
|-------------|---------------------|----------------|-------------|
| CREDIT L1 MX | `CREDIT_L1_MX` | L1 | credit |
| CREDIT L2 MX | `CREDIT_L2_MX` | L2 | credit |
| CREDIT L1 FOREIGNER | `CREDIT_L1_FOREIGNER` | L1 | credit |
| CREDIT L1 MX OCR | `CREDIT_L1_MX_OCR` | L1 | credit |
| DEPOSITS L2 MX | `DEPOSITS_L2_MX` | L2 | deposits |
| LUNA L1 MX | `LUNA_L1_MX` | L1 | luna |

\*For **Flow + Destination + Level**, picking a flow **pre-selects** its default level; you can still change level manually.

### 📊 Levels (`level` query value)

| UI | URL |
|----|-----|
| L1 | `L1` |
| L2 | `L2` |

### 📍 Destinations (`destination` = environment-specific ID)

You choose by **name**; the app sends the **numeric ID** for the selected environment:

| Destination | DEV ID | QA ID |
|-------------|--------|-------|
| **T2P** | `fc2981118026611077` | `fc2980055818713477` |
| **LUNA - New MP** | `fc3220397196754053` | `fc3221926378667141` |
| **LUNA - Old MP** | `fc2717945212542021` | `fc2777295705517381` |

---

## 🛠️ Project layout

```
public/                 ← only this folder is published (GitHub Pages)
  index.html
  css/styles.css
  js/catalog.js         ← enums: environments, flows, destinations, link types
  js/deeplink.js        ← URL builder (no DOM)
  js/app.js             ← UI wiring
tests/                  ← deeplink.js unit tests
.github/workflows/      ← deploy public/ on push to main
```

No npm dependencies at runtime. **Node 20+** for `npm test` only.

---

## 🧪 Tests

```bash
npm test
```

Validates deeplink URL rules and that every destination has DEV + QA IDs.

---

## ➕ Extend the catalog

Edit **`public/js/catalog.js`** — the UI rebuilds from data.

| Add… | Edit… |
|------|--------|
| **Flow** | `FLOWS[]`: `value`, `label`, `level`, `group` (`credit` \| `deposits` \| `luna`) |
| **Destination** | `DESTINATIONS[]`: `id`, `label`, `ids.DEV`, `ids.QA` |
| **Link type** | `LINK_TYPES[]`: `id`, `label`, `params` (query key order) |

Then run `npm test`.

---

## 📤 Publishing (GitHub Pages)

Repo: [`arturo-herrera-stori/kyc-deeplinks`](https://github.com/arturo-herrera-stori/kyc-deeplinks)

- Push to **`main`** with changes under `public/**` → **Deploy GitHub Pages** workflow runs automatically.
- Site URL: `https://arturo-herrera-stori.github.io/kyc-deeplinks/`
- GitHub **Settings → Pages → Source: GitHub Actions** (one-time setup).
