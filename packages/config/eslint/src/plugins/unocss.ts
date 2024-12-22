import type { Linter } from 'eslint'
import { interopDefault } from '../util.js'

export async function unocss(): Promise<Linter.Config[]> {
  const [pluginUnoCSS] = await Promise.all([
    interopDefault(import('@unocss/eslint-config/flat')),
  ])

  // @ts-expect-error: flat-config
  return [pluginUnoCSS]
}
