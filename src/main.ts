import { createApp } from 'vue'
import 'normalize.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
