import UnoCSS from '@unocss/postcss'
import Autoprefixer from 'autoprefixer'
import PostcssNesting from 'postcss-nesting'

export function defineConfig() {
  return {
    plugins: [Autoprefixer(), PostcssNesting(), UnoCSS()],
  }
}
