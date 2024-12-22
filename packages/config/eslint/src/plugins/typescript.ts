import type { Linter } from 'eslint'
import { interopDefault } from '../util.js'

/**
 * reference: https://typescript-eslint.io/rules/
 */
export async function typescript(): Promise<Linter.Config[]> {
  const [pluginTS, parserTS] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ])

  return [
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        ecmaVersion: 'latest',
        parser: parserTS,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          project: true,
          projectService: true,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      plugins: {
        // @ts-expect-error: flat-config
        '@typescript-eslint': pluginTS,
      },
      rules: {
        ...pluginTS.configs.recommended!.rules,
        ...pluginTS.configs.stylistic!.rules,

        // recommended
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-object-type': [
          'error',
          { allowInterfaces: 'with-single-extends' },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        'no-unused-expressions': 'off',

        // stylistic
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/class-literal-property-style': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
        ],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        '@typescript-eslint/prefer-find': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        'no-empty-function': 'off',
      },
    },
  ]
}
