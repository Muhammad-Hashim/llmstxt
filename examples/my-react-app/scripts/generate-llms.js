import path from 'path'
import { writeLlmsFiles } from '@llmtxt/react'
import { routes } from '../llmtxt.routes.js'

const baseUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173'
const outDir = path.join(process.cwd(), 'public')
const renderMode = (process.env.LLMTXT_RENDER || '').toLowerCase()

console.log('Generating llms.txt files...')
console.log(`  Base URL: ${baseUrl}`)
console.log(`  Output: ${outDir}`)
console.log(`  Routes: ${routes.length}`)

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

await writeLlmsFiles({
  routes,
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

