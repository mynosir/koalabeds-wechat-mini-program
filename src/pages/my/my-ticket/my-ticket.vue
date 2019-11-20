<template>
  <view class="koa-ticket-book uni-container">
    <view class="uni-panel" v-for="(item, index) in orderList" :key="index" style="position:relative">
      <view class="koa-ticket-status" :class="'koa-ticket-status__'+statusText[item.status]">
        {{statusText[item.status]}}
      </view>
      <uni-list @click="goOrderDetail(item)">
        <uni-list-item :show-arrow="false" :showExtra="false">
          <view class="uni-flex">
            <view>{{$t("pages.myticket.orderDate")}}{{ item.date.format('yyyy/MM/dd')}}</view>
          </view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="false"
          :thumb="item.extinfo.thumb"
          v-for="product in item.extinfo.productPrice"
          :key="product.id"
        >
          <view>
            <view class="panel" style="font-size:32upx">{{item.extinfo.title}}</view>
            <view class="uni-flex">
              <view>{{product.title}}</view>
              <view class="uni-flex-item" style="text-align:right">
                <text>{{product.num}} X</text>
                <text class="uni-product-price-original">￥{{product.price}}</text>
              </view>
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Valid date">
          <view slot="extra">
            <text class="uni-product-price-original">{{item.travelDate}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true">
          <view>
            <view class="panel" style="font-size:32upx">{{$t("pages.myticket.UserInfo")}}</view>
            <view>
              <view>{{$t("pages.ticketBook.Name")}}: {{item.firstName}}</view>
              <view>{{$t("pages.ticketBook.Email")}}: {{item.guestEmail}}</view>
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view>{{$t("global.Total")}}</view>
          <view
            slot="extra"
            class="uni-product-price-original"
          >￥{{item.totalPrice}}</view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="no-data" v-if="orderList.length <= 0">{{$t("pages.myticket.nodata")}}</view>
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
      orderList: [],
      statusText: this.$t("pages.myticket.statusText")
    };
  },
  onLoad() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getTicketOrders"
      }).then(res => {
        if (!res.data && res.data.length <= 0) {
          return;
        }
        this.orderList = res.data.map(item => {
          let extinfo = {};
          try {
            extinfo = JSON.parse(item.extinfo);
          } catch (e) {}
          return {
            ...item,
            date: item.create_time
              ? new Date(Number(item.create_time + "000"))
              : new Date(),
            extinfo
          };
        });
        console.log(this.orderList);
      });
    },
    goOrderDetail(item) {
      uni.navigateTo({
        url: "/pages/my/my-ticket/detail?id=" + item.id
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
