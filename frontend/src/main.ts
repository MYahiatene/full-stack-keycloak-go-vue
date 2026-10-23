import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {initKeycloak} from "@/auth/keycloak.ts";


//TODO: Global error handler event listener
//Todo: Tests

await initKeycloak()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
