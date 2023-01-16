import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

const a = 1
let b;
({ b } = { b: 1 })
