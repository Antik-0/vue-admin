import type { Linter } from 'eslint'
import pluginUnoCSS from '@unocss/eslint-config/flat'

export function unocss(): Linter.Config[] {
  return [
    // @ts-expect-error: no care
    pluginUnoCSS,
  ]
}
