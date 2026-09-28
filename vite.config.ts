import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { URL, fileURLToPath } from 'url';
import { defineConfig, lazyPlugins } from 'vite-plus';

const PREFIX = 'portreez';

// https://vitejs.dev/config/
export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    ignorePatterns: [],
    singleQuote: true,
    jsxSingleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    trailingComma: 'all',
    semi: true,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
      {
        files: ['*.md', '*.mdx'],
        options: {
          printWidth: 80,
          proseWrap: 'always',
        },
      },
      {
        files: ['*.json', '*.jsonc'],
        options: { tabWidth: 2, printWidth: 120 },
      },
    ],
    sortImports: {
      customGroups: [
        {
          groupName: 'react-libs',
          elementNamePattern: ['react', 'react-**', 'react-dom/**'],
        },
        {
          groupName: 'custom-alias',
          elementNamePattern: [
            '@assets/**',
            '@components/**',
            '@content/**',
            '@containers/**',
            '@i18n/**',
            '@layouts/**',
            '@pages/**',
            '@routes/**',
            '@stores/**',
            '@utils/**',
          ],
        },
      ],
      groups: [
        'type-import',
        'react-libs',
        'custom-alias',
        ['value-builtin', 'value-external'],
        'type-internal',
        'value-internal',
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown',
      ],
    },
    sortTailwindcss: {
      stylesheet: './src/assets/css/main.css',
      functions: ['clsx', 'cn'],
      preserveWhitespace: true,
    },
    sortPackageJson: {
      sortScripts: true,
    },
  },
  lint: {
    plugins: ['eslint', 'typescript', 'react', 'oxc', 'unicorn'],
    categories: {
      correctness: 'off',
    },
    env: {
      builtin: true,
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: ['dist'],
    overrides: [
      {
        files: ['**/*.{ts,tsx}'],
        rules: {
          'constructor-super': 'error',
          'for-direction': 'error',
          'no-async-promise-executor': 'error',
          'no-case-declarations': 'error',
          'no-class-assign': 'error',
          'no-compare-neg-zero': 'error',
          'no-cond-assign': 'error',
          'no-const-assign': 'error',
          'no-constant-binary-expression': 'error',
          'no-constant-condition': 'error',
          'no-control-regex': 'error',
          'no-debugger': 'error',
          'no-delete-var': 'error',
          'no-dupe-class-members': 'error',
          'no-dupe-else-if': 'error',
          'no-dupe-keys': 'error',
          'no-duplicate-case': 'error',
          'no-empty': 'error',
          'no-empty-character-class': 'error',
          'no-empty-pattern': 'error',
          'no-empty-static-block': 'error',
          'no-ex-assign': 'error',
          'no-extra-boolean-cast': 'error',
          'no-fallthrough': 'error',
          'no-func-assign': 'error',
          'no-global-assign': 'error',
          'no-import-assign': 'error',
          'no-invalid-regexp': 'error',
          'no-irregular-whitespace': 'error',
          'no-loss-of-precision': 'error',
          'no-misleading-character-class': 'error',
          'no-new-native-nonconstructor': 'error',
          'no-nonoctal-decimal-escape': 'error',
          'no-obj-calls': 'error',
          'no-prototype-builtins': 'error',
          'no-redeclare': 'error',
          'no-regex-spaces': 'error',
          'no-self-assign': 'error',
          'no-setter-return': 'error',
          'no-shadow-restricted-names': 'error',
          'no-sparse-arrays': 'error',
          'no-this-before-super': 'error',
          'no-unexpected-multiline': 'error',
          'no-unsafe-finally': 'error',
          'no-unsafe-negation': 'error',
          'no-unsafe-optional-chaining': 'error',
          'no-unused-labels': 'error',
          'no-unused-private-class-members': 'error',
          'no-unused-vars': 'error',
          'no-useless-backreference': 'error',
          'no-useless-catch': 'error',
          'no-useless-escape': 'error',
          'no-with': 'error',
          'require-yield': 'error',
          'use-isnan': 'error',
          'valid-typeof': 'error',
          'no-array-constructor': 'error',
          'no-unused-expressions': 'error',
          'react/only-export-components': [
            'error',
            {
              allowConstantExport: true,
            },
          ],
        },
        plugins: ['eslint', 'typescript', 'react', 'oxc', 'unicorn'],
        env: {
          es2020: true,
          browser: true,
        },
      },
    ],
    settings: {
      jsdoc: {
        ignorePrivate: false,
        ignoreInternal: false,
        ignoreReplacesDocs: true,
        overrideReplacesDocs: true,
        augmentsExtendsReplacesDocs: false,
        implementsReplacesDocs: false,
        exemptDestructuredRootsFromChecks: false,
        tagNamePreference: {},
      },
      vitest: {
        typecheck: false,
      },
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
  },
  plugins: lazyPlugins(() => [mdx(), react(), visualizer(), tailwindcss()]),
  css: {
    modules: {
      localsConvention: 'camelCase',
      hashPrefix: PREFIX,
      generateScopedName: '_[folder]_[local]_[sha256:hash:base64:5]_[sha512:hash:base64:4]',
    },
  },
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
      '@containers': fileURLToPath(new URL('./src/containers', import.meta.url)),
      '@i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    hmr: {
      path: 'ws',
    },
  },
  preview: {
    port: 5174,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'oxc',
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        minify: {
          compress: {
            dropConsole: true,
            dropDebugger: true,
          },
        },
        entryFileNames: `[name].${PREFIX}.[hash].js`,
        chunkFileNames: `assets/[name].${PREFIX}.[hash].js`,
        assetFileNames: `assets/[name].${PREFIX}.[hash].[ext]`,
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/]framer-motion/,
              priority: 15,
            },
            {
              name: 'i18n-vendor',
              test: /node_modules[\\/](react-i18next|i18next)/,
              priority: 10,
            },
            {
              name: 'gsap-vendor',
              test: /node_modules[\\/]gsap/,
              priority: 5,
            },
          ],
        },
      },
    },
    reportCompressedSize: false,
  },
});
