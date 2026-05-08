import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  ExtractDescriptionFn,
  LlmsTxtOptions,
  ScannedPage,
} from './types';

const DEFAULT_EXCLUDE = ['api', '_*', '(auth)', '(private)'];

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

function splitSegments(p: string): string[] {
  return p.split(/[\\/]/g).filter(Boolean);
}

function segmentMatchesPattern(segment: string, pattern: string): boolean {
  if (pattern === segment) return true;
  if (!pattern.includes('*')) return false;
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`).test(segment);
}

function shouldExcludeRoute(
  segments: string[],
  excludePatterns: string[]
): boolean {
  return segments.some(seg =>
    excludePatterns.some(pat => segmentMatchesPattern(seg, pat))
  );
}

function stripGroupSegments(segments: string[]): string[] {
  return segments.filter(seg => !(seg.startsWith('(') && seg.endsWith(')')));
}

function titleFromRoute(routePath: string): string {
  const segs = routePath.split('/').filter(Boolean);
  const last = segs[segs.length - 1] ?? 'home';
  const cleaned = last
    .replace(/^\[(\.\.\.)?/, '')
    .replace(/\]$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return cleaned ? cleaned.replace(/\b\w/g, c => c.toUpperCase()) : 'Home';
}

function defaultExtractDescription(
  input: Parameters<ExtractDescriptionFn>[0]
): string | undefined {
  const lines = input.fileContents.split(/\r?\n/);
  for (const line of lines.slice(0, 40)) {
    const m = /^\s*\/\/\s*(.+?)\s*$/.exec(line);
    if (m?.[1]) return m[1];
    if (
      line.trim() &&
      !line.trim().startsWith('import') &&
      !line.trim().startsWith('export')
    )
      break;
  }

  const metadataBlock =
    /export\s+const\s+metadata\s*=\s*{([\s\S]*?)}\s*;?/.exec(
      input.fileContents
    );
  if (metadataBlock?.[1]) {
    const desc = /description\s*:\s*['"`]([^'"`]+)['"`]/.exec(metadataBlock[1]);
    if (desc?.[1]) return desc[1];
  }
  return undefined;
}

function truncate(input: string, maxLen: number): string {
  if (input.length <= maxLen) return input;
  return `${input.slice(0, Math.max(0, maxLen - 1)).trimEnd()}…`;
}

async function listPageFiles(appDir: string): Promise<string[]> {
  const results: string[] = [];
  const root = path.resolve(appDir);

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!/^page\.(t|j)sx?$/.test(entry.name)) continue;
      results.push(full);
    }
  }

  await walk(root);
  return results;
}

export async function scanAppDirForPages(
  options: LlmsTxtOptions
): Promise<ScannedPage[]> {
  const appDir = path.resolve(options.appDir);
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const excludePatterns = options.exclude ?? DEFAULT_EXCLUDE;
  const maxDescriptionLength = options.maxDescriptionLength ?? 150;
  const extractDescription =
    options.extractDescription ?? defaultExtractDescription;

  const pageFiles = await listPageFiles(appDir);
  const pages: ScannedPage[] = [];

  for (const filePath of pageFiles) {
    const dirOfPage = path.dirname(filePath);
    const relativeDir = path.relative(appDir, dirOfPage);
    const rawSegments = splitSegments(relativeDir);
    const segments = stripGroupSegments(rawSegments);
    if (
      shouldExcludeRoute(rawSegments, excludePatterns) ||
      shouldExcludeRoute(segments, excludePatterns)
    ) {
      continue;
    }
    const routePath = segments.length ? `/${segments.join('/')}` : '/';
    const url = `${baseUrl}${routePath === '/' ? '' : routePath}`;

    const fileContents = await fs.readFile(filePath, 'utf8');
    const desc = extractDescription({ filePath, fileContents, routePath });

    pages.push({
      filePath,
      routePath,
      url,
      title: titleFromRoute(routePath),
      description: desc ? truncate(desc, maxDescriptionLength) : undefined,
    });
  }

  pages.sort((a, b) => a.routePath.localeCompare(b.routePath));
  return pages;
}

export function pathFromFileUrl(fileUrl: string): string {
  return fileURLToPath(fileUrl);
}
