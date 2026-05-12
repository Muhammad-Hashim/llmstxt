export default function DocsAPI() {
    return (
        <div className="page">
            <h1>API Reference</h1>

            <section>
                <h2>writeLlmsFiles(options)</h2>
                <p>The main function to generate llms.txt and llms-full.txt files.</p>

                <h3>Parameters</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>routes</code></td>
                            <td><code>LlmtxtRoute[]</code></td>
                            <td>Yes</td>
                            <td>Array of routes to include in documentation</td>
                        </tr>
                        <tr>
                            <td><code>baseUrl</code></td>
                            <td><code>string</code></td>
                            <td>Yes</td>
                            <td>Public base URL (no trailing slash)</td>
                        </tr>
                        <tr>
                            <td><code>outDir</code></td>
                            <td><code>string</code></td>
                            <td>Yes</td>
                            <td>Output directory path (e.g., 'public')</td>
                        </tr>
                        <tr>
                            <td><code>fetchTimeoutMs</code></td>
                            <td><code>number</code></td>
                            <td>No</td>
                            <td>Per-page fetch timeout in milliseconds</td>
                        </tr>
                        <tr>
                            <td><code>htmlToMarkdown</code></td>
                            <td><code>function</code></td>
                            <td>No</td>
                            <td>Custom HTML to Markdown converter</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>LlmtxtRoute Type</h2>
                <pre>{`type LlmtxtRoute = {
  path: string          // Route path (e.g., '/docs')
  title: string         // Page title
  description?: string  // Optional description
}`}</pre>
            </section>

            <section>
                <h2>Example Usage</h2>
                <pre>{`import { writeLlmsFiles } from '@llmtxt/react'

await writeLlmsFiles({
  routes: [
    { path: '/', title: 'Home' },
    { path: '/about', title: 'About', description: 'Learn about us' },
  ],
  baseUrl: 'https://example.com',
  outDir: './public',
  fetchTimeoutMs: 5000,
})`}</pre>
            </section>

            <section>
                <h2>Output Files</h2>
                <p>The function generates two files:</p>
                <ul>
                    <li><strong>llms.txt</strong>: Lightweight documentation with titles and links</li>
                    <li><strong>llms-full.txt</strong>: Full documentation with page content</li>
                </ul>
            </section>
        </div>
    )
}
