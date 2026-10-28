# DexRanker — Supabase cloud board setup

## 1. Create project
https://supabase.com → New project

## 2. SQL (SQL Editor → Run)

```sql
create table if not exists campaigns (
  id text primary key,
  mint text not null,
  symbol text,
  name text,
  pkg text,
  channels int,
  contact text,
  notes text,
  placement_notes text default '',
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table campaigns enable row level security;

-- Open write for anon key (simple ops board). Tighten later with auth.
create policy "anon all" on campaigns
  for all
  using (true)
  with check (true);
```

## 3. Keys
Project Settings → API:
- Project URL
- anon public key

## 4. Config
Edit `config.js` in the repo:

```js
window.DEXRANKER_CONFIG = {
  supabaseUrl: 'https://xxxx.supabase.co',
  supabaseAnonKey: 'eyJ...'
};
```

Redeploy. Status strip shows **CLOUD** when connected. Without config, **LOCAL** (localStorage) still works.

## 5. Security note
Current RLS allows anyone with the anon key to read/write campaigns. Fine for a private ops tool; add Supabase Auth before sharing the admin UI publicly.
