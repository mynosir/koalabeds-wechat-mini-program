<template>
  <view class="koa-ticket-book uni-container">
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          :thumb="ticketImg"
          v-for="item in ticketInfo.productPrice"
          :key="item.id"
        >
          <view>
            <view
              class="panel"
              style="font-size:32upx"
            >{{ticketInfo.title.replace(ticketInfo.ticketCode, '').replace(ticketInfo.tourCode, '')}}</view>
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
          :title="$t('pages.ticketDetail.validDate')"
          :desc="validDate == ''? $t('pages.ticketDetail.chooseDate'): validDate"
          :showDesc="true"
          @click="goDate"
        />
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view class="koa-form-item__right">{{$t("pages.ticketBook.Hotel")}}</view>
            <view class="uni-flex-item">
              <picker @change="hotelChange" :value="hotelSelectIndex" :range="hotelList">
                <view style="padding-left:25upx;">{{hotelList[hotelSelectIndex]}}</view>
              </picker>
            </view>
            <view>
              <uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view class="koa-form-item__right">{{$t('pages.ticketBook.Name')}}</view>
            <view class="uni-flex-item">
              <input
                class="uni-input"
                focus
                :placeholder="$t('pages.ticketBook.Name')"
                v-model="userInfo.name"
              />
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view class="koa-form-item__right">{{$t("pages.ticketBook.Passport")}}</view>
            <view class="uni-flex-item">
              <picker @change="nationChange" :value="nationSelectIndex" :range="nationalityList">
                <view style="padding-left:25upx;">{{nationalityList[nationSelectIndex]}}</view>
              </picker>
            </view>
            <view>
              <uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view class="koa-form-item__right">{{$t('pages.ticketBook.Email')}}</view>
            <view class="uni-flex-item">
              <input class="uni-input" placeholder="xxx@mail.com" v-model="userInfo.email" />
            </view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <!-- <view class="uni-panel">
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
    </view>-->
    <view class="uni-panel normal-list">
      <uni-list>
        <uni-list-item
          :title="$t('global.Coupon')"
          :showArrow="false"
          :showDesc="true"
          :showExtra="true"
          @click="showPop('coupon')"
        >
          <view slot="extra">
            <text v-if="selectCoupon">{{`-￥${selectCoupon.discountAmount}`}}</text>
            <text v-else style="color:#ccc">{{$t("global.notYet")}}</text>
            <uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
          </view>
        </uni-list-item>
        <uni-list-item
          :showArrow="true"
          :showExtra="true"
          @click="showPop('termInfo')"
          v-if="ticketInfo.clause"
        >
          <view>
            {{$t("pages.hotelBook.termsText")}}
            <text style="color:#02b90b">" {{$t("pages.hotelBook.bookingTerms")}}"</text>
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
        <uni-list-item :showArrow="false" :showExtra="true" style="font-size:24upx">
          <view>{{$t("pages.ticketBook.Merchandise")}}</view>
          <view slot="extra" class="uni-product-price-original">￥{{ticketSum}}</view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          @click="showPop('termInfo')"
          style="font-size:24upx"
        >
          <view>{{$t("pages.ticketBook.Discount")}}</view>
          <view slot="extra" class="uni-product-price-original">-￥{{discount}}</view>
        </uni-list-item>
        <uni-list-item
          :showArrow="false"
          :showExtra="true"
          @click="showPop('termInfo')"
          style="font-size:32upx"
        >
          <view>{{$t("pages.ticketBook.Total")}}</view>
          <view slot="extra" class="uni-product-price-original">￥{{ticketSum - discount }}</view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <view style="height:60px"></view>
      <view class="goods-carts" :class="{'iphonexBottom': isIphoneX}">
        <button type="primary" style="border-radius:0;" @tap="bookTicket">{{$t('global.Booking')}}</button>
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
      <view class="popup-title">{{$t("global.selectCoupon")}}</view>
      <view class="popup-close" @tap="closePopup('coupon')">
        <uni-icons type="close" color="#ccc" size="30" />
      </view>
      <view class="koa-pop-content" style="width: 80%;">
        <view class="uni-list pop-coupon" v-if="coupons.length > 0">
          <radio-group @change="changeCoupon">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item,index) in coupons"
              :key="item.id"
            >
              <view>
                <radio :value="index" :checked="selectCouponIndex == index" />
              </view>
              <view class="uni-flex-item">
                <ticket
                  :status="item.status"
                  :price="item.discountAmount"
                  :fullPrice="item.totalAmount"
                  :valid="item.validateDate"
                  :footer="item.validateDateStr"
                ></ticket>
              </view>
            </label>
          </radio-group>
        </view>
        <view class="no-data" v-else>{{$t("global.noValidCoupon")}}</view>
      </view>
      <view class="uni-flex" v-if="coupons.length > 0">
        <view class="uni-flex-item" style="margin-right:20upx;">
          <button
            type="info"
            @tap="()=>{selectCouponIndex =-1;selectCoupon=null;closePopup('coupon');}"
          >{{$t("global.Cancel")}}</button>
        </view>
        <view class="uni-flex-item">
          <button type="primary" @tap="chooseCoupon">{{$t("global.selectCouponIt")}}</button>
        </view>
      </view>
    </uni-popup>
    <!-- 阅读须知 -->
    <uni-popup ref="termInfo" type="bottom">
      <view>
        <view class="popup-title">{{$t("pages.hotelBook.bookingTerms")}}</view>
        <view class="popup-close" @tap="closePopup('termInfo')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="koa-pop-content" v-html="ticketInfo.clause"></view>
        <button type="primary" @tap="setTerms">{{$t("global.Agree")}}</button>
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
      isIphoneX: this.$store.state.isIphoneX,
      userInfo: {
        name: "",
        passport: "",
        email: ""
      },
      hotelSelectIndex: 0,
      hotelList: [],
      nationSelectIndex: 0,
      nationalityList: [],
      objectNationlity: null
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
      this.isTerms = !ticket.clause;
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
      if (!newVal) {
        this.discount = 0;
      } else {
        this.discount = newVal.discountAmount;
      }
      return newVal;
    }
  },
  onLoad() {
    this.getCoupons();
    this.getHotels();
    this.getGraylineNationalityList();
  },
  methods: {
    hotelChange(e) {
      this.hotelSelectIndex = e.target.value;
    },
    getHotels() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getHotelListInDB", //仅为示例，并非真实接口地址。
        data: {},
        showLoading: true
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          return;
        }
        this.hotelList = res.data.map(item => {
          return item.propertyName;
        });
      });
    },
    changeCoupon(e) {
      this.selectCouponIndex = e.detail.value;
    },
    chooseCoupon() {
      if (!this.coupons[this.selectCouponIndex]) {
        this.errorTips(this.$t("global.noSelectCouponTip"));
        return;
      }
      this.selectCoupon = this.coupons[this.selectCouponIndex];
      this.closePopup("coupon");
    },
    goDate() {
      this.$refs.calendar.open();
    },
    getCoupons() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getCouponByOpenid", //仅为示例，并非真实接口地址。
        data: {},
        showLoading: true
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          return;
        }
        const list = res.data.map(item => {
          let status = item.status;
          let date = new Date(Number(item.create_time + "000"));
          date.setDate(date.getDate() + Number(item.validateDate));
          if (new Date() >= date) {
            status = 2;
          }
          return {
            ...item,
            status,
            validateDateStr: this.$t("global.validDateStr", {
              dateStr: date.format("yyyy/MM/dd")
            })
          };
        });
        console.log("coupons:", list);
        this.coupons = list.filter(
          item =>
            item.status == 0 &&
            Number(item.totalAmount) <= Number(this.ticketSum) //未使用 且 大于可使用金额
        );
      });
    },
    change(e) {
      this.validDate = e.fulldate;
    },
    changeAdultNum(value) {
      this.ticket.adult.ticketNum = value;
    },
    changeChildNum(value) {
      this.ticket.child.ticketNum = value;
    },
    nationChange(e) {
      this.nationSelectIndex = e.target.value;
      this.userInfo.passport = this.objectNationlity[this.nationSelectIndex].id;
    },
    getGraylineNationalityList() {
      this.$fetch({
        url:
          this.$store.state.domain +
          "api/get?actionxm=getGraylineNationalityList"
      }).then(res => {
        if (res.status == 0 && res.data) {
          const nationalityList = res.data.nationalityList;
          this.objectNationlity = Object.keys(nationalityList).map(key => {
            return {
              id: key,
              name: nationalityList[key]
            };
          });
          this.nationalityList = Object.keys(nationalityList).map(
            key => nationalityList[key]
          );
        }
      });
    },
    testPay() {
      let subQty = {};
      this.ticketInfo.productPrice.map(item => {
        subQty[item.id] = item.num;
      });
      this.ticketInfo.thumb = this.ticketImg;
      this.ticketInfo.discount = this.discount;
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
            travelTime: "",
            title: "Mrs",
            hotel: this.hotelList[this.hotelSelectIndex],
            firstName: this.userInfo.name,
            lastName: this.userInfo.name,
            passport: this.userInfo.passport,
            guestEmail: this.userInfo.email,
            totalPrice: this.ticketSum,
            frontend_total: this.ticketSum,
            telephone: "",
            coupon_id: this.selectCoupon ? this.selectCoupon.id : "",
            extinfo: JSON.stringify(this.ticketInfo)
          })
        },
        showLoading: true
      }).then(res => {
        const { id, payParams } = res.data;
        const payInfo = JSON.parse(payParams.pay_info);
        uni.showLoading();
        // 仅作为示例，非真实参数信息。
        uni.requestPayment({
          provider: "wxpay",
          ...payInfo,
          success: res => {
            uni.navigateTo({
              url: `/pages/common/result/result?type=ticket&id=${id}&status=1`
            });
            uni.hideLoading();
          },
          fail: err => {
            this.errorTips(this.$t("pages.ticketBook.payCancel"));
            uni.hideLoading();
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
            title: res.msg || this.$t("global.systemerr")
          });
        }
      });
    },
    bookTicket() {
      if (this.userInfo.hotel === "") {
        this.errorTips(this.$t("pages.ticketBook.hotelSelectTip"));
        return;
      }
      if (this.userInfo.email === "") {
        this.errorTips(this.$t("pages.ticketBook.mailInputTip"));
        return;
      }
      if (this.userInfo.name === "") {
        this.errorTips(this.$t("pages.ticketBook.nameInputTip"));
        return;
      }
      const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!mailReg.test(this.userInfo.email)) {
        this.errorTips(this.$t("pages.hotelBook.mailErrorTip"));
        return;
      }
      if (this.userInfo.passport === "") {
        this.errorTips(this.$t("pages.ticketBook.passportInputTip"));
        return;
      }
      if (!this.isTerms) {
        uni.showModal({
          title: "Koalabeds",
          content: this.$t("global.termsAgreeTip")
        });
        return;
      }
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
  max-width: 40%;
}
.koa-ticket-book .normal-list .uni-list-item__extra {
  max-width: 25%;
}
.koa-ticket-book .uni-list-item__icon-img {
  width: 120upx;
  height: 120upx;
}
.koa-form-item__right {
  font-size: 30upx;
  margin-right: 20upx;
  width: 130upx;
  text-align: right;
}
</style>
