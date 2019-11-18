<template>
  <view class="uni-list">
    <view
      class="uni-list-cell"
      hover-class="uni-list-cell-hover"
      v-for="(value,key) in list"
      :key="key"
      @tap="onClick($event,value)"
    >
      <view class="uni-media-list">
        <view class="uni-media-list-logo">
          <image :src="value.img" />
        </view>
        <view class="uni-media-list-body" style="display: block">
          <view class="uni-media-list-text-top">{{value.title}}</view>
          <view class="uni-media-list-text-top">{{value.name}}</view>
          <view
            class="uni-media-list-text-top"
            style="font-size: 23rpx"
          >IN:{{value.startDate}} END:{{value.endDate}} {{value.dayCount}}N</view>
          <view class="uni-media-list-text-bottom uni-ellipsis" style="height:30upx;" v-html="value.type"></view>
          <view class="uni-media-list-extra2" style="display: block;float:right;margin-top:20upx;">
            <template v-if="value.status=='0'">
              <button
                id="product-list-btn1"
                style="margin-right:20rpx"
                type="default"
                size="mini"
                @click="cancel($event,value)"
              >Cancel</button>
              <button
                id="product-list-btn2"
                type="warn"
                size="mini"
                @click="goBook($event,value)"
              >PAY</button>
            </template>
            <view
              v-else
              :style="{'color': value.status==='03'?'green':(value.status==='02'?'#0bb9ee':'black')}"
              class="order-status"
            >{{value.statusName}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "bookingOrder",
  props: {
    list: {
      type: Array,
      default: [
        {
          title: "Lee Garden Guest House",
          name: "ROOM A",
          type: "Twin bed",
          startDate: "07/07/2019(Wed)",
          endDate: "09/07/2019(Tus)",
          dayCount: "2",
          status: "02",
          statusName: "To be paid",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg"
        }
      ]
    } // 列表
  },
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    onClick(event, value) {
      if (event.target.id === "product-list-btn") {
        return;
      }
      this.$emit("click", value);
    },
    goBook(event, value) {
      this.$emit("book", value);
    },
    cancel(event, value) {
      this.$emit("cancel", value);
    }
  }
};
</script>
<style>
.uni-media-list-body {
  height: auto;
}
.uni-media-list-logo {
  width: 142rpx;
  height: 142rpx;
}
</style>
