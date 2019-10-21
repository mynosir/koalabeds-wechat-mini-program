<template>
    <view class="uni-container">

			<view style="background:#FFF; padding:40upx;">
				<block v-if="hasUserInfo === false">
          <view style="padding:30upx 0; text-align:center;">
              <!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
              <!-- <image class="userinfo-avatar" @click="getUserInfo" :src="userInfo.avatarUrl"></image> -->
              <uni-icons :type="'contact-filled'" :color="'#8f8f94'" size="64" @click="getUserInfo" />
      				<!-- #endif -->
      				<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ -->
              <!-- <image class="userinfo-avatar" open-type="getUserInfo" @getuserinfo="mpGetUserInfo" :src="userInfo.avatarUrl"></image> -->
              <uni-icons :type="'contact-filled'" :color="'#8f8f94'" size="64" open-type="getUserInfo" @getuserinfo="mpGetUserInfo"  @click="getUserInfo"/>
              <!-- #endif -->
					</view>
          <view class="uni-h4 uni-center uni-common-mt">Login</view>
				</block>
				<block v-if="hasUserInfo === true">
					<view style="padding:30upx 0; text-align:center;">
						<image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
					</view>
          <view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName}}</view>
				</block>
			</view>

      <uni-list>
        <uni-list-item @click='goDetailPage("my-booking")' title="Hotel Booking" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
        <uni-list-item @click='goDetailPage("my-ticket")' title="My ticket" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
  			<uni-list-item @click='goDetailPage("my-coupon")' title="My CouPon" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
  		</uni-list>
    </view>
</template>
<script>
    import {
      mapState,
      mapMutations
    } from 'vuex'
    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
    import uniIcons from '@/components/uni-icons/uni-icons.vue'
    export default {
        components: {
          uniList,
          uniListItem,
          uniIcons
        },
        data() {
            return {
              title: 'getUserInfo',
      				hasUserInfo: false,
      				userInfo: {}

            };
        },
        computed: {
    			...mapState({
    				loginProvider: state => state.loginProvider
    			})
    		},
        onShareAppMessage() {
            return {
                title: '欢迎体验uni-app',
                path: '/pages/tabBar/API/API'
            };
        },
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '/pages/about/about'
            });
        },
        onLoad() {
              // 获取用户信息
              uni.getUserInfo({
                provider: 'weixin',
                success: function (infoRes) {
                  console.log('用户昵称为：' + infoRes.userInfo);
                }
              });
        },
        onReady() {
        },
        onShow() {
        },
        onHide() {
        },
        methods: {
          // 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
    			getUserInfo() {
    				uni.getUserInfo({
    					provider: this.loginProvider,
    					success: (result) => {
    						console.log('getUserInfo success', result);
    						this.hasUserInfo = true;
    						this.userInfo = result.userInfo;
    					},
    					fail: (error) => {
    						console.log('getUserInfo fail', error);
    						let content = error.errMsg;
    						if (~content.indexOf('uni.login')) {
    							content = '请在登录页面完成登录操作';
    						}
                            // #ifndef APP-PLUS
    						uni.getSetting({
    							success: (res) => {
    								let authStatus = res.authSetting['scope.userInfo'];
    								if (!authStatus) {
    									uni.showModal({
    										title: '授权失败',
    										content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
    										success: (res) => {
    											if (res.confirm) {
    												uni.openSetting()
    											}
    										}
    									})
    								} else {
    									uni.showModal({
    										title: '获取用户信息失败',
    										content: '错误原因' + content,
    										showCancel: false
    									});
    								}
    							}
    						})
                            // #endif
                            // #ifdef APP-PLUS
                      uni.showModal({
                      	title: '获取用户信息失败',
                      	content: '错误原因' + content,
                      	showCancel: false
                      });
                            // #endif
    					}
    				});
    			},
    			mpGetUserInfo(result) {
    				console.log('mpGetUserInfo', result);
    				if (result.detail.errMsg !== 'getUserInfo:ok') {
    					uni.showModal({
    						title: '获取用户信息失败',
    						content: '错误原因' + result.detail.errMsg,
    						showCancel: false
    					});
    					return;
    				}
    				this.hasUserInfo = true;
    				this.userInfo = result.detail.userInfo;
    			},
    			clear() {
    				this.hasUserInfo = false;
    				this.userInfo = {};
    			},

          goDetailPage(u) {
            let url = "/pages/my/"+u+"/"+u
            uni.navigateTo({
                url: url
            })
          }

        }
    };
</script>

<style>
    @import '../../../common/uni-nvue.css';
    .userinfo-avatar {
  		border-radius: 128upx;
  		width: 128upx;
  		height: 128upx;
  	}
    .icon-item {
  		display: flex;
  		flex-direction: column;
  		align-items: center;
  		padding: 30upx 10upx;
  		width: 25%;
  		text-align: center;
  		white-space: normal;
  		word-break: break-all;
  		box-sizing: border-box;
  	}


</style>
