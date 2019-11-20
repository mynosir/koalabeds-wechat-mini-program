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
        <view class="uni-media-list-body">
          <view class="uni-media-list-text-top">{{value.title}}</view>
          <view class="uni-media-list-text-bottom uni-ellipsis" v-html="value.content"></view>
        </view>
        <view class="uni-media-list-extra">
          <view class="uni-product-price">
            <view class="uni-product-price-favour" v-if="value.money1">￥{{value.money1}}</view>
            <view class="uni-product-price-original">
              ￥{{value.money2}}
              <text style="font-size:24upx;margin-left:6upx;">{{$t('global.up')}}</text>
            </view>
            <view>
              <button
                id="product-list-btn"
                type="primary"
                size="mini"
                @click="goBook($event,value)"
              >{{$t('global.BOOK')}}</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "productList",
  props: {
    list: {
      type: Array,
      default: [
        {
          title: "ROOM A",
          content: "Two Bed",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
          money1: "200.00",
          money2: "300.00"
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
    }
  }
};
</script>