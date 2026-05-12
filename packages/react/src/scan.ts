import fs from 'fs/promises';
import path from 'path';
import type { LlmtxtRoute } from './index';

export type ScanPagesDirOptions = {
  /**
   * Directory that contains page components, e.g. `src/pages`.
   */
  pagesDir: string;

  /**
   * Route prefixes to drop from the path computation, e.g. `['(components)']`.
   */
  ignoreSegments?: string[];

  /**
   * Skip dynamic routes by default (files like `[slug].tsx` or `$slug.tsx`).
   * @default true
   */
  skipDynamic?: boolean;
};

const DEFAULT_IGNORE = ['components', '__tests__', '__mocks__'];

function splitSegments(p: string): string[] {
  return p.split(/[\\/]/g).filter(Boolean);
}

function isDynamicSegment(seg: string): boolean {
  return (
    /^\[.+\]$/.test(seg) || // [slug]
    /^\[\.\.\..+\]$/.test(seg) || // [...slug]
    /^\$.+/.test(seg) // $slug
  );
}

function kebabCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function titleFromSegments(segments: string[]): string {
  const last = segments[segments.length - 1] ?? 'home';
  const base =
    last.toLowerCase() === 'index'
      ? segments[segments.length - 2] ?? 'home'
      : last;
  const cleaned = base
    .replace(/^\[(\.\.\.)?/, '')
    .replace(/\]$/, '')
    .replace(/^\$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  const normalized = cleaned || 'home';
  const special = normalized.toLowerCase();
  if (special === 'api') return 'API';
  if (special === 'faq') return 'FAQ';
  if (special === 'home') return 'Home';
  return normalized.replace(/\b\w/g, c => c.toUpperCase());
}

function descriptionFromFileContents(fileContents: string): string | undefined {
  const lines = fileContents.split(/\r?\n/);
  for (const line of lines.slice(0, 40)) {
    const m = /^\s*\/\/\s*(.+?)\s*$/.exec(line);
    if (m?.[1]) return m[1];
    if (
      line.trim() &&
      !line.trim().startsWith('import') &&
      !line.trim().startsWith('export')
    ) {
      break;
    }
  }
  return undefined;
}

function shouldIgnoreSegment(seg: string, ignoreSegments: string[]): boolean {
  const s = seg.toLowerCase();
  if (ignoreSegments.some(x => x.toLowerCase() === s)) return true;
  if (s.startsWith('_')) return true;
  if (s.startsWith('.')) return true;
  return false;
}

function routePathFromFile(relFileNoExt: string): string | null {
  const segs = splitSegments(relFileNoExt);
  const normalized = segs.map(s => (s === 'Home' ? 'index' : s));
  const last = normalized[normalized.length - 1];
  const withoutIndex =
    last?.toLowerCase() === 'index' ? normalized.slice(0, -1) : normalized;
  const parts = withoutIndex.map(kebabCase).filter(Boolean);
  return parts.length ? `/${parts.join('/')}` : '/';
}

export async function scanPagesDirForRoutes(
  options: ScanPagesDirOptions
): Promise<LlmtxtRoute[]> {
  const pagesDir = path.resolve(options.pagesDir);
  const ignoreSegments = [
    ...(options.ignoreSegments ?? []),
    ...DEFAULT_IGNORE,
  ];
  const skipDynamic = options.skipDynamic ?? true;

  const results: LlmtxtRoute[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (shouldIgnoreSegment(entry.name, ignoreSegments)) continue;
        await walk(full);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!/\.(t|j)sx?$/.test(entry.name)) continue;

      const rel = path.relative(pagesDir, full);
      const relNoExt = rel.replace(/\.(t|j)sx?$/, '');
      const relSegs = splitSegments(relNoExt);
      if (relSegs.some(s => shouldIgnoreSegment(s, ignoreSegments))) continue;
      if (skipDynamic && relSegs.some(isDynamicSegment)) continue;

      const routePath = routePathFromFile(relNoExt);
      if (!routePath) continue;

      const fileContents = await fs.readFile(full, 'utf8');
      const description = descriptionFromFileContents(fileContents);

      results.push({
        path: routePath,
        title: titleFromSegments(relSegs),
        description,
      });
    }
  }

  await walk(pagesDir);
  results.sort((a, b) => a.path.localeCompare(b.path));
  return results;
}
