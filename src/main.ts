import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import stores from './stores'

import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)
app.use(router)
app.use(stores)
app.use(Quasar, quasarUserOptions)
app.mount('#app')
