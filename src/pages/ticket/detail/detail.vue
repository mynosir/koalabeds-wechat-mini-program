<template>
  <view class="koa-ticket-detail uni-container">
    <template v-if="ticketInfo">
      <view class="uni-panel">
        <view class="page-section swiper">
          <view class="page-section-spacing">
            <image style="width: 100%; " :src="ticketImg" mode="widthFix" @load="imgLoad" />
          </view>
        </view>
      </view>
      <view class="uni-panel uni-panel-h">
        <view class="koa-title">{{ticketInfo.title.replace(ticketInfo.ticketCode, '').replace(ticketInfo.tourCode, '')}}</view>
        <view class="koa-desc">{{ticketInfo.tourCode || ticketInfo.ticketCode}}</view>
      </view>
      <view class="uni-panel uni-panel-h" v-if="ticketInfo.introduce">
        <view v-html="ticketInfo.introduce"></view>
      </view>
      <view class="uni-panel">
        <uni-list>
          <!-- <uni-list-item title="Booking Instruction" /> -->
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
          <uni-list-item
            :showArrow="false"
            :showExtra="true"
            v-for="(item, index) in ticketInfo.productPrice"
            :key="item.id"
          >
            <view>
              <view class="panel" style="font-size:32upx">{{item.title}}:</view>
              <view class="uni-product-price uni-flex" style="width:50%;align-items:center">
                <view class="uni-product-price-original">￥{{item.price}}</view>
              </view>
            </view>
            <view slot="extra">
              <uni-number-box :value="item.num" @change="changeNum($event, index)" />
            </view>
          </uni-list-item>
        </uni-list>
        <view style="height:120px"></view>
        <view class="goods-carts" :class="{'iphonexBottom': isIphoneX}">
          <uni-list>
            <uni-list-item :showArrow="false" :showFull="true">
              <view class="uni-flex" style="align-items:center;">
                <view
                  class="uni-flex-item uni-product-price-original"
                  style="padding-left:24upx;font-size:32upx;"
                >￥{{totalSum}}</view>
                <view>
                  <button
                    type="primary"
                    style="border-radius:0;"
                    @tap="bookTicket"
                    v-if="hasLogin"
                  >{{$t("global.Booking")}}</button>
                  <button
                    type="primary"
                    style="border-radius:0;"
                    open-type="getUserInfo"
                    @getuserinfo="mpGetUserInfo"
                    v-else
                  >{{$t("global.Booking")}}</button>
                </view>
              </view>
            </uni-list-item>
          </uni-list>
        </view>
      </view>
    </template>
    <template v-else>
      <div class="no-data">{{$t("global.loading")}}</div>
    </template>
    <uni-calendar
      ref="calendar"
      :disableBefore="true"
      :date="validDate"
      @change="change"
      @confirm="change"
    />
  </view>
</template>

<script>
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";

const Utils = require("../../../common/util.js");
export default {
  components: {
    uniList,
    uniListItem,
    uniCalendar,
    uniNumberBox
  },
  computed: {
    hasLogin() {
      return this.$store.state.hasLogin;
    },
    ticketInfo() {
      return this.$store.state.ticket.ticketInfo;
    },
    validDate() {
      return this.$store.state.ticket.validDate.format("yyyy-MM-dd");
    },
    ticketImg() {
      return (
        this.$store.state.ticket.image ||
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
      );
    }
  },
  data() {
    return {
      productId: "",
      type: "",
      startDate: Utils.getDate(new Date(), -1),
      isIphoneX: this.$store.state.isIphoneX,
      totalSum: 0
    };
  },
  watch: {
    ticketInfo(newVal) {
      this.totalSum = 0;
      if (newVal.productPrice) {
        newVal.productPrice.map(item => {
          this.totalSum += item.price * item.num;
        });
      }
      console.log(newVal);
      return newVal;
    }
  },
  onLoad(options) {
    this.productId = options.id || "6";
    this.type = options.type || "tour";
    this.getGraylineProductDetails();
  },
  unLoad() {
    this.$store.commit("setTicket", null);
  },
  methods: {
    imgLoad(event) {
      const winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
      const { height, width } = event.detail; //图片高度
      //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
      this.swiperHeight = (winWid * height) / width;
    },
    mpGetUserInfo(result) {
      if (result.detail.errMsg !== "getUserInfo:ok") {
        uni.showModal({
          title: this.$t("global.getUserError"),
          content: this.$t("global.getUserErrMsg", {
            errMsg: result.detail.errMsg
          }),
          showCancel: false
        });
        return;
      }
      this.$store.commit("LOGIN", result.detail.userInfo);
    },
    getGraylineProductDetails() {
      this.$fetch({
        url:
          this.$store.state.domain +
          "api/get?actionxm=getGraylineProductDetails",
        data: {
          productId: this.productId,
          type: this.type
        },
        showLoading: true
      }).then(res => {
        let ticket = res.data;
        ticket.type = this.type;
        ticket.productPrice = ticket.productPrice.map(pp => {
          return {
            ...pp,
            num: 1
          };
        });
        this.$store.commit("setTicket", ticket);
      });
    },
    goDate() {
      this.$refs.calendar.open();
    },
    change(e) {
      this.$store.commit("setTicketDate", new Date(e.fulldate));
    },
    changeNum(value, index) {
      const ticket = JSON.parse(JSON.stringify(this.ticketInfo));
      ticket.productPrice[index].num = value;
      this.$store.commit("setTicket", ticket);
    },
    bookTicket() {
      if (this.totalSum == 0) {
        uni.showToast({
          icon: "none",
          title: this.$t("pages.ticketDetail.numTip"),
          duration: 2000
        });
        return;
      }
      uni.navigateTo({
        url: "/pages/ticket/book/book"
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.koa-ticket-detail .uni-list-item__extra {
  max-width: 40%;
}
</style>
