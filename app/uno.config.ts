import { defineConfig } from 'unocss'
import { presetBase } from '@config/unocss'

// Inspector UI: localhost:5173/__unocss

export default defineConfig({
  presets: [presetBase()],

  content: {
    pipeline: {
      include: [/\.(vue|ts)($|\?)/],
    },
  },
})
