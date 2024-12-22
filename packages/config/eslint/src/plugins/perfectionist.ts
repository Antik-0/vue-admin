import type { Linter } from 'eslint'
import pluginPerfectionist from 'eslint-plugin-perfectionist'

/**
 * reference: https://perfectionist.dev/rules
 */
export function perfectionist(): Linter.Config[] {
  return [
    pluginPerfectionist.configs['recommended-natural'] as Linter.Config,
    {
      rules: {
        'perfectionist/sort-decorators': ['off'],
        'perfectionist/sort-enums': [
          'error',
          {
            forceNumericSort: false,
            sortByValue: false,
          },
        ],
        'perfectionist/sort-exports': [
          'error',
          {
            groupKind: 'values-first',
          },
        ],
        'perfectionist/sort-heritage-clauses': [
          'error',
          {
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                'vue-type': ['^vue', '^vue-router', '^pinia'],
              },
              value: {
                vue: ['^vue', '^vue-router', '^pinia'],
              },
            },
            groups: [
              ['builtin-type', 'external-type'],
              ['vue-type', 'internal-type'],
              ['parent-type', 'sibling-type', 'index-type'],
              'builtin',
              'external',
              'vue',
              'internal',
              ['parent', 'sibling', 'index'],
              'side-effect',
              'style',
              'side-effect-style',
              'object',
              'unknown',
            ],
            internalPattern: ['^#/.*', '^@config/.*', '^@core/.*', '^@repo/.*'],
            newlinesBetween: 'ignore',
            sortSideEffects: false,
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            groupKind: 'required-first',
            groups: ['unknown', 'method'],
            partitionByComment: true,
          },
        ],
        'perfectionist/sort-intersection-types': [
          'error',
          {
            groups: [
              ['literal', 'keyword'],
              'object',
              'named',
              ['intersection', 'union'],
              'unknown',
              'nullish',
            ],
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-modules': ['off'],
        'perfectionist/sort-named-exports': [
          'error',
          {
            groupKind: 'types-first',
          },
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            groupKind: 'types-first',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            customGroups: {
              keys: '^(id|key|name|path|label)$',
              values: '^values?$',
              list: '^list$',
              children: '^children$',
            },
            groups: ['keys', 'unknown', 'list', 'children', 'method'],
          },
        ],
        'perfectionist/sort-sets': [
          'error',
          {
            groupKind: 'literals-first',
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            groups: [
              ['literal', 'keyword'],
              'object',
              'named',
              ['intersection', 'union'],
              'unknown',
              'nullish',
            ],
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-variable-declarations': ['off'],
      },
      settings: {
        perfectionist: {
          ignoreCase: true,
          order: 'asc',
          partitionByComment: false,
          partitionByNewLine: true,
          type: 'natural',
        },
      },
    },
  ]
}
