<template>
    <view class="uni-container">
        <view class="uni-panel">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="swiperSetting.indicatordots" :autoplay="swiperSetting.autoplay" :interval="swiperSetting.interval" :duration="swiperSetting.duration">
                        <swiper-item v-for="(item, index) in imglist" :key="index">
                            <image style="width: 100%; " :src="item"></image>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item :show-arrow="false" :title="hotelInfo.title" />
                <uni-list-item :title="hotelInfo.address" desc="Map" :showDesc="true" @click="goMap"/>
            </uni-list>
        </view>
        <view class="uni-panel uni-panel-h">
            <rating-show value="4.6" numbers="197"></rating-show>
            <view class="uni-panel">
                <uni-icons type="phone" size="26" />
                <text style="margin-left:14upx">+123457897364</text>
            </view>
            <view class="uni-panel">
                <uni-icons type="email" size="26" />
                <text style="margin-left:14upx">dsfalsdjf@cdfdk.com.hk</text>
            </view>
            <view class="uni-panel">
                <image class="koa-icon-image" src="../../../static/tv.png"/>
                <image class="koa-icon-image" src="../../../static/cold.png"/>
                <image class="koa-icon-image" src="../../../static/hot.png"/>
                <image class="koa-icon-image" src="../../../static/wifi.png"/>
                <image class="koa-icon-image" src="../../../static/sweep.png"/>
            </view>
            <view class="uni-panel koa-desc">
                Hotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjs
            </view>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item @click="toggleCalendar" :desc="'Total '+orderInfo.dayCount" :thumb="orderInfo.thumb">
                    <view>
                        <text class="date-text--desc">IN</text>
                        <text class="date-text--value">{{orderInfo.startDate}}</text>
                        <text class="date-text--desc">OUT</text>
                        <text class="date-text--value">{{orderInfo.endDate}}</text>
                    </view>
                </uni-list-item>
                <uni-list-item title="Guest" desc="2 adults, 0 child" @click="selectUsers"/>
            </uni-list>
        </view>

        <view class="uni-panel">
            <product-list :list="list" @click="showPop" @book="goBook"></product-list>
        </view>
        <view class="uni-panel uni-panel-h">
            <comments :list="comments" :showMore="true"></comments>
        </view>
        <!-- 房间详情 -->
        <uni-popup ref="popup" type="bottom">
            <view>
                <view class="popup-title">{{hotelInfo.title}}</view>
                <view class="popup-close" @tap="closePopup">
                    <uni-icons type="close" color="#ccc" size="30" />
                </view>
                <view class="uni-panel" style="margin:60upx 0 80upx">
                    <view class="page-section swiper">
                        <view class="page-section-spacing">
                            <swiper class="swiper" v-if="selectRoom">
                                <swiper-item v-for="(item, index) in selectRoom.imglist" :key="index">
                                    <image style="width: 100%; " :src="item"></image>
                                </swiper-item>
                            </swiper>
                        </view>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 日期选择 -->
        <calendar @change="dateChange" :modal="true" :show="showCaledar"></calendar>
    </view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import ratingShow from '@/components/rating-show/rating-show.vue'
    import calendar from '@/components/date-picker/date-picker.vue'
    import productList from '@/components/product-list/product-list.vue'
    import comments from '@/components/comments/comments.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
    
    export default {
        components: {
            uniList,
            uniListItem,
            uniIcons,
            ratingShow,
            calendar,
            productList,
            comments,
            uniPopup
        },
        computed: {  
            i18n () {  
                return this.$t('pages.detail')  
            }  
        },
        data() {
            let now = new Date()
            const dayCount = 1
            const startDate = now.toString().substr(4,6)
            now.setDate(now.getDate()+dayCount)
            const endDate = now.toString().substr(4,6)
            return {
                showCaledar: false,
                orderInfo:{
                    startDate,
                    endDate,
                    dayCount: 1,
                    thumb: '/static/date.png'
                },
                swiperSetting: {
                    indicatordots: true,
                    autoplay: true,
                    interval: 3000, //每隔毫秒自动播放
                    duration: 500 //动画时间
                },
                hotelInfo:{
                    title: 'hotelName',
                    address: 'address Address address'
                },
                imglist: [
                    'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                    'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                    'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                ],
				list: [{
						title: "ROOM A",
						content: "Two Bed",
						img: "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
                        money1: '200.00',
                        money2: '300.00',
                        imglist: [
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                        ],
					},
					{
						title: "ROOM A",
						content: "",
						img: "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
                        money1: '200.00',
                        money2: '300.00',
                        imglist: [
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                        ],
					},
					{
						title: "ROOM A",
						content: "Two Bed",
						img: "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
                        money1: '200.00',
                        money2: '300.00',
                        imglist: [
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                            'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                        ],
					}
                ],
                selectRoom: null,
                comments: [{
                    username: 'username',
                    userimg: 'http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg',
                    stars: 4,
                    content: 'reviwess contentreviwess contentreviwess contentreviwess content'
                },{
                    username: 'username2',
                    userimg: 'http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg',
                    stars: 3,
                    content: 'reviwess contentreviwess contentreviwess contentreviwess content'
                }]
            };
        },
        onShareAppMessage() {
            return {
                title: 'Welcome to Koalabeds',
                path: '/pages/index/home/home'
            };
        },
        onNavigationBarButtonTap(e) {
        },
        onLoad() {
        },
        onReady() {
        },
        onShow() {
        },
        onHide() {
        },
        methods: {
            goMap(){
                wx.getLocation({
                    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                    success (res) {
                        const latitude = res.latitude
                        const longitude = res.longitude
                        wx.openLocation({
                            latitude,
                            longitude,
                            name:"花园桥肯德基",
                            address: "详细地址说明",
                            scale: 18
                        })
                    }
                })
            },
            selectUsers(){

            },
            selectDate(){
                
            },
            dateChange({ choiceDate, dayCount }){
                this.orderInfo.startDate = choiceDate[0].re.replace(/-/g,'/')
                this.orderInfo.endDate = choiceDate[1].re.replace(/-/g,'/')
                this.orderInfo.dayCount = dayCount
            },
            toggleCalendar(){
                this.showCaledar = !this.showCaledar
            },
            goBook(value){
                console.log(value)
            },
            showPop(value){
                this.selectRoom = value
                this.$refs['popup'].open()
            },
            closePopup(){
                this.$refs['popup'].close()
            }
        }
    };
</script>

<style>
    @import '../../../common/uni-nvue.css';
    .koa-desc{
        color:#707070
    }
    .date-text--desc{
        font-size: 20upx;
        margin-right:20upx
    }
    .date-text--value{
        margin-right:20upx
    }
    .popup-title{
        background: #f0f0f0;
        padding:12upx 30upx;
        margin:-30upx;
        font-size:40upx
    }
</style>
