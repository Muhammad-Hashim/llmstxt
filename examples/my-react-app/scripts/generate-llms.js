import path from 'path'
import { scanPagesDirForRoutes, writeLlmsFiles } from '@llmtxt/react'

const baseUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173'
const outDir = path.join(process.cwd(), 'public')
const renderMode = (process.env.LLMTXT_RENDER || '').toLowerCase()
const pagesDir = path.join(process.cwd(), 'src/pages')

console.log('Generating llms.txt files...')
console.log(`  Base URL: ${baseUrl}`)
console.log(`  Output: ${outDir}`)
console.log(`  Pages dir: ${pagesDir}`)

async function fetchHtmlWithPlaywright(url, timeoutMs) {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(timeoutMs)
    await page.goto(url, { waitUntil: 'networkidle' })
    return await page.content()
  } finally {
    await browser.close()
  }
}

const scannedRoutes = await scanPagesDirForRoutes({ pagesDir, skipDynamic: true })
console.log(`  Scanned routes: ${scannedRoutes.length}`)

await writeLlmsFiles({
  routes: [
    ...scannedRoutes,
    // Dynamic routes must be expanded into real paths.
    { path: '/blog/introducing-v2', title: 'Introducing v2', description: 'Major release announcement' },
    { path: '/blog/best-practices', title: 'Best Practices', description: 'Development best practices' },
    { path: '/blog/performance-tips', title: 'Performance Tips', description: 'Tips for large sites' },
    { path: '/blog/integrations', title: 'New Integrations', description: 'New integrations available' },
  ],
  baseUrl,
  outDir,
  title: 'React Demo App',
  summary: 'Comprehensive demo React application showcasing @llmtxt/react integration',

  // React SPAs are client-rendered. Plain fetch() returns index.html for every route.
  // To capture real rendered HTML, set: LLMTXT_RENDER=playwright and install playwright.
  fetchHtml:
    renderMode === 'playwright'
      ? (url, timeoutMs) => fetchHtmlWithPlaywright(url, timeoutMs)
      : undefined,
})

console.log('✓ Generated llms.txt and llms-full.txt')
