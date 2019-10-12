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
            <view class="uni-panel uni-panel-h">
                <uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
                <button type="primary">Search</button>
            </view>
        </view>
        <view class="uni-panel uni-panel-h">
            
        </view>
    </view>
</template>
<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
    export default {
        components: {
			uniSearchBar
        },
        data() {
            return {
                swiperSetting: {
                    indicatordots: true,
                    autoplay: true,
                    interval: 3000, //每隔毫秒自动播放
                    duration: 500 //动画时间
                },
                imglist: [
                    'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                    'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                    'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg',
                ]
            };
        },
        onShareAppMessage() {
            return {
                title: '欢迎体验uni-app',
                path: '/pages/index/home/home'
            };
        },
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '/pages/about/about'
            });
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
            search(){

            },
            input(){

            },
            cancel(){

            }
        }
    };
</script>

<style>
    @import '../../../common/uni-nvue.css';
</style>
