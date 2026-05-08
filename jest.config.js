module.exports = {
  projects: [
    {
      displayName: 'core',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/core/test/**/*.spec.ts'],
      collectCoverageFrom: ['<rootDir>/packages/core/src/**/*.ts'],
      globals: {
        'ts-jest': { diagnostics: false, isolatedModules: true },
      },
    },
  ],
  collectCoverage: true,
};
