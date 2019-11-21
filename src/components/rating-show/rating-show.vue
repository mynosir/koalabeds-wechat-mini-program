<template>
	<view class="rating-box" @tap="onClick">
        <uni-icons type="star-filled" color="#ffdc64" size="26" />
        <text class="rating-text">{{value}}</text>
        <text class="rating-numbers">{{numbers}} {{$t("pages.search.rating")}}</text>
    </view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
        components:{
            uniIcons
        },
		name: 'RatingShow',
		props: {
			value: {
				type: String,
				default: '5'
			}, // 值
			numbers: {
				type: String,
				default: '100'
			} //数量
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@charset "UTF-8";
    .rating-box{
        margin-bottom:20upx
    }
    .rating-text{
        margin-left:14upx;
        color:#0bb9ee
    }
    .rating-numbers{
        margin-left:14upx;
        font-size:20upx;
        color:#415e67
    }
</style>