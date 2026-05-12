import { Link } from 'react-router-dom'

export default function Docs() {
  return (
    <div className="page">
      <h1>Documentation</h1>
      <p>Complete documentation and resources for using @llmtxt/react</p>

      <div className="docs-grid">
        <div className="doc-card">
          <Link to="/docs/getting-started">
            <h2>Getting Started</h2>
            <p>Quick start guide to set up @llmtxt/react in your project</p>
          </Link>
        </div>

        <div className="doc-card">
          <Link to="/docs/api">
            <h2>API Reference</h2>
            <p>Complete API documentation with examples and use cases</p>
          </Link>
        </div>

        <div className="doc-card">
          <h2>Route discovery</h2>
          <p>Auto-scan `src/pages/**` or provide an explicit route list</p>
        </div>

        <div className="doc-card">
          <h2>Dynamic routes</h2>
          <p>Expand `/blog/:slug` into real paths like `/blog/introducing-v2`</p>
        </div>
      </div>
    </div>
  )
}

