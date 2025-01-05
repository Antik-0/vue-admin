import type { Config } from 'stylelint'

/**
 * reference: https://stylelint.io/user-guide/get-started/
 */
export function defineConfig(): Config {
  return {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recess-order',
      'stylelint-prettier/recommended',
    ],
    overrides: [
      {
        customSyntax: 'postcss-html',
        files: ['*.(html|vue)', '**/*.(html|vue)'],
        rules: {
          'function-no-unknown': [
            true,
            {
              ignoreFunctions: ['v-bind', 'theme'],
            },
          ],
          'selector-pseudo-class-no-unknown': [
            true,
            {
              ignorePseudoClasses: ['deep', 'global', 'slotted'],
            },
          ],
        },
      },
    ],
    plugins: ['stylelint-order'],
    rules: {
      'alpha-value-notation': 'number',
      'at-rule-empty-line-before': [
        'always',
        {
          ignore: ['after-comment', 'first-nested'],
        },
      ],
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: ['apply', 'screen'],
        },
      ],
      'color-function-notation': 'modern',
      'color-hex-alpha': 'never',
      'custom-property-empty-line-before': null,
      'function-no-unknown': [
        true,
        {
          ignoreFunctions: ['theme'],
        },
      ],
      'hue-degree-notation': 'number',
      'media-feature-range-notation': null,
      'named-grid-areas-no-invalid': null,
      'rule-empty-line-before': [
        'always',
        {
          ignore: ['after-comment', 'first-nested'],
        },
      ],
      'selector-class-pattern': null,
      'selector-not-notation': 'complex',

      'order/order': [
        [
          'custom-properties',
          {
            name: 'apply',
            hasBlock: false,
            type: 'at-rule',
          },
          'declarations',
          'rules',
          'at-rules',
        ],
        { severity: 'error' },
      ],
      'order/properties-alphabetical-order': null,
      'order/properties-order': null,
    },
  }
}
