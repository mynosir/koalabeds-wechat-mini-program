<template>
  <view class="koa-ticket-book uni-container">
    <view
      class="koa-ticket-status"
      :class="'koa-ticket-status__'+statusText[item.status]"
    >{{statusText[item.status]}}</view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false">
          <view>Order Number:</view>
          <view>{{order.outTradeNo}}</view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :title="'Order Date: '+order.date.format('yyyy/MM/dd')" />
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          :showArrow="false"
          :showExtra="false"
          :thumb="order.extinfo.thumb"
          v-for="product in order.extinfo.productPrice"
          :key="product.id"
        >
          <view>
            <view class="panel" style="font-size:32upx">{{order.extinfo.title}}</view>
            <view class="uni-flex">
              <view>{{product.title}}</view>
              <view class="uni-flex-item" style="text-align:right">
                <text>{{product.num}} X</text>
                <text class="uni-product-price-original">￥{{product.price}}</text>
              </view>
            </view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Valid date">
          <view slot="extra">
            <text>{{order.travelDate}}</text>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Name">
          <view slot="extra">
            <text>{{order.firstName}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Email">
          <view slot="extra">
            <text>{{order.guestEmail}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Passport">
          <view slot="extra">
            <text>{{order.passport}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Shipping Hotel">
          <view slot="extra">
            <text>{{order.hotel}}</text>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :showArrow="false" :showExtra="true" style="font-size:24upx">
          <view>Merchandise</view>
          <view slot="extra" class="uni-product-price-original">￥{{order.totalPrice}}</view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true" style="font-size:24upx">
          <view>Discount</view>
          <view slot="extra" class="uni-product-price-original">￥{{order.discount}}</view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view style="font-size:32upx">Total</view>
          <view
            slot="extra"
            class="uni-product-price-original"
            style="font-size:32upx"
          >￥{{order.totalPrice - order.discount}}</view>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>
<script>
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";

export default {
  components: {
    uniList,
    uniListItem
  },
  data() {
    return {
      order: {},
      statusText: {
        0: "Wait",
        "-1": "Cancel",
        1: "Confirm",
        2: "Complete"
      }
    };
  },
  onLoad(options) {
    this.orderId = options.id || "11";
    this.getOrderDetail();
  },
  methods: {
    errorOut() {
      uni.showToast({
        icon: "none",
        title: "error",
        duration: 2000
      });
      uni.navigateBack({
        delta: 1
      });
    },
    getOrderDetail() {
      if (!this.orderId) {
        this.errorOut();
        return;
      }
      this.$fetch({
        url:
          this.$store.state.domain +
          "api/get?actionxm=getTicketByOrderIdAndOpenid",
        data: {
          orderId: this.orderId
        }
      }).then(res => {
        if (!res.data) {
          this.errorOut();
          return;
        }
        const data = res.data;
        let extinfo = {};
        try {
          extinfo = JSON.parse(data.extinfo);
        } catch (e) {}
        let date = data.create_time
          ? new Date(Number(item.create_time + "000"))
          : new Date();
        this.order = res.data;
        this.order.extinfo = extinfo;
        this.order.date = date;
        this.order.discount = extinfo.discount || 0;
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
