import Vue from 'vue'
import Vuex from 'vuex'
import {
	LOGIN,
	GETCITYS,
	GETOPENID,
	keymaps
} from './types'


import {
	domain
} from './host'


const Utils = require("../common/util.js");
const {
	fetch
} = Utils;

const dayCount = 1;
let now = new Date();
const startDate = new Date(now);
now.setDate(now.getDate() + dayCount);
const endDate = new Date(now);

Vue.use(Vuex)
const mobile = wx.getSystemInfoSync();

const store = new Vuex.Store({
	state: {
		language: uni.getStorageSync('language') || 'en',
		domain,
		hasLogin: false,
		userInfo: null,
		citys: [],
		activeCity: null,
		cityName: '',
		openid: null,
		selectedAddress: null,
		hotel: {
			search: '',
			startDate,
			endDate,
			dayCount,
			selectHotel: {},
			guestInfo: {
				adult: 1,
				child: 0
			},
			roomInfo: {},
			keymaps,
		},
		ticket: {
			image: '',
			validDate: startDate,
			ticketInfo: null
		},
		hotelTemps: [], //用来缓存酒店，优化查询
		isIphoneX: mobile.model.indexOf("iPhone X") >= 0
	},
	mutations: {
		[LOGIN]: (state, userInfo) => {
			state.userInfo = userInfo;
			state.hasLogin = true;
			fetch({
				url: domain + '/api/post?actionxm=saveUserinfo',
				method: 'POST',
				data: {
					openid: state.openid,
					userinfo: JSON.stringify(userInfo)
				}
			})
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			uni.setStorageSync('openid', openid)
			state.openid = openid
		},
		setSelectedAddress(state, address) {
			state.selectedAddress = address
		},
		setCity(state, city) {
			state.activeCity = city
			state.cityName = city.cityName
		},
		setCityList(state, citys) {
			state.citys = citys
		},
		setHotelDate(state, date) {
			console.log(date)
			state.hotel.startDate = date.startDate;
			state.hotel.endDate = date.endDate;
			state.hotel.dayCount = date.dayCount;
		},
		setHotel(state, hotel) {
			state.hotel.selectHotel = hotel
		},
		setGuestInfo(state, guestInfo) {
			state.hotel.guestInfo = guestInfo
		},
		setRoomInfo(state, roomInfo) {
			state.hotel.roomInfo = roomInfo
		},
		setSearch(state, search) {
			state.hotel.search = search
		},
		setHotelTemps(state, list) {
			state.hotelTemps = list
		},
		setTicket(state, ticket) {
			state.ticket.ticketInfo = ticket
		},
		setTicketDate(state, date) {
			state.ticket.validDate = date;
		},
		setTicketImg(state, imgurl) {
			state.ticket.image = imgurl
		},
		setHotelInfo(state, hotelInfo) {
			state.hotel = hotelInfo;
		},
		setLanguage(state, language) {
			state.language = language
			uni.setStorageSync('language', language)
		}
	},
	actions: {
		[GETCITYS]({
			commit
		}) {
			return new Promise((resolve, reject) => {
				fetch({
					url: domain + "/api/get?actionxm=getCitys",
					data: {
						type: 2
					}
				}).then(res => {
					let citys = []
					const {
						data
					} = res
					data.map((item, index) => {
						citys.push({
							'cityCode': index,
							'cityName': item.propertyCity
						})
					})
					commit('setCityList', citys)
					resolve(citys)
				})
			})
		},
		// lazy loading openid
		[GETOPENID]: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							const {
								code
							} = data;
							fetch({
								url: domain + "/api/get?actionxm=getOpenid",
								data: {
									code
								}
							}).then(res => {
								const {
									data
								} = res
								commit('setOpenid', data)
								return uni.getUserInfo()
							}).then((res) => {
								console.log(res)
								if (res[1]) {
									store.commit(LOGIN, res[1].userInfo)
								}
							})
						}
					})
				}
			})
		},
		'getLang': async function ({
			state,
			commit
		}) {
			if (!!uni.getStorageSync('language')) {
				return;
			}
			fetch({
				url: domain + "/api/get?actionxm=getLang",
				data: {}
			}).then(res => {
				commit('setLanguage', res.data || 'en')
			})
		}
	}
})


//获取城市
store.dispatch(GETCITYS)
store.dispatch(GETOPENID)
store.dispatch('getLang')

export default store