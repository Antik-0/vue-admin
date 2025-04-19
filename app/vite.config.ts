import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// plugins
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

const typesPath = fileURLToPath(new URL('./types', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['iconify-icon'].includes(tag),
        },
      },
    }),

    AutoImport({
      dts: resolve(typesPath, 'auto-imports.d.ts'),
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),

    Components({
      dts: resolve(typesPath, 'components.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),

    UnoCSS({ inspector: true }),

    vueDevTools({ componentInspector: false }),
  ]

  return { base: './', plugins }
})
