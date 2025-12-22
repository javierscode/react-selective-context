import js from '@eslint/js'
import globals from 'globals'
import typescript from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import vitest from '@vitest/eslint-plugin'

import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

import { defineConfig } from 'eslint/config'

export default defineConfig([
  // 📜 JavaScript
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // 🧠 TypeScript
  typescript.configs.recommended,
  // ⚛️ React
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // 🧪 Vitest
  {
    files: ['tests/**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  // 🧹 Prettier
  eslintConfigPrettier,
])
