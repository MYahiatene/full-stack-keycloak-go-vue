import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import {initKeycloak} from "@/auth/keycloak.ts";
import {createAppRouter} from "@/router";


//TODO: Global error handler event listener
//Todo: Tests

await initKeycloak()

const app = createApp(App)

app.use(createPinia())
app.use(createAppRouter())

app.mount('#app')
