# @llmtxt — `llms.txt`, `llms-full.txt`, and Markdown for agents

Generate `llms.txt` (table of contents) and `llms-full.txt` (full content) from your app’s pages, and optionally serve **any page as Markdown** via content negotiation (`Accept: text/markdown`).

- Standard: [llmstxt.org](https://llmstxt.org)
- Works with: Next.js App Router (`@llmtxt/next`), any Node.js framework (`@llmtxt/core`), and Next.js middleware (`@llmtxt/middleware`)

## Packages

| Package | What it does |
|---|---|
| [`@llmtxt/core`](./packages/core) | Scan your `app/` directory and generate `llms.txt` + `llms-full.txt` |
| [`@llmtxt/next`](./packages/next) | Next.js App Router route handlers for `/llms.txt` and `/llms-full.txt` |
| [`@llmtxt/middleware`](./packages/middleware) | Next.js middleware: any page responds as Markdown on `Accept: text/markdown` |
| [`@llmtxt/react`](./packages/react)  (It’s not working right now. It’s still in the testing phase.
) | Build-time helpers for React SPAs: generate `llms.txt` + `llms-full.txt` from a route list |

## Keywords (SEO)

llms.txt, llms-full.txt, llmtxt, markdown for agents, content negotiation, Next.js, middleware, App Router, AI, LLM, SEO, website indexing, documentation, crawlable content, sitemap alternative

## Table of Contents

- [Quick Start — Next.js (App Router)](#quick-start--nextjs-app-router)
- [Quick Start — Markdown for Agents (Next.js Middleware)](#quick-start--markdown-for-agents-nextjs-middleware)
- [Quick Start — React (Build-time, no backend)](#quick-start--react-build-time-no-backend)
- [Quick Start — Other Frameworks](#quick-start--other-frameworks-express-hono-bun-etc)
- [How It Works](#how-it-works)
- [API Reference (`@llmtxt/core`)](#api-reference-llmtxtcore)
- [Environment Variables (`@llmtxt/next`)](#environment-variables-llmtxtnext)
- [Tips for Better Descriptions](#tips-for-better-descriptions)
- [Development (this repo)](#development-this-repo)
- [License](#license)

---

## Quick Start — Next.js (App Router)

### Install

```bash
npm install @llmtxt/next
```

### Add route handlers

```
src/app/
  llms.txt/
    route.ts
  llms-full.txt/
    route.ts
```

**`src/app/llms.txt/route.ts`** (zero-config):
```ts
export { GET } from '@llmtxt/next'
```

**`src/app/llms-full.txt/route.ts`** (zero-config):
```ts
import { createLlmsFullTxtHandler } from '@llmtxt/next'
export const GET = createLlmsFullTxtHandler()
```

Set one of:
- `NEXT_PUBLIC_APP_URL` (recommended)
- `VERCEL_URL` (usually already set on Vercel)

> Tip: Set `NEXT_PUBLIC_APP_URL` explicitly in local development and production. `@llmtxt/next` will only fall back to `http://localhost:3000` when `NODE_ENV=development`.

Visit:
- `/llms.txt`
- `/llms-full.txt`

### With options

```ts
// src/app/llms.txt/route.ts
import { createLlmsTxtHandler } from '@llmtxt/next'

export const GET = createLlmsTxtHandler({
  title: 'My SaaS App',
  summary: 'A tool that helps teams collaborate and ship faster.',
  exclude: ['api', '(auth)', '_*', 'admin'],
})
```

```ts
// src/app/llms-full.txt/route.ts
import { createLlmsFullTxtHandler } from '@llmtxt/next'

export const GET = createLlmsFullTxtHandler({
  fetchTimeoutMs: 8000,
  htmlToMarkdown: async (html) => {
    const { convert } = await import('html-to-text')
    return convert(html)
  },
})
```

---

## Quick Start — Markdown for Agents (Next.js Middleware)

Serve the Markdown version of **any page** when a client sends `Accept: text/markdown`.

### Install

```bash
npm install @llmtxt/middleware
```

### Add middleware

```ts
// middleware.ts (project root)
export { middleware, config } from '@llmtxt/middleware'
```

This returns:
- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept` (so CDNs cache HTML and Markdown separately)
- `x-markdown-tokens` (token estimate for context sizing)
- `Content-Signal` (content usage preferences)

Test it:

```bash
curl https://yoursite.com/blog/my-post -H "Accept: text/markdown"
```

For best Markdown quality in production, plug in `@mozilla/readability` + `turndown` (see `packages/middleware/README.md`).

---

## Quick Start — React (Build-time, no backend)

For React SPAs (Vite/CRA/React Router), generate the files at build time and ship them from `public/`.

```bash
npm install -D @llmtxt/react
```

Create a route list:

```ts
// llmtxt.routes.ts
import type { LlmtxtRoute } from '@llmtxt/react'

export const routes: LlmtxtRoute[] = [
  { path: '/', title: 'Home', description: 'What this site is about.' },
  { path: '/docs', title: 'Docs' },
]
```

Generate:

```ts
// scripts/generate-llms.ts
import path from 'path'
import { writeLlmsFiles } from '@llmtxt/react'
import { routes } from '../llmtxt.routes'

await writeLlmsFiles({
  routes,
  baseUrl: process.env.PUBLIC_SITE_URL!, // e.g. https://example.com
  outDir: path.join(process.cwd(), 'public'),
})
```

Run it after deploy (recommended) or against a preview server:

```bash
PUBLIC_SITE_URL=https://example.com node scripts/generate-llms.ts
```

---

## Quick Start — Other Frameworks (Express, Hono, Bun, etc.)

```bash
npm install @llmtxt/core
```

```ts
import { generateLlmsTxt, generateLlmsFullTxt } from '@llmtxt/core'
import path from 'path'

app.get('/llms.txt', async (req, res) => {
  const txt = await generateLlmsTxt({
    appDir: path.join(process.cwd(), 'src/app'),
    baseUrl: 'https://example.com',
    title: 'My App',
    summary: 'What my app does.',
  })
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.send(txt)
})

app.get('/llms-full.txt', async (req, res) => {
  const txt = await generateLlmsFullTxt({
    appDir: path.join(process.cwd(), 'src/app'),
    baseUrl: 'https://example.com',
  })
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.send(txt)
})
```

---

## How It Works

### `llms.txt` (Table of contents)
`@llmtxt/core` scans your `app/` directory for `page.tsx`/`page.jsx`/`page.ts`/`page.js` files and produces a structured
index of links + descriptions. LLMs use this like a sitemap to understand what your site covers.

Example output:

```
# My App

> A tool that helps teams ship faster.

## Blog

- [Getting Started](https://example.com/blog/getting-started): Introduction to the platform
- [Advanced Usage](https://example.com/blog/advanced): Deep-dives and recipes

---
*Generated by @llmtxt/core · 2025-01-01T00:00:00.000Z · 12 pages*
```

### `llms-full.txt` (Full content)
Same scan, but also fetches and converts each page to Markdown (or plain text by default). This produces one big file containing your site’s content for ingestion.

### `Accept: text/markdown` (Markdown for agents)
`@llmtxt/middleware` adds content negotiation to your Next.js app: when a client requests any URL with `Accept: text/markdown`, it re-fetches that page as HTML, converts it to Markdown, and returns it with `Content-Type: text/markdown`, `Vary: Accept`, and `x-markdown-tokens`.

## Why this helps SEO (and AI discoverability)

Search engines don’t directly “rank” `llms.txt`, but having clean, crawlable pages with accurate titles/descriptions helps both humans and models.
These files are primarily for **LLM discoverability**: they provide a structured summary and/or full content in a format that’s easy to ingest.

---

## API Reference (`@llmtxt/core`)

### `generateLlmsTxt(options)`
Generates `llms.txt` as a string.

### `generateLlmsFullTxt(options)`
Generates `llms-full.txt` as a string (fetches pages and converts HTML→text/Markdown).

### Options

#### `LlmsTxtOptions` (shared)

| Option | Type | Default | Description |
|---|---|---|---|
| `appDir` | `string` | — | Absolute path to your `app/` directory |
| `baseUrl` | `string` | — | Public base URL, e.g. `https://example.com` |
| `exclude` | `string[]` | `['api','_*','(auth)','(private)']` | Route segments to skip (supports `*` wildcards) |
| `extractDescription` | `(input) => string \| undefined` | First `//` comment or `metadata.description` | Custom description extractor |
| `maxDescriptionLength` | `number` | `150` | Truncate descriptions at N chars |

#### `GenerateLlmsTxtOptions` (additional)

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Documentation'` | H1 title in the output |
| `summary` | `string` | — | One-liner below the title |

#### `GenerateLlmsFullTxtOptions` (additional)

| Option | Type | Default | Description |
|---|---|---|---|
| `fetchTimeoutMs` | `number` | `5000` | Per-page fetch timeout |
| `htmlToMarkdown` | `(html) => Promise<string> \| string` | Built-in stripper | Custom HTML→Markdown converter |

---

## Environment Variables (`@llmtxt/next`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Your public app root URL, e.g. `https://example.com` — recommended for production and local dev |
| `VERCEL_URL` | Automatically set by Vercel; used as a fallback if `NEXT_PUBLIC_APP_URL` is missing |

> Note: When `NODE_ENV=development`, `@llmtxt/next` will default to `http://localhost:3000` if neither variable is set. For predictable results, always set `NEXT_PUBLIC_APP_URL` in `.env.local` or your deployment environment.

---

## Packages included

This repository publishes three npm packages:

- `@llmtxt/core` — framework-agnostic generator for `llms.txt` and `llms-full.txt`
- `@llmtxt/next` — Next.js App Router route handlers for `llms.txt` and `llms-full.txt`
- `@llmtxt/middleware` — Next.js middleware that serves Markdown on `Accept: text/markdown`

Install only the packages you need:

```bash
npm install @llmtxt/core
npm install @llmtxt/next
npm install @llmtxt/middleware
```

See each package README for the full option reference.

---

## Tips for Better Descriptions

The scanner extracts descriptions automatically. Help it by adding a comment at the top of each page:

```tsx
// The main dashboard showing user analytics and recent activity.
export default function DashboardPage() {
  ...
}
```

Or use Next.js `metadata`:
```tsx
export const metadata = {
  description: 'The main dashboard showing user analytics.',
}
```

---

## Development (this repo)

Install deps:
```bash
npm install
```

Build:
```bash
npm run build
```

Test:
```bash
npm test
```

---

## License

MIT
