import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { piniaQuietPlugin } from "./pinia-quiet-plugin";
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaQuietPlugin);

app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(pinia);

app.mount('#app')
