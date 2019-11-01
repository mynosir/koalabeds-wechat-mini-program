<template>
  <view class="uni-container">
    <view class="uni-panel uni-panel-d">
      <uni-card :is-shadow="true" :title="hotelInfo.title" note="true">
        <view class="hotel-desc">
          <view style="font-size:24upx">IN: {{startDate}} OUT: {{endDate}} {{dayCount}}N</view>
          <view style="color:#707070;font-size:20upx">Twins bed</view>
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
              <input class="uni-input" focus placeholder="Name" />
            </view>
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">Phone</view>
            <view class="uni-flex-item">
              <input class="uni-input" focus placeholder="Phone" />
            </view>
          </view>
          <template v-slot:extra>
            <button type="primary" size="mini" style="font-size:20upx">Get Code</button>
          </template>
        </uni-list-item>
        <uni-list-item :showArrow="false">
          <view class="uni-flex" style="align-items:center">
            <view style="font-size:30upx;margin-right:20upx">Remark</view>
            <view class="uni-flex-item">
              <input class="uni-input" focus placeholder="Remark" />
            </view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item title="All Hotel Full Address" :showDesc="true" desc="Map" @click="goMap" />
        <uni-list-item :showDesc="true" desc="Hotel Details" @click="showPop('hotelDetail')">
          <image class="koa-icon-image" src="../../../static/tv.png" />
          <image class="koa-icon-image" src="../../../static/cold.png" />
          <image class="koa-icon-image" src="../../../static/hot.png" />
          <image class="koa-icon-image" src="../../../static/wifi.png" />
          <image class="koa-icon-image" src="../../../static/sweep.png" />
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
            <text v-if="selectCoupon">{{`-￥${selectCoupon.money}`}}</text>
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
    <view class="uni-panel">
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
    <view style="height:80px"></view>
    <view class="goods-carts" :style='"padding-bottom: "+(isIphoneX ? 68 : 0)+"rpx;"'>
      <uni-list>
        <uni-list-item :showArrow="false" :showFull="true">
          <view class="uni-flex" style="align-items:center;">
            <view class="uni-flex-item" style="padding-left:24upx">￥300.00</view>
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
        <view class="popup-title">{{hotelInfo.title}}</view>
        <view class="popup-close" @tap="closePopup('roomInfo')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="uni-panel" style="margin:60upx 0 80upx">
          <view class="page-section swiper">
            <view class="page-section-spacing">
              <swiper class="swiper">
                <swiper-item v-for="(item, index) in roomInfo.imglist" :key="index">
                  <image style="width: 100%; " :src="item" />
                </swiper-item>
              </swiper>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- 酒店详情 -->
    <uni-popup ref="hotelDetail" type="bottom">
      <view class="popup-title">{{hotelInfo.title}}</view>
      <view class="popup-close" @tap="closePopup('hotelDetail')">
        <uni-icons type="close" color="#ccc" size="30" />
      </view>
      <view class="uni-panel uni-panel-h" style="margin:60upx 0 80upx">
        <rating-show value="4.6" numbers="197"></rating-show>
        <view class="uni-panel">
          <uni-icons type="phone" size="26" />
          <text style="margin-left:14upx">+123457897364</text>
        </view>
        <view class="uni-panel">
          <uni-icons type="email" size="26" />
          <text style="margin-left:14upx">dsfalsdjf@cdfdk.com.hk</text>
        </view>
        <view class="uni-panel">
          <image class="koa-icon-image" src="../../../static/tv.png" />
          <image class="koa-icon-image" src="../../../static/cold.png" />
          <image class="koa-icon-image" src="../../../static/hot.png" />
          <image class="koa-icon-image" src="../../../static/wifi.png" />
          <image class="koa-icon-image" src="../../../static/sweep.png" />
        </view>
        <view
          class="uni-panel koa-desc"
        >Hotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjsHotel desc,sdfklas,asdflasldf.asdflasdkjfaskdfjs</view>
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
import uniCard from "@/components/uni-card/uni-card.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import ratingShow from "@/components/rating-show/rating-show.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import Ticket from "@/components/ticket/ticket.vue";

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
  data() {
    return {
      hotelInfo: {
        title: "hotelName",
        address: "address Address address"
      },
      startDate: "07/07/2019(Wed)",
      endDate: "09/07/2019(Tus)",
      dayCount: "02",
      roomInfo: {
        title: "ROOM A",
        content: "Two Bed",
        img: "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
        money1: "200.00",
        money2: "300.00",
        imglist: [
          "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
          "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
          "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
        ]
      },
      existPop: ["roomInfo", "hotelDetail", "coupon", "termInfo"],
      isTerms: false,
      isIphoneX: this.$store.state.isIphoneX,
      selectCoupon: null,
      weixinExtra: { color: "#05db6c", type: "weixin", size: 24 }
    };
  },
  methods: {
    goMap() {
      wx.getLocation({
        type: "gcj02", //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          wx.openLocation({
            latitude,
            longitude,
            name: "花园桥肯德基",
            address: "详细地址说明",
            scale: 18
          });
        }
      });
    },
    chooseCoupon() {
      this.selectCoupon = {
        money: 10,
        valid: "2019-10-10"
      };
      this.closePopup("coupon");
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
    bookHotel() {
      uni.redirectTo({
        url: "/pages/common/result/result?type=hotel",

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
