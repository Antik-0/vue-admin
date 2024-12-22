import type { Linter } from 'eslint'
import { interopDefault } from '../util.js'

/**
 * reference: https://eslint-plugin-command.antfu.me/guide/
 */
export async function command(): Promise<Linter.Config[]> {
  const [pluginCommand] = await Promise.all([
    interopDefault(import('eslint-plugin-command/config')),
  ])

  return [pluginCommand()]
}
