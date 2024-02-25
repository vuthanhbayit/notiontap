import Vue from 'vue'
import App from './App.vue'
import { register } from '../../../'
import '../../../dist/style.css'

register()

new Vue({
  render: h => h(App),
}).$mount('#app')
