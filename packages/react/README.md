# `@llmtxt/react`

Generate `llms.txt` and `llms-full.txt` for React SPAs **without a backend** by writing the files into your `public/` folder at build time.

React Router/Vite/CRA apps don’t have a universal “pages directory”, so this package uses an **explicit route list**.

## Install

```bash
npm install -D @llmtxt/react
```

## Usage

Create a route list:

```ts
// llmtxt.routes.ts
import type { LlmtxtRoute } from '@llmtxt/react'

export const routes: LlmtxtRoute[] = [
  { path: '/', title: 'Home', description: 'What this site is about.' },
  { path: '/docs', title: 'Docs' },

  // Dynamic routes must be expanded into concrete paths:
  // { path: '/blog/hello-world', title: 'Hello World' },
]
```

Generate files:

```ts
// scripts/generate-llms.ts
import path from 'path'
import { writeLlmsFiles } from '@llmtxt/react'
import { routes } from '../llmtxt.routes'

await writeLlmsFiles({
  routes,
  baseUrl: process.env.PUBLIC_SITE_URL!, // e.g. https://example.com
  outDir: path.join(process.cwd(), 'public'),
  title: 'My App',
  summary: 'My app documentation for AI models.',
})
```

## Why `llms-full.txt` may look empty in SPAs

If your app is a **client-rendered SPA**, fetching `https://yoursite.com/pricing` usually returns the same `index.html` for every route (no page content). In that case, `llms-full.txt` can end up containing only the shell.

To generate real content you need one of:

1) **SSR / Prerendered HTML** for each route (best), or
2) Provide `route.markdown` per route (recommended for CMS-driven/dynamic pages), or
3) Provide `fetchHtml` to render routes with a headless browser (Playwright/Puppeteer).

## API

### `writeLlmsFiles(options)`

Writes:
- `llms.txt`
- `llms-full.txt`

### Types

```ts
export type LlmtxtRoute = {
  path: string
  title: string
  description?: string
  markdown?: string
}

export type WriteLlmsFilesOptions = {
  routes: LlmtxtRoute[]
  baseUrl: string
  outDir: string
  title?: string
  summary?: string
  fetchTimeoutMs?: number
  htmlToMarkdown?: (html: string, url: string) => Promise<string> | string
  fetchHtml?: (url: string, timeoutMs: number) => Promise<string>
}
```

