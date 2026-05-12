import { useParams } from 'react-router-dom'

export default function BlogPost() {
    const { slug } = useParams()

    const posts = {
        'introducing-v2': {
            title: 'Introducing v2',
            date: 'May 12, 2026',
            author: 'John Doe',
            content: `We're excited to announce the release of @llmtxt/react v2! This major update brings significant improvements and new features.

## What's New

### Better Performance
We've optimized the HTML to Markdown conversion process, making it 50% faster on average. Large documentation sites now generate in seconds instead of minutes.

### Enhanced Configuration
New options allow you to customize how your documentation is generated. Set per-route timeouts, provide custom converters, and more.

### Improved Error Handling
Better error messages and fallback strategies ensure your build process is reliable and maintainable.

## Migration Guide

Upgrading from v1 is easy. In most cases, your existing configuration will work without any changes. See our migration guide for details.

## Thank You

Special thanks to our community for feedback and contributions that made this release possible!`
        },
        'best-practices': {
            title: 'Best Practices for Documentation',
            date: 'May 5, 2026',
            author: 'Jane Smith',
            content: `Writing good documentation is an art and a science. Here are our best practices for creating documentation that works well with AI language models.

## Clear, Concise Content

Write in short paragraphs with clear headings. AI models perform better when content is well-structured and easy to parse.

## Use Descriptive Titles

Page titles should clearly describe what the page is about. This helps both humans and AI understand your content at a glance.

## Include Code Examples

Provide real, working code examples. Documentation without examples is harder for AI to understand and learn from.

## Maintain Consistency

Use consistent terminology and formatting throughout your documentation. This improves comprehension for both humans and AI.

## Regular Updates

Keep your documentation up-to-date with your latest features. Outdated documentation can mislead AI models.`
        },
        'performance-tips': {
            title: 'Performance Tips for Large Sites',
            date: 'April 28, 2026',
            author: 'Mike Johnson',
            content: `If you have a large site with hundreds or thousands of pages, here are some tips to optimize your documentation generation.

## Use Selective Routes

You don't need to document every route. Focus on user-facing pages and skip admin pages, API routes, and internal tools.

## Set Appropriate Timeouts

Large pages or slow servers may need higher timeouts. Set \`fetchTimeoutMs\` based on your page load times.

## Parallel Generation

Generate documentation in parallel across multiple processes or machines for faster builds.

## Caching Strategy

Cache frequently accessed resources to avoid redundant fetches during development.`
        },
        'integrations': {
            title: 'New Integrations Available',
            date: 'April 20, 2026',
            author: 'Sarah Williams',
            content: `We're thrilled to announce new integrations that extend the capabilities of @llmtxt/react.

## Available Integrations

### Stripe
Connect your Stripe account to document your payment integrations and pricing pages automatically.

### Slack
Send documentation updates to your team's Slack channel whenever your docs are regenerated.

### GitHub
Automatically commit generated documentation files to your GitHub repository.

### SendGrid
Generate and email updated documentation to stakeholders.

### Datadog
Monitor the performance of your documentation generation process.

### Sentry
Track errors that occur during documentation generation and deployment.

More integrations are coming soon. Let us know what you'd like to see next!`
        }
    }

    const post = posts[slug]

    if (!post) {
        return <div className="page"><h1>Post not found</h1></div>
    }

    return (
        <div className="page">
            <article className="blog-post">
                <h1>{post.title}</h1>
                <div className="post-meta">
                    <span className="date">{post.date}</span>
                    <span className="author">By {post.author}</span>
                </div>
                <div className="post-content">
                    {post.content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('#')) {
                            const level = paragraph.match(/^#+/)[0].length
                            const text = paragraph.replace(/^#+\s/, '')
                            const HeadingTag = `h${level + 1}`
                            return <HeadingTag key={idx}>{text}</HeadingTag>
                        }
                        if (paragraph.startsWith('-')) {
                            const items = paragraph.split('\n').map(line => line.replace(/^-\s/, ''))
                            return (
                                <ul key={idx}>
                                    {items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            )
                        }
                        return <p key={idx}>{paragraph}</p>
                    })}
                </div>
            </article>
        </div>
    )
}
