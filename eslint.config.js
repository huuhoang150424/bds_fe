import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/parser';
import tsConfig from '@typescript-eslint/eslint-plugin';

export default [
  { ignores: ['dist'] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: ts,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsConfig,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.tsx', '**/*.ts'],
    languageOptions: {
      parser: ts,
      globals: {
        ...globals.browser,
        React: true,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
];

