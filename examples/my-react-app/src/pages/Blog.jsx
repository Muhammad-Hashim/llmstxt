import { Link } from 'react-router-dom'

export default function Blog() {
    const posts = [
        {
            slug: 'introducing-v2',
            title: 'Introducing v2',
            date: 'May 12, 2026',
            excerpt: 'Major release with new features and improvements for better documentation generation'
        },
        {
            slug: 'best-practices',
            title: 'Best Practices for Documentation',
            date: 'May 5, 2026',
            excerpt: 'Tips and tricks for writing great documentation that works well with LLMs'
        },
        {
            slug: 'performance-tips',
            title: 'Performance Tips for Large Sites',
            date: 'April 28, 2026',
            excerpt: 'Optimize your documentation generation for large React applications'
        },
        {
            slug: 'integrations',
            title: 'New Integrations Available',
            date: 'April 20, 2026',
            excerpt: 'Connect with Stripe, Slack, GitHub, and more from your documentation'
        }
    ]

    return (
        <div className="page">
            <h1>Blog</h1>
            <p className="subtitle">Latest news, tips, and updates</p>

            <div className="blog-list">
                {posts.map((post) => (
                    <article key={post.slug} className="blog-item">
                        <Link to={`/blog/${post.slug}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <div className="blog-meta">
                            <span className="date">{post.date}</span>
                        </div>
                        <p className="excerpt">{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`} className="read-more">Read More →</Link>
                    </article>
                ))}
            </div>
        </div>
    )
}
