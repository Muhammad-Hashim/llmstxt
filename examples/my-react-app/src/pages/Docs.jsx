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
                    <h2>Configuration</h2>
                    <p>Learn how to configure routes and generation options</p>
                </div>

                <div className="doc-card">
                    <h2>Examples</h2>
                    <p>Real-world examples and code snippets</p>
                </div>
            </div>

            <section className="doc-section">
                <h2>Overview</h2>
                <p>
                    @llmtxt/react is a build-time helper for React SPAs to generate llms.txt and llms-full.txt
                    documentation files automatically. It works by taking an explicit route list and generating
                    files into your public folder during the build process.
                </p>
                <p>
                    Since React apps don't have a universal "pages directory" like Next.js, this package
                    requires you to explicitly define your routes in a configuration file.
                </p>
            </section>
        </div>
    )
}
