<template>
  <view class="koa-ticket-book uni-container">
    <view class="uni-panel"></view>
    <view class="uni-panel" v-for="(item, index) in orderList" :key="index">
      <uni-list>
        <uni-list-item
          :show-arrow="false"
          :title="'Order date:'+item.date"
          @click="goOrderDetail(item)"
        />
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          thumb="https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
          @click="goOrderDetail(item)"
        >
          <view>
            <view class="panel" style="font-size:32upx">HONGKONG DISNEY TICKET</view>
            <view>Adult</view>
          </view>
          <view slot="extra">
            <text>{{item.adult.ticketNum}} X</text>
            <text class="uni-product-price-original">￥{{item.adult.money2}}</text>
          </view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          thumb="https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
          @click="goOrderDetail(item)"
        >
          <view>
            <view class="panel" style="font-size:32upx">HONGKONG DISNEY TICKET</view>
            <view>Child</view>
          </view>
          <view slot="extra">
            <text>{{item.child.ticketNum}} X</text>
            <text class="uni-product-price-original">￥{{item.child.money2}}</text>
          </view>
        </uni-list-item>
        <uni-list-item
          :show-arrow="false"
          :showExtra="true"
          title="Valid date"
          @click="goOrderDetail(item)"
        >
          <view slot="extra">
            <text class="uni-product-price-original">{{item.valid}}</text>
          </view>
        </uni-list-item>
        <uni-list-item :show-arrow="false" :showExtra="true" @click="goOrderDetail(item)">
          <view>
            <view class="panel" style="font-size:32upx">Ship to</view>
            <view>{{item.shipping}}</view>
          </view>
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
    let orderList = [
      {
        adult: {
          money1: 300.0,
          money2: 200.0,
          ticketNum: 2
        },
        child: {
          money1: 200.0,
          money2: 100.0,
          ticketNum: 1
        },
        date: "2019/01/30",
        valid: "2019/12/31",
        shipping: "sdfsdfsdds"
      },
      {
        adult: {
          money1: 300.0,
          money2: 200.0,
          ticketNum: 2
        },
        child: {
          money1: 200.0,
          money2: 100.0,
          ticketNum: 1
        },
        date: "2019/01/30",
        valid: "2019/12/31",
        shipping: "sdfsdfsdds"
      }
    ];
    return {
      orderList
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
        this.orderList = res.data;
      });
    },
    goOrderDetail(item) {
      uni.navigateTo({
        url: "/pages/my/my-ticket/detail?data=" + JSON.stringify(item)
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
