import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './styles/print.css'
import './styles/iconfont.css'

import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  CoWechat,
  BiTelephoneFill,
  MdMarkemailreadRound,
  BiDownload,
} from 'oh-vue-icons/icons'

// icons — 按需注册
addIcons(CoWechat, BiTelephoneFill, MdMarkemailreadRound, BiDownload)

// finally
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
