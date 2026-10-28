# DexRanker

**Solana visibility terminal** — track pairs, sell distribution, run campaigns, share placement reports.

> Exposure tools only. No volume. No wash. No ranking guarantees.

**Live:** deploy from this repo on Vercel  
**Repo:** https://github.com/spanda6z/dexranker

---

## Product surface

| Tab | Audience | Purpose |
|-----|----------|--------|
| **Screener** | Public | Live boosted Solana pairs + search |
| **Watch** | Public | Star pairs, jump to campaign |
| **Distro** | Public | Package pricing (Starter / Growth / Scale) |
| **Campaign** | Ops (lockable) | New order ticket + treasury |
| **Board** | Ops (lockable) | Status pipeline PEND → LIVE → DONE |
| **Report** | Ops + clients | Portable share links (`?view=report&r=…`) |

Client report links open in **client mode** (report only, no ops chrome).

---

## Operator workflow (how you earn)

1. Client picks a package on **Distro** or contacts you.
2. You open **Campaign** → mint lookup → package → contact → submit.
3. Client pays treasury SOL; you mark **LIVE** on **Board** while placing.
4. Fill **placement notes** on **Report** → **Copy share link** → send to client.
5. Mark **DONE**. Export board JSON as backup anytime.

Honest positioning: visibility amplifies organic activity — it does not invent demand.

---

## Config (`config.js`)

```js
window.DEXRANKER_CONFIG = {
  supabaseUrl: '',       // cloud board (optional)
  supabaseAnonKey: '',   // cloud board (optional)
  opsPassword: ''        // lock Campaign + Board (optional)
};
```

| Setting | Effect |
|---------|--------|
| Empty everything | localStorage board, no password |
| `opsPassword` set | Campaign & Board prompt for password (session) |
| Supabase filled | Board syncs to cloud; strip shows **CLOUD** |

### Cloud board
See [supabase-setup.md](./supabase-setup.md). Free Supabase project + one SQL paste.

### Ops password
Set `opsPassword` so you can share the public site (screener/distro/reports) without exposing your pipeline.

---

## Customize

| Item | Where |
|------|--------|
| Treasury wallet | `TREASURY` in `index.html` script |
| Package prices / channels | Distro cards + `PKG_CH` |
| Branding | Header / pills / copy |

---

## Stack

- Static HTML + Tailwind CDN + IBM Plex Mono
- Dexscreener public API (client-side)
- Optional Supabase (`cloud.js` + `config.js`)
- Vercel from GitHub

```bash
npx serve .
```

---

## Roadmap status

- [x] Screener + real pairs
- [x] Distribution packages
- [x] Campaign board + portable reports
- [x] Watchlist + pair search
- [x] Export / import
- [x] Cloud board adapter
- [x] Ops password gate
- [ ] Supabase Auth (multi-user)
- [ ] Custom domain
- [ ] Pro / paid terminal tier

---

Not affiliated with Dexscreener. Not financial advice.
