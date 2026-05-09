# Examples

This folder contains two example projects for local testing of the monorepo packages:

- `basic-test` — a simple TypeScript script that imports `@llmstxt/core` and generates `llms.txt` locally.
- `next-app-test` — a minimal Next.js App Router project that consumes `@llmstxt/next` and exposes `/llms.txt` and `/llms-full.txt`.

## Getting started

1. Build the workspace packages from the repository root:

```bash
npm install
npm run build
```

1. Run the basic example:

```bash
cd examples/basic-test
npm install
npm start
```

1. Run the Next.js example:

```bash
cd examples/next-app-test
npm install
cp .env.local.example .env.local
npm run dev
```

If you add new changes to `packages/core`, `packages/next`, or `packages/middleware`, re-run `npm run build` at the repository root before starting the examples.
