import { defineConfig } from 'unocss'
import { presetBase } from '@config/unocss'

// ✨notice: 该文件是帮助 eslint 提示用的

export default defineConfig({
  presets: [presetBase()],
})
