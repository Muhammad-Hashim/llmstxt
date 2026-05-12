import { Navigation, Card } from '@/components/widgets';

export const metadata = {
    title: 'Blog | LLMsText',
    description: 'Blog posts about llmtxt',
};

export default function Blog() {
    return (
        <>
            <Navigation
                links={[
                    { href: '/', label: 'Home' },
                    { href: '/blog', label: 'Blog' },
                    { href: '/features', label: 'Features' },
                ]}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
                <p className="text-xl text-gray-600 mb-8">Latest posts about documentation and AI integration</p>

                <div className="space-y-6">
                    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            <a href="/blog/posts" className="text-blue-600 hover:underline">
                                Introducing LLMsText: Auto-Generated Documentation for AI
                            </a>
                        </h2>
                        <p className="text-gray-600 mb-4">
                            We're excited to announce llmtxt, a framework-agnostic solution for automatically generating
                            AI-friendly documentation from your Next.js applications.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">May 9, 2026</span>
                            <a href="/blog/posts" className="text-blue-600 font-semibold hover:underline">
                                Read More →
                            </a>
                        </div>
                    </article>

                    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Negotiation for AI Agents</h2>
                        <p className="text-gray-600 mb-4">
                            Learn how to serve markdown to AI agents using the Accept: text/markdown header and our
                            middleware solution for seamless content adaptation.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">May 8, 2026</span>
                            <a href="#" className="text-blue-600 font-semibold hover:underline">
                                Read More →
                            </a>
                        </div>
                    </article>

                    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">SEO and AI: The New Documentation Standard</h2>
                        <p className="text-gray-600 mb-4">
                            Discover how llms.txt and llms-full.txt formats are becoming essential for modern websites
                            that need to serve both human users and AI systems effectively.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">May 7, 2026</span>
                            <a href="#" className="text-blue-600 font-semibold hover:underline">
                                Read More →
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
