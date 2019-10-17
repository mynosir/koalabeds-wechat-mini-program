<template>
  <view class="uni-container">
    <view class="uni-panel">
      <view class="page-section swiper">
        <view class="page-section-spacing">
          <swiper
            class="swiper"
            :indicator-dots="swiperSetting.indicatordots"
            :autoplay="swiperSetting.autoplay"
            :interval="swiperSetting.interval"
            :duration="swiperSetting.duration"
          >
            <swiper-item v-for="(item, index) in imglist" :key="index">
              <image style="width: 100%; " :src="item" />
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :show-arrow="false" :title="hotelInfo.title" />
        <uni-list-item :title="hotelInfo.address" desc="Map" :showDesc="true" @click="goMap" />
      </uni-list>
    </view>
    <view class="uni-panel uni-panel-h">
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
    <view class="uni-panel">
      <uni-list>
        <uni-list-item
          @click="toggleCalendar"
          :desc="'Total '+orderInfo.dayCount"
          :thumb="orderInfo.thumb"
        >
          <view>
            <text class="date-text--desc">IN</text>
            <text class="date-text--value">{{orderInfo.startDate}}</text>
            <text class="date-text--desc">OUT</text>
            <text class="date-text--value">{{orderInfo.endDate}}</text>
          </view>
        </uni-list-item>
        <uni-list-item @click="showGuest">
          <view class="uni-flex">
            <view>Guest</view>
            <view
              class="koa-desc uni-flex-item"
              style="text-align:right"
            >{{guestInfo.adult+ ' adults '+ guestInfo.child+' child'}}</view>
          </view>
        </uni-list-item>
      </uni-list>
    </view>

    <view class="uni-panel">
      <product-list :list="list" @click="showProduct" @book="goBook"></product-list>
    </view>
    <view class="uni-panel uni-panel-h">
      <comments :list="comments" :showMore="true"></comments>
    </view>
    <!-- 房间详情 -->
    <uni-popup ref="popup" type="bottom">
      <view>
        <view class="popup-title">{{hotelInfo.title}}</view>
        <view class="popup-close" @tap="closePopup('popup')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="uni-panel" style="margin:60upx 0 80upx"></view>
      </view>
    </uni-popup>
    <!-- 房间详情 -->
    <uni-popup ref="guest" type="bottom">
      <view>
        <view class="popup-title">Guest Setting</view>
        <view class="popup-close" @tap="closePopup('guest')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="koa-pop-content">
          <uni-list>
            <uni-list-item :showArrow="false" :showExtra="true">
              <view>Adult</view>
              <view slot="extra">
                <uni-number-box :value="guestInfo.adult" @change="changeAdultNum" />
              </view>
            </uni-list-item>
            <uni-list-item :showArrow="false" :showExtra="true">
              <view>Child</view>
              <view slot="extra">
                <uni-number-box :value="guestInfo.child" @change="changeChildNum" />
              </view>
            </uni-list-item>
          </uni-list>
        </view>
        <button type="primary" @tap="closePopup('guest')">Done It</button>
      </view>
    </uni-popup>
    <!-- 日期选择 -->
    <calendar @change="dateChange" :modal="true" :show="showCaledar"></calendar>
  </view>
</template>
<script>
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import ratingShow from "@/components/rating-show/rating-show.vue";
import calendar from "@/components/date-picker/date-picker.vue";
import productList from "@/components/product-list/product-list.vue";
import comments from "@/components/comments/comments.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";

export default {
  components: {
    uniList,
    uniListItem,
    uniIcons,
    ratingShow,
    calendar,
    productList,
    comments,
    uniPopup,
    uniNumberBox
  },
  computed: {
    i18n() {
      return this.$t("pages.detail");
    }
  },
  data() {
    let now = new Date();
    const dayCount = 1;
    const startDate = now.toString().substr(4, 6);
    now.setDate(now.getDate() + dayCount);
    const endDate = now.toString().substr(4, 6);
    return {
      showCaledar: false,
      orderInfo: {
        startDate,
        endDate,
        dayCount: 1,
        thumb: "/static/date.png"
      },
      swiperSetting: {
        indicatordots: true,
        autoplay: true,
        interval: 3000, //每隔毫秒自动播放
        duration: 500 //动画时间
      },
      hotelInfo: {
        title: "hotelName",
        address: "address Address address"
      },
      imglist: [
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
      ],
      list: [
        {
          title: "ROOM A",
          content: "Two Bed",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
          money1: "200.00",
          money2: "300.00",
          imglist: [
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
          ]
        },
        {
          title: "ROOM A",
          content: "",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
          money1: "200.00",
          money2: "300.00",
          imglist: [
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
          ]
        },
        {
          title: "ROOM A",
          content: "Two Bed",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
          money1: "200.00",
          money2: "300.00",
          imglist: [
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
            "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
          ]
        }
      ],
      selectRoom: null,
      comments: [
        {
          username: "username",
          userimg:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg",
          stars: 4,
          content:
            "reviwess contentreviwess contentreviwess contentreviwess content"
        },
        {
          username: "username2",
          userimg:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg",
          stars: 3,
          content:
            "reviwess contentreviwess contentreviwess contentreviwess content"
        }
      ],
      existPop: ["popup", "guest"],
      guestInfo: {
        adult: 2,
        child: 0
      }
    };
  },
  onShareAppMessage() {
    return {
      title: "Welcome to Koalabeds",
      path: "/pages/index/home/home"
    };
  },
  onNavigationBarButtonTap(e) {},
  onLoad() {},
  onReady() {},
  onShow() {},
  onHide() {},
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
    selectUsers() {},
    selectDate() {},
    dateChange({ choiceDate, dayCount }) {
      this.orderInfo.startDate = choiceDate[0].re.replace(/-/g, "/");
      this.orderInfo.endDate = choiceDate[1].re.replace(/-/g, "/");
      this.orderInfo.dayCount = dayCount;
    },
    toggleCalendar() {
      this.showCaledar = !this.showCaledar;
    },
    goBook(value) {
      uni.navigateTo({
        url: "/pages/hotel/book/book"
      });
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
    showGuest() {
      this.showPop("guest");
    },
    showProduct(item) {
      this.selectRoom = item;
      this.showPop("popup");
    },
    changeAdultNum(value) {
      this.guestInfo.adult = value;
    },
    changeChildNum(value) {
      this.guestInfo.child = value;
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.koa-desc {
  color: #707070;
}
.date-text--desc {
  font-size: 20upx;
  margin-right: 20upx;
}
.date-text--value {
  margin-right: 20upx;
}
</style>
