## What's in your repo

Your `255065/evovlerun` repo is "EvolveRun — Adaptive Performance OS": an AI training coach for endurance athletes, with:

- **frontend/** — Next.js 15 (App Router) + React 19 + Tailwind v4 + shadcn/ui + Supabase SSR
  - Pages: landing, login/signup, onboarding, OAuth consent, dashboard (overview, account, profile, connections, Garmin, training, limiter, MCP keys)
- **backend/** — FastAPI (Python 3.13) with routers for auth, billing, ingestion, oauth, metrics, training, limiter, performance, providers, mcp_keys + an MCP server, Anthropic + MiniMax LLM clients, Garmin sync
- **supabase/** — SQL migrations
- **docs/** — architecture notes

## Important: stack mismatch

Lovable doesn't run Next.js or Python. To bring this in we have to port:

| Yours | Lovable equivalent |
|---|---|
| Next.js 15 App Router | React 19 + Vite + React Router |
| Server Actions / route handlers | Lovable Cloud edge functions (Deno/TS) |
| FastAPI Python backend | Edge functions (TS) — needs rewrite |
| Supabase (your own project) | Lovable Cloud (managed Supabase) |
| Anthropic SDK (Python) | Lovable AI Gateway, or Anthropic via edge function |
| Garmin OAuth + sync (Python) | Edge function rewrite |
| MCP server (Python) | Out of scope for Lovable hosting |

shadcn/ui components, Tailwind styles, and SQL migrations port cleanly. The Python backend logic has to be rewritten in TypeScript edge functions — that's the bulk of the work.

## Proposed approach: phased port

Rather than try to port everything in one go (which would take many iterations and risk a broken mess), I'll bring it over in slices you can review.

### Phase 1 — Frontend shell + auth (this loop)
1. Scaffold a `web_app` artifact (React + Vite + Tailwind + shadcn).
2. Port `globals.css`, design tokens, and the shadcn UI primitives (`button`, `card`, `input`, `label`, `badge`).
3. Port the landing page (`app/page.tsx`) and the marketing nav.
4. Enable Lovable Cloud and wire email/password auth to match your login/signup pages.
5. Port `(auth)/login`, `(auth)/signup`, `/onboarding` UI — server actions become client calls to Lovable Cloud auth.

### Phase 2 — Dashboard UI (next loop)
- Dashboard layout + nav, account, profile pages.
- Connections + Garmin connect UI (button + status; actual Garmin OAuth stubbed).
- Training, limiter, MCP key pages as read-only views against the DB schema.

### Phase 3 — Schema + data (next loop)
- Translate `supabase/migrations/0001_initial_schema.sql` into Lovable Cloud migrations with RLS.
- Wire dashboard pages to live data.

### Phase 4 — Backend logic, one router at a time
- Port FastAPI routers to edge functions in priority order: metrics → training → limiter → performance → ingestion → oauth/Garmin → billing.
- LLM calls route through Lovable AI Gateway (or you provide an Anthropic key as a secret).
- MCP server + OAuth-as-provider flow are deferred — flag as "not ported" until you decide.

### What I'll do this loop only
Phase 1 above. After it's running I'll hand it back to you to click through, then we move to Phase 2.

## Things I need from you before starting

1. **Confirm the port approach.** Are you okay losing Next.js / FastAPI and rebuilding on React + Vite + Lovable Cloud? If not, keep editing the original repo locally — Lovable can't host that stack.
2. **Languages.** Your README is in Danish, UI strings mix English and Danish. Keep as-is (mixed)?
3. **Anthropic key.** When we hit Phase 4, do you want to reuse your existing Anthropic key (I'll prompt for it as a secret), or use Lovable AI Gateway (no key needed, billed via Lovable Cloud)?
4. **MCP + OAuth-provider features.** OK to defer these indefinitely?

Reply with answers (or just "go") and I'll start Phase 1.
