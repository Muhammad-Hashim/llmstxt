import { createMarkdownMiddleware } from '@llmstxt/middleware';

/**
 * Markdown middleware for serving markdown versions of pages
 * when clients send Accept: text/markdown header
 */
export const middleware = createMarkdownMiddleware({
  exclude: [
    '_next/*',
    'api/*',
    '*.favicon.ico',
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.svg',
    '*.webp',
    '*.css',
    '*.js',
    'llms.txt',
    'llms-full.txt',
  ],
  cacheControl: 'public, max-age=3600, s-maxage=86400',
  includeFrontMatter: true,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
