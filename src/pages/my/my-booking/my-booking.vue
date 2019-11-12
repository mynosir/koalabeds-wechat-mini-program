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
      <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
        <!-- #ifndef APP-NVUE -->
        <scroll-view class="scroll-v list" enableBackToTop="true" scroll-y>
          <booking-order
            :list="tab.data"
            @click="showProduct"
            @book="goBook"
            @cancel="cancelBook(index1,tab.data)"
          ></booking-order>
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
          <uni-rate style="margin-left:20px" :value="2" @change="onChange" />
        </view>
        <view class="uni-textarea">
          <textarea
            @blur="bindTextAreaBlur"
            :value="popHotel.textAreaValue"
            style="border: 1px solid gray"
            placeholder-style="color:black"
            placeholder="Share your experience.."
          />
        </view>
      </view>
      <view class="popup-button">
        <button class="mini-btn" @click="closePopup('popup')" type="default" size="mini">Later</button>
        <button class="mini-btn" type="primary" size="mini" style="background-color:#1AAD19">Submit</button>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import bookingOrder from "@/components/booking-order/booking-order.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniRate from "@/components/uni-rate/uni-rate.vue";
export default {
  components: {
    bookingOrder,
    uniPopup,
    uniIcons,
    uniRate
  },
  data() {
    return {
      list: [
        {
          title: "Lee Garden Guest House",
          name: "ROOM A",
          type: "Twin bed",
          startDate: "07/07/2019(Wed)",
          endDate: "09/07/2019(Tus)",
          dayCount: 2,
          status: "01",
          statusName: "To be paid",
          textAreaValue: "",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg"
        },
        {
          title: "Lee Garden Guest House",
          name: "ROOM A",
          type: "Twin bed",
          startDate: "07/07/2019(Wed)",
          endDate: "09/07/2019(Tus)",
          dayCount: 2,
          status: "02",
          statusName: "Confirm",
          textAreaValue: "",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg"
        },
        {
          title: "Lee Garden Guest House",
          name: "ROOM A",
          type: "Twin bed",
          startDate: "07/07/2019(Wed)",
          endDate: "09/07/2019(Tus)",
          dayCount: 2,
          status: "03",
          statusName: "Complete",
          textAreaValue: "",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg"
        },
        {
          title: "Lee Garden Guest House",
          name: "ROOM A",
          type: "Twin bed",
          startDate: "07/07/2019(Wed)",
          endDate: "09/07/2019(Tus)",
          dayCount: 2,
          status: "04",
          statusName: "Cancel",
          textAreaValue: "",
          img:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg"
        }
      ],

      newsList: [],
      cacheTab: [],
      tabIndex: 0,
      tabBars: [
        {
          name: "All",
          id: "s01"
        },
        {
          name: "To be paid",
          id: "s02"
        },
        {
          name: "Confirm",
          id: "s03"
        },
        {
          name: "Complete",
          id: "s04"
        },
        {
          name: "Cancel",
          id: "s05"
        }
      ],
      scrollInto: "",
      showTips: false,
      navigateFlag: false,
      pulling: false,
      refreshIcon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
      existPop: ["popup", "guest"],
      popHotel: {},
      textAreaValue: "123"
    };
  },
  onLoad() {
    setTimeout(() => {
      this.tabBars.forEach(tabBar => {
        this.newsList.push({
          data: []
        });
      });
      this.getList(0);
    }, 350);
    this.getOrders()
  },
  methods: {
    getOrders(){
      this.$fetch({
        url: this.$store.state.domain + 'api/get?actionxm=getHotelOrders'
      }).then(res=>{

      })
    },
    getList(index) {
      let activeTab = this.newsList[index];
      let list = [];
      if (index == 0) {
        list = list.concat(this.list);
      } else if (index == 1) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].status == "01") {
            list.push(this.list[i]);
          }
        }
      } else if (index == 2) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].status == "02") {
            list.push(this.list[i]);
          }
        }
      } else if (index == 3) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].status == "03") {
            list.push(this.list[i]);
          }
        }
      } else if (index == 4) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].status == "04") {
            list.push(this.list[i]);
          }
        }
      }
      activeTab.data = activeTab.data.concat(list);
    },
    // loadMore(e) {
    //     setTimeout(() => {
    //         this.getList(this.tabIndex);
    //     }, 500)
    // },
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    ontabchange(e) {
      let index = e.target.current || e.detail.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.newsList[index].data.length === 0) {
        this.getList(index);
      }

      if (this.tabIndex === index) {
        return;
      }

      // // 缓存 tabId
      // if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
      //     let isExist = this.cacheTab.indexOf(this.tabIndex);
      //     if (isExist < 0) {
      //         this.cacheTab.push(this.tabIndex);
      //         //console.log("cache index:: " + this.tabIndex);
      //     }
      // }

      this.tabIndex = index;
      this.scrollInto = this.tabBars[index].id;

      // // 释放 tabId
      // if (this.cacheTab.length > MAX_CACHE_PAGE) {
      //     let cacheIndex = this.cacheTab[0];
      //     this.clearTabData(cacheIndex);
      //     this.cacheTab.splice(0, 1);
      //     //console.log("remove cache index:: " + cacheIndex);
      // }
    },
    // clearTabData(e) {
    //     this.newsList[e].data.length = 0;
    //     this.newsList[e].loadingText = "加载更多...";
    // },
    // refreshData() {},
    // onrefresh(e) {
    //     var tab = this.newsList[this.tabIndex];
    //     if (!tab.refreshFlag) {
    //         return;
    //     }
    //     tab.refreshing = true;
    //     tab.refreshText = "正在刷新...";
    //
    //     setTimeout(() => {
    //         this.refreshData();
    //         this.pulling = true;
    //         tab.refreshing = false;
    //         tab.refreshFlag = false;
    //         tab.refreshText = "已刷新";
    //         setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
    //             this.pulling = false;
    //         }, 500);
    //     }, 2000);
    // },
    // onpullingdown(e) {
    //     var tab = this.newsList[this.tabIndex];
    //     if (tab.refreshing || this.pulling) {
    //         return;
    //     }
    //     if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
    //         tab.refreshFlag = true;
    //         tab.refreshText = "释放立即刷新";
    //     } else {
    //         tab.refreshFlag = false;
    //         tab.refreshText = "下拉可以刷新";
    //     }
    // },
    showProduct(item) {
      if (item.status == "02") {
        this.popHotel = item;
        this.selectRoom = item;
        this.showPop("popup", item);
      }
    },
    goBook(value) {
      uni.navigateTo({
        url: "/pages/hotel/book/book"
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
        // this.textAreaValue = "";
      }
    },
    bindTextAreaBlur(e) {
      this.popHotel.textAreaValue = e.detail.value;
    },
    cancelBook(index1, value) {
      uni.showModal({
        content: "是否取消本条订单？",
        success: res => {
          if (res.confirm) {
            // this.list[index1].status = "05";
            // this.list[index1].statusName = "Cancel";
            value[index1].status = "04";
            value[index1].statusName = "Cancel";
          }
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
