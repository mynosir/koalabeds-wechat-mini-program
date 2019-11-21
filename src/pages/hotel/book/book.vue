<template>
  <view class="uni-container">
    <view class="uni-panel uni-panel-d">
      <uni-card
        :is-shadow="true"
        :title="hotelInfo.propertyName + '<br>' + roomInfo.roomTypeName"
        note="true"
      >
        <view class="hotel-desc">
          <view
            style="font-size:24upx"
          >{{$t('global.IN')}}: {{startDate}} {{$t('global.OUT')}}: {{endDate}} {{dayCount}}{{$t("global.N")}}</view>
          <view style="color:#707070;font-size:20upx">{{roomInfo.roomTypeName}}</view>
        </view>
        <template v-slot:footer>
          <view class="hotel-card-footer uni-right" @tap="showPop('roomInfo')">
            <uni-icons type="home" color="#0bb9ee"></uni-icons>
            <text style="margin-left:12upx">{{$t("pages.hotelBook.roomInfo")}}</text>
            <uni-icons type="arrowright"></uni-icons>
          </view>
        </template>
      </uni-card>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">{{$t("pages.hotelBook.Name")}}</view>
            <view class="uni-flex-item">
              <input
                :disabled="isOrder"
                class="uni-input"
                focus
                :placeholder="$t('pages.hotelBook.Name')"
                v-model="userInfo.name"
              />
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">{{$t("pages.hotelBook.Phone")}}</view>
            <view class="uni-flex-item">
              <input
                :disabled="isOrder"
                type="tel"
                class="uni-input"
                :placeholder="$t('pages.hotelBook.Phone')"
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
            <view style="font-size:30upx;margin-right:20upx">{{$t('pages.hotelBook.Email')}}</view>
            <view class="uni-flex-item">
              <input
                :disabled="isOrder"
                class="uni-input"
                type="mail"
                placeholder="xxx@mail.com"
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
            :desc="$t('global.Map')"
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
          />-->
        </view>
        <view class="uni-panel koa-desc" v-html="hotelInfo.propertyDescription"></view>
      </view>
    </template>
    <template v-else>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            :title="`${hotelInfo.propertyAddress1} ${hotelInfo.propertyAddress2}`"
            :desc="$t('global.Map')"
            :showDesc="true"
            @click="goMap"
          />
          <uni-list-item
            :showDesc="true"
            :desc="hotelInfo.propertyName"
            @click="showPop('hotelDetail')"
          >{{$t('global.lookDetail')}}</uni-list-item>
        </uni-list>
      </view>
      <view class="uni-panel book-coupon-list">
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
        </uni-list>
      </view>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            :title="$t('global.WeChat')"
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
    </template>

    <view style="height:80px"></view>
    <view class="goods-carts" :class="{'iphonexBottom': isIphoneX}">
      <uni-list>
        <uni-list-item :showArrow="false" :showFull="true" v-if="!isOrder">
          <view class="uni-flex" style="align-items:center;">
            <view
              class="uni-flex-item uni-product-price-original"
              style="padding-left:24upx"
              v-if="selectCoupon"
            >
              ￥{{grandTotal - selectCoupon.discountAmount}}
              <text
                style="font-size:20upx;color:#333;margin-left:6upx;"
              >({{grandTotal}}-{{selectCoupon.discountAmount}})</text>
            </view>
            <view
              class="uni-flex-item uni-product-price-original"
              style="padding-left:24upx"
              v-else
            >￥{{grandTotal}}</view>
            <view>
              <button
                type="primary"
                style="border-radius:0;"
                @tap="bookHotel"
              >{{$t('global.Booking')}}</button>
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showFull="true" v-else>
          <view class="uni-flex" style="align-items:center;">
            <view
              class="uni-flex-item uni-product-price-original"
              style="padding-left:24upx"
            >￥{{hotelInfo.total}}</view>
            <view v-if="hotelInfo.status == '0'" class="uni-flex">
              <button
                type="info"
                style="border-radius:0;"
                @tap="cancelBook"
              >{{$t('global.CancelBooking')}}</button>
              <button
                type="warn"
                style="border-radius:0;"
                @tap="testPayAgain"
              >{{$t('global.PayNow')}}</button>
            </view>
            <view v-else-if="hotelInfo.status == '1'">
              <button type="primary" loading="true" disabled style="border-radius:0;">
                <text style="margin-left:8upx">{{$t('global.bookLoading')}}</text>
              </button>
            </view>
            <view v-else-if="hotelInfo.status == '-1'">
              <button type="warn" disabled style="border-radius:0;">
                <uni-icons type="clear" size="32" color="#fff"></uni-icons>
                <text style="margin-left:8upx">{{$t('global.Cancel')}}</text>
              </button>
            </view>
            <view v-else class="uni-flex">
              <button type="primary" style="border-radius:0;">
                <uni-icons type="checkbox-filled" size="32" color="#fff"></uni-icons>
                <text style="margin-left:8upx">{{$t('global.Completed')}}</text>
              </button>
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
                  <image style="width: 100%; " :src="item.image" mode="widthFix" />
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
          />-->
        </view>
        <view class="uni-panel koa-desc" v-html="hotelInfo.propertyDescription"></view>
      </view>
    </uni-popup>
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
                <radio :value="index" />
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
        <view class="koa-pop-content" v-html="hotelInfo.propertyTermsAndConditions"></view>
        <button type="primary" @tap="setTerms">{{$t("global.Agree")}}</button>
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

