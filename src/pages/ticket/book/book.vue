<template>
  <view class="koa-ticket-book uni-container">
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
            <text>{{ticket.adult.ticketNum}} X</text>
            <text class="uni-product-price-original">￥{{ticket.adult.money2}}</text>
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
            <text>{{ticket.child.ticketNum}} X</text>
            <text class="uni-product-price-original">￥{{ticket.child.money2}}</text>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          title="Valid Date"
          :desc="validDate == ''?'Choose A Date': validDate"
          :showDesc="true"
          @click="goDate"
        />
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item title="Shipping Address" :showArrow="false" />
        <uni-list-item @click="goSelectAddress">
          <view class="koa-desc" v-if="selectedAddress == null">Choose Shipping Address</view>
          <view class="koa-desc" v-else>
            <view>{{selectedAddress.name}} {{selectedAddress.tel}}</view>
            <view>{{selectedAddress.address}}</view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel normal-list">
      <uni-list>
        <uni-list-item title="Coupon" :showDesc="true" desc="Not Yet" @click="showPop('coupon')" />
        <uni-list-item :showArrow="false" :showExtra="true" @click="showPop('termInfo')">
          <view>
            I have read and agree
            <text style="color:#02b90b">"booking terms"</text>
          </view>
          <view slot="extra">
            <label class="radio">
              <radio value="r1" :disabled="!isTerms" :checked="isTerms" />
            </label>
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
    <view class="uni-panel">
      <view style="height:60px"></view>
      <view class="goods-carts" :style='"padding-bottom: "+(isIphoneX ? 68 : 0)+"rpx;"'>
        <button type="primary" style="border-radius:0;" @tap="bookTicket">Booking Now</button>
      </view>
    </view>

    <uni-calendar
      ref="calendar"
      :start-date="startDate"
      :date="validDate"
      @change="change"
      @confirm="change"
    />
    <!-- 优惠券选择详情 -->
    <uni-popup ref="coupon" type="bottom">
      <view class="popup-title">Select Coupon</view>
      <view class="popup-close" @tap="closePopup('coupon')">
        <uni-icons type="close" color="#ccc" size="30" />
      </view>
      <view class="koa-pop-content" style="width: 80%;">
        <view class="uni-list pop-coupon">
          <radio-group>
            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in 6" :key="index">
              <view>
                <radio :value="item" />
              </view>
              <view class="uni-flex-item">
                <ticket></ticket>
              </view>
            </label>
          </radio-group>
        </view>
      </view>
      <button type="primary" @tap="closePopup('coupon')">Select It</button>
    </uni-popup>
    <!-- 阅读须知 -->
    <uni-popup ref="termInfo" type="bottom">
      <view>
        <view class="popup-title">Booking Terms</view>
        <view class="popup-close" @tap="closePopup('termInfo')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="koa-pop-content">
          <view>Our mission is to empower people to experience the world, by offering the world's best places to stay and greatest places and attractions to visit in the most convenient way. In order to achieve this goal, we will live up to the following good practices:</view>

          <view>We care about you: and therefore offer our Platform and customer service in 40+ languages</view>
          <view>We bring and allow you to experience: 1.5m+ properties from high (high) end to whatever serves your needs for your next stay in a hotel, motel, hostel, B&B, etc. wherever on the planet</view>
          <view>We bring and allow you to experience attractions and other Trip Providers</view>
          <view>We can facilitate the payment of any (entrance) fee, purchase or hire of any Trip product and service which uses our payment service</view>
          <view>We help you (24/7): our customer service centers are here to help you 24-7-365-40+</view>
          <view>We listen to you: our Platform is the product of what YOU (the users) prefer and find most convenient when using our service</view>
          <view>We hear you: we show uncensored reviews (of customers who have actually stayed)</view>
          <view>We promise you an informative, user-friendly website that guarantees the best available prices.</view>
          <view>We Price Match</view>
        </view>
        <button type="primary" @tap="setTerms">I Agree</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import Ticket from "@/components/ticket/ticket.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
  components: {
    uniList,
    uniListItem,
    uniCalendar,
    uniNumberBox,
    uniPopup,
    Ticket,
    uniIcons
  },
  data() {
    function getDate(date, AddMonthCount = 0, AddDayCount = 0) {
      if (typeof date !== "object") {
        date = date.replace(/-/g, "/");
      }
      let dd = new Date(date);
      dd.setMonth(dd.getMonth() + AddMonthCount); // 获取AddDayCount天后的日期
      dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return y + "-" + m + "-" + d;
    }
    let ticket = {
      adult: {
        money1: 300.0,
        money2: 200.0,
        ticketNum: 2
      },
      child: {
        money1: 200.0,
        money2: 100.0,
        ticketNum: 1
      }
    };
    return {
      validDate: getDate(new Date(), -1),
      startDate: getDate(new Date(), -1),
      ticket,
      ticketSum:
        ticket.adult.money2 * ticket.adult.ticketNum +
        ticket.child.money2 * ticket.child.ticketNum,
      discount: 0,
      shippingFee: 0,
      existPop: ["coupon", "termInfo"],
      isTerms: false,
      isIphoneX: this.$store.state.isIphoneX
    };
  },
  computed: {
    ...mapState(["selectedAddress"])
  },
  methods: {
    goDate() {
      this.$refs.calendar.open();
    },
    change(e) {
      console.log(e);
      this.validDate = e.fulldate;
    },
    changeAdultNum(value) {
      this.ticket.adult.ticketNum = value;
    },
    changeChildNum(value) {
      this.ticket.child.ticketNum = value;
    },
    bookTicket() {
      uni.redirectTo({
        url: "/pages/common/result/result"
      });
    },
    goSelectAddress() {
      uni.navigateTo({
        url: "/pages/common/address/list"
      });
    },
    setTerms() {
      this.isTerms = true;
      this.closePopup("termInfo");
    },
    showPop(key) {
      if (this.existPop.includes(key)) {
        this.$refs[key].open();
      }
    },
    closePopup(key) {
      if (this.existPop.includes(key)) {
        this.$refs[key].close();
      }
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.koa-ticket-book .uni-list-item__extra {
  width: 40%;
}
.koa-ticket-book .normal-list .uni-list-item__extra {
  width: 25%;
}
.koa-ticket-book .uni-list-item__icon-img {
  width: 120upx;
  height: 120upx;
}
</style>
