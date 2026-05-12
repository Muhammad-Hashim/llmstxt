# React Demo App with @llmtxt/react

A comprehensive example React application demonstrating how to use `@llmtxt/react` to generate AI-friendly documentation from your Vite + React SPA.

## Features

- **11+ Demo Pages** including Home, Docs, Pricing, Blog, and more
- **React Router** for full SPA navigation
- **Responsive Design** with modern CSS styling
- **@llmtxt/react Integration** for automatic documentation generation

## Pages Included

### Core Pages

- **Home** (`/`) - Welcome and feature overview
- **Documentation** (`/docs`) - Documentation index
  - Getting Started (`/docs/getting-started`)
  - API Reference (`/docs/api`)
- **Features** (`/features`) - Feature showcase
- **Pricing** (`/pricing`) - Pricing plans
- **Blog** (`/blog`) - Blog post listing
  - Individual Posts (`/blog/:slug`)
- **About** (`/about`) - About page
- **Contact** (`/contact`) - Contact form
- **FAQ** (`/faq`) - Frequently asked questions

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Then visit `http://localhost:5173`

### 3. Generate Documentation

After deploying your app, generate the documentation:

```bash
PUBLIC_SITE_URL=http://localhost:5173 npm run generate:llms
```

> Note: Because this is a client-rendered SPA, plain fetch() returns `index.html` for every route.
> For “real” `llms-full.txt` content, use prerender/SSR HTML, provide `route.markdown`, or render with Playwright:
>
> ```bash
> npm i -D playwright
> LLMTXT_RENDER=playwright PUBLIC_SITE_URL=http://localhost:5173 npm run generate:llms
> ```

This creates:

- `public/llms.txt` - Lightweight documentation index
- `public/llms-full.txt` - Full documentation with page content

## How It Works

1. **Route Discovery**:
   - Static routes are auto-scanned from `src/pages/**` via `scanPagesDirForRoutes()`
   - Dynamic routes (e.g. `/blog/:slug`) must be expanded into concrete paths in the generator script

2. **Generation Script** (`scripts/generate-llms.js`):
   - Fetches each route from your running app
   - Converts HTML to Markdown
   - Writes documentation files to `public/`

3. **Build Process**:
   - `npm run build` runs Vite build + generation script
   - Files are included in your deployment

## File Structure

```
my-react-app/
├── src/
│   ├── pages/           # Individual page components
│   ├── App.jsx          # Main app with routing
│   ├── App.css          # Styling
│   └── main.jsx         # Entry point
├── scripts/
│   └── generate-llms.js # Documentation generator
├── src/pages/           # Convention-based pages (used for auto-scan)
└── package.json         # Dependencies
```

## Customization

### Add a New Page

1. Create a component in `src/pages/MyPage.jsx`
2. Add route to `App.jsx`
3. Add/update routes in `scripts/generate-llms.js`

### Customize Documentation Generation

Edit `scripts/generate-llms.js`:

```js
await writeLlmsFiles({
  routes,
  baseUrl: process.env.PUBLIC_SITE_URL || 'http://localhost:5173',
  outDir: path.join(process.cwd(), 'public'),
  fetchTimeoutMs: 5000,           // Per-page timeout
  // htmlToMarkdown: customConverter  // Optional custom converter
})
```

## Viewing Generated Documentation

After running `npm run generate:llms`:

```bash
cat public/llms.txt       # Lightweight index
cat public/llms-full.txt  # Full documentation
```

## Environment Variables

- `PUBLIC_SITE_URL` - Your app's public URL (used for documentation generation)

For local development:

```bash
PUBLIC_SITE_URL=http://localhost:5173
```

For production:

```bash
PUBLIC_SITE_URL=https://your-app.com
```

## Learn More

- [@llmtxt/react](../../packages/react/) - Package documentation
- [llmstxt.org](https://llmstxt.org) - Format specification
