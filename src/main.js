import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MainHeader from './components/Header.vue'
import Popup from './components/Popup.vue'

const app = createApp(App)

app.use(store)

app.component('main-header', MainHeader)
app.component('popup', Popup)

app.use(router)
app.mount('#app')
