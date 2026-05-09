import { Card, Navigation, CodeBlock } from '@/components/widgets';

export const metadata = {
    title: 'Getting Started | Docs',
    description: 'Getting started with llmstxt documentation',
};

export default function GettingStarted() {
    return (
        <>
            <Navigation
                links={[
                    { href: '/', label: 'Home' },
                    { href: '/docs/getting-started', label: 'Docs' },
                    { href: '/blog', label: 'Blog' },
                    { href: '/features', label: 'Features' },
                ]}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started with LLMsText</h1>
                <p className="text-xl text-gray-600 mb-6">
                    LLMsText helps you publish structured documentation for both humans and AI systems.
                    It is designed to work with Next.js App Router pages, automatically collecting routes,
                    creating indexes, and generating rich content for AI agents and search engines.
                </p>
                <p className="text-gray-700 mb-8">
                    This guide walks through installation, route setup, and the developer workflow for
                    building `llms.txt` and `llms-full.txt` documentation endpoints in a Next.js app.
                </p>

                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation</h2>
                        <p className="text-gray-700 mb-4">
                            Install the @llmstxt packages using npm:
                        </p>
                        <CodeBlock code={`npm install @llmstxt/core @llmstxt/next`} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage in Next.js</h2>
                        <p className="text-gray-700 mb-4">
                            Create route handlers for /llms.txt and /llms-full.txt:
                        </p>
                        <CodeBlock
                            code={`// app/llms.txt/route.ts
import { createLlmsTxtHandler } from '@llmstxt/next';

export const GET = createLlmsTxtHandler();`}
                        />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Functions</h2>
                        <div className="grid gap-4">
                            <Card
                                title="scanAppDirForPages()"
                                description="Scans your Next.js app directory and extracts all pages with metadata"
                            />
                            <Card
                                title="generateLlmsTxt()"
                                description="Generates a markdown index of all pages organized by route"
                            />
                            <Card
                                title="generateLlmsFullTxt()"
                                description="Generates complete documentation with full page content"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How it works</h2>
                        <p className="text-gray-700 mb-4">
                            The core package scans your application routes in the App Router, extracts page metadata,
                            and produces two standard text outputs:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                            <li><strong>llms.txt</strong> — a lightweight index of pages and descriptions</li>
                            <li><strong>llms-full.txt</strong> — a complete document with full page content</li>
                        </ul>
                        <p className="text-gray-700">
                            The Next.js integration exposes these files as route handlers, while the middleware package
                            serves HTML pages as markdown when requested by AI systems or markdown-first clients.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Documentation Index</h2>
                        <p className="text-gray-700 mb-4">
                            Every documentation site should expose a top-level index that describes
                            all available pages. This is the same pattern used by Cloudflare Docs for Agents.
                            For this example, visit <code>/llms.txt</code> to fetch the app documentation index.
                        </p>
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-slate-700 mb-6">
                            <p className="font-semibold text-slate-900 mb-2">Documentation index endpoints</p>
                            <ul className="list-disc list-inside space-y-2 ml-5">
                                <li><strong>/llms.txt</strong> — page index grouped by route and category.</li>
                                <li><strong>/llms-full.txt</strong> — full documentation content for all pages in one file.</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Use the index file first to discover available pages before exploring further.
                            This is especially useful for AI agents: they can read the index and then load
                            only the pages they need.
                        </p>
                        <p className="text-gray-700">
                            For example, a Cloudflare-style documentation site would provide:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-5 text-gray-700 mb-6">
                            <li><code>/docs-for-agents/llms.txt</code> — product-level page index</li>
                            <li><code>/docs-for-agents/llms-full.txt</code> — product-level full docs</li>
                            <li><code>/llms.txt</code> — site-wide index for all products</li>
                            <li><code>/llms-full.txt</code> — site-wide full documentation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Markdown documentation for LLMs</h2>
                        <p className="text-gray-700 mb-4">
                            AI tools work better with Markdown than HTML because Markdown has less
                            structural overhead and fewer noisy tags. Use Markdown whenever possible.
                        </p>
                        <CodeBlock
                            code={`# Three ways to get Markdown
1. Append /index.md to a page URL.
2. Request the page with Accept: text/markdown.
3. Load the /llms.txt or /llms-full.txt endpoints.`}
                        />
                        <p className="text-gray-700 mb-4">
                            When you request Markdown directly, your agent can consume fewer tokens and
                            get cleaner content. This is especially valuable for context-sensitive workflows
                            and large documentation sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration</h2>
                        <CodeBlock
                            code={`interface GenerateLlmsTxtOptions {
  appDir: string;           // Path to Next.js app directory
  baseUrl: string;          // Your site URL
  title?: string;           // Documentation title
  summary?: string;         // Summary paragraph
  exclude?: string[];       // Exclude patterns
  extractDescription?: (input) => string;
  maxDescriptionLength?: number;
  fetchTimeoutMs?: number;
}`}
                        />
                    </section>
                </div>
            </div>
        </>
    );
}
