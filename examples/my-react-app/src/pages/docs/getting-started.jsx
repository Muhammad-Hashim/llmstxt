export default function DocsGettingStarted() {
  return (
    <div className="page">
      <h1>Getting Started with @llmtxt/react</h1>

      <section>
        <h2>Installation</h2>
        <p>Install the package as a dev dependency:</p>
        <pre>npm install -D @llmtxt/react</pre>
      </section>

      <section>
        <h2>Step 1: Discover routes</h2>
        <p>
          You can either provide an explicit route list, or (if you follow a pages-folder
          convention) auto-scan it.
        </p>
        <pre>{`import path from 'path'
import { scanPagesDirForRoutes } from '@llmtxt/react'

const routes = await scanPagesDirForRoutes({
  pagesDir: path.join(process.cwd(), 'src/pages'),
  skipDynamic: true,
})`}</pre>
        <p>
          Dynamic routes like <code>/blog/:slug</code> must be expanded into concrete paths (e.g.{' '}
          <code>/blog/introducing-v2</code>) in your generator script.
        </p>
      </section>

      <section>
        <h2>Step 2: Create generation script</h2>
        <p>Create <code>scripts/generate-llms.js</code>:</p>
        <pre>{`import path from 'path'
import { scanPagesDirForRoutes, writeLlmsFiles } from '@llmtxt/react'

const baseUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173'
const outDir = path.join(process.cwd(), 'public')
const pagesDir = path.join(process.cwd(), 'src/pages')

const routes = await scanPagesDirForRoutes({ pagesDir, skipDynamic: true })

await writeLlmsFiles({
  routes: [
    ...routes,
    // expand dynamic routes here:
    { path: '/blog/introducing-v2', title: 'Introducing v2' },
  ],
  baseUrl,
  outDir,
})`}</pre>
      </section>

      <section>
        <h2>Step 3: Run after build/deploy</h2>
        <p>After deploying your app, run:</p>
        <pre>PUBLIC_SITE_URL=https://example.com npm run generate:llms</pre>
        <p>This will fetch your pages and generate llms.txt and llms-full.txt files.</p>
      </section>
    </div>
  )
}

