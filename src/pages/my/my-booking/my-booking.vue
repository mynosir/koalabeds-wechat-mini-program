<template>
  <view class="tabs">
    <scroll-view
      id="tab-bar"
      class="scroll-h"
      :scroll-x="true"
      :show-scrollbar="false"
      :scroll-into-view="scrollInto"
    >
      <view
        v-for="(tab,index) in tabBars"
        :key="tab.id"
        class="uni-tab-item"
        :id="tab.id"
        :data-current="index"
        @click="ontabtap"
      >
        <text
          class="uni-tab-item-title"
          :class="tabIndex==index ? 'uni-tab-item-title-active' : ''"
        >{{tab.name}}</text>
      </view>
    </scroll-view>
    <view class="line-h"></view>
    <swiper
      :current="tabIndex"
      class="swiper-box"
      style="flex: 1;"
      :duration="300"
      @change="ontabchange"
    >
      <swiper-item class="swiper-item" v-for="(tab,index1) in tabBars" :key="index1">
        <!-- #ifndef APP-NVUE -->
        <scroll-view class="scroll-v list" enableBackToTop="true" scroll-y>
          <template v-if="tab.data.length > 0">
            <booking-order
              :list="tab.data"
              @click="showProduct"
              @book="goBook"
              @cancel="cancelBook"
            ></booking-order>
          </template>
          <view class="no-data" v-else>no data show</view>
        </scroll-view>
        <!-- #endif -->
      </swiper-item>
    </swiper>
    <!-- 房间详情 -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup-title">Share you review</view>
      <view class="popup-close" @tap="closePopup('popup')">
        <uni-icons type="close" color="#ccc" size="30" />
      </view>
      <view class="uni-media-list" style="top: 15px;padding: 15rpx 0;">
        <view class="uni-media-list-logo">
          <image :src="popHotel.img" />
        </view>
        <view class="uni-media-list-body" style="display: block;height: 142rpx;">
          <view class="uni-media-list-text-top">{{popHotel.title}}</view>
          <view class="uni-media-list-text-top">{{popHotel.name}}</view>
          <view
            class="uni-media-list-text-top"
            style="font-size: 23rpx"
          >IN:{{popHotel.startDate}} END:{{popHotel.endDate}} {{popHotel.dayCount}}N</view>
          <view class="uni-media-list-text-bottom uni-ellipsis">{{popHotel.type}}</view>
        </view>
      </view>
      <view class="uni-panel" style="margin:60upx 0 80upx">
        <view class="example-body">
          Rating:
          <uni-rate
            style="margin-left:20px"
            :value="rateNum"
            @change="changeRate"
            :disabled="!!popHotel.isReview"
          />
        </view>
        <view class="uni-textarea">
          <textarea
            v-model="rateContent"
            style="border: 1px solid gray"
            placeholder-style="color:black"
            placeholder="Share your experience.."
            :disabled="!!popHotel.isReview"
          />
        </view>
      </view>
      <view class="popup-button" v-if="!popHotel.isReview">
        <button class="mini-btn" @click="closePopup('popup')" type="default" size="mini">Later</button>
        <button
          class="mini-btn"
          type="primary"
          size="mini"
          style="background-color:#1AAD19"
          @tap="submitRate"
        >Submit</button>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import bookingOrder from "@/components/booking-order/booking-order.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniRate from "@/components/uni-rate/uni-rate.vue";

