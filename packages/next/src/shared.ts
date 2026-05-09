import fs from 'fs';
import path from 'path';

export function resolveNextAppDir(): string {
  const candidates = [
    path.join(process.cwd(), 'src', 'app'),
    path.join(process.cwd(), 'app'),
  ];
  const found = candidates.find(p => fs.existsSync(p));
  return found ?? candidates[0];
}

export function resolveBaseUrlFromEnv(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl;
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl)
    return vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
  
  // Fallback to localhost in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  throw new Error(
    'Missing base URL. Set NEXT_PUBLIC_APP_URL (recommended) or VERCEL_URL.'
  );
}
