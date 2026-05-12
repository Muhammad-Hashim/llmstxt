export default function Features() {
  const features = [
    {
      title: 'Build-Time Generation',
      description: 'Generate documentation files during your build process, no runtime overhead',
      icon: '⚡',
    },
    {
      title: 'Zero Runtime Dependencies',
      description: 'No additional packages needed in your production bundle',
      icon: '📦',
    },
    {
      title: 'HTML to Markdown',
      description: 'Automatically convert your page HTML to clean Markdown',
      icon: '🔄',
    },
    {
      title: 'Route Discovery',
      description: 'Auto-scan src/pages or provide an explicit route list',
      icon: '🗺️',
    },
  ]

  return (
    <div className="page">
      <h1>Features</h1>
      <p className="subtitle">Powerful capabilities for documentation generation</p>

      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

