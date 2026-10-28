# DexRanker

**Solana pair visibility terminal** — track pairs, run distribution, measure placement.

> Exposure + tools only. No volume. No wash. No ranking guarantees.

## Product map (Phase 0)

| Pillar | Status | What |
|--------|--------|------|
| **Screener** | Live | Dexscreener boosts + pair stats (client-side API) |
| **Distribution** | Live | Starter / Growth / Scale packages + rails |
| **Campaign** | Live | Order ticket → TG handoff + treasury |
| **Workspace** | Next | Saved pairs, campaign history, reports |

## Stack

- Single-page terminal UI (HTML + Tailwind CDN + IBM Plex Mono)
- Live data: `api.dexscreener.com` (token-boosts + tokens/v1)
- Deploy: Vercel from this repo

## Local

Open `index.html` or:

```bash
npx serve .
```

## Customize

| Item | Where |
|------|--------|
| Treasury | Campaign view / `TREASURY` in script |
| Packages | Distribution view |
| Copy / disclaimers | All views |

## Roadmap

- **Phase 1** — Campaign status + proof/report pages
- **Phase 2** — Auth, watchlist, alerts, Pro sub
- **Phase 3** — Marketplace / API

---

Not affiliated with Dexscreener.
