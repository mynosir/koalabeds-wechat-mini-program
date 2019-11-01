import Vue from 'vue'
import Vuex from 'vuex'
import {
	LOGIN
} from './types'

Vue.use(Vuex)
const mobile = wx.getSystemInfoSync();

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: null,
      	activeCity: null,
		cityName: 'Choose City',
		openid: null,
		selectedAddress: null,
		isIphoneX: mobile.model.indexOf("iPhone X") >= 0
	},
	mutations: {
		[LOGIN]: (state, userInfo) => {
			state.userInfo = userInfo;
			state.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setSelectedAddress(state, address) {
			console.log('update store address:', state, address)
			state.selectedAddress = address
		},
		setCity(state, city) {
			state.activeCity = city
			state.cityName = city.cityName
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

uni.getUserInfo({
	success: res => {
		store.commit(LOGIN, res.userInfo)
	}
})
wx.login({
	success(res) {
		console.log(res)
	}
})

export default store