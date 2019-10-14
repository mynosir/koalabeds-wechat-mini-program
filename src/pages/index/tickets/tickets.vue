<template>
    <view class="uni-container">
        <panel-image v-for="i in 6" :key="i" title="Hotel Title" :imgUrl="tempImg" goUrl="/pages/hotel/detail"></panel-image>
        <uni-load-more iconType="spinner" :status="loadmoreStatus" />
    </view>
</template>
<script>
    import panelImage from '@/components/panel-image/panel-image.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
    export default {
        components: {
            panelImage,
            uniLoadMore
        },
        data() {
            return {
                tempImg: 'https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg'
            };
        },
        onShareAppMessage() {
            return {
                title: 'Welcome to Koalabeds',
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
        }
    };
</script>

<style>
    @import '../../../common/uni-nvue.css';
</style>
