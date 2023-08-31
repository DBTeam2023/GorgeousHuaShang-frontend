import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(store)
    .use(UndrawUi)
    .mount('#app')
