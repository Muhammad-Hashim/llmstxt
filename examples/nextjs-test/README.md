# LLMsText Next.js Example Application

This example demonstrates all features of the @llmstxt packages including:

- `@llmstxt/core` for scanning and generating documentation
- `@llmstxt/next` for Next.js route handlers
- `@llmstxt/middleware` for markdown content negotiation

## Features Demonstrated

- **Multiple Pages**: Docs, Blog, Features, Pricing, About, API Reference
- **Fake Widgets & Components**: Reusable UI components
- **Auto-Generated Documentation**: Visit `/llms.txt` and `/llms-full.txt`
- **Markdown Middleware**: Request any page with `Accept: text/markdown` header

## Getting Started

1. Install dependencies from project root:

```bash
npm install
npm run build
```

1. Set environment variable:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> For local development, put this in `.env.local` so Next.js and `@llmstxt/next` can resolve your public site URL.

1. Run the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000)

## Testing

- Visit `/llms.txt` - Auto-generated documentation index
- Visit `/llms-full.txt` - Full documentation with page content
- Use `curl -H "Accept: text/markdown" http://localhost:3000/docs/getting-started` - Test markdown middleware
