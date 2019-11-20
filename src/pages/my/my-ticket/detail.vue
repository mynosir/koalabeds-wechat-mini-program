<template>
  <view class="koa-ticket-book uni-container">
    <view
      class="koa-ticket-status"
      :class="'koa-ticket-status__'+statusText[order.status]"
    >{{statusText[order.status]}}</view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false">
          <view>{{$t("pages.myticketDetail.orderNumber")}}:</view>
          <view>{{order.outTradeNo}}</view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :title="$t('pages.myticketDetail.orderDate')+order.date" />
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
        <uni-list-item :show-arrow="false" :showExtra="true" :title="$t('pages.ticketBook.Name')">
          <view slot="extra">
            <text>{{order.firstName}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" :title="$t('pages.ticketBook.Email')">
          <view slot="extra">
            <text>{{order.guestEmail}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" :title="$t('pages.ticketBook.Passport')">
          <view slot="extra">
            <text>{{order.passport}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" :title="$t('pages.ticketBook.Hotel')">
          <view slot="extra">
            <text>{{order.hotel}}</text>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :showArrow="false" :showExtra="true" style="font-size:24upx">
          <view>{{$t('pages.ticketBook.Merchandise')}}</view>
          <view slot="extra" class="uni-product-price-original">￥{{order.totalPrice}}</view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true" style="font-size:24upx">
          <view>{{$t('pages.ticketBook.Discount')}}</view>
          <view slot="extra" class="uni-product-price-original">￥{{order.discount}}</view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view style="font-size:40upx">{{$t('pages.ticketBook.Total')}}</view>
          <view
            slot="extra"
            class="uni-product-price-original"
            style="font-size:40upx"
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
      statusText: this.$t("pages.myticket.statusText")
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
        let date = res.data.create_time
          ? new Date(Number(res.data.create_time + "000"))
          : new Date();
        this.order = res.data;
        this.order.extinfo = extinfo;
        this.order.date = date.format('yyyy/MM/dd');
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
