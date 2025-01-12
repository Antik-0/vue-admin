import { shadcnUIColors } from './colors.js'

/* eslint-disable perfectionist/sort-objects */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1600px',
} as const

export const borderRadius = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
  xl: 'calc(var(--radius) + 4px)',
} as const

export const boxShadow = {
  switch: `rgba(0, 0, 0, 0.3) 0px 0px 1px,
           rgba(0, 0, 0, 0.2) 0px 1px 2px`,
} as const

export const animation = {
  keyframes: {
    'accordion-down': `{
      from { height: 0 }
      to { height: 'var(--radix-accordion-content-height)' }
    }`,
    'accordion-up': `{
      from { height: 'var(--radix-accordion-content-height)' }
      to { height: 0 }
    }`,
    'collapsible-down': `{
      from { height: 0 }
      to { height: 'var(--radix-collapsible-content-height)' }
    }`,
    'collapsible-up': `{
      from { height: 'var(--radix-collapsible-content-height)' }
      to { height: 0 }
    }`,
  },
  durations: {
    'accordion-down': '0.2s',
    'accordion-up': '0.2s',
    'collapsible-down': '0.2s',
    'collapsible-up': '0.2s',
    ping: '5s',
  },
  timingFns: {
    'accordion-down': 'ease-in-out',
    'accordion-up': 'ease-in-out',
    'collapsible-down': 'ease-in-out',
    'collapsible-up': 'ease-in-out',
  },
} as const

export const customTheme = {
  breakpoints,
  borderRadius,
  boxShadow,
  animation,
  colors: { ...shadcnUIColors },
}
