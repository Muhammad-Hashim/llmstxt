import path from 'path';
import { NextResponse } from 'next/server';
import { generateLlmsTxt } from '@llmstxt/core';
import type { GenerateLlmsTxtOptions } from '@llmstxt/core';
import { resolveBaseUrlFromEnv, resolveNextAppDir } from './shared';

export function createLlmsTxtHandler(
  overrides: Partial<Omit<GenerateLlmsTxtOptions, 'appDir' | 'baseUrl'>> = {}
) {
  return async function GET(): Promise<Response> {
    const baseUrl = resolveBaseUrlFromEnv();
    const appDir = resolveNextAppDir();

    const txt = await generateLlmsTxt({
      appDir: path.resolve(appDir),
      baseUrl,
      ...overrides,
    });

    return new NextResponse(txt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control':
          'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  };
}

export const GET = createLlmsTxtHandler();
