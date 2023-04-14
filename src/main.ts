import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './i18n'
import { vant } from '@/plugin/vant.config'

const app = createApp(App)
const store = createPinia()

store.use(piniaPluginPersistedstate);


vant(app)

app.use(store)
  .use(router)
  .use(i18n)
  .mount('#app')




