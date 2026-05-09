import type { NextRequest } from 'next/server';

export type MarkdownMiddlewareOptions = {
  /**
   * URL patterns to skip — middleware won't attempt conversion for these.
   * Supports simple glob patterns, e.g. `_next/*` or `*.png`.
   */
  exclude?: string[];

  /**
   * Custom HTML→Markdown converter.
   * If omitted, the built-in dependency-free converter is used.
   */
  htmlToMarkdown?: (html: string, url: string) => string | Promise<string>;

  /**
   * Custom token estimator for the `x-markdown-tokens` header.
   * Default: `Math.ceil(text.length / 4)` (rough GPT-style approximation).
   */
  estimateTokens?: (markdown: string) => number;

  /**
   * Value for the `Content-Signal` header. See https://contentsignals.org
   * @default 'ai-train=yes, search=yes, ai-input=yes'
   */
  contentSignal?: string;

  /**
   * Timeout in ms for fetching the HTML version of the page.
   * @default 10000
   */
  fetchTimeoutMs?: number;

  /**
   * Include a YAML front-matter block at the top of every Markdown response.
   * @default true
   */
  includeFrontMatter?: boolean;

  /**
   * Override Cache-Control for Markdown responses.
   * @default 'private, max-age=0, no-store'
   */
  cacheControl?: string;
};

// ---------------------------------------------------------------------------
// Built-in HTML → Markdown converter (dependency-free)
// ---------------------------------------------------------------------------

function resolveHref(href: string, pageUrl: string): string {
  if (!href) return href;
  // Already absolute
  if (/^https?:\/\//i.test(href)) return href;
  // Skip anchors, mailto, tel, javascript
  if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return href;
  try {
    return new URL(href, pageUrl).toString();
  } catch {
    return href;
  }
}

function builtinHtmlToMarkdown(html: string, pageUrl = ''): string {
  return (
    html
      // Remove noisy sections
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '')
      .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')

      // Headings
      .replace(
        /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,
        (_match: string, level: string, inner: string) => {
          const text = stripTags(inner).trim();
          return text ? `\n${'#'.repeat(Number(level))} ${text}\n\n` : '\n';
        }
      )

      // Code blocks
      .replace(
        /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
        (_match: string, code: string) =>
          `\n\`\`\`\n${decodeEntities(code.trim())}\n\`\`\`\n\n`
      )
      .replace(
        /<code[^>]*>([\s\S]*?)<\/code>/gi,
        (_match: string, code: string) =>
          `\`${decodeEntities(stripTags(code))}\``
      )

      // Links — resolve relative URLs to absolute using the page URL
      .replace(
        /<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi,
        (_match: string, href: string, text: string) => {
          const label = stripTags(text).trim();
          const abs = pageUrl ? resolveHref(href, pageUrl) : href;
          return label ? `[${label}](${abs})` : abs;
        }
      )

      // Lists
      .replace(
        /<li[^>]*>([\s\S]*?)<\/li>/gi,
        (_match: string, inner: string) => {
          const text = stripTags(inner).trim();
          return text ? `- ${text}\n` : '';
        }
      )
      .replace(/<ul[^>]*>|<\/ul>|<ol[^>]*>|<\/ol>/gi, '\n')

      // Blockquotes
      .replace(
        /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
        (_match: string, inner: string) => {
          const text = stripTags(inner).trim();
          if (!text) return '\n';
          return `\n${text
            .split('\n')
            .map((l: string) => `> ${l}`)
            .join('\n')}\n\n`;
        }
      )

      // Paragraphs and breaks
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_match: string, inner: string) => {
        const text = stripTags(inner).trim();
        return text ? `\n${text}\n\n` : '\n';
      })
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<hr\s*\/?>/gi, '\n---\n\n')

      // Emphasis
      .replace(
        /<strong[^>]*>([\s\S]*?)<\/strong>/gi,
        (_, t) => `**${stripTags(t).trim()}**`
      )
      .replace(
        /<b[^>]*>([\s\S]*?)<\/b>/gi,
        (_, t) => `**${stripTags(t).trim()}**`
      )
      .replace(
        /<em[^>]*>([\s\S]*?)<\/em>/gi,
        (_, t) => `*${stripTags(t).trim()}*`
      )
      .replace(
        /<i[^>]*>([\s\S]*?)<\/i>/gi,
        (_, t) => `*${stripTags(t).trim()}*`
      )

      // Strip remaining tags
      .replace(/<[^>]+>/g, '')

      // Decode entities + normalize whitespace
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{4,}/g, '\n\n\n')
      .trim()
  );
}

