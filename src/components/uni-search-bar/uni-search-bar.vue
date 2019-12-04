<template>
	<view class="uni-searchbar">
		<view :class="show?'':'hide'" class="uni-searchbar-form">
			<view :style="{borderRadius:radius+'rpx'}" class="uni-searchbar-form__box" @click="searchClick">
				<uni-icons :color="'#999999'" class="icon-search" type="search" size="18" />
				<input ref="input" :placeholder="placeholder" :disabled="disabled" :focus="focus" v-model="searchVal" class="search-input" type="text" placeholder-style="color:#cccccc" confirm-type="search" @confirm="confirm" @blur="onblur">
				<uni-icons :color="'#999999'" v-if="clearButton==='always'||clearButton==='auto'&&searchVal!==''" class="icon-clear" type="clear" size="24" @click="clear" />
			</view>
			<text v-if="!hideCancel" class="uni-searchbar-form__cancel" @click="cancel">{{$t("components.searchbar.cancel")}}</text>
			<text v-if="showSearch" class="uni-searchbar-form__cancel active" @click="search">{{$t("components.searchbar.search")}}</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniSearchBar',
		components: {
			uniIcons
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: 'search'
			},
			radius: {
				type: [Number, String],
				default: 10
			},
			clearButton: {
				type: String,
				default: 'auto'
			},
			hideCancel:{
				type: Boolean
			},
			showSearch:{
				type: Boolean
			},
			disabled:{
				type: Boolean,
				default:false
			},
			focus:{
				type: Boolean,
				default:false
			}
		},
		data() {
			return {
				show: false,
				searchVal: this.value
			}
		},
		watch: {
			searchVal() {
				this.$emit('input', {
					value: this.searchVal
				})
			}
		},
		methods: {
			searchClick() {
				// this.searchVal = ''
				this.show = true
			},
			onblur(){
				this.show = false
			},
			search(){
				this.$emit('search', {
					value: this.searchVal
				})
			},
			clear() {
				this.searchVal = ''
			},
			cancel() {
				this.$emit('cancel', {
					value: this.searchVal
				})
				this.searchVal = ''
				this.show = false
			},
			confirm() {
				this.$emit('confirm', {
					value: this.searchVal
				})
			},
			changeValue(value){
				this.searchVal = value
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-searchbar-form {
		position: relative;
		display: flex;
		padding: 15rpx;
		width: 100%;
		box-sizing: border-box
	}

	.uni-searchbar-form__box {
		display: flex;
		flex: 1;
		align-items: center;
		width: 100%;
		height: 64rpx;
		color: #c8c7cc;
		background: #fff;
		border: solid 1px #c8c7cc;
		border-radius: 10rpx
	}

	.uni-searchbar-form__box .icon-search {
		color: #c8c7cc;
		line-height: 24px;
		padding: 0rpx 10rpx 0rpx 15rpx
	}

	.uni-searchbar-form__box .search-input {
		flex: 1;
		font-size: 28rpx;
		height: 64rpx;
		line-height: 64rpx;
		color: #333
	}

	.uni-searchbar-form__box .icon-clear {
		color: #c8c7cc;
		line-height: 20px;
		padding: 0rpx 15rpx 0rpx 10rpx
	}

	.uni-searchbar-form__text {
		display: flex;
		flex: 1;
		align-items: center;
		width: 100%;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		color: #c8c7cc;
		background: #fff;
		border: solid 1px #c8c7cc;
		border-radius: 10rpx;
		display: none
	}

	.uni-searchbar-form__text .icon-search {
		height: 64rpx;
		line-height: 64rpx
	}

	.uni-searchbar-form__text .placeholder {
		display: inline-block;
		font-size: 28rpx;
		color: #ccc;
		margin-left: 10rpx
	}

	.uni-searchbar-form__cancel {
		padding-left: 20rpx;
		line-height: 64rpx;
		color: #333;
		white-space: nowrap
	}
	.uni-searchbar-form__cancel.active{
		color: #0bb9ee;
	}

	.uni-searchbar-form.hide .uni-searchbar-form__text {
		display: block
	}

	.uni-searchbar-form.hide .uni-searchbar-form__cancel {
		display: none
	}
</style>