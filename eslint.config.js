import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
   {ignores: ['dist']},
   {
      extends: [
         js.configs.recommended,
         ...tseslint.configs.recommendedTypeChecked,
         ...tseslint.configs.stylisticTypeChecked,
         prettier,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
         parser: tseslint.parser,
         parserOptions: {
            project: ['./tsconfig.app.json', './tsconfig.node.json'],
         },
      },
      plugins: {
         'react': react,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         '@typescript-eslint': tseslint.plugin,
      },
      rules: {
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
         ],
         'react-refresh/only-export-components': 'off',
         '@typescript-eslint/no-redundant-type-constituents': 'off',
         'quotes': ['warn', 'single'],
         'arrow-body-style': ['warn', 'as-needed'],
         'arrow-parens': ['warn', 'as-needed'],
         'semi': ['warn', 'always'],
         'semi-spacing': ['warn'],
         'semi-style': ['warn', 'last'],
         'comma-dangle': ['warn', 'always-multiline'],
         'eqeqeq': 'error',
         'prefer-const': 'warn',
         'spaced-comment': [
            'warn',
            'always',
            {
               exceptions: ['='],
               markers: ['TODO', '!', '?', '*', '//'],
            },
         ],
         'no-unreachable': 'off',
         'no-inner-declarations': 'off',
      },
   },
);
