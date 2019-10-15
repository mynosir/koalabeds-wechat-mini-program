<template>
    <view class="uni-container">
        <view class="uni-panel uni-panel-d">
            <uni-card :is-shadow="true" :title="hotelInfo.title" note="true">
                <view class="hotel-desc">
                    <view style="font-size:24upx">IN: {{startDate}} OUT: {{endDate}} {{dayCount}}N</view>
                    <view style="color:#707070;font-size:20upx">Twins bed</view>
                </view>
                <template v-slot:footer>
                    <view class="hotel-card-footer uni-right" @tap="showPop('roomInfo')">
                        <uni-icons type="home" color="#0bb9ee"></uni-icons>
                        <text style="margin-left:12upx">Room Info</text>
                        <uni-icons type="arrowright"></uni-icons>
                    </view>
                </template>
            </uni-card>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item :showArrow="false">
                    <view class="uni-flex" style="align-items:center">
                        <view style="font-size:30upx;margin-right:20upx">Name</view>
                        <view class="uni-flex-item"><input class="uni-input" focus placeholder="Name" /></view>
                    </view>
                </uni-list-item>
                <uni-list-item :showArrow="false" :showExtra="true">
                    <view class="uni-flex" style="align-items:center">
                        <view style="font-size:30upx;margin-right:20upx">Phone</view>
                        <view class="uni-flex-item"><input class="uni-input" focus placeholder="Phone" /></view>
                    </view>
                    <template v-slot:extra>
                        <button type="primary" size="mini" style="font-size:20upx">Get Code</button>
                    </template>
                </uni-list-item>
                <uni-list-item :showArrow="false">
                    <view class="uni-flex" style="align-items:center">
                        <view style="font-size:30upx;margin-right:20upx">Remark</view>
                        <view class="uni-flex-item"><input class="uni-input" focus placeholder="Remark" /></view>
                    </view>
                </uni-list-item>
            </uni-list>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item title="All Hotel Full Address" :showDesc="true" desc="Map" @click="goMap"/>
                <uni-list-item :showDesc="true" desc="Hotel Details" @click="showPop('hotelDetail')">
                    <image class="koa-icon-image" src="../../../static/tv.png"/>
                    <image class="koa-icon-image" src="../../../static/cold.png"/>
                    <image class="koa-icon-image" src="../../../static/hot.png"/>
                    <image class="koa-icon-image" src="../../../static/wifi.png"/>
                    <image class="koa-icon-image" src="../../../static/sweep.png"/>
                </uni-list-item>
            </uni-list>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item title="Coupon" :showDesc="true" desc="Not Yet" @click="showPop('coupon')"/>
            </uni-list>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item title="WeChat" :showArrow="false" :showExtra="true" :showExtraIcon="true" :extraIcon="{color:'#05db6c',type:'weixin'}">
                    <view slot="extra">
                        <label class="radio"><radio value="r1" checked="true" /></label>
                    </view>
                </uni-list-item>
            </uni-list>
        </view>
        <view class="uni-panel">
            <uni-list>
                <uni-list-item :showArrow="false" :showExtra="true" @click="showTerms">
                    <view>
                        I have read an book terms <text style="color:#02b90b">"booking terms"</text>
                    </view>
                    <view slot="extra">
                        <label class="radio"><radio value="r1" disabled/></label>
                    </view>
                </uni-list-item>
            </uni-list>
        </view>
        <view style="height:80px"></view>
		<view class="goods-carts">
			<uni-list>
                <uni-list-item :showArrow="false" :showFull="true">
                    <view class="uni-flex" style="align-items:center;">
                        <view class="uni-flex-item" style="padding-left:24upx">￥300.00</view>
                        <view>
                            <button type="primary" style="border-radius:0;">Booking Now</button>
                        </view>
                    </view>
                </uni-list-item>
            </uni-list>
		</view>
        <!-- 房间详情 -->
        <uni-popup ref="roomInfo" type="bottom">
            <view>
                <view class="popup-title">{{hotelInfo.title}}</view>
                <view class="popup-close" @tap="closePopup('roomInfo')">
                    <uni-icons type="close" color="#ccc" size="30" />
                </view>
                <view class="uni-panel" style="margin:60upx 0 80upx">
                    <view class="page-section swiper">
                        <view class="page-section-spacing">
                            <swiper class="swiper">
                                <swiper-item v-for="(item, index) in roomInfo.imglist" :key="index">
                                    <image style="width: 100%; " :src="item"></image>
                                </swiper-item>
                            </swiper>
                        </view>
                    </view>
                </view>
            </view>
        </uni-popup>
        <!-- 酒店详情 -->
        <uni-popup ref="hotelDetail" type="bottom">
            <view class="popup-title">{{hotelInfo.title}}</view>
            <view class="popup-close" @tap="closePopup('hotelDetail')">
                <uni-icons type="close" color="#ccc" size="30" />
            </view>
            <view class="uni-panel uni-panel-h" style="margin:60upx 0 80upx">
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
        </uni-popup>

        <!-- 优惠券选择详情 -->
        <uni-popup ref="coupon" type="bottom">
            <view class="popup-close" @tap="closePopup('coupon')">
                <uni-icons type="close" color="#ccc" size="30" />
            </view>
            <view class="uni-flex" style="margin:60upx;align-items:center">
                <view style="margin-right:30upx">
                    <label class="radio"><radio value="r1" checked="true" /></label>
                </view>
                <view class="uni-flex-item">
                    <ticket></ticket>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import ratingShow from '@/components/rating-show/rating-show.vue'
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import Ticket from '@/components/ticket/ticket.vue'

export default {
	components:{
        uniCard,
        uniPopup,
        uniIcons,
        uniList,
        uniListItem,
        ratingShow,
        Ticket,
	},
	data(){
        return {
            hotelInfo:{
                title: 'hotelName',
                address: 'address Address address'
            },
            startDate: '07/07/2019(Wed)',
            endDate: '09/07/2019(Tus)',
            dayCount: '02',
            goodsnav:{
				options: [{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
					text: '客服'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
					text: '店铺'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
            },
            roomInfo:{
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
            existPop: ['roomInfo', 'hotelDetail', 'coupon']
        }
    },
    methods:{
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
        showPop(key){
            if(this.existPop.includes(key)){
                this.$refs[key].open()
            }
        },
        closePopup(key){
            if(this.existPop.includes(key)){
                this.$refs[key].close()
            }
        },
        showTerms(){

        }
    }
}
</script>

<style>
    @import '../../../common/uni-nvue.css';
    .uni-panel-d {
        background-color: rgb(77, 79, 97);
        flex-direction: row;
        align-items: center;
        padding: 8rpx;
    }
    .uni-panel-d .uni-card{
        margin:0
    }
    .hotel-card-footer{
        color:#0bb9ee
    }
	.goods-carts {
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>
