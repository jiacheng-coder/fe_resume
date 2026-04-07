import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './styles/print.css'

import router from './router'
import { createPinia } from 'pinia'
import { useResumeEditorStore } from './store/resumeEditorStore'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as Icons from 'oh-vue-icons/icons'

// pinia
const pinia = createPinia()

// icons
const Fa = Object.values({ ...Icons })
addIcons(...Fa)

// finally
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(pinia).use(router)
useResumeEditorStore(pinia).initFromStorage()
app.mount('#app')