const Utils = require("../../../common/util.js");

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
      isOrder: false,
      orderId: 1,
      grandTotal: this.$store.state.hotel.roomInfo.roomRate
    };
  },
  onLoad(options) {
    this.isOrder = options.type == "order";
    if (this.isOrder) {
      this.isOrder = true;
      this.orderId = options.id || 1;
    } else {
      this.getCoupons();
      this.getRoomsFeesAndTaxes();
    }
  },
  onShow() {
    if (this.isOrder) {
      this.getOrder();
    }
  },
  methods: {
    getRoomsFeesAndTaxes() {
      this.$fetch({
        url:
          this.$store.state.domain + "/api/get?actionxm=getRoomsFeesAndTaxes",
        data: {
          propertyID: this.hotelInfo.propertyID,
          startDate: this.$store.state.hotel.startDate.format("yyyy-MM-dd"),
          endDate: this.$store.state.hotel.endDate.format("yyyy-MM-dd"),
          frontend_total: this.$store.state.hotel.roomInfo.roomRate,
          rooms_quantity: 1
        },
        showLoading: true
      }).then(res => {
        if (!res.data) {
          return;
        }
        this.grandTotal = res.data.grandTotal;
      });
    },
    async getOrder() {
      const res = await this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getHotelOrderById",
        data: {
          id: this.orderId
        },
        showLoading: true
      });
      if (!res.data) {
        uni.showToast({
          icon: "none",
          title: this.$t("global.systemerrTip"),
          duration: 2000
        });
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
        }, 2000);
        return;
      }
      const orderHotel = res.data;
      const startDate = new Date(orderHotel.startDate);
      const endDate = new Date(orderHotel.endDate);
      const dayCount = Utils.dateUtils.getDiff(
        orderHotel.startDate,
        orderHotel.endDate
      );

      let hotelInfo = {
        search: "",
        startDate,
        endDate,
        dayCount,
        guestInfo: {
          adult: orderHotel.adults_quantity,
          child: orderHotel.children_quantity
        }
      };

      this.userInfo = {
        phone: orderHotel.guestPhone,
        name: orderHotel.guestFirstName,
        email: orderHotel.guestEmail
      };

      const hotelRes = await this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getHotel",
        data: {
          propertyID: orderHotel.propertyID
        },
        showLoading: true
      });

      const selectHotel = {
        ...hotelRes.data,
        status: orderHotel.status,
        total: orderHotel.total,
        propertyImage: hotelRes.data.propertyImage.split(",")
      };
      hotelInfo.selectHotel = selectHotel;

      const roomRes = await this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getRoomTypeById",
        data: {
          propertyID: orderHotel.propertyID,
          roomTypeID: orderHotel.rooms_roomTypeID
        },
        showLoading: true
      });
      const roomInfo = roomRes.data[0];
      hotelInfo.roomInfo = {
        ...roomInfo,
        ...roomInfo.propertyCurrency,
        title: roomInfo.roomTypeName,
        content: roomInfo.roomTypeDescription,
        roomTypePhotos: roomInfo.roomTypePhotos.map(item => {
          return {
            image: item
          };
        }),
        img: roomInfo.roomTypePhotos[0]
      };
      console.log(hotelInfo);
      this.$store.commit("setHotelInfo", hotelInfo);
    },
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
        this.coupons = list.filter(
          item => {
            return (
              item.status == 0 &&
              Number(item.totalAmount) <= Number(this.grandTotal)
            );
          } //未使用 且 大于可使用金额
        );
        console.log("优惠券：", this.coupons);
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
      this.selectCouponIndex = -1;
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
    setTerms() {
      this.isTerms = true;
      this.closePopup("termInfo");
    },
    testPayAgain() {
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=getPayAgain",
        method: "post",
        data: {
          id: this.orderId
        },
        showLoading: true
      }).then(res => {
        const { id, payParams } = res.data;
        const payInfo = JSON.parse(payParams.pay_info);
        this.wxPay({
          id,
          payInfo
        });
      });
    },
    cancelBook() {
      uni.showModal({
        content: this.$t("global.cancelOrderTip"),
        success: res => {
          if (res.confirm) {
            uni.showLoading();
            this.$fetch({
              url: this.$store.state.domain + "api/post?actionxm=cancelOrder",
              method: "post",
              data: {
                id: this.orderId
              }
            }).then(res => {
              uni.navigateTo({
                url: `/pages/common/result/result?type=hotel&id=${this.orderId}&status=-1`
              });
              setTimeout(() => {
                uni.hideLoading();
              }, 2000);
            });
          }
        }
      });
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
            guestZip: "000000",
            guestEmail: this.userInfo.email,
            guestPhone: this.userInfo.phone,
            rooms: {
              roomTypeID: this.roomInfo.roomTypeID,
              quantity: 1,
              roomTypeName: this.roomInfo.roomTypeName,
              rate: this.roomInfo.roomRate
            },
            rooms_roomTypeName: this.roomInfo.roomTypeName,
            rooms_roomTypeImg: this.roomInfo.roomTypePhotos[0].thumb,
            rooms_roomTypeDesc: this.roomInfo.roomTypeDescription,
            adults: {
              roomTypeID: this.roomInfo.roomTypeID,
              quantity: this.$store.state.hotel.guestInfo.adult || "0",
              rate: this.roomInfo.roomRate
            },
            children: {
              roomTypeID: this.roomInfo.roomTypeID,
              quantity: this.$store.state.hotel.guestInfo.child,
              rate: this.roomInfo.roomRate
            },
            unRoomRate: this.roomInfo.roomRate,
            frontend_total: this.grandTotal,
            coupon_id: this.selectCoupon ? this.selectCoupon.id : "",
            extinfo: ""
          })
        },
        showLoading: true
      }).then(res => {
        const { id, payParams } = res.data;
        const payInfo = JSON.parse(payParams.pay_info);
        this.wxPay({
          id,
          payInfo
        });
      });
    },
    wxPay({ id, payInfo }) {
      uni.showLoading();
      // 仅作为示例，非真实参数信息。
      uni.requestPayment({
        provider: "wxpay",
        ...payInfo,
        success: res => {
          uni.navigateTo({
            url: `/pages/common/result/result?type=hotel&id=${id}&status=1`
          });
          setTimeout(() => {
            uni.hideLoading();
          }, 2000);
        },
        fail: err => {
          uni.showLoading();
          uni.navigateTo({
            url: `/pages/common/result/result?type=hotel&id=${id}&status=0`
          });
          setTimeout(() => {
            uni.hideLoading();
          }, 2000);
        }
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
          uni.navigateTo({
            url: "/pages/common/result/result?type=hotel&id=" + id
          });
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg || this.$t("global.systemerr")
          });
        }
      });
    },
    bookHotel() {
      if (this.userInfo.name === "") {
        this.errorTips(this.$t("pages.hotelBook.nameInputTip"));
        return;
      }
      if (this.userInfo.phone === "") {
        this.errorTips(this.$t("pages.hotelBook.phoneInputTip"));
        return;
      }
      if (this.userInfo.email === "") {
        this.errorTips(this.$t("pages.hotelBook.mailInputTip"));
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
