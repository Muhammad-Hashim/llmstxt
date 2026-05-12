# `@llmtxt/next`

Next.js App Router route handlers for `llms.txt` and `llms-full.txt` (see [llmstxt.org](https://llmstxt.org)).

Also see [`@llmtxt/core`](https://www.npmjs.com/package/@llmtxt/core) (framework-agnostic generator) and [`@llmtxt/middleware`](https://www.npmjs.com/package/@llmtxt/middleware) (Markdown content negotiation).

## Install

```bash
npm install @llmtxt/next
```

**Peer dependency**: `next >= 13.0.0`

## Environment variables

Set one of these before running or deploying:

| Variable | When to use |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | **Recommended.** Set explicitly for local dev and production |
| `VERCEL_URL` | Vercel only — injected automatically by the platform |

Add to `.env.local` for local development:

```text
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> When `NODE_ENV=development` and neither variable is set, the package falls back to `http://localhost:3000`. Always set `NEXT_PUBLIC_APP_URL` explicitly for predictable results.

## Setup — zero-config (simplest)

Create two route files:

```text
src/app/
  llms.txt/
    route.ts
  llms-full.txt/
    route.ts
```

For `llms.txt`:

**`src/app/llms.txt/route.ts`**:

```ts
export { GET } from '@llmtxt/next'
```

For `llms-full.txt`:

**`src/app/llms-full.txt/route.ts`**:

```ts
import { createLlmsFullTxtHandler } from '@llmtxt/next'
export const GET = createLlmsFullTxtHandler()
```

Then visit `/llms.txt` and `/llms-full.txt`.

## Setup — with options

**`src/app/llms.txt/route.ts`**:

```ts
import { createLlmsTxtHandler } from '@llmtxt/next'

export const GET = createLlmsTxtHandler({
  title: 'My App',
  summary: 'A tool that helps teams collaborate and ship faster.',
  exclude: ['api', '(auth)', '_*', 'admin'],
  maxDescriptionLength: 120,
})
```

**`src/app/llms-full.txt/route.ts`**:

```ts
import { createLlmsFullTxtHandler } from '@llmtxt/next'

export const GET = createLlmsFullTxtHandler({
  fetchTimeoutMs: 8000,
  htmlToMarkdown: async (html, url) => {
    const TurndownService = (await import('turndown')).default
    const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
    return td.turndown(html)
  },
})
```

## Options — `createLlmsTxtHandler`

All options are optional. `appDir` and `baseUrl` are resolved automatically from the environment.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `'Documentation'` | H1 heading in the output |
| `summary` | `string` | — | One-liner summary below the title |
| `exclude` | `string[]` | `['api','_*','(auth)','(private)']` | Route segments to skip. Supports `*` wildcards |
| `extractDescription` | `(input) => string \| undefined` | First `//` comment or `metadata.description` | Custom description extractor |
| `maxDescriptionLength` | `number` | `150` | Truncate descriptions longer than N characters |

## Options — `createLlmsFullTxtHandler`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `fetchTimeoutMs` | `number` | `5000` | Per-page fetch timeout in ms |
| `htmlToMarkdown` | `(html: string, url: string) => Promise<string> \| string` | Built-in HTML stripper | Custom HTML → Markdown converter |
| `exclude` | `string[]` | `['api','_*','(auth)','(private)']` | Route segments to skip |
| `extractDescription` | `(input) => string \| undefined` | First `//` comment or `metadata.description` | Custom description extractor |
| `maxDescriptionLength` | `number` | `150` | Truncate descriptions longer than N characters |

## Caching

Both handlers set `Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400` by default, giving you CDN-level caching with fast revalidation.

## With `@llmtxt/middleware` (optional)

To serve any page as Markdown on `Accept: text/markdown`, add a middleware file:

```ts
// middleware.ts (project root)
export { middleware, config } from '@llmtxt/middleware'
```

See [`@llmtxt/middleware`](https://www.npmjs.com/package/@llmtxt/middleware) for full options.
