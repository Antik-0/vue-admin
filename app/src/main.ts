import { createApp } from 'vue'
import { setupIcons } from '@repo/icons'
import App from './App.vue'
import { setupRouter } from './router'

import './assets/base.css'
import '@repo/styles/base.css'
import '@repo/icons/dist/icons.css'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'

const app = createApp(App)

setupIcons(app)

setupRouter(app)

app.mount('#app')
