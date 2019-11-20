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
        <scroll-view class="scroll-v list" enableBackToTop="true" scroll-y>
          <template v-if="tab.data && tab.data.length > 0">
            <view class="ticke-box" v-for="(item) in tab.data" :key="item.id">
              <ticket
                :status="item.status"
                :price="item.discountAmount"
                :fullPrice="item.totalAmount"
                :valid="item.validateDate"
                :footer="item.validateDateStr"
              ></ticket>
            </view>
          </template>
          <view class="no-data" v-else>{{$t("pages.mycoupon.nodata")}}</view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import Ticket from "@/components/ticket/ticket.vue";

export default {
  components: {
    Ticket
  },
  data() {
    const tabBars = this.$t("pages.mycoupon.tarBars");
    return {
      tabIndex: 0,
      list: [], //原始数据
      tabBars: [
        {
          name: tabBars[0],
          id: "0",
          data: []
        },
        {
          name: tabBars[1],
          id: "1",
          data: []
        },
        {
          name: tabBars[2],
          id: "2",
          data: []
        }
      ]
    };
  },
  onLoad() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getCouponByOpenid", //仅为示例，并非真实接口地址。
        data: {},
        showLoading: true
      }).then(res => {
        this.list = res.data.map(item => {
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
        this.initTabs();
      });
    },
    initTabs() {
      this.list.map(item => {
        this.tabBars[Number(item.status)].data.push(item);
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
      this.scrollInto = this.tabBars[index].id;
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.tabs,
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
.tabs,
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
  padding-left: 85upx;
  padding-right: 85upx;
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

.ticke-box {
  flex: none;
  width: 65%;
  margin: 30upx auto;
}
.popup-content,
.popup-content .ticke-box {
  margin-bottom: 20upx;
}
</style>
