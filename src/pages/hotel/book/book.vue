<template>
  <view class="uni-container">
    <view class="uni-panel uni-panel-d">
      <uni-card
        :is-shadow="true"
        :title="hotelInfo.propertyName + ' ' + roomInfo.roomTypeName"
        note="true"
      >
        <view class="hotel-desc">
          <view style="font-size:24upx">IN: {{startDate}} OUT: {{endDate}} {{dayCount}}N</view>
          <view style="color:#707070;font-size:20upx">{{roomInfo.roomTypeName}}</view>
        </view>
        <template v-slot:footer>
          <view class="hotel-card-footer uni-right" @tap="showPop('roomInfo')">
            <uni-icons type="home" color="#0bb9ee"></uni-icons>
            <text style="margin-left:12upx">Room Info</text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </template>
      </uni-card>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">Name</view>
            <view class="uni-flex-item">
              <input
                :disabled="isOrder"
                class="uni-input"
                focus
                placeholder="Name"
                v-model="userInfo.name"
              />
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">Phone</view>
            <view class="uni-flex-item">
              <input
                :disabled="isOrder"
                class="uni-input"
                placeholder="Phone"
                v-model="userInfo.phone"
              />
            </view>
          </view>
          <template v-slot:extra>
            <!-- <button type="primary" size="mini" style="font-size:20upx">Get Code</button> -->
          </template>
        </uni-list-item>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">Email</view>
            <view class="uni-flex-item">
              <input
                :disabled="isOrder"
                class="uni-input"
                placeholder="Remark"
                v-model="userInfo.email"
              />
            </view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <template v-if="isOrder">
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            :title="`${hotelInfo.propertyAddress1} ${hotelInfo.propertyAddress2}`"
            desc="Map"
            :showDesc="true"
            @click="goMap"
          />
        </uni-list>
      </view>
      <view class="uni-panel uni-panel-h" style="margin:60upx 0 80upx">
        <rating-show :value="hotelInfo.rate" :numbers="hotelInfo.rateNum"></rating-show>
        <view class="uni-panel">
          <uni-icons type="phone" size="26" />
          <text
            style="margin-left:14upx"
            @tap="callPhone(hotelInfo.propertyPhone)"
          >{{hotelInfo.propertyPhone}}</text>
        </view>
        <view class="uni-panel">
          <uni-icons type="email" size="26" />
          <text style="margin-left:14upx">{{hotelInfo.propertyEmail}}</text>
        </view>
        <view class="uni-panel">
          <!-- <image
            class="koa-icon-image"
            :key="index"
            v-for="(item, index) in hotelInfo.propertyTermsAndConditions"
            :src="item"
          /> -->
        </view>
        <view class="uni-panel koa-desc" v-html="hotelInfo.propertyDescription"></view>
      </view>
    </template>
    <template v-else>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            :title="`${hotelInfo.propertyAddress1} ${hotelInfo.propertyAddress2}`"
            desc="Map"
            :showDesc="true"
            @click="goMap"
          />
          <uni-list-item
            :showDesc="true"
            :desc="hotelInfo.propertyName"
            @click="showPop('hotelDetail')"
          >
            <template
              v-if="hotelInfo.propertyTermsAndConditions && hotelInfo.propertyTermsAndConditions.length > 0"
            >
              <!-- <image
                class="koa-icon-image"
                :key="index"
                v-for="(item, index) in hotelInfo.propertyTermsAndConditions"
                :src="item"
              /> -->
            </template>
            <template v-else>Look Hotel Detail</template>
          </uni-list-item>
        </uni-list>
      </view>
      <view class="uni-panel book-coupon-list">
        <uni-list>
          <uni-list-item
            title="Coupon"
            :showArrow="false"
            :showDesc="true"
            :showExtra="true"
            @click="showPop('coupon')"
          >
            <view slot="extra">
              <text
                v-if="selectCoupon"
              >{{`-${hotelInfo.propertyCurrencySymbol}${selectCoupon.discountAmount}`}}</text>
              <text v-else style="color:#ccc">Not Yet</text>
              <uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
            </view>
          </uni-list-item>
        </uni-list>
      </view>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            title="WeChat"
            :showArrow="false"
            :showExtra="true"
            :showExtraIcon="true"
            :extraIcon="weixinExtra"
          >
            <view slot="extra">
              <label class="radio">
                <radio value="r1" checked="true" />
              </label>
            </view>
          </uni-list-item>
        </uni-list>
      </view>
      <view class="uni-panel" v-if="hotelInfo.propertyTermsAndConditions">
        <uni-list>
          <uni-list-item :showArrow="false" :showExtra="true" @click="showPop('termInfo')">
            <view>
              I have read an book terms
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
    </template>

    <view style="height:80px"></view>
    <view class="goods-carts" :class="{'iphonexBottom': isIphoneX}">
      <uni-list>
        <uni-list-item :showArrow="false" :showFull="true">
          <view class="uni-flex" style="align-items:center;">
            <view
              class="uni-flex-item uni-product-price-original"
              style="padding-left:24upx"
              v-if="selectCoupon"
            >
              {{hotelInfo.propertyCurrencySymbol}}{{roomInfo.roomRate - selectCoupon.discountAmount}}
              <text
                style="font-size:20upx;color:#333;margin-left:6upx;"
              >({{roomInfo.roomRate}}-{{selectCoupon.discountAmount}})</text>
            </view>
            <view
              class="uni-flex-item uni-product-price-original"
              style="padding-left:24upx"
              v-else
            >{{hotelInfo.propertyCurrencySymbol}}{{roomInfo.roomRate}}</view>
            <view>
              <button type="primary" style="border-radius:0;" @tap="bookHotel">Booking Now</button>
            </view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <!-- 房间详情 -->
    <uni-popup ref="roomInfo" type="bottom">
      <view>
        <view class="popup-title">{{hotelInfo.propertyName}}</view>
        <view class="popup-close" @tap="closePopup('roomInfo')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="uni-panel" style="margin:60upx 0 80upx">
          <view style="margin:10upx 0;font-size:32upx">{{roomInfo.roomTypeName}}</view>
          <view class="page-section swiper">
            <view class="page-section-spacing">
              <swiper class="swiper" :indicator-dots="true">
                <swiper-item v-for="(item, index) in roomInfo.roomTypePhotos" :key="index">
                  <image style="width: 100%; " :src="item.image" />
                </swiper-item>
              </swiper>
            </view>
            <view v-html="roomInfo.roomTypeDescription"></view>
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- 酒店详情 -->
    <uni-popup ref="hotelDetail" type="bottom">
      <view class="popup-title">{{hotelInfo.propertyName}}</view>
      <view class="popup-close" @tap="closePopup('hotelDetail')">
        <uni-icons type="close" color="#ccc" size="30" />
      </view>
      <view class="uni-panel uni-panel-h" style="margin:60upx 0 80upx">
        <rating-show :value="hotelInfo.rate" :numbers="hotelInfo.rateNum"></rating-show>
        <view class="uni-panel">
          <uni-icons type="phone" size="26" />
          <text
            style="margin-left:14upx"
            @tap="callPhone(hotelInfo.propertyPhone)"
          >{{hotelInfo.propertyPhone}}</text>
        </view>
        <view class="uni-panel">
          <uni-icons type="email" size="26" />
          <text style="margin-left:14upx">{{hotelInfo.propertyEmail}}</text>
        </view>
        <view class="uni-panel">
          <!-- <image
            class="koa-icon-image"
            :key="index"
            v-for="(item, index) in hotelInfo.propertyTermsAndConditions"
            :src="item"
          /> -->
        </view>
        <view class="uni-panel koa-desc" v-html="hotelInfo.propertyDescription"></view>
      </view>
    </uni-popup>
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
        <view class="koa-pop-content" v-html="hotelInfo.propertyTermsAndConditions"></view>
        <button type="primary" @tap="setTerms">I Agree</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniCard from "@/components/uni-card/uni-card.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import ratingShow from "@/components/rating-show/rating-show.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import Ticket from "@/components/ticket/ticket.vue";
