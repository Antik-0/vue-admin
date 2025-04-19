import { shadcnUIColors } from './colors.js'

export const borderRadius = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
  xl: 'calc(var(--radius) + 4px)',
} as const

export const animation = {
  durations: {
    'accordion-down': '0.2s',
    'accordion-up': '0.2s',
    'collapsible-down': '0.2s',
    'collapsible-up': '0.2s',
  },
  keyframes: {
    'accordion-down': `{
      from { height: 0 }
      to { height: var(--radix-accordion-content-height) }
    }`,
    'accordion-up': `{
      from { height: var(--radix-accordion-content-height) }
      to { height: 0 }
    }`,
    'collapsible-down': `{
      from { height: 0 }
      to { height: var(--radix-collapsible-content-height) }
    }`,
    'collapsible-up': `{
      from { height: var(--radix-collapsible-content-height) }
      to { height: 0 }
    }`,
  },
  timingFns: {
    'accordion-down': 'ease-in-out',
    'accordion-up': 'ease-in-out',
    'collapsible-down': 'ease-in-out',
    'collapsible-up': 'ease-in-out',
  },
} as const

export const customTheme = {
  animation,
  borderRadius,
  colors: { ...shadcnUIColors },
}
