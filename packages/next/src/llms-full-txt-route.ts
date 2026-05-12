import path from 'path';
import { generateLlmsFullTxt } from '@llmtxt/core';
import type { GenerateLlmsFullTxtOptions } from '@llmtxt/core';
import { resolveBaseUrlFromEnv, resolveNextAppDir } from './shared';

export function createLlmsFullTxtHandler(
  overrides: Partial<
    Omit<GenerateLlmsFullTxtOptions, 'appDir' | 'baseUrl'>
  > = {}
) {
  return async function GET(): Promise<Response> {
    const baseUrl = resolveBaseUrlFromEnv();
    const appDir = resolveNextAppDir();

    const txt = await generateLlmsFullTxt({
      appDir: path.resolve(appDir),
      baseUrl,
      ...overrides,
    });

    return new Response(txt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control':
          'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  };
}
