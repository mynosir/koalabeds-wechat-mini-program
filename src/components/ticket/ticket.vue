<template>
    <view class="uni-container">
    </view>
</template>
<script>
    export default {
        components: {
        },
        data() {
            return {
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
        }
    };
</script>

<style>
    @import '../../../common/uni-nvue.css';
</style>
