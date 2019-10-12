import Vue from 'vue'
import VueI18n from 'vue-i18n'  

import App from './App'
import store from './store'
import i18n from './i18n'

Vue.use(VueI18n) 
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.prototype._i18n = i18n
App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
