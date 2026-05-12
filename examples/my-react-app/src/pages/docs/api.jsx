export default function DocsAPI() {
  return (
    <div className="page">
      <h1>API Reference</h1>

      <section>
        <h2>writeLlmsFiles(options)</h2>
        <p>Generates llms.txt and llms-full.txt files.</p>

        <h3>Common options</h3>
        <ul>
          <li>
            <code>routes</code> (required): routes to include
          </li>
          <li>
            <code>baseUrl</code> (required): public site URL
          </li>
          <li>
            <code>outDir</code> (required): usually <code>public</code>
          </li>
          <li>
            <code>title</code>/<code>summary</code>: llms.txt header content
          </li>
          <li>
            <code>fetchHtml</code>: render SPAs with Playwright/Puppeteer instead of plain fetch
          </li>
          <li>
            <code>route.markdown</code>: precomputed Markdown per route (best for dynamic routes)
          </li>
        </ul>
      </section>

      <section>
        <h2>scanPagesDirForRoutes(options)</h2>
        <p>
          Convention-based route discovery for projects that keep page components in{' '}
          <code>src/pages/**</code>. Dynamic files like <code>[slug].tsx</code> are skipped by default.
        </p>
      </section>
    </div>
  )
}

