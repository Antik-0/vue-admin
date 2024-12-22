import { createApp } from 'vue'
import { setupIcons } from '@repo/icons'
import App from './App.vue'
import { setupRouter } from './router'

import '@repo/styles/base.css'
import './assets/base.css'
import 'element-plus/dist/index.css'
import '@repo/icons/dist/icons.css'
import 'virtual:uno.css'

const app = createApp(App)

setupIcons(app)

setupRouter(app)

app.mount('#app')
