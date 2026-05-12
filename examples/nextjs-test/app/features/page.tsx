import { Navigation, FeatureCard, Hero } from '@/components/widgets';

export const metadata = {
    title: 'Features | LLMsText',
    description: 'Features of the llmtxt packages',
};

export default function Features() {
    return (
        <>
            <Navigation links={[{ href: '/', label: 'Home' }, { href: '/features', label: 'Features' }]} />
            <Hero
                title="Powerful Features"
                subtitle="Everything you need to generate AI-friendly documentation"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <FeatureCard
                        icon="📖"
                        title="Automatic Page Scanning"
                        description="Scans your Next.js app directory and automatically extracts all pages with metadata"
                    />
                    <FeatureCard
                        icon="📝"
                        title="llms.txt Generation"
                        description="Creates an organized index of all your pages with descriptions for easy navigation"
                    />
                    <FeatureCard
                        icon="📚"
                        title="llms-full.txt Generation"
                        description="Generates complete documentation with full page content for comprehensive AI context"
                    />
                    <FeatureCard
                        icon="🔄"
                        title="Content Negotiation"
                        description="Serves markdown to clients requesting text/markdown via the Accept header"
                    />
                    <FeatureCard
                        icon="🎯"
                        title="Custom Extraction"
                        description="Customize how descriptions are extracted from your pages"
                    />
                    <FeatureCard
                        icon="⚡"
                        title="Zero Dependencies"
                        description="Lightweight packages with minimal dependencies for fast builds"
                    />
                    <FeatureCard
                        icon="🔌"
                        title="Framework Agnostic"
                        description="Core package works with any JavaScript framework or static site generator"
                    />
                    <FeatureCard
                        icon="🚀"
                        title="Easy Integration"
                        description="Simple API designed for quick integration into existing projects"
                    />
                </div>

                <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use LLMsText?</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 font-bold text-xl">✓</span>
                            <div>
                                <h3 className="font-semibold text-gray-900">Improve AI Context</h3>
                                <p className="text-gray-700">Provide comprehensive documentation to AI models for better responses</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 font-bold text-xl">✓</span>
                            <div>
                                <h3 className="font-semibold text-gray-900">SEO Benefits</h3>
                                <p className="text-gray-700">Discover page and help search engines understand your site structure</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 font-bold text-xl">✓</span>
                            <div>
                                <h3 className="font-semibold text-gray-900">Content Accessibility</h3>
                                <p className="text-gray-700">Serve content in multiple formats for different client needs</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
