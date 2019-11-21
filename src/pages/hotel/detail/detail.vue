<template>
  <view class="uni-container">
    <template v-if="hotelInfo">
      <view class="uni-panel">
        <view class="page-section swiper">
          <view class="page-section-spacing">
            <image
              style="width: 100%; "
              :src="hotelInfo.propertyImage"
              class="koa-hotel-img"
              mode="widthFix"
            />
          </view>
        </view>
      </view>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item :show-arrow="false" :title="hotelInfo.propertyName" />
          <uni-list-item
            :title="`${hotelInfo.propertyAddress1} ${hotelInfo.propertyAddress2}`"
            :desc="$t('global.Map')"
            :showDesc="true"
            @click="goMap"
          />
        </uni-list>
      </view>
      <view class="uni-panel uni-panel-h">
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
        <view class="uni-panel koa-desc" v-html="hotelInfo.propertyDescription"></view>
      </view>
      <view class="uni-panel">
        <uni-list>
          <uni-list-item
            @click="toggleCalendar"
            :desc="'Total '+orderInfo.dayCount"
            :thumb="orderInfo.thumb"
          >
            <view>
              <text class="date-text--desc">{{$t('global.IN')}}</text>
              <text class="date-text--value">{{orderInfo.startDate}}</text>
              <text class="date-text--desc">{{$t('global.OUT')}}</text>
              <text class="date-text--value">{{orderInfo.endDate}}</text>
            </view>
          </uni-list-item>
          <uni-list-item @click="showGuest">
            <view class="uni-flex">
              <view>{{$t('pages.hotelDetail.Guest')}}</view>
              <view
                class="koa-desc uni-flex-item"
                style="text-align:right"
              >{{$t('global.hotelGuest', {adult:guestInfo.adult, child:guestInfo.child})}}</view>
            </view>
          </uni-list-item>
        </uni-list>
      </view>

      <view class="uni-panel">
        <template v-if="list && list.length > 0">
          <product-list :list="list" @click="showProduct" @book="goBook"></product-list>
        </template>
        <view class="no-data" v-else>{{$t('pages.hotelDetail.nodata')}}</view>
      </view>
      <view class="uni-panel uni-panel-h" v-if="comments && comments.length > 0">
        <comments :list="comments" :showMore="true" @click="goReviews"></comments>
      </view>
    </template>
    <template v-else>
      <view class="no-data">{{$t('pages.hotelDetail.nohotel')}}</view>
    </template>
    <!-- 房间详情 -->
    <uni-popup ref="popup" type="bottom">
      <view>
        <view class="popup-title">{{hotelInfo.propertyName}}</view>
        <view class="popup-close" @tap="closePopup('popup')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="uni-panel" style="margin:60upx 0 80upx">
          <view style="margin:10upx 0;font-size:32upx">{{selectRoom.roomTypeName}}</view>
          <view class="page-section swiper">
            <view class="page-section-spacing">
              <swiper class="swiper" :indicator-dots="true" :style="'height:'+swiperHeight+'px'">
                <swiper-item v-for="(item, index) in selectRoom.roomTypePhotos" :key="index">
                  <image style="width: 100%; " :src="item.image" mode="widthFix" @load="imgLoad" />
                </swiper-item>
              </swiper>
            </view>
            <view v-html="selectRoom.roomTypeDescription"></view>
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- 客人人数设置 -->
    <uni-popup ref="guest" type="bottom">
      <view>
        <view class="popup-title">{{$t('pages.hotelDetail.guestSetting')}}</view>
        <view class="popup-close" @tap="closePopup('guest')">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="koa-pop-content">
          <uni-list>
            <uni-list-item :showArrow="false" :showExtra="true">
              <view>{{$t('pages.hotelDetail.Adult')}}</view>
              <view slot="extra">
                <uni-number-box :value="guestInfo.adult" @change="changeAdultNum" />
              </view>
            </uni-list-item>
            <uni-list-item :showArrow="false" :showExtra="true">
              <view>{{$t('pages.hotelDetail.Child')}}</view>
              <view slot="extra">
                <uni-number-box :value="guestInfo.child" @change="changeChildNum" />
              </view>
            </uni-list-item>
          </uni-list>
        </view>
        <button type="primary" @tap="closePopup('guest')">{{$t('pages.hotelDetail.Done')}}</button>
      </view>
    </uni-popup>
    <!-- 日期选择 -->
    <calendar
      @change="dateChange"
      :modal="true"
      :show="showCaledar"
      :startDate="calendarStart"
      :endDate="calendarEnd"
    ></calendar>
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
    orderInfo() {
      return {
        startDate: this.$store.state.hotel.startDate.format("yyyy/MM/dd"),
        endDate: this.$store.state.hotel.endDate.format("yyyy/MM/dd"),
        dayCount: this.$store.state.hotel.dayCount,
        thumb: "/static/date.png"
      };
    },
    calendarStart() {
      return this.$store.state.hotel.startDate.format("yyyy-MM-dd");
    },
    calendarEnd() {
      return this.$store.state.hotel.endDate.format("yyyy-MM-dd");
    },
    guestInfo() {
      return this.$store.state.hotel.guestInfo;
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
      swiperSetting: {
        indicatordots: true,
        autoplay: true,
        interval: 3000, //每隔毫秒自动播放
        duration: 500 //动画时间
      },
      hotelInfo: null,
      list: [],
      selectRoom: null,
      comments: [],
      hotelId: "173267",
      existPop: ["popup", "guest"],
      swiperHeight: 150
    };
  },
  onShareAppMessage() {
    return {
      title: "Welcome to Koalabeds",
      path: "/pages/index/home/home"
    };
  },
  onNavigationBarButtonTap(e) {},
  onLoad(options) {
    this.hotelId = options.id || "173267";
    this.getHotel();
  },
  onReady() {},
  onShow() {},
  onHide() {},
  methods: {
    imgLoad(event) {
      const winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
      const { height, width } = event.detail; //图片高度
      //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
      this.swiperHeight = (winWid * height) / width;
    },
    getReviews() {
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getReviews",
        data: {
          propertyID: this.hotelId,
          page: 1,
          num: 3
        }
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          return;
        }
        this.comments = res.data.map(item => {
          return {
            username: item.userinfo.wx_nickname,
            userimg: item.userinfo.wx_avatarUrl,
            stars: item.rate,
            content: item.content
          };
        });
      });
    },
    getRoomsByHotelId() {
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getRoomsByHotelId",
        data: {
          propertyID: this.hotelId,
          checkInDate: this.$store.state.hotel.startDate.format("yyyy-MM-dd"),
          checkOutDate: this.$store.state.hotel.endDate.format("yyyy-MM-dd"),
          adults: this.guestInfo.adult,
          children: this.guestInfo.child
        },
        showLoading: true
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          return;
        }
        this.list = res.data[0].propertyRooms.map(item => {
          return {
            ...item,
            ...res.data[0].propertyCurrency,
            title: item.roomTypeName,
            content: item.roomTypeDescription,
            img: item.roomTypePhotos[0].thumb,
            money2: item.roomRate
          };
        });
      });
    },
    getHotel() {
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getHotel",
        data: {
          propertyID: this.hotelId
        },
        showLoading: true
      }).then(res => {
        this.hotelInfo = res.data;
        this.$store.commit("setHotel", this.hotelInfo);
        this.getRoomsByHotelId();
        this.getReviews();
      });
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
    dateChange({ choiceDate, dayCount }) {
      this.$store.commit("setHotelDate", {
        startDate: new Date(choiceDate[0].dateTime),
        endDate: new Date(choiceDate[1].dateTime),
        dayCount
      });
      if (this.hotelInfo) {
        this.getRoomsByHotelId();
      }
    },
    toggleCalendar() {
      this.showCaledar = !this.showCaledar;
    },
    goBook(item) {
      this.$store.commit("setRoomInfo", item);
      uni.navigateTo({
        url: "/pages/hotel/book/book?type=detail"
      });
    },
    goReviews() {
      uni.navigateTo({
        url: "/pages/common/reviews/reviews?id=" + this.hotelId
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
      this.$store.commit("setGuestInfo", {
        ...this.guestInfo,
        adult: value
      });
      if (this.hotelInfo) {
        this.getRoomsByHotelId();
      }
    },
    changeChildNum(value) {
      this.$store.commit("setGuestInfo", {
        ...this.guestInfo,
        child: value
      });
      if (this.hotelInfo) {
        this.getRoomsByHotelId();
      }
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
