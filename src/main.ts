import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
import { log1 } from './tool/index'
// createApp(App).mount('#app')
createApp()
log1()
const a = 1
document.documentElement
let b
// ({ b } = { b: 1 })
const w = new Worker('scs')
console.log(w)
// @ts-ignore
a?.b?.c

class D {}

const d = new D()
console.log(d)

async function e(arg) {
  console.log(arg)
  await Promise.resolve()
}

e(12345)

export default e
