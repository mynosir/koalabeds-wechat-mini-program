<template>
  <view class="uni-container" :class="{'uni-panel-h':!hasLogin}">
    <view style="background:#FFF; padding:40upx;">
      <view v-if="!hasLogin" style="margin:130upx 0;background:#FFF;">
        <view style="padding:30upx 0; text-align:center;">
          <uni-icons
            :type="'contact-filled'"
            :color="'#8f8f94'"
            size="64"
            open-type="getUserInfo"
            @getuserinfo="mpGetUserInfo"
          />
        </view>
        <button type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">{{i18n.wechat}}</button>
      </view>
      <block v-else>
        <view style="padding-top:30upx; text-align:center;">
          <image class="userinfo-avatar" :src="userInfo.avatarUrl" />
        </view>
        <view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName}}</view>
      </block>
    </view>
    <template v-if="hasLogin">
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            @click="goDetailPage('my-booking')"
            :title="i18n.hotelBook"
            thumb="/static/booking.png"
          />
          <uni-list-item
            @click="goDetailPage('my-ticket')"
            :title="i18n.myTicket"
            thumb="/static/ticketsHL.png"
          />
          <uni-list-item
            @click="goDetailPage('my-coupon')"
            :title="i18n.myCoupon"
            thumb="/static/coupon.png"
          />
        </uni-list>
      </view>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            @click="goDetailPage('my-language')"
            :title="i18n.language"
            thumb="/static/language.png"
          />
        </uni-list>
      </view>
    </template>
  </view>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { LOGIN } from "@/store/types";
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
  components: {
    uniList,
    uniListItem,
    uniIcons
  },
  data() {
    return {
      title: "getUserInfo"
    };
  },
  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin,
      userInfo: state => state.userInfo
    }),
    i18n() {
      return this.$t("pages.my");
    },
    global() {
      return this.$t("global");
    }
  },
  onShareAppMessage() {
    return {
      title: "Welcome to Koalabeds",
      path: "/pages/index/home/home"
    };
  },
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: "/pages/about/about"
    });
  },
  onLoad() {},
  onReady() {},
  onShow() {
    const { tabBars } = this.global;
    tabBars.map((item, index) => {
      console.log(item);
      uni.setTabBarItem({
        index,
        text: item
      });
    });
  },
  onHide() {},
  methods: {
    mpGetUserInfo(result) {
      if (result.detail.errMsg !== "getUserInfo:ok") {
        uni.showModal({
          title: "get userinfo error",
          content: "reason:" + result.detail.errMsg,
          showCancel: false
        });
        return;
      }
      this.$store.commit(LOGIN, result.detail.userInfo);
    },
    goDetailPage(u) {
      let url = "/pages/my/" + u + "/" + u;
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
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
