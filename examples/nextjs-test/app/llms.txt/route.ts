import { createLlmsTxtHandler } from '@llmtxt/next';

// Create the handler with optional configuration
export const GET = createLlmsTxtHandler({
  title: 'LLMsText Example Application',
  summary:
    'This is a comprehensive example application demonstrating all features of the @llmtxt packages including documentation generation, middleware integration, and AI-friendly content serving.',
});
