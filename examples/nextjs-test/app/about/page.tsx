import { Navigation, Card } from '@/components/widgets';

export const metadata = {
    title: 'About | LLMsText',
    description: 'About the llmstxt project',
};

export default function About() {
    return (
        <>
            <Navigation links={[{ href: '/', label: 'Home' }, { href: '/about', label: 'About' }]} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About LLMsText</h1>

                <section className="prose prose-lg max-w-none space-y-8 mt-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We believe that modern websites should be easily readable by both humans and AI systems. LLMsText
                            provides a simple, standardized way to make your documentation accessible to AI agents and language
                            models while maintaining excellent SEO and user experience.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem We Solve</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Traditional websites and documentation are designed primarily for human readers. When AI systems try to
                            understand your site structure and content, they often have to parse HTML and navigate complex DOM
                            structures. This is inefficient and can lead to incomplete or inaccurate understanding.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            LLMsText introduces `llms.txt` and `llms-full.txt` formats - simple, standardized text files that
                            provide AI systems with a clear, comprehensive view of your documentation structure and content.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Packages</h2>
                        <div className="grid gap-4">
                            <Card
                                title="@llmstxt/core"
                                description="Framework-agnostic core package for scanning directories and generating documentation"
                            />
                            <Card
                                title="@llmstxt/next"
                                description="Next.js App Router integration with built-in route handlers for /llms.txt and /llms-full.txt"
                            />
                            <Card
                                title="@llmstxt/middleware"
                                description="Next.js middleware that serves markdown to clients accepting text/markdown content"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
                        <p className="text-gray-700 leading-relaxed">
                            LLMsText is open source and community-driven. We welcome contributions, bug reports, and feature
                            requests. Visit our GitHub repository to get started.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
