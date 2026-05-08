# `@llmstxt/next`

Next.js App Router route handlers for `llms.txt` and `llms-full.txt` (see [llmstxt.org](https://llmstxt.org)).

## Install

```bash
npm install @llmstxt/next
```

## Setup

Create:

```
src/app/llms.txt/route.ts
src/app/llms-full.txt/route.ts
```

`src/app/llms.txt/route.ts`:
```ts
export { GET } from '@llmstxt/next'
```

`src/app/llms-full.txt/route.ts`:
```ts
import { createLlmsFullTxtHandler } from '@llmstxt/next'
export const GET = createLlmsFullTxtHandler()
```

## Required environment variable

Set one of:
- `NEXT_PUBLIC_APP_URL` (recommended)
- `VERCEL_URL` (usually set automatically on Vercel)

## Options

```ts
import { createLlmsTxtHandler } from '@llmstxt/next'

export const GET = createLlmsTxtHandler({
  title: 'My App',
  summary: 'What my app does.',
  exclude: ['api', '(auth)', '_*'],
})
```

