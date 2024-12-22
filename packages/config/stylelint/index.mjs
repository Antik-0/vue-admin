// reference: https://stylelint.io/user-guide/configure

/** @type {import('stylelint').Config} */
export default {
  cache: false,
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.ts',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.json',
    '**/*.md',
  ],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['*.(html|vue)', '**/*.(html|vue)'],
      rules: {
        'function-no-unknown': [
          true,
          {
            ignoreFunctions: ['v-bind', 'theme', 'screen'],
          },
        ],
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global', 'deep', 'slotted'],
          },
        ],
      },
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'alpha-value-notation': ['number'],
    'at-rule-no-unknown': [true],
    'color-function-notation': ['modern'],
    'color-hex-alpha': 'never',
    'custom-property-empty-line-before': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen'],
      },
    ],
    'hue-degree-notation': ['number'],
    'media-feature-range-notation': null,
    'named-grid-areas-no-invalid': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'selector-class-pattern': null,
    'selector-not-notation': null,

    'order/order': [
      ['custom-properties', 'declarations', 'rules', 'at-rules'],
      { severity: 'error' },
    ],
    'order/properties-order': null,
  },
}
