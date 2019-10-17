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
            <swiper-item v-for="(item, index) in imglist" :key="index" @tap="goHotel">
              <image style="width: 100%; " :src="item" />
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view class="uni-panel uni-panel-h">
        <uni-search-bar placeholder="Search location or hotel name" />
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
          <view class="ticke-box" v-for="i in 6" :key="i">
            <ticket></ticket>
          </view>
        </view>
      </uni-card>
    </view>
    <view class="uni-panel uni-panel-h">
      <uni-card :title="i18n.recommendTitle" :isFull="true" :isShadow="false">
        <view class="panel-scroll" :scroll-x="true">
          <view class="recommend-box" v-for="i in 6" :key="i" @tap="goHotel">
            <view class="recommend-image">
              <image :src="tempImg" />
            </view>
            <view class="recommend-text">LEE GRDDK HOTEL NAME</view>
          </view>
        </view>
      </uni-card>
    </view>
    <view>
      <panel-image
        @click="goHotel"
        v-for="i in 6"
        :key="i"
        title="Hotel Title"
        :imgUrl="tempImg"
        goUrl="/pages/hotel/detail/detail"
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
          <view class="ticke-box" v-for="i in 6" :key="i">
            <ticket></ticket>
          </view>
        </view>
        <button type="primary" @tap="closePopup">Get It All</button>
      </view>
    </uni-popup>

    <!-- 日期选择 -->
    <calendar @change="dateChange" :modal="true" :show="showCaledar"></calendar>
  </view>
</template>
<script>
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
    i18n() {
      return this.$t("pages.home");
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
      startDate,
      endDate,
      dayCount: 1,
      swiperSetting: {
        indicatordots: true,
        autoplay: true,
        interval: 3000, //每隔毫秒自动播放
        duration: 500 //动画时间
      },
      loadmoreStatus: "loading", //more loading nomore
      imglist: [
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
      ],
      tempImg:
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
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
  mounted() {
    //this.showPop();
  },
  methods: {
    dateChange({ choiceDate, dayCount }) {
      this.startDate = new Date(choiceDate[0].dateTime).toString().substr(4, 6);
      this.endDate = new Date(choiceDate[1].dateTime).toString().substr(4, 6);
      this.dayCount = dayCount;
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
    goSearch() {
      uni.navigateTo({
        url: "/pages/hotel/search/search"
      });
    },
    goHotel() {
      uni.navigateTo({
        url: "/pages/hotel/detail/detail"
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
  width: 300upx;
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
