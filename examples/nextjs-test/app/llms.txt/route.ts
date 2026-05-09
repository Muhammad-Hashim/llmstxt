import { createLlmsTxtHandler } from '@llmstxt/next';

// Create the handler with optional configuration
export const GET = createLlmsTxtHandler({
  title: 'LLMsText Example Application',
  summary:
    'This is a comprehensive example application demonstrating all features of the @llmstxt packages including documentation generation, middleware integration, and AI-friendly content serving.',
});
