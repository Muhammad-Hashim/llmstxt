import { Navigation, Hero, Card } from '@/components/widgets';

export const metadata = {
  title: 'Home | LLMsText Example App',
  description: 'Testing all @llmstxt packages - core, next, and middleware',
};

export default function Home() {
  return (
    <>
      <Navigation
        links={[
          { href: '/docs/getting-started', label: 'Docs' },
          { href: '/blog', label: 'Blog' },
          { href: '/features', label: 'Features' },
          { href: '/pricing', label: 'Pricing' },
          { href: '/about', label: 'About' },
          { href: '/api-reference', label: 'API' },
          { href: '/llms.txt', label: 'llms.txt' },
        ]}
      />
      <Hero
        title="LLMsText Example App"
        subtitle="Testing @llmstxt/core, @llmstxt/next, and @llmstxt/middleware packages"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 mb-12 text-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">About this example</h2>
          <p className="text-base leading-7">
            This application shows how to turn a Next.js site into a documentation source for AI agents.
            It demonstrates how to scan pages, generate `llms.txt` and `llms-full.txt`, and serve markdown
            via content negotiation. Use it as a reference implementation for building searchable agent-friendly
            documentation on your own project.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card
            title="📄 llms.txt Generator"
            description="Visit /llms.txt to see auto-generated documentation index from all pages in this app"
          />
          <Card
            title="📚 llms-full.txt Generator"
            description="Visit /llms-full.txt to see complete documentation with full page content"
          />
          <Card
            title="🔄 Markdown Middleware"
            description="Request any page with Accept: text/markdown header to get markdown version"
          />
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Test</h2>
          <div className="bg-gray-50 rounded-lg p-8 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1. View Generated Documentation</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>
                  <a href="/llms.txt" className="text-blue-600 hover:underline">
                    /llms.txt
                  </a>
                  {' '}
                  - Index of all pages
                </li>
                <li>
                  <a href="/llms-full.txt" className="text-blue-600 hover:underline">
                    /llms-full.txt
                  </a>
                  {' '}
                  - Full documentation
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Test Markdown Middleware</h3>
              <p className="text-gray-600 ml-4">
                Use curl with Accept header:
                <br />
                <code className="bg-gray-200 px-2 py-1 rounded">
                  curl -H "Accept: text/markdown" http://localhost:3000/docs/getting-started
                </code>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Explore Pages</h3>
              <p className="text-gray-600 ml-4">Navigate to different sections to see how pages are scanned and indexed.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Environment Check</h2>
          <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
            <code>
              {`NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL || 'Not set - default to localhost:3000'}
VERCEL_URL: ${process.env.VERCEL_URL || 'Not set'}
NODE_ENV: ${process.env.NODE_ENV}`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
