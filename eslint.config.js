import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import typescript from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig(
  // 📜 Reglas básicas de JavaScript
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // 🧠 Reglas recomendadas para TypeScript
  typescript.configs.recommended,
  // 🧹 Prettier al final para que machaque las reglas de formato
  eslintConfigPrettier
)
