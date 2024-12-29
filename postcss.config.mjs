import UnoCSS from '@unocss/postcss'
import Autoprefixer from 'autoprefixer'
import PostcssNesting from 'postcss-nesting'

export default {
  plugins: [Autoprefixer(), PostcssNesting(), UnoCSS()],
}