function stripTags(input: string): string {
  return input.replace(/<[^>]+>/g, '');
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function extractMeta(html: string): { title: string; description: string } {
  const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  const descMatch =
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i.exec(
      html
    ) ??
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i.exec(
      html
    );

  return {
    title: titleMatch ? decodeEntities(titleMatch[1].trim()) : '',
    description: descMatch ? decodeEntities(descMatch[1].trim()) : '',
  };
}

function defaultEstimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// ---------------------------------------------------------------------------
// Excludes / Accept negotiation
// ---------------------------------------------------------------------------

const DEFAULT_EXCLUDE = [
  '_next/*',
  'api/*',
  '*.ico',
  '*.png',
  '*.jpg',
  '*.jpeg',
  '*.gif',
  '*.svg',
  '*.webp',
  '*.woff',
  '*.woff2',
  '*.ttf',
  '*.css',
  '*.js',
  '*.map',
  'llms.txt',
  'llms-full.txt',
];

function globToRegExp(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`);
}

function matchesExclude(pathname: string, patterns: string[]): boolean {
  const clean = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return patterns.some(pattern => {
    const normalized = pattern.startsWith('/') ? pattern.slice(1) : pattern;
    return globToRegExp(normalized).test(clean);
  });
}

function wantsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get('accept') ?? '';
  if (!accept) return false;

  return accept.split(',').some(part => {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    const qParam = params.find(p => p.trim().startsWith('q='));
    const q = qParam ? Number(qParam.trim().slice(2)) : 1;
    if (!Number.isFinite(q) || q <= 0) return false;
    return type === 'text/markdown' || type === 'text/*';
  });
}

// ---------------------------------------------------------------------------
// Middleware factory
// ---------------------------------------------------------------------------

export function createMarkdownMiddleware(
  options: MarkdownMiddlewareOptions = {}
): (request: NextRequest) => Promise<Response> {
  const {
    exclude = DEFAULT_EXCLUDE,
    htmlToMarkdown = builtinHtmlToMarkdown,
    estimateTokens = defaultEstimateTokens,
    contentSignal = 'ai-train=yes, search=yes, ai-input=yes',
    fetchTimeoutMs = 10_000,
    includeFrontMatter = true,
    cacheControl = 'private, max-age=0, no-store',
  } = options;

  return async function middleware(request: NextRequest): Promise<Response> {
    const { NextResponse } = await import('next/server');

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return NextResponse.next();
    }

    if (!wantsMarkdown(request)) {
      return NextResponse.next();
    }

    const { pathname } = request.nextUrl;
    if (matchesExclude(pathname, exclude)) {
      return NextResponse.next();
    }

    try {
      const htmlUrl = request.nextUrl.clone();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeoutMs);

      const htmlResponse = await fetch(htmlUrl.toString(), {
        signal: controller.signal,
        headers: {
          Accept: 'text/html',
          Cookie: request.headers.get('cookie') ?? '',
          Authorization: request.headers.get('authorization') ?? '',
          'Accept-Language': request.headers.get('accept-language') ?? '',
          'User-Agent': 'llmstxt-middleware/0.1.0',
        },
        redirect: 'manual',
      });

      clearTimeout(timeoutId);

      if (htmlResponse.status >= 300 && htmlResponse.status < 400) {
        return htmlResponse as unknown as Response;
      }

      if (!htmlResponse.ok) {
        return NextResponse.next();
      }

      const contentType = htmlResponse.headers.get('content-type') ?? '';
      if (!contentType.includes('text/html')) {
        return NextResponse.next();
      }

      const html = await htmlResponse.text();
      const { title, description } = extractMeta(html);

      let markdown = await htmlToMarkdown(html, request.nextUrl.href);

      if (includeFrontMatter) {
        const fm: string[] = ['---'];
        if (title) fm.push(`title: "${title.replace(/"/g, '\\"')}"`);
        fm.push(`url: "${request.nextUrl.href}"`);
        if (description)
          fm.push(`description: "${description.replace(/"/g, '\\"')}"`);
        fm.push(`generated: "${new Date().toISOString()}"`);
        fm.push('---\n');
        markdown = `${fm.join('\n')}\n${markdown}`;
      }

      const tokenCount = estimateTokens(markdown);

      return new Response(request.method === 'HEAD' ? null : markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
          'x-markdown-tokens': String(tokenCount),
          'Content-Signal': contentSignal,
          'Cache-Control': cacheControl,
        },
      });
    } catch {
      return NextResponse.next();
    }
  };
}

export const middleware = createMarkdownMiddleware();

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|map)$).*)',
  ],
};

export { builtinHtmlToMarkdown, defaultEstimateTokens };
