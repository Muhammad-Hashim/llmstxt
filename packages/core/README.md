# `@llmstxt/core`

Framework-agnostic scanner & generator for `llms.txt` and `llms-full.txt` (see [llmstxt.org](https://llmstxt.org)).

## Install

```bash
npm install @llmstxt/core
```

## Usage

```ts
import { generateLlmsTxt, generateLlmsFullTxt } from '@llmstxt/core'
import path from 'path'

const appDir = path.join(process.cwd(), 'src/app')
const baseUrl = 'https://example.com'

const llmsTxt = await generateLlmsTxt({
  appDir,
  baseUrl,
  title: 'Example Docs',
  summary: 'What this site is about.',
})

const llmsFullTxt = await generateLlmsFullTxt({
  appDir,
  baseUrl,
})
```

## What gets scanned

`@llmstxt/core` recursively finds `page.tsx`/`page.jsx`/`page.ts`/`page.js` under `appDir`.

## Description extraction (for `llms.txt`)

By default, descriptions come from:
- The first `// ...` comment near the top of the file, or
- `export const metadata = { description: '...' }`

You can override this via `extractDescription`.

