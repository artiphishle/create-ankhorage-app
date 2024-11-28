import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended, // Base configuration for JavaScript
  {
    files: ['**/*.ts'], // Target TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json', // Ensure this matches your tsconfig path
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // TypeScript-specific rules
      'no-unused-vars': 'off', // Disable JS rule
      '@typescript-eslint/no-unused-vars': 'warn', // Enable TS rule
    },
  },
  {
    files: ['**/*.{js,ts}'], // Both JavaScript and TypeScript files
    ignores: ['node_modules', 'dist'], // Ignore directories
    languageOptions: {
      globals: {
        process: 'readonly', // Explicitly set `process` as a global
        __dirname: 'readonly', // Add other Node.js globals if necessary
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
];
