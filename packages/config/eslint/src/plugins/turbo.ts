import type { Linter } from 'eslint'

// @ts-expect-error: no types
import pluginTurbo from 'eslint-config-turbo'

export function turbo(): Linter.Config[] {
  return [
    {
      plugins: {
        turbo: pluginTurbo,
      },
    },
  ]
}
