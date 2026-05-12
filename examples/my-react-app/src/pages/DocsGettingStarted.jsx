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
                <h2>Step 1: Create a Route List</h2>
                <p>Create a file named <code>llmtxt.routes.ts</code> or <code>.js</code>:</p>
                <pre>{`export const routes = [
  { path: '/', title: 'Home', description: 'Homepage' },
  { path: '/docs', title: 'Docs', description: 'Documentation' },
  { path: '/pricing', title: 'Pricing', description: 'Pricing plans' },
]`}</pre>
            </section>

            <section>
                <h2>Step 2: Create Generation Script</h2>
                <p>Create <code>scripts/generate-llms.js</code>:</p>
                <pre>{`import path from 'path'
import { writeLlmsFiles } from '@llmtxt/react'
import { routes } from '../llmtxt.routes.js'

await writeLlmsFiles({
  routes,
  baseUrl: process.env.PUBLIC_SITE_URL || 'http://localhost:5173',
  outDir: path.join(process.cwd(), 'public'),
})`}</pre>
            </section>

            <section>
                <h2>Step 3: Update Build Script</h2>
                <p>Update your package.json to run the generator after build:</p>
                <pre>{`"scripts": {
  "build": "vite build && npm run generate:llms",
  "generate:llms": "node scripts/generate-llms.js"
}`}</pre>
            </section>

            <section>
                <h2>Step 4: Deploy and Generate</h2>
                <p>After deploying your app, run:</p>
                <pre>PUBLIC_SITE_URL=https://example.com npm run generate:llms</pre>
                <p>This will fetch your pages and generate llms.txt and llms-full.txt files.</p>
            </section>
        </div>
    )
}
