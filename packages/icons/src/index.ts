import type { App } from 'vue'
import { addCollection } from 'iconify-icon'
import iconJSON from '../dist/icons.json' with { type: 'json' }
import { Icon } from './create-icon.js'
import 'iconify-icon'

export * from './iconify.js'

export function setupIcons(app: App<Element>) {
  addCollection(iconJSON)
  app.component('Icon', Icon)
  console.log('✨ Iconify installed ✨')
}

export { Icon }
