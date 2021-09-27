import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MainHeader from './components/Header.vue'
import Popup from './components/Popup.vue'
import Input from './components/UI/input.vue'
import Select from './components/UI/select.vue'

const app = createApp(App)

app.use(store)

app.component('main-header', MainHeader)
app.component('popup', Popup)
app.component('c-select', Select)
app.component('c-input', Input)

app.use(router)
app.mount('#app')
