const keyframes = {
  'accordion-down': `{
    from: { height: 0 },
    to: { height: 'var(--radix-accordion-content-height)' },
  }`,
  'accordion-up': `{
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: 0 },
  }`,
  'collapsible-down': `{
    from: { height: 0 },
    to: { height: 'var(--radix-collapsible-content-height)' },
  }`,
  'collapsible-up': `{
    from: { height: 'var(--radix-collapsible-content-height)' },
    to: { height: 0 },
  }`,
}

export const animation = {
  'accordion-down': 'accordion-down 0.2s ease-in-out',
  'accordion-up': 'accordion-up 0.2s ease-in-out',
  'collapsible-down': 'collapsible-down 0.2s ease-in-out',
  'collapsible-up': 'collapsible-up 0.2s ease-in-out',
  keyframes,
}
