<template>
  <view
    :class="{'koa-ticket--used': isGetted === true || isGetted === 'true'}"
    class="koa-ticket"
    @click="onClick"
  >
    <view class="koa-ticket--price">￥{{price}}</view>
    <view class="koa-ticket-desc">
      <view class="koa-ticket--full">With purchase ￥{{fullPrice}}</view>
      <view class="koa-ticket--valid">Valid {{valid}} days</view>
    </view>
    <view class="koa-ticket--line"></view>
    <view class="koa-ticket--btn">{{isGetted ? 'GOT' : 'GET IT'}}</view>
  </view>
</template>

<script>
export default {
  name: "Ticket",
  props: {
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
    isUsed: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isGetted: false
    };
  },
  methods: {
    onClick() {
      this.isGetted = true;
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
  font-size: 40upx;
  line-height: 1.4;
}
.koa-ticket-desc {
  display: flex;
}
.koa-ticket--full {
  flex: 1;
  font-size: 14upx;
}
.koa-ticket--valid {
  font-size: 14upx;
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
.koa-ticket--btn {
  padding-top: 10upx;
  font-size: 28upx;
  text-align: center;
}
</style>