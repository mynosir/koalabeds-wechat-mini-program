<template>
  <scroll-view
    @scrolltolower="loadMore"
    style="height:100%"
    :scroll-y="true"
    :enable-back-to-top="true"
  >
    <view class="uni-panel">
      <view class="page-section swiper">
        <view class="page-section-spacing">
          <swiper
            class="swiper"
            :indicator-dots="swiperSetting.indicatordots"
            :autoplay="swiperSetting.autoplay"
            :interval="swiperSetting.interval"
            :duration="swiperSetting.duration"
            :style="'height:'+swiperHeight+'px'"
          >
            <swiper-item v-for="(item, index) in imglist" :key="index" @tap="goUrl(item)">
              <image style="width: 100%; " :src="item.img" mode="widthFix" @load="imgLoad" />
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view class="uni-panel uni-panel-h">
        <view class="uni-flex" style="align-items:center">
          <view style="text-align:center;padding:0 10upx;" @tap="goChooseCity">
            {{cityName}}
            <uni-icons type="location" size="20"></uni-icons>
          </view>
          <view class="uni-flex-item">
            <uni-search-bar :placeholder="$t('pages.home.searchPlaceHolod')" @input="changeSearch" />
          </view>
        </view>
        <view class="uni-flex koa-date-home" @tap="toggleCalendar">
          <view class="uni-center uni-flex-item">
            <view class="koa-date--text">{{startDate}}</view>
            <view class="koa-date--desc">{{$t('global.checkIn')}}</view>
          </view>
          <view
            class="koa-date-count--text uni-flex"
          >- {{$t("pages.home.totalNights", {dayCount})}} -</view>
          <view class="uni-center uni-flex-item">
            <view class="koa-date--text">{{endDate}}</view>
            <view class="koa-date--desc">{{$t('global.checkOut')}}</view>
          </view>
        </view>
        <button type="primary" @tap="goSearch">{{$t('global.search')}}</button>
      </view>
    </view>
    <view class="uni-panel">
      <official-account></official-account>
    </view>
    <view class="uni-panel uni-panel-h">
      <uni-card :title="$t('pages.home.couponTitle')" :isFull="true" :isShadow="false">
        <view class="panel-scroll" :scroll-x="true" style="margin-top:20upx" v-if="hasLogin">
          <view class="ticke-box" v-for="item in coupons" :key="item.id">
            <ticket
              :status="item.status"
              :canClick="true"
              :price="item.discountAmount"
              :fullPrice="item.totalAmount"
              :valid="item.validateDate"
              @click="postCoupon(item.id)"
              :isSmall="true"
            ></ticket>
          </view>
        </view>
        <button
          type="primary"
          open-type="getUserInfo"
          @getuserinfo="mpGetUserInfo"
          style="margin:20upx"
          v-else
        >{{$t("pages.home.ticketWelcome")}}</button>
      </uni-card>
    </view>
    <view class="uni-panel uni-panel-h">
      <uni-card :title="$t('pages.home.recommendTitle')" :isFull="true" :isShadow="false">
        <view class="panel-scroll" :scroll-x="true" style="margin-top:20upx">
          <view
            class="recommend-box"
            v-for="item in recommendList"
            :key="item.id"
            @tap="goHotel(item.propertyID)"
          >
            <view class="recommend-image">
              <image :src="item.propertyImageThumb" mode="widthFix" />
            </view>
            <view class="recommend-text">{{item.propertyName}}</view>
          </view>
        </view>
      </uni-card>
    </view>
    <view>
      <panel-image
        v-for="item in hotelList"
        :key="item.id"
        :title="item.propertyName"
        :imgUrl="item.propertyImage"
        :goUrl="`/pages/hotel/detail/detail?id=${item.propertyID}`"
      ></panel-image>
      <uni-load-more iconType="spinner" :status="loadmoreStatus" />
    </view>
    <!-- 优惠券弹框 -->
    <uni-popup ref="popup" type="center">
      <view>
        <view class="popup-close" @tap="closePopup">
          <uni-icons type="close" color="#ccc" size="30" />
        </view>
        <view class="popup-content">
          <view class="ticke-box" v-for="(item) in coupons" :key="item.id">
            <ticket
              :status="item.status"
              :canClick="true"
              :price="item.discountAmount"
              :fullPrice="item.totalAmount"
              :valid="item.validateDate"
              @click="postCoupon(item.id)"
              :isSmall="true"
            ></ticket>
          </view>
        </view>
        <button type="primary" @tap="postCoupon('all')" v-if="hasLogin">{{$t("pages.home.getAll")}}</button>
        <button
          type="primary"
          open-type="getUserInfo"
          @getuserinfo="mpGetUserInfo"
          v-else
        >{{$t("pages.home.getAll")}}</button>
      </view>
    </uni-popup>
    <!-- 日期选择 -->
    <calendar
      @change="dateChange"
      :startDate="calendarStart"
      :endDate="calendarEnd"
      :modal="true"
      :show="showCaledar"
    ></calendar>
  </scroll-view>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import citySelect from "@/components/city-select/city-select.vue";
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import uniCard from "@/components/uni-card/uni-card.vue";
import Ticket from "@/components/ticket/ticket.vue";
import calendar from "@/components/date-picker/date-picker.vue";
import panelImage from "@/components/panel-image/panel-image.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";

