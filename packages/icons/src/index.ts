import type { App } from 'vue'
import { addCollection, Icon } from '@iconify/vue'
import iconJSON from '../dist/icons.json' with { type: 'json' }

export * from './create-icon.js'
export * from './iconify.js'

export function setupIcons(app: App<Element>) {
  addCollection(iconJSON)
  app.component('Icon', Icon)
  console.log('✨ Iconify installed ✨')
}

export { Icon }
