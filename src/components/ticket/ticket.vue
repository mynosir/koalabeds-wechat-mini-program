<template>
  <view :class="classes[status] || ''" class="koa-ticket" @click="onClick">
    <view class="koa-ticket--price" :class="{'bigger':!isSmall}">￥{{price}}</view>
    <view class="koa-ticket-desc">
      <view class="koa-ticket--full">{{$t('components.ticket.purchase')}} ￥{{fullPrice}}</view>
      <view class="koa-ticket--valid">{{$t('components.ticket.valid', {valid})}}</view>
    </view>
    <view style="margin:0 -30upx">
      <view class="koa-ticket--line"></view>
    </view>
    <template v-if="!footer || footer == ''">
      <view class="koa-ticket--btn" v-if="hasLogin">{{footerText[status]}}</view>
      <button
        class="koa-ticket--btn"
        type="primary"
        open-type="getUserInfo"
        @getuserinfo="mpGetUserInfo"
        v-else
      >{{footerText[status]}}</button>
    </template>
    <view class="koa-ticket--btn footer" v-else>{{footer}}</view>
  </view>
</template>

<script>
export default {
  name: "Ticket",
  props: {
    isSmall: {
      type: Boolean,
      default: false
    },
    price: {
      type: String,
      default: "10"
    }, // 优惠价格
    fullPrice: {
      type: String,
      default: "1000"
    }, // 满多少优惠
    valid: {
      type: String,
      default: "30"
    }, // 有效时间 天为单位
    canClick: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "0" // 0:原始未获取状态 1:获取状态 2:已使用 3:过期
    },
    footer: {
      type: String,
      default: ""
    }
  },
  computed: {
    footerText() {
      return this.$t("components.ticket.footerText");
    },
    hasLogin(){
      return this.$store.state.hasLogin
    } 
  },
  data() {
    const classes = {
      "0": "koa-ticket--get",
      "1": "koa-ticket--used",
      "2": "koa-ticket--expired"
    };
    return {
      classes
    };
  },
  methods: {
    mpGetUserInfo(result) {
      if (result.detail.errMsg !== "getUserInfo:ok") {
        uni.showModal({
          title: this.$t("global.getUserError"),
          content: this.$t("global.getUserErrMsg", {
            errMsg: result.detail.errMsg
          }),
          showCancel: false
        });
        return;
      }
      this.$store.commit("LOGIN", result.detail.userInfo);
    },
    onClick() {
      if (!this.canClick) {
        return;
      }
      if (this.status != "-1") {
        return;
      }
      this.$emit("click");
    }
  }
};
</script>

<style>
@charset "UTF-8";

.koa-ticket {
  position: relative;
  color: #fff;
  background-color: #11c0ee;
  background-image: linear-gradient(to right, #11c0ee, #4df2ee);
  padding: 30upx 30upx 0upx 30upx;
  overflow: hidden;
}
.koa-ticket:after {
  position: absolute;
  content: "";
  width: 80rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 50%;
  right: 10rpx;
  bottom: 10rpx;
  text-align: center;
  transform: rotate(-45deg);
  opacity: 0.6;
  display: none;
}
.koa-ticket--get:after {
  display: block;
  border: 2px dashed rgb(237, 107, 52);
  content: "GOT";
  color: rgb(237, 70, 52);
}
.koa-ticket--used:after {
  display: block;
  border: 2px dashed rgb(237, 107, 52);
  content: "USED";
  color: rgb(237, 70, 52);
}
.koa-ticket--expired {
  background: rgb(232, 232, 232);
}
.koa-ticket--expired:after {
  display: block;
  border: 2px dashed rgb(237, 107, 52);
  content: "NOT";
  color: rgb(237, 70, 52);
}

.koa-ticket--price {
  font-size: 40upx;
  line-height: 1.4;
  text-align: left;
}
.koa-ticket--price.bigger {
  font-size: 60upx;
}
.koa-ticket-desc {
  display: flex;
}
.koa-ticket--full {
  flex: 1;
  font-size: 16upx;
  text-align: left;
}
.koa-ticket--valid {
  font-size: 16upx;
  text-align: right;
}
.koa-ticket--line {
  border-bottom: 8upx dotted #fff;
  height: 8upx;
  width: 100%;
  position: relative;
}
.koa-ticket--line:before {
  content: "";
  position: absolute;
  top: -11upx;
  left: -15upx;
  width: 30upx;
  height: 30upx;
  background: #fff;
  border-radius: 50%;
}
.koa-ticket--line:after {
  content: "";
  position: absolute;
  top: -11upx;
  right: -15upx;
  width: 30upx;
  height: 30upx;
  background: #fff;
  border-radius: 50%;
}
.koa-ticket--btn {
  padding-top: 10upx;
  font-size: 28upx;
  text-align: center;
  background:none;
}
button.koa-ticket--btn{
  border:0;
  background:none !important;
}
button.koa-ticket--btn:after{
  border:0;
  border-radius: 0;
}
.footer {
  color: rgb(78, 82, 96);
  text-align: left;
}
.koa-ticket--expired .footer {
  color: #fff;
}
</style>