import { Navigation, PricingPlan } from '@/components/widgets';

export const metadata = {
    title: 'Pricing | LLMsText',
    description: 'Pricing plans for llmstxt',
};

export default function Pricing() {
    return (
        <>
            <Navigation links={[{ href: '/', label: 'Home' }, { href: '/pricing', label: 'Pricing' }]} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <PricingPlan
                        name="Free"
                        price="$0"
                        features={[
                            'Up to 100 pages',
                            'llms.txt generation',
                            'Core package',
                            'Community support',
                            'Open source',
                        ]}
                    />
                    <PricingPlan
                        name="Professional"
                        price="$29"
                        features={[
                            'Unlimited pages',
                            'llms-full.txt generation',
                            'All Next.js integrations',
                            'Markdown middleware',
                            'Priority support',
                            'Custom extractors',
                        ]}
                        highlighted
                    />
                    <PricingPlan
                        name="Enterprise"
                        price="Custom"
                        features={[
                            'Everything in Pro',
                            'Dedicated support',
                            'Custom integrations',
                            'SLA guarantee',
                            'Training & consulting',
                            'Self-hosted option',
                        ]}
                    />
                </div>

                <div className="mt-16 bg-gray-50 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">All Plans Include</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Automatic page scanning</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Zero dependencies</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">MIT License</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Framework agnostic</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Regular updates</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Community driven</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