const Utils = require("../../../common/util.js");
export default {
  components: {
    bookingOrder,
    uniPopup,
    uniIcons,
    uniRate
  },
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        {
          data: [],
          name: "All",
          id: "all"
        },
        {
          data: [],
          name: "To be paid",
          id: "0"
        },
        {
          data: [],
          name: "Confirm",
          id: "1"
        },
        {
          data: [],
          name: "Complete",
          id: "2"
        },
        {
          data: [],
          name: "Cancel",
          id: "-1"
        }
      ],
      scrollInto: "",
      showTips: false,
      navigateFlag: false,
      pulling: false,
      existPop: ["popup", "guest"],
      popHotel: {},
      textAreaValue: "",
      statusNames: {
        0: "To be paid",
        1: "Confirm",
        2: "Complete",
        "-1": "Cancel"
      },
      rateNum: 5,
      rateContent: ""
    };
  },
  onLoad() {
    this.getOrders();
  },
  onUnload() {
    uni.reLaunch({
      url: "/pages/index/my/my"
    });
    return false;
  },
  methods: {
    getOrders() {
      let data = {};
      if (this.tabBars[this.tabIndex].id != "all") {
        data.status = this.tabBars[this.tabIndex].id;
      }
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getHotelOrders",
        data,
        showLoading: true
      }).then(res => {
        this.tabBars[this.tabIndex].data = (res.data || []).map(item => {
          return {
            ...item,
            id: item.id,
            title: item.hotelInfo.data.propertyName || "hotelName",
            name: item.rooms_roomTypeName || "roomName",
            type: item.rooms_roomTypeDesc || "roomDesc",
            startDate: item.startDate,
            endDate: item.endDate,
            dayCount: Utils.dateUtils.getDiff(item.startDate, item.endDate),
            status: item.status,
            statusName: this.statusNames[item.status],
            img: item.hotelInfo.data.propertyImageThumb
          };
        });
      });
    },
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    ontabchange(e) {
      let index = e.target.current || e.detail.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.tabIndex === index) {
        return;
      }
      this.tabIndex = index;
      this.getOrders();
      this.scrollInto = this.tabBars[index].id;
    },
    showProduct(item) {
      if (item.status == "2") {
        this.popHotel = item;
        this.selectRoom = item;
        this.getRate(item);
      }
    },
    goBook(order) {
      console.log(order);
      uni.navigateTo({
        url: "/pages/hotel/book/book?type=order&id=" + order.id
      });
    },
    showPop(key, item) {
      if (this.existPop.includes(key)) {
        this.$refs[key].open(item);
      }
    },
    closePopup(key) {
      if (this.existPop.includes(key)) {
        this.$refs[key].close();
      }
    },
    bindTextAreaBlur(e) {
      this.popHotel.textAreaValue = e.detail.value;
    },
    cancelBook(item) {
      uni.showModal({
        content: "You wanna cancel the order?",
        success: res => {
          if (res.confirm) {
            this.$fetch({
              url: this.$store.state.domain + "api/post?actionxm=cancelOrder",
              method: "post",
              data: {
                id: item.id
              },
              showLoading: true
            }).then(res => {
              this.getOrders();
            });
          }
        }
      });
    },
    getRate(item) {
      this.$fetch({
        url:
          this.$store.state.domain +
          "api/get?actionxm=getReviewsByOrderIdAndOpenid",
        data: {
          orderId: this.popHotel.id //订单id
        },
        showLoading: true
      }).then(res => {
        const { data } = res;
        if (data) {
          this.rateNum = Number(data.rate);
          this.rateContent = data.content;
          this.popHotel.isReview = true;
        } else {
          this.rateNum = 5;
          this.rateContent = "";
          this.popHotel.isReview = false;
        }
        this.$forceUpdate();
        this.showPop("popup", item);
      });
    },
    changeRate({ value }) {
      this.rateNum = value;
    },
    submitRate(item) {
      if (this.rateContent == "") {
        uni.showToast({
          icon: "none",
          title: "please input review!",
          duration: 2000
        });
        return;
      }
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=saveReviews",
        method: "post",
        data: {
          orderId: this.popHotel.id,
          rate: this.rateNum,
          content: this.rateContent,
          propertyID: this.popHotel.propertyID
        },
        showLoading: true
      }).then(res => {
        if (res.status == 0) {
          uni.showToast({
            icon: "success",
            title: "Thank you!",
            duration: 2000
          });
          this.closePopup("popup");
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg,
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";

view,
swiper-item,
scroll-view {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-basis: auto;
  flex-basis: auto;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  align-items: stretch;
  -webkit-align-content: flex-start;
  align-content: flex-start;
}
view,
image,
input,
scroll-view,
swiper,
swiper-item,
text,
textarea,
video {
  position: relative;
  border: 0px solid #000000;
  box-sizing: border-box;
}
swiper-item {
  position: absolute;
}
/* #ifndef APP-PLUS */
page {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

.tabs {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
  /* #ifdef MP-ALIPAY || MP-BAIDU */
  height: 100vh;
  /* #endif */
}

.scroll-h {
  width: 750upx;
  height: 80upx;
  flex-direction: row;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  /* flex-wrap: nowrap; */
  /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
}

.line-h {
  height: 1upx;
  background-color: #cccccc;
}

.uni-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  padding-left: 34upx;
  padding-right: 34upx;
}

.uni-tab-item-title {
  color: #555;
  font-size: 30upx;
  height: 80upx;
  line-height: 80upx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.uni-tab-item-title-active {
  color: #007aff;
}

.swiper-box {
  flex: 1;
}

.swiper-item {
  flex: 1;
  flex-direction: row;
}

.scroll-v {
  flex: 1;
  /* #ifndef MP-ALIPAY */
  flex-direction: column;
  /* #endif */
  width: 750upx;
}

.update-tips {
  position: absolute;
  left: 0;
  top: 41px;
  right: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #fddd9b;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.update-tips-text {
  font-size: 14px;
  color: #ffffff;
}

.refresh {
  width: 750upx;
  height: 64px;
  justify-content: center;
}

.refresh-view {
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.refresh-icon {
  width: 30px;
  height: 30px;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: rotate(0deg);
  transform-origin: 15px 15px;
}

.refresh-icon-active {
  transform: rotate(180deg);
}

.loading-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  color: #999999;
}

.loading-text {
  margin-left: 2px;
  font-size: 16px;
  color: #999999;
}

.loading-more {
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}

.loading-more-text {
  font-size: 28upx;
  color: #999;
}
.uni-media-list-body {
  height: 200upx;
}
.uni-media-list-logo {
  width: 142rpx;
  height: 142rpx;
}
.example-body,
.popup-button {
  -webkit-flex-direction: row;
  flex-direction: row;
}
</style>
