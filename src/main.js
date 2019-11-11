import Vue from 'vue'

import App from './App'
import store from './store'
import i18n from './i18n'
const Utils = require("./common/util.js");
const {fetch} = Utils


Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$fetch = fetch
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.prototype._i18n = i18n
App.mpType = 'app'

//国际化
Vue.mixin({
	onLoad(){
		let title = this.$t('global.title')
		console.log(this)
	}
})

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
