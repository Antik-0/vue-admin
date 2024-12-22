import type { Config } from 'prettier'

/**
 * reference: https://prettier.io/docs/en/options
 */
export function defineConfig(config?: Config): Config {
  return {
    arrowParens: 'avoid',
    endOfLine: 'auto',
    printWidth: 80,
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    ...config,
  }
}