export default {
  components: {
    citySelect,
    uniSearchBar,
    uniCard,
    Ticket,
    calendar,
    panelImage,
    uniLoadMore,
    uniPopup,
    uniIcons
  },
  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin
    }),
    language() {
      this.$i18n.locale = this.$store.state.language;
      const { tabBars } = this.$t("global");
      tabBars.map((item, index) => {
        uni.setTabBarItem({
          index,
          text: item
        });
      });
      return this.$store.state.language;
    },
    cityName(state) {
      if (this.$store.state.cityName === "") {
        return this.$t("pages.home.cityName");
      }
      return this.$store.state.cityName;
    },
    startDate() {
      const month = this.$store.state.hotel.startDate.getMonth();
      const date = this.$store.state.hotel.startDate.getDate();
      return (
        this.$t("components.calendar.month")[month] +
        " " +
        this.$t("components.calendar.date", { date })
      );
    },
    endDate() {
      const month = this.$store.state.hotel.endDate.getMonth();
      const date = this.$store.state.hotel.endDate.getDate();
      return (
        this.$t("components.calendar.month")[month] +
        " " +
        this.$t("components.calendar.date", { date })
      );
    },
    calendarStart() {
      return this.$store.state.hotel.startDate.format("yyyy-MM-dd");
    },
    calendarEnd() {
      return this.$store.state.hotel.endDate.format("yyyy-MM-dd");
    },
    dayCount() {
      return this.$store.state.hotel.dayCount;
    }
  },
  data() {
    return {
      showCaledar: false,
      searchContent: "",
      swiperSetting: {
        indicatordots: true,
        autoplay: true,
        interval: 3000, //每隔毫秒自动播放
        duration: 500 //动画时间
      },
      loadmoreStatus: "more", //more loading nomore
      imglist: [],
      recommendList: [],
      hotelList: [],
      page: 1,
      num: 10,
      coupons: [],
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
  onLoad() {
    this.getRecommend();
    this.getRecommendFlow();
    this.getBanners();
    this.getCoupons();
  },
  onReady() {},
  onShow() {},
  onHide() {},
  mounted() {
    if (uni.getStorageSync("firstHello") !== "Y") {
      this.showPop();
      uni.setStorageSync("firstHello", "Y");
    }
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
      this.getCoupons();
    },
    input({ value }) {
      this.searchContent = value;
    },
    getBanners() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getBanners", //仅为示例，并非真实接口地址。
        data: {
          type: 2
        },
        showLoading: true
      }).then(res => {
        this.imglist = res.data;
      });
    },
    getCoupons() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getCoupons", //仅为示例，并非真实接口地址。
        data: {
          type: 2
        },
        showLoading: true
      }).then(res => {
        this.coupons = res.data.map(item => {
          return {
            ...item,
            status: item.hasRecord ? "0" : "-1"
          };
        });
        this.$forceUpdate();
      });
    },
    getRecommend() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getRecommend", //仅为示例，并非真实接口地址。
        data: {
          type: 2
        },
        showLoading: true
      }).then(res => {
        this.recommendList = res.data;
      });
    },
    getRecommendFlow() {
      if (this.loadmoreStatus == "nomore" || this.loadmoreStatus == "loading") {
        return;
      }
      this.loadmoreStatus = "loading";
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getRecommendFlow", //仅为示例，并非真实接口地址。
        data: {
          page: this.page,
          num: this.num
        },
        showLoading: true
      }).then(res => {
        if (!res.data || res.data.length == 0) {
          this.loadmoreStatus = "nomore";
          return;
        }
        this.hotelList = res.data;
        this.loadmoreStatus = "more";
      });
    },
    loadMore() {
      this.page++;
      this.getRecommendFlow();
    },
    dateChange({ choiceDate, dayCount }) {
      console.log(dayCount);
      this.$store.commit("setHotelDate", {
        startDate: new Date(choiceDate[0].dateTime),
        endDate: new Date(choiceDate[1].dateTime),
        dayCount
      });
    },
    toggleCalendar() {
      this.showCaledar = !this.showCaledar;
    },
    showPop() {
      this.$refs["popup"].open();
    },
    closePopup() {
      this.$refs["popup"].close();
    },
    changeSearch({ value }) {
      this.searchContent = value;
    },
    goSearch() {
      this.$store.commit("setSearch", this.searchContent);
      this.$store.commit("setRefresh", "Y");
      uni.navigateTo({
        url: `/pages/hotel/search/search`
      });
      // uni.navigateTo({
      //   url: `/pages/common/search/search`
      // });
    },
    postCoupon(ids) {
      if (ids === "all") {
        let idlist = [];
        this.coupons.map(item => {
          idlist.push(item.id);
        });
        ids = idlist.join(",");
      }
      console.log("postCoupon:", ids);
      this.$fetch({
        url: this.$store.state.domain + "/api/post?actionxm=getUserCoupon",
        data: {
          ids
        },
        method: "POST"
      })
        .then(res => {
          this.getCoupons();
          this.closePopup();
        })
        .catch(e => {
          this.closePopup();
        });
    },
    goHotel(id) {
      uni.navigateTo({
        url: "/pages/hotel/detail/detail?id=" + id
      });
    },
    goChooseCity() {
      uni.navigateTo({
        url: "/pages/common/city/city"
      });
    },
    goUrl(item) {
      if (item.link.indexOf("http") == 0) {
      } else if (item.link.indexOf("/pages/") == 0) {
        uni.navigateTo({
          url: item.link
        });
      }
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.koa-date-home {
  text-align: center;
  margin: 20upx;
}
.koa-date--text {
  font-size: 32upx;
}
.koa-date--desc {
  font-size: 18upx;
}
.koa-date-count--text {
  justify-content: center;
  align-items: center;
  color: #0bb9ee;
  font-size: 20upx;
}
.panel-scroll {
  width: 100%;
  overflow: scroll;
  display: flex;
}
.ticke-box {
  flex: none;
  width: 400upx;
  margin-right: 20upx;
}
.recommend-box {
  flex: none;
  width: 120upx;
  margin-right: 40upx;
}
.recommend-image {
  width: 120upx;
  height: 120upx;
  border-radius: 100%;
  overflow: hidden;
}
.recommend-image image {
  width: 100%;
}
.recommend-text {
  font-size: 20upx;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.popup-content,
.popup-content .ticke-box {
  margin-bottom: 20upx;
}
</style>
