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
          >
            <swiper-item v-for="(item, index) in imglist" :key="index">
              <image style="width: 100%; " :src="item.img" mode="widthFix"/>
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
            <uni-search-bar placeholder="Search location or hotel name" @input="changeSearch" />
          </view>
        </view>
        <view class="uni-flex koa-date-home" @tap="toggleCalendar">
          <view class="uni-center uni-flex-item">
            <view class="koa-date--text">{{startDate}}</view>
            <view class="koa-date--desc">Check In</view>
          </view>
          <view class="koa-date-count--text uni-flex">- Total {{dayCount}} nights -</view>
          <view class="uni-center uni-flex-item">
            <view class="koa-date--text">{{endDate}}</view>
            <view class="koa-date--desc">Check Out</view>
          </view>
        </view>
        <button type="primary" @tap="goSearch">Search</button>
      </view>
    </view>
    <view class="uni-panel uni-panel-h">
      <uni-card :title="i18n.couponTitle" :isFull="true" :isShadow="false">
        <view class="panel-scroll" :scroll-x="true">
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
      </uni-card>
    </view>
    <view class="uni-panel uni-panel-h">
      <uni-card :title="i18n.recommendTitle" :isFull="true" :isShadow="false">
        <view class="panel-scroll" :scroll-x="true">
          <view
            class="recommend-box"
            v-for="item in recommendList"
            :key="item.id"
            @tap="goHotel(item.propertyID)"
          >
            <view class="recommend-image">
              <image :src="item.propertyImageThumb" mode="widthFix"/>
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
        <button type="primary" @tap="postCoupon('all')" v-if="hasLogin">Get All</button>
        <button type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo" v-else>Get All</button>
      </view>
    </uni-popup>
    <!-- 日期选择 -->
    <calendar @change="dateChange" :modal="true" :show="showCaledar"></calendar>
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
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";

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
      cityName: state => state.cityName,
      hasLogin: state => state.hasLogin
    }),
    i18n() {
      return this.$t("pages.home");
    },
    startDate() {
      return this.$store.state.hotel.startDate.toString().substr(4, 6);
    },
    endDate() {
      return this.$store.state.hotel.endDate.toString().substr(4, 6);
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
      coupons: []
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
    mpGetUserInfo(result) {
      if (result.detail.errMsg !== "getUserInfo:ok") {
        uni.showModal({
          title: "get userinfo error",
          content: "reason:" + result.detail.errMsg,
          showCancel: false
        });
        return;
      }
      this.$store.commit("LOGIN", result.detail.userInfo);
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
      uni.request({
        url: this.$store.state.domain + "/api/get?actionxm=getRecommendFlow", //仅为示例，并非真实接口地址。
        data: {
          page: this.page,
          num: this.num
        },
        success: res => {
          uni.hideToast();
          console.log("getRecommendFlow:", res);
          if (res.statusCode == 200) {
            if (!res.data.data || res.data.data.length == 0) {
              this.loadmoreStatus = "nomore";
              return;
            }
            this.hotelList = res.data.data;
          }
          this.loadmoreStatus = "more";
        }
      });
    },
    loadMore() {
      this.page++;
      this.getRecommendFlow();
    },
    dateChange({ choiceDate, dayCount }) {
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
      uni.navigateTo({
        url: `/pages/hotel/search/search`
      });
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
}
.popup-content,
.popup-content .ticke-box {
  margin-bottom: 20upx;
}
</style>
