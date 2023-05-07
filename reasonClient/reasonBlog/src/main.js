import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router/index.js";
import {store} from './store'
import axios from "axios";
import ElementPlus from 'element-plus'
import xss from 'xss'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
app.config.globalProperties.$https = axios
app.config.globalProperties.$xss = xss
for(let iconName in ElIconModules){
    app.component(iconName, ElIconModules[iconName])
}
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
