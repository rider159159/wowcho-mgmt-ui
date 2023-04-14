import { createApp } from 'vue'
import '../src/style/style.scss'
import App from './App.vue'
import api from './api/index'
import 'uno.css'
import '@unocss/reset/tailwind.css';
import { setupStore } from './stores';
import { setupRouter } from './router';
import { setupPlugins } from './plugins';


function setupApp() {
  const app = createApp(App)
  setupStore(app);
  setupRouter(app)
  setupPlugins(app)
  app.provide('$api', api)
  app.mount('#app')
}
setupApp();
