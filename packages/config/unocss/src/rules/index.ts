import type { StaticRule } from 'unocss'

export const rules = [
  [
    'flex-center',
    {
      'align-items': 'center',
      'justify-content': 'center',
    },
  ],
  [
    'top-center',
    {
      top: '50%',
      transform: 'translateY(-50%)',
    },
  ],
] as StaticRule[]
