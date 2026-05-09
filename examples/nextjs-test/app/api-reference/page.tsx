import { Navigation, CodeBlock } from '@/components/widgets';

export const metadata = {
    title: 'API Reference | LLMsText',
    description: 'API reference for llmstxt packages',
};

export default function APIReference() {
    return (
        <>
            <Navigation links={[{ href: '/', label: 'Home' }, { href: '/api-reference', label: 'API' }]} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">API Reference</h1>
                <p className="text-xl text-gray-600 mb-12">Complete API documentation for all llmstxt packages</p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">@llmstxt/core</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">scanAppDirForPages(options)</h3>
                                <p className="text-gray-700 mb-3">
                                    Recursively scans an app directory and returns an array of all pages with metadata.
                                </p>
                                <CodeBlock
                                    code={`interface ScannedPage {
  filePath: string;
  routePath: string;
  url: string;
  title: string;
  description?: string;
}`}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">generateLlmsTxt(options)</h3>
                                <p className="text-gray-700 mb-3">
                                    Generates a markdown index of all pages organized by route.
                                </p>
                                <CodeBlock code={`export async function generateLlmsTxt(
  options: GenerateLlmsTxtOptions
): Promise<string>`} />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">generateLlmsFullTxt(options)</h3>
                                <p className="text-gray-700 mb-3">
                                    Generates complete documentation with full page content.
                                </p>
                                <CodeBlock code={`export async function generateLlmsFullTxt(
  options: GenerateLlmsFullTxtOptions
): Promise<string>`} />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">@llmstxt/next</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">createLlmsTxtHandler()</h3>
                                <p className="text-gray-700 mb-3">
                                    Creates a Next.js route handler for the /llms.txt endpoint.
                                </p>
                                <CodeBlock
                                    code={`import { createLlmsTxtHandler } from '@llmstxt/next';

export const GET = createLlmsTxtHandler({
  title: 'My Documentation',
  summary: 'Overview of my site',
});`}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">createLlmsFullTxtHandler()</h3>
                                <p className="text-gray-700 mb-3">
                                    Creates a Next.js route handler for the /llms-full.txt endpoint.
                                </p>
                                <CodeBlock
                                    code={`import { createLlmsFullTxtHandler } from '@llmstxt/next';

export const GET = createLlmsFullTxtHandler();`}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">@llmstxt/middleware</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">createMarkdownMiddleware(options)</h3>
                                <p className="text-gray-700 mb-3">
                                    Creates Next.js middleware that serves markdown for requests with Accept: text/markdown header.
                                </p>
                                <CodeBlock
                                    code={`import { createMarkdownMiddleware } from '@llmstxt/middleware';

export const middleware = createMarkdownMiddleware({
  exclude: ['_next/*', 'api/*'],
  cacheControl: 'public, max-age=3600',
});

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};`}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Options</h2>
                        <CodeBlock
                            code={`interface LlmsTxtOptions {
  appDir: string;
  baseUrl: string;
  title?: string;
  summary?: string;
  exclude?: string[];
  maxDescriptionLength?: number;
  extractDescription?: (input) => string | undefined;
  fetchTimeoutMs?: number;
  htmlToMarkdown?: (html: string) => string;
}`}
                        />
                    </section>
                </div>
            </div>
        </>
    );
}
