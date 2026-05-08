import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { scanAppDirForPages } from '../src';

async function mkTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), 'llmstxt-core-'));
}

async function writeFile(filePath: string, contents: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, 'utf8');
}

describe('@llmstxt/core scanAppDirForPages', () => {
  it('scans Next.js app pages and extracts descriptions', async () => {
    const dir = await mkTmpDir();
    const appDir = path.join(dir, 'src', 'app');

    await writeFile(
      path.join(appDir, 'blog', 'getting-started', 'page.tsx'),
      '// Getting started guide\nexport default function Page(){ return null }'
    );
    await writeFile(
      path.join(appDir, '(auth)', 'login', 'page.tsx'),
      '// Should be excluded\nexport default function Page(){ return null }'
    );
    await writeFile(
      path.join(appDir, 'dashboard', 'page.tsx'),
      "export const metadata = { description: 'Main dashboard for users.' }\nexport default function Page(){ return null }"
    );

    const pages = await scanAppDirForPages({
      appDir,
      baseUrl: 'https://example.com',
    });

    expect(pages.map(p => p.routePath)).toEqual([
      '/blog/getting-started',
      '/dashboard',
    ]);
    expect(
      pages.find(p => p.routePath === '/blog/getting-started')?.description
    ).toBe('Getting started guide');
    expect(pages.find(p => p.routePath === '/dashboard')?.description).toBe(
      'Main dashboard for users.'
    );
  });
});
