<template>
  <view
    class="koa-ticket"
  >
    <view class="koa-ticket--price">￥{{ticketObj.price}}</view>
    <view class="koa-ticket-desc">
      <view class="koa-ticket--full">With purchase ￥{{ticketObj.fullPrice}}</view>
      <view class="koa-ticket--valid">Valid {{ticketObj.valid}} days</view>
    </view>
    <view class="koa-ticket--line"></view>
    <view class="koa-ticket--validdate">Valid date: {{ticketObj.validdate}}</view>
  </view>
</template>

<script>
export default {
  name: "myCoupon",
  props: {
    ticketObj: {}
  },
  data: function() {
    return {
      // isUsed: false
    };
  },
  methods: {
    onClick() {
      this.isUsed = true;
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
}
.koa-ticket--used {
  background: #ccc;
}
.koa-ticket:before {
  content: "";
  position: absolute;
  top: 96upx;
  left: -15upx;
  width: 30upx;
  height: 30upx;
  background: #fff;
  border-radius: 50%;
}
.koa-ticket:after {
  content: "";
  position: absolute;
  top: 96upx;
  right: -15upx;
  width: 30upx;
  height: 30upx;
  background: #fff;
  border-radius: 50%;
}
.koa-ticket--price {
  font-size: 48rpx;
  line-height: 1;
}
.koa-ticket-desc {
  display: flex;
}
.koa-ticket--full {
  flex: 1;
  font-size: 16rpx;
}
.koa-ticket--valid {
  font-size: 16rpx;
  text-align: right;
}
.koa-ticket--line {
  position: absolute;
  border-bottom: 8upx dotted #fff;
  height: 8upx;
  top: 100upx;
  left: 0;
  width: 100%;
}
.koa-ticket--validdate {
  padding: 10rpx 0 10rpx 0;
  font-size: 20rpx;
  color: gray;
  /* text-align: center; */
}
</style>
