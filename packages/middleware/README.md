# `@llmstxt/middleware`

Next.js middleware that serves **any page as Markdown** when the request includes `Accept: text/markdown`.

This mirrors Cloudflare's "Markdown for Agents" content-negotiation pattern, but runs entirely inside your own Next.js app.

---

## Install

```bash
npm install @llmstxt/middleware
```

---

## Usage (one line)

```ts
// middleware.ts (project root)
export { middleware, config } from '@llmstxt/middleware'
```

Test it:

```bash
curl https://yoursite.com/blog/my-post -H "Accept: text/markdown"
```

---

## Response headers

- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- `x-markdown-tokens: <estimated token count>`
- `Content-Signal: <content usage preferences>`

---

## With options

```ts
// middleware.ts
import { createMarkdownMiddleware } from '@llmstxt/middleware'

export const middleware = createMarkdownMiddleware({
  // Opt-out of AI training while allowing agents to read
  contentSignal: 'ai-train=no, search=yes, ai-input=yes',

  // Better HTML→Markdown output (optional)
  htmlToMarkdown: async (html) => {
    const TurndownService = (await import('turndown')).default
    const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
    return td.turndown(html)
  },
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## Better Markdown quality (Readability + Turndown)

```bash
npm install turndown @mozilla/readability jsdom
```

```ts
import { createMarkdownMiddleware } from '@llmstxt/middleware'
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
```

