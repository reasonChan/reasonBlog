import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router/index.js";
import {createPinia} from 'pinia'
import axios from "axios";
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
app.config.globalProperties.$https = axios

for(let iconName in ElIconModules){
    app.component(iconName, ElIconModules[iconName])
}
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')
