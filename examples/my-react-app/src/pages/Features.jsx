export default function Features() {
    const features = [
        {
            title: 'Build-Time Generation',
            description: 'Generate documentation files during your build process, no runtime overhead',
            icon: '⚡'
        },
        {
            title: 'Zero Runtime Dependencies',
            description: 'No additional packages needed in your production bundle',
            icon: '📦'
        },
        {
            title: 'HTML to Markdown',
            description: 'Automatically convert your page HTML to clean Markdown',
            icon: '🔄'
        },
        {
            title: 'Route-Based',
            description: 'Simple configuration with just a route list',
            icon: '🗺️'
        },
        {
            title: 'AI-Friendly',
            description: 'Generate documentation optimized for AI language models',
            icon: '🤖'
        },
        {
            title: 'Flexible Timeouts',
            description: 'Configure per-page fetch timeouts for slow or heavy pages',
            icon: '⏱️'
        },
        {
            title: 'Custom Converters',
            description: 'Provide your own HTML to Markdown converter if needed',
            icon: '🛠️'
        },
        {
            title: 'Environment Aware',
            description: 'Works with different base URLs for preview and production',
            icon: '🌍'
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

            <section className="benefits">
                <h2>Why Use @llmtxt/react?</h2>
                <ul>
                    <li>Automatically keep your AI documentation in sync with your app</li>
                    <li>No server-side rendering or API needed</li>
                    <li>Works with any React framework (Vite, Create React App, etc.)</li>
                    <li>Perfect for SPA applications and static sites</li>
                    <li>Lightweight and fast build process</li>
                </ul>
            </section>
        </div>
    )
}
