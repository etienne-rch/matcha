const tseslint = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');

/**
 * Base ESLint config for matcha monorepo
 */
const baseConfig = [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/build/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
          ],
        },
      ],
    },
  },
];

module.exports = baseConfig;
