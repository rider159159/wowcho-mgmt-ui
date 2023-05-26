import { createApp } from 'vue'
import '../src/style/style.scss'
import 'uno.css'
import '@unocss/reset/tailwind-compat.css'

import App from './App.vue'
import { setupStore } from './stores'
import { setupRouter } from './router'
import { setupPlugins } from './plugins'
import 'vue3-toastify/dist/index.css'
import '@vuepic/vue-datepicker/dist/main.css'

function setupApp (): void {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupPlugins(app)
  app.mount('#app')
}
setupApp()
