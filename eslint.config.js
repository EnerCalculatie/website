import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // .claude/skills/ui-ux-pro-max-skill is een geinstalleerde, niet-getrackte agent-skill
    // (eigen repo, zie .gitignore-precedent voor .agents/) — geen projectbroncode.
    ignores: ['dist', 'dist-ssr', 'node_modules', 'server.js', '.claude/skills/ui-ux-pro-max-skill'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      // 'warn' i.p.v. 'error': deze regel geeft false positives op bewuste, SSR-veilige
      // patronen (bv. localStorage-check in useEffect i.p.v. lazy initial state, wat
      // tijdens prerendering zou crashen omdat localStorage daar niet bestaat).
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
);
