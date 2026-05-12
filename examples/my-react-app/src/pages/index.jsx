import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to React Demo App</h1>
        <p>A comprehensive example showcasing @llmtxt/react integration</p>
        <div className="cta-buttons">
          <Link to="/docs" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/features" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </div>

      <section className="features-preview">
        <h2>What We Offer</h2>
        <div className="grid">
          <div className="card">
            <h3>📚 Documentation</h3>
            <p>Complete guides and API reference to get you started quickly</p>
          </div>
          <div className="card">
            <h3>⚡ High Performance</h3>
            <p>Optimized for speed with minimal bundle size</p>
          </div>
          <div className="card">
            <h3>🔧 Easy Integration</h3>
            <p>Simple setup process that works with your existing React app</p>
          </div>
          <div className="card">
            <h3>📱 Responsive</h3>
            <p>Works perfectly on desktop, tablet, and mobile devices</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Check out our documentation to learn more about @llmtxt/react</p>
        <Link to="/docs/getting-started" className="btn btn-primary">
          Read Documentation
        </Link>
      </section>
    </div>
  )
}

