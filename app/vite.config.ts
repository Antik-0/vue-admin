import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// plugins
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const __dirname__ = import.meta.dirname
  const pathDts = resolve(__dirname__, 'types')

  const plugins = [
    vue(),

    AutoImport({
      dts: resolve(pathDts, 'auto-imports.d.ts'),
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),

    Components({
      dts: resolve(pathDts, 'components.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),

    UnoCSS({ inspector: true }),

    vueDevTools({ componentInspector: false }),
  ]

  return { base: './', plugins }
})
