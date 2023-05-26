import { createApp } from 'vue'
import App from './App.vue'
import UIComponents from '@/components/UI'

const app = createApp(App)

UIComponents.forEach(UIComponents => {
    app.component(UIComponents.name, UIComponents)
})

app.mount('#app')
