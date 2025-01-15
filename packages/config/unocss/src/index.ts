import type { Theme } from 'unocss/preset-uno'
import {
  definePreset,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import { rules } from './rules/index.js'
import { customTheme } from './theme/index.js'

export interface presetBaseOption {
  darkClass?: string
  lightClass?: string
  prefix?: string
}

export interface presetBaseTheme extends Theme {}

export const presetBase = definePreset<presetBaseOption, presetBaseTheme>(
  (options = {}) => {
    const darkClass = options.darkClass ?? '.dark'
    const lightClass = options.darkClass ?? '.light'
    const prefix = options.prefix ?? 'un-'

    return {
      name: '@unocss/preset-base',
      presets: [
        presetUno({
          dark: {
            dark: darkClass,
            light: lightClass,
          },
          variablePrefix: prefix,
        }),
        presetAttributify({
          prefix,
          prefixedOnly: true,
        }),
      ],

      rules: [...rules],
      theme: {
        animation: {
          ...customTheme.animation,
        },
      },
      extendTheme: (theme: Theme) => {
        return {
          ...theme,
          borderRadius: {
            ...theme.borderRadius,
            ...customTheme.borderRadius,
          },
          breakpoints: {
            ...customTheme.breakpoints,
          },
          colors: {
            ...theme.colors,
            ...customTheme.colors,
          },
        }
      },

      layers: {
        default: 0,
        theme: 1,
        utilities: 2,
      },
      separators: [':'],
      transformers: [transformerVariantGroup()],
    }
  }
)
