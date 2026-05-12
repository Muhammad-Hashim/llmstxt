# `@llmtxt/react`

Build-time helpers for React SPAs to generate `llms.txt` and `llms-full.txt` **without a backend**.

React apps (Vite/CRA/React Router) don’t have a universal “pages directory” like Next.js App Router, so this package works by taking an **explicit route list** and generating files into your `public/` (or `dist/`) folder during CI/build.

---

## Install

```bash
npm install -D @llmtxt/react
```

---

## 1) Create a route list

Create `llmtxt.routes.ts`:

```ts
import type { LlmtxtRoute } from '@llmtxt/react'

export const routes: LlmtxtRoute[] = [
  { path: '/', title: 'Home', description: 'What this site is about.' },
  { path: '/docs', title: 'Docs', description: 'Documentation index.' },
  { path: '/pricing', title: 'Pricing' },
]
```

---

## 2) Generate `public/llms.txt` and `public/llms-full.txt`

Create `scripts/generate-llms.ts`:

```ts
import path from 'path'
import { writeLlmsFiles } from '@llmtxt/react'
import { routes } from '../llmtxt.routes'

await writeLlmsFiles({
  routes,
  baseUrl: process.env.PUBLIC_SITE_URL!, // e.g. https://example.com
  outDir: path.join(process.cwd(), 'public'),
})
```

Run it in CI after deploy (recommended) or against a preview server:

```bash
PUBLIC_SITE_URL=https://example.com node scripts/generate-llms.ts
```

---

## How it works

- `llms.txt` is generated purely from your route list (titles + descriptions).
- `llms-full.txt` fetches each route from `baseUrl` and converts the returned HTML into Markdown using a built-in dependency-free converter (you can override it).

---

## API

### `writeLlmsFiles(options)`

Writes:
- `llms.txt`
- `llms-full.txt`

### Options

| Option | Type | Required | Description |
|---|---|---:|---|
| `routes` | `LlmtxtRoute[]` | yes | Routes to include |
| `baseUrl` | `string` | yes | Public base URL (no trailing slash) |
| `outDir` | `string` | yes | Folder to write files (e.g. `public`) |
| `fetchTimeoutMs` | `number` | no | Per-page fetch timeout |
| `htmlToMarkdown` | `(html, url) => string \| Promise<string>` | no | Custom converter |