import country from "./country";

export default {
  components: {
    uniCard,
    uniPopup,
    uniIcons,
    uniList,
    uniListItem,
    ratingShow,
    Ticket
  },
  computed: {
    hotelInfo() {
      if (!this.$store.state.hotel.selectHotel.propertyTermsAndConditions) {
        this.isTerms = true;
      } else {
        this.isTerms = false;
      }
      return this.$store.state.hotel.selectHotel;
    },
    roomInfo() {
      return this.$store.state.hotel.roomInfo;
    },
    startDate() {
      return this.$store.state.hotel.startDate.format("yyyy/MM/dd");
    },
    endDate() {
      return this.$store.state.hotel.endDate.format("yyyy/MM/dd");
    },
    dayCount() {
      return this.$store.state.hotel.dayCount;
    }
  },
  data() {
    return {
      userInfo: {
        phone: "",
        name: "",
        email: ""
      },
      existPop: ["roomInfo", "hotelDetail", "coupon", "termInfo"],
      isTerms: false,
      isIphoneX: this.$store.state.isIphoneX,
      selectCoupon: null,
      selectCouponIndex: -1,
      weixinExtra: { color: "#05db6c", type: "weixin", size: 24 },
      coupons: [],
      isOrder: true
    };
  },
  onLoad(options) {
    this.isOrder = options.type == "detail";
    if (this.isOrder) {
      this.getOrder();
    } else {
      this.getCoupons();
    }
  },
  onUnload() {
    if (this.isOrder) {
      uni.navigateBack({
        delta: 10
      });
    }
  },
  methods: {
    getOrder() {},
    goMap() {
      wx.openLocation({
        latitude: Number(this.hotelInfo.propertyLatitude),
        longitude: Number(this.hotelInfo.propertyLongitude),
        name: this.hotelInfo.propertyName,
        address: `${this.hotelInfo.propertyAddress1} ${this.hotelInfo.propertyAddress2} ${this.hotelInfo.propertyCity} ${this.hotelInfo.propertyState}`,
        scale: 18
      });
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
          item => item.totalAmount <= this.roomInfo.roomRate
        );
      });
    },
    changeCoupon(e) {
      this.selectCouponIndex = e.detail.value;
    },
    chooseCoupon() {
      this.selectCoupon = this.coupons[this.selectCouponIndex];
      this.closePopup("coupon");
    },
    showPop(key) {
      console.log(key, this.$refs);
      if (this.existPop.includes(key)) {
        this.$refs[key].open();
      }
    },
    closePopup(key) {
      if (this.existPop.includes(key)) {
        this.$refs[key].close();
      }
    },
    setTerms() {
      this.isTerms = true;
      this.closePopup("termInfo");
    },
    testPay() {
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=getPay",
        method: "post",
        data: {
          params: JSON.stringify({
            openid: this.$store.state.openid,
            propertyID: this.hotelInfo.propertyID,
            startDate: this.$store.state.hotel.startDate.format("yyyy-MM-dd"),
            endDate: this.$store.state.hotel.endDate.format("yyyy-MM-dd"),
            guestFirstName: this.userInfo.name,
            guestLastName: this.userInfo.name,
            guestCountry:
              country[this.$store.state.userInfo.country] || country["China"],
            guestZip: "123456",
            guestEmail: this.userInfo.email,
            guestPhone: this.userInfo.phone,
            rooms: {
              roomTypeID: this.roomInfo.roomTypeID,
              quantity: 1
            },
            adults: {
              roomTypeID: this.roomInfo.roomTypeID,
              quantity: this.$store.state.hotel.guestInfo.adult || "0"
            },
            children: {
              roomTypeID: this.roomInfo.roomTypeID,
              quantity: this.$store.state.hotel.guestInfo.child
            },
            frontend_total: this.roomInfo.roomRate
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
          success: res => {
            console.log("wxpay", res);
            this.commitHotel(id);
          },
          fail: err => {
            this.errorTips("pay error");
          }
        });
      });
    },
    commitHotel(id) {
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=saveOrder",
        data: {
          id
        },
        method: "post",
        showLoading: true
      }).then(res => {
        if (res.status == "0") {
          uni.redirectTo({
            url: "/pages/common/result/result?type=hotel&id=" + id
          });
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg || "system error"
          });
        }
      });
    },
    bookHotel() {
      console.log(this.roomInfo);
      if (this.userInfo.name === "") {
        this.errorTips("input your name");
        return;
      }
      if (this.userInfo.email === "") {
        this.errorTips("input your email");
        return;
      }
      if (this.userInfo.phone === "") {
        this.errorTips("input your phone");
        return;
      }
      if (!this.isTerms) {
        uni.showModal({
          title: "Koalabeds",
          content: "Please read booking terms!"
        });
        return;
      }
      // this.commitHotel();
      this.testPay();
    },
    errorTips(msg) {
      uni.showToast({
        icon: "none",
        title: msg,
        duration: 2000
      });
    },
    callPhone(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.uni-panel-d {
  background-color: rgb(77, 79, 97);
  flex-direction: row;
  align-items: center;
  padding: 8rpx;
}
.uni-panel-d .uni-card {
  margin: 0;
}
.hotel-card-footer {
  color: #0bb9ee;
}
.pop-coupon .uni-list-cell:after,
.pop-coupon .uni-list:before,
.pop-coupon .uni-list:after {
  background: none;
}
.book-coupon-list .uni-list-item__extra {
  max-width: 60%;
}
</style>
