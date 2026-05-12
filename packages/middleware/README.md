# `@llmtxt/middleware`

Next.js middleware that serves **any page as Markdown** when the request includes `Accept: text/markdown`.

This implements the "Markdown for Agents" content-negotiation pattern: AI agents and LLMs can request a clean Markdown version of any page by sending `Accept: text/markdown`, while browsers continue to receive HTML normally.

Also see [`@llmtxt/next`](https://www.npmjs.com/package/@llmtxt/next) for `llms.txt` and `llms-full.txt` route handlers.

## Install

```bash
npm install @llmtxt/middleware
```

**Peer dependency**: `next >= 13.0.0`

## Usage — one line

```ts
// middleware.ts (project root)
export { middleware, config } from '@llmtxt/middleware'
```

Test it:

```bash
curl https://yoursite.com/blog/my-post -H "Accept: text/markdown"
```

## Response headers

| Header | Value |
| --- | --- |
| `Content-Type` | `text/markdown; charset=utf-8` |
| `Vary` | `Accept` (so CDNs cache HTML and Markdown separately) |
| `x-markdown-tokens` | Estimated token count (rough GPT-style approximation) |
| `Content-Signal` | Content usage preferences (see [contentsignals.org](https://contentsignals.org)) |
| `Cache-Control` | `private, max-age=0, no-store` (configurable) |

The response also includes a YAML front matter block at the top of each Markdown response:

```text
---
title: "About | My App"
url: "https://example.com/about"
description: "Learn more about who we are."
generated: "2026-01-01T00:00:00.000Z"
---
```

## Usage — with options

```ts
// middleware.ts (project root)
import { createMarkdownMiddleware } from '@llmtxt/middleware'

export const middleware = createMarkdownMiddleware({
  contentSignal: 'ai-train=no, search=yes, ai-input=yes',
  fetchTimeoutMs: 10000,
  includeFrontMatter: true,
  cacheControl: 'private, max-age=0, no-store',
  exclude: ['api/*', 'admin/*'],

  // Optional: better HTML→Markdown conversion
  htmlToMarkdown: async (html, url) => {
    const TurndownService = (await import('turndown')).default
    const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
    return td.turndown(html)
  },
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

## All options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `exclude` | `string[]` | `['_next/*','api/*','*.ico','*.png','*.jpg','*.jpeg','*.gif','*.svg','*.webp','*.css','*.js','llms.txt','llms-full.txt']` | URL path patterns to skip. Supports `*` wildcards |
| `htmlToMarkdown` | `(html: string, url: string) => Promise<string> \| string` | Built-in HTML stripper | Custom HTML → Markdown converter |
| `estimateTokens` | `(markdown: string) => number` | `Math.ceil(text.length / 4)` | Custom token estimator for `x-markdown-tokens` header |
| `contentSignal` | `string` | `'ai-train=yes, search=yes, ai-input=yes'` | Value for the `Content-Signal` header |
| `fetchTimeoutMs` | `number` | `10000` | Timeout in ms for fetching the HTML version of a page |
| `includeFrontMatter` | `boolean` | `true` | Include YAML front matter (title, url, description, generated) at the top of each response |
| `cacheControl` | `string` | `'private, max-age=0, no-store'` | `Cache-Control` header for Markdown responses |

## Better Markdown quality (Readability + Turndown)

The built-in converter is dependency-free but basic. For production-quality Markdown:

```bash
npm install turndown @mozilla/readability jsdom
```

```ts
import { createMarkdownMiddleware } from '@llmtxt/middleware'
import TurndownService from 'turndown'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

export const middleware = createMarkdownMiddleware({
  htmlToMarkdown: async (html, url) => {
    const dom = new JSDOM(html, { url })
    const article = new Readability(dom.window.document).parse()
    if (!article) return ''
    const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
    return `# ${article.title}\n\n${td.turndown(article.content)}`
  },
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|map)$).*)'],
}
```

## How it works

1. An incoming request arrives with `Accept: text/markdown` in the header
2. The middleware clones the request and re-fetches the same URL with `Accept: text/html`
3. The HTML response is converted to Markdown using the configured `htmlToMarkdown` function
4. The Markdown is returned with appropriate headers (`Content-Type`, `Vary`, `x-markdown-tokens`, `Content-Signal`)
5. Requests that do not include `Accept: text/markdown` pass through untouched

