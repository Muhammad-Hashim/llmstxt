import React from 'react';

interface CardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            {children}
        </div>
    );
}

interface FeatureProps {
    icon: string;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="text-2xl">{icon}</div>
            <div>
                <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    );
}

interface PricingPlanProps {
    name: string;
    price: string;
    features: string[];
    highlighted?: boolean;
}

export function PricingPlan({ name, price, features, highlighted }: PricingPlanProps) {
    return (
        <div
            className={`border rounded-lg p-8 ${highlighted
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 relative'
                    : 'border-gray-200 bg-white'
                }`}
        >
            {highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular
                    </span>
                </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">{price}</p>
            <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-500">✓</span> {feature}
                    </li>
                ))}
            </ul>
            <button
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${highlighted
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
            >
                Get Started
            </button>
        </div>
    );
}

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
    return (
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="font-mono text-sm">
                <code>{code}</code>
            </pre>
        </div>
    );
}

interface NavLinkProps {
    href: string;
    label: string;
}

export function Navigation({ links }: { links: NavLinkProps[] }) {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">LLMsText</div>
                    <div className="flex gap-6">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-blue-100">{subtitle}</p>
            </div>
        </div>
    );
}
