import type { Linter } from 'eslint'
import { interopDefault } from '../util.js'

export async function turbo(): Promise<Linter.Config[]> {
  const [pluginTurbo] = await Promise.all([
    // @ts-expect-error: missing type
    interopDefault(import('eslint-config-turbo')),
  ])

  return [
    {
      plugins: {
        turbo: pluginTurbo,
      },
    },
  ]
}
