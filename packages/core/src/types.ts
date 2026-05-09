export type ExtractDescriptionFn = (input: {
  filePath: string;
  fileContents: string;
  routePath: string;
}) => string | undefined;

export type ScannedPage = {
  filePath: string;
  routePath: string;
  url: string;
  title: string;
  description?: string;
};

export type LlmsTxtOptions = {
  appDir: string;
  baseUrl: string;
  exclude?: string[];
  extractDescription?: ExtractDescriptionFn;
  maxDescriptionLength?: number;
};

export type GenerateLlmsTxtOptions = LlmsTxtOptions & {
  title?: string;
  summary?: string;
};

export type GenerateLlmsFullTxtOptions = LlmsTxtOptions & {
  fetchTimeoutMs?: number;
  htmlToMarkdown?: (html: string, url: string) => Promise<string> | string;
};
