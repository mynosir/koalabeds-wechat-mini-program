<template>
  <view class="koa-ticket-book uni-container">
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          :thumb="tempImg"
          v-for="item in ticketInfo.productPrice"
          :key="item.id"
        >
          <view>
            <view class="panel" style="font-size:32upx">{{ticketInfo.title}}</view>
            <view>{{item.title}}</view>
          </view>
          <view slot="extra">
            <text>{{item.num}} X</text>
            <text class="uni-product-price-original">￥{{item.price}}</text>
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
        <uni-list-item
          title="Coupon"
          :showArrow="false"
          :showDesc="true"
          :showExtra="true"
          @click="showPop('coupon')"
        >
          <view slot="extra">
            <text v-if="selectCoupon">{{`-￥${selectCoupon.discountAmount}`}}</text>
            <text v-else style="color:#ccc">Not Yet</text>
            <uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
          </view>
        </uni-list-item>
        <!-- <uni-list-item :showArrow="false" :showExtra="true" @click="showPop('termInfo')">
          <view>
            I have read and agree
            <text style="color:#02b90b">"booking terms"</text>
          </view>
          <view slot="extra">
            <label class="radio">
              <radio value="r1" :disabled="!isTerms" :checked="isTerms" />
            </label>
          </view>
        </uni-list-item>-->
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
      <view class="goods-carts" :class="{'iphonexBottom': isIphoneX}">
        <button type="primary" style="border-radius:0;" @tap="bookTicket">Booking Now</button>
      </view>
    </view>

    <uni-calendar
      ref="calendar"
      :disableBefore="true"
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
          <radio-group @change="changeCoupon">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item,index) in coupons"
              :key="item.id"
            >
              <view>
                <radio :value="index" />
              </view>
              <view class="uni-flex-item">
                <ticket
                  :status="item.status"
                  :price="item.discountAmount"
                  :fullPrice="item.totalAmount"
                  :valid="item.validateDate"
                ></ticket>
              </view>
            </label>
          </radio-group>
        </view>
      </view>
      <button type="primary" @tap="chooseCoupon">Select It</button>
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
    return {
      discount: 0,
      shippingFee: 0,
      existPop: ["coupon", "termInfo"],
      isTerms: false,
      coupons: [],
      selectCouponIndex: -1,
      selectCoupon: null,
      isIphoneX: this.$store.state.isIphoneX
    };
  },
  computed: {
    ...mapState(["selectedAddress"]),
    validDate() {
      return this.$store.state.ticket.validDate.format("yyyy-MM-dd");
    },
    ticketInfo() {
      let ticket = this.$store.state.ticket.ticketInfo;
      ticket.productPrice = ticket.productPrice.filter(item => item.num > 0);
      return ticket;
    },
    ticketSum() {
      let sum = 0;
      this.$store.state.ticket.ticketInfo.productPrice.map(item => {
        sum += item.price * item.num;
      });
      return sum;
    },
    ticketImg() {
      return (
        this.$store.state.ticket.image ||
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
      );
    }
  },
  watch: {
    selectCoupon(newVal) {
      this.discount = newVal.discountAmount;
      return newVal;
    }
  },
  onLoad() {
    this.getCoupons();
  },
  methods: {
    changeCoupon(e) {
      this.selectCouponIndex = e.detail.value;
    },
    chooseCoupon() {
      this.selectCoupon = this.coupons[this.selectCouponIndex];
      this.closePopup("coupon");
    },
    goDate() {
      this.$refs.calendar.open();
    },
    getCoupons() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getCoupons",
        data: {
          type: 2
        },
        showLoading: true
      }).then(res => {
        this.coupons = res.data.filter(
          item => item.totalAmount <= this.ticketSum
        );
      });
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
    testPay() {
      let subQty = {};
      this.ticketInfo.productPrice.map(item => {
        subQty[item.id] = item.num;
      });
      console.log(this.ticketInfo)
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=getGraylinePay",
        method: "post",
        data: {
          params: JSON.stringify({
            openid: this.$store.state.openid,
            type: this.ticketInfo.type,
            productId: this.ticketInfo.productId,
            date: this.validDate,
            subQty,
            travelTime: '',
            hotel: 'testhotel',
            title: 'Mr',
            firstName: 'lin',
            lastName: 'lin',
            passport: '111',
            guestEmail: '361789273@qq.com',
            totalPrice: this.ticketSum,
            telephone: ''
          })
        },
        showLoading: true
      }).then(res => {
        const { id, payParams } = res.data;
        const payInfo = JSON.parse(payParams.pay_info);
        // 仅作为示例，非真实参数信息。
        uni.requestPayment({
          provider: "wxpay",
          ...payInfo,
          success: (res)=> {
            this.commitTicket(id);
          },
          fail: (err)=> {
            this.errorTips("pay error");
          }
        });
      });
    },
    commitTicket(id) {
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=orderProduct",
        data: {
          id
        },
        method: "post",
        showLoading: true
      }).then(res => {
        if (res.status == "0") {
          uni.redirectTo({
            url: "/pages/common/result/result?type=ticket&id=" + id
          });
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg || "system error"
          });
        }
      });
    },
    bookTicket() {
      // if (!this.selectedAddress) {
      //   uni.showToast({
      //     icon: "none",
      //     title: "Please select Shipping address~"
      //   });
      //   return;
      // }
      this.testPay();
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
    },
    errorTips(msg) {
      uni.showToast({
        icon: "none",
        title: msg,
        duration: 2000
      });
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
