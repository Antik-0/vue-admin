import type { Linter } from 'eslint'
import tsEslint from 'typescript-eslint'
import {
  ignores,
  javascript,
  jsonc,
  perfectionist,
  turbo,
  typescript,
  unocss,
  vue,
} from './plugins/index.js'

/**
 * reference: https://eslint.org/docs/latest/use/configure/configuration-files
 */
export function defineConfig() {
  const configs = [
    ignores(),
    turbo(),
    jsonc(),
    javascript(),
    typescript(),
    vue(),
    unocss(),
    perfectionist(),
  ].flat()
  return tsEslint.config(...configs) as Linter.Config[]
}
