//eslint.config.mjs
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.config.js'], // Exclude config files
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'], // Target TypeScript and React TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      reactNative,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Disallow 'any' type
      'prefer-const': 'error', // Enforce 'const' where possible
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
