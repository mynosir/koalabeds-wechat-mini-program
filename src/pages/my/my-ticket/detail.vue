<template>
  <view class="koa-ticket-book uni-container">
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false" :title="'Order date:'+order.date" />
        <uni-list-item :show-arrow="false" :title="'Order Number:'+order.number" />
        <uni-list-item :show-arrow="false" :showExtra="true">
          <view>
            <view class="panel" style="font-size:32upx">Ship to</view>
            <view>{{order.shipping}}</view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          thumb="https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
        >
          <view>
            <view class="panel" style="font-size:32upx">HONGKONG DISNEY TICKET</view>
            <view>Adult</view>
          </view>
          <view slot="extra">
            <text>{{order.adult.ticketNum}} X</text>
            <text class="uni-product-price-original">￥{{order.adult.money2}}</text>
          </view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          thumb="https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
        >
          <view>
            <view class="panel" style="font-size:32upx">HONGKONG DISNEY TICKET</view>
            <view>Child</view>
          </view>
          <view slot="extra">
            <text>{{order.child.ticketNum}} X</text>
            <text class="uni-product-price-original">￥{{order.child.money2}}</text>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false" :showExtra="true" title="Valid date">
          <view slot="extra">
            <text class="uni-product-price-original">{{order.valid}}</text>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          @click="showPop('termInfo')"
          style="font-size:24upx"
        >
          <view>Merchandise</view>
          <view slot="extra" class="uni-product-price-original">￥{{ticketSum}}</view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          @click="showPop('termInfo')"
          style="font-size:24upx"
        >
          <view>Discount</view>
          <view slot="extra" class="uni-product-price-original">￥{{discount}}</view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          @click="showPop('termInfo')"
          style="font-size:24upx"
        >
          <view>Shipping Fee</view>
          <view slot="extra" class="uni-product-price-original">￥{{shippingFee}}</view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          @click="showPop('termInfo')"
          style="font-size:32upx"
        >
          <view>Total</view>
          <view
            slot="extra"
            class="uni-product-price-original"
          >￥{{ticketSum - discount + shippingFee}}</view>
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
      ticketSum: 0,
      discount: 0,
      shippingFee: 0
    };
  },
  onLoad(options) {
    this.orderId = options.id;
    setTimeout(() => {
      console.log(options.data);
      let order = this.order;
      this.order = JSON.parse(options.data);
      console.log(this.order);

      this.ticketSum =
        this.order.adult.money2 * this.order.adult.ticketNum +
        this.order.child.money2 * this.order.child.ticketNum;
      this.order.number = "12837892347";
    }, 350);
  },
  methods: {
    getOrderDetail() {
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getTicketOrderById",
        data: {
          id: this.orderId
        }
      }).then(res => {
        let data = res.data;
        this.order = {
          ...data,
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
          shipping: "sdfsdfsdds",
          number: "1238908902342"
        };
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
