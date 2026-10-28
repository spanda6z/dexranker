# DexRanker

**Solana token visibility through real distribution channels.**

DexRanker is a clean, professional landing page for a Solana token promotion / distribution service focused on Dexscreener traffic.

## Positioning

This is intentionally **not** a hype site.

- No ranking guarantees
- No volume / wash trading claims
- Clear process and transparent pricing
- Real Solana trending data (snapshot)

The goal is credibility over maximal conversion copy.

## Features

- Clean dark UI with strong hierarchy
- Transparent 3-tier pricing
- Honest "what this actually is" section
- Live-style Solana trending feed (real pairs from Dexscreener)
- FAQ with straight answers
- Payment section with copyable treasury address
- Fully responsive

## Stack

- Pure HTML + Tailwind CSS (CDN)
- No build step required
- Ready for Vercel, Netlify, or any static host

## Deploy

### Vercel (recommended)

1. Import the repo in [vercel.com](https://vercel.com)
2. Deploy (zero config)

Or with the CLI:

```bash
npx vercel
```

### Local preview

Just open `index.html` in a browser, or:

```bash
npx serve .
```

## Customization

| Item | Location |
|------|----------|
| Treasury address | `#start` section in `index.html` |
| Package prices | `#packages` section |
| Trending tokens | `#trending` section |
| Copy / positioning | Hero + "What this actually is" |

## Notes

- Trending data is a static snapshot for demonstration. Replace with a live Dexscreener API feed if you want real-time updates.
- Always keep disclaimers clear. Overpromising rankings destroys trust fast in this space.

---

Built for Solana teams that prefer clarity over noise.
