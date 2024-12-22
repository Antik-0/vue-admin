import type { Theme } from 'unocss/preset-uno'
import {
  definePreset,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import { flex } from './rules/index.js'
import {
  animation,
  borderRadius,
  breakpoints,
  shadcnUIColors,
} from './theme/index.js'

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

      rules: [...flex],
      theme: {
        animation: {
          ...animation,
        },
        borderRadius: {
          ...borderRadius,
        },
        boxShadow: {
          switch: `rgba(0, 0, 0, 0.3) 0px 0px 1px,
           rgba(0, 0, 0, 0.2) 0px 1px 2px`,
        },
      },
      extendTheme: (theme: Theme) => {
        return {
          ...theme,
          breakpoints,
          colors: {
            ...theme.colors,
            ...shadcnUIColors,
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
