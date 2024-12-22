import type { Linter } from 'eslint'
import { interopDefault } from '../util.js'

export async function prettier(): Promise<Linter.Config[]> {
  const [pluginPrettier] = await Promise.all([
    interopDefault(import('eslint-plugin-prettier')),
  ])

  return [
    {
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ]
}
