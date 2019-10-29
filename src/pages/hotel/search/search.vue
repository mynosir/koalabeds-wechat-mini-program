<template>
  <scroll-view class="uni-container" :scroll-y="selectKey === '' ">
    <view class="uni-panel-h" style="border-bottom:1px solid #ccc">
      <view class="uni-flex" style="align-items:center;">
        <view class="uni-flex-item">
          <view class="uni-flex" style="align-items:center;" @tap="toggleCalendar">
            <view class="koa-date--desc">Check In</view>
            <view class="uni-flex-item koa-date--text">{{startDate}}</view>
            <view class="koa-date--desc">Check Out</view>
            <view class="uni-flex-item koa-date--text">{{endDate}}</view>
            <view class="koa-date--desc">{{dayCount}}N</view>
          </view>
        </view>
        <view style="width:200upx" @tap="goSearch">
          <uni-search-bar radius="100" placeholder="Search" :hideCancel="true" :disabled="true"/>
        </view>
      </view>
      <view class="uni-flex" style="align-items:center;">
        <view
          class="uni-flex-item filter-select"
          @tap="showPop('location')"
          :class="{'filter-select__light':selectKey == 'location'}"
        >
          <text class="koa-date--desc">Location</text>
          <uni-icons type="arrowdown" :color="selectKey == 'location'? '#0bb9ee': '#333'"></uni-icons>
        </view>
        <view
          class="uni-flex-item filter-select"
          @tap="showPop('filter')"
          :class="{'filter-select__light':selectKey == 'filter'}"
        >
          <text class="koa-date--desc">Filter</text>
          <uni-icons type="arrowdown" :color="selectKey == 'filter'? '#0bb9ee': '#333'"></uni-icons>
        </view>
        <view
          class="uni-flex-item filter-select"
          @tap="showPop('sorting')"
          :class="{'filter-select__light':selectKey == 'sorting'}"
        >
          <text class="koa-date--desc">Sorting</text>
          <uni-icons type="arrowdown" :color="selectKey == 'sorting'? '#0bb9ee': '#333'"></uni-icons>
        </view>
      </view>
    </view>
    <view class="uni-list search-list">
      <view
        class="uni-list-cell"
        hover-class="uni-list-cell-hover"
        v-for="(value,key) in list"
        :key="key"
        @tap="goDetail($event,value)"
      >
        <view class="uni-media-list">
          <view class="uni-media-list-logo">
            <image :src="value.img" />
          </view>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{value.title}}</view>
            <view class="uni-media-list-text-bottom">{{value.address}}</view>
            <view class="panel">
              <uni-icons type="star-filled" color="#ffdc64" size="26" />
              <text class="search-star--value">{{value.starValue}}</text>
              <text class="search-star--num">{{value.ratingNum}} rating</text>
            </view>
            <view
              class="uni-product-price uni-flex"
              style="width:50%;margin-left:auto;align-items:center"
            >
              <view class="uni-product-price-favour">￥{{value.money1}}</view>
              <view class="uni-product-price-original">￥{{value.money2}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- location -->
    <uni-popup ref="location" type="top" class="filter-pop" @change="changePop">
      <view class="uni-list" style="margin:-30upx">
        <radio-group>
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in 4" :key="index">
            <view class="uni-flex-item">City{{item}}</view>
            <view>
              <radio :value="item" />
            </view>
          </label>
        </radio-group>
      </view>
    </uni-popup>
    <!-- filter -->
    <uni-popup ref="filter" type="top" class="filter-pop" @change="changePop">
      <view class="panel">Price</view>
      <view class="panel">
        <slider-range
          :value="filter.maxMoney"
          :max="filter.maxMoney"
          :format="format"
          @change="sliderChange"
          activeColor="#0bb9ee"
        ></slider-range>
      </view>
      <view class="panel">Rating</view>
      <view class="panel uni-flex" style="flex-wrap: wrap;">
        <view
          class="filter-star"
          :class="{'active':ratingIndex == '-1' }"
          :data-value="-1"
          @tap="changeRating($event)"
        >Any</view>
        <view
          class="filter-star"
          v-for="i in 5"
          :key="i"
          :class="{'active':ratingIndex == i }"
          :data-value="i"
          @tap="changeRating($event)"
        >
          <uni-icons type="star-filled" color="#ffdc64" size="26" v-for="i2 in (i+1)" :key="i2" />
        </view>
      </view>
    </uni-popup>
    <!-- sorting -->
    <uni-popup ref="sorting" type="top" class="filter-pop" @change="changePop">
      <view class="uni-list" style="margin:-30upx">
        <radio-group>
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in 4" :key="index">
            <view class="uni-flex-item">Price{{item}}</view>
            <view>
              <radio :value="item" />
            </view>
          </label>
        </radio-group>
      </view>
    </uni-popup>
    <!-- 日期选择 -->
    <calendar @change="dateChange" :modal="true" :show="showCaledar" />
  </scroll-view>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import sliderRange from "@/components/slider-range/slider-range.vue";
import calendar from "@/components/date-picker/date-picker.vue";
export default {
  components: {
    uniSearchBar,
    uniIcons,
    uniPopup,
    sliderRange,
    calendar
  },
  data() {
    let now = new Date();
    const dayCount = 1;
    const startDate = now.toString().substr(4, 6);
    now.setDate(now.getDate() + dayCount);
    const endDate = now.toString().substr(4, 6);
    let list = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        title: "ROOM A",
        address: "address addressaddressaddressaddressaddress",
        img: "http://ww1.sinaimg.cn/large/68c990d9gy1g7wwziuxrhj20bq0bsn1t.jpg",
        money1: new Number(parseInt(Math.random() * 1000)).toFixed(2),
        money2: new Number(parseInt(Math.random() * 1000)).toFixed(2),
        starValue: new Number(Math.random() * 5).toFixed(1),
        ratingNum: parseInt(Math.random() * 1000)
      });
    }
    return {
      showCaledar: false,
      startDate,
      endDate,
      dayCount: 1,
      existPop: ["location", "filter", "sorting"],
      selectKey: "",
      filter: {
        maxMoney: 2000
      },
      ratingIndex: -1,
      list
    };
  },
  methods: {
    format(val) {
      return val;
    },
    toggleCalendar() {
      this.showCaledar = !this.showCaledar;
    },
    dateChange({ choiceDate, dayCount }) {
      this.startDate = new Date(choiceDate[0].dateTime).toString().substr(4, 6);
      this.endDate = new Date(choiceDate[1].dateTime).toString().substr(4, 6);
      this.dayCount = dayCount;
    },
    goSearch() {
      uni.navigateTo({
        url: "/pages/common/search/search"
      });
    },
    showPop(key) {
      if (this.$refs[key].showPopup) {
        this.closePopup(key);
        return;
      }
      this.existPop.map(item => {
        if (item === key) {
          this.$refs[key].open();
          this.$nextTick(() => {
            this.selectKey = key;
          });
        } else {
          this.$refs[item].close();
        }
      });
    },
    closePopup(key) {
      if (this.existPop.includes(key)) {
        this.$refs[key].close();
      }
    },
    changePop({ show }) {
      console.log(arguments)
      if (!show) {
        this.selectKey = "";
      }
    },
    sliderChange() {},
    changeRating(event) {
      this.ratingIndex = event.currentTarget.dataset.value;
    },
    goDetail() {
      uni.navigateTo({
        url: "/pages/hotel/detail/detail"
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.koa-date--text {
  font-size: 32upx;
  text-align: center;
}
.koa-date--desc {
  font-size: 18upx;
  vertical-align: middle;
  text-align: center;
}
.filter-pop .uni-popup {
  top: 196upx;
}
.filter-pop .uni-list:before{
  background:none
}
.filter-select {
  text-align: center;
}
.filter-select {
  border-right: 1px solid #ccc;
}
.filter-select:last-child {
  border-right: none;
}
.filter-select .koa-date--desc {
  font-size: 20upx;
  margin-right: 30upx;
}
.filter-select .uni-icon {
  vertical-align: middle;
}
.filter-select__light,
.filter-select__light .uni-icon {
  color: #0bb9ee;
}
.filter-star {
  padding: 0 20upx;
  min-height: 70upx;
  line-height: 70upx;
  border: 1px solid #ccc;
  margin-right: 20upx;
  margin-bottom: 20upx;
  border-radius: 4upx;
  background: #fafafa;
}
.filter-star.active {
  border-color: #0bb9ee;
  background: #fff;
}
.search-list .uni-media-list-body {
  height: 100%;
}
.search-list .uni-media-list-body {
  height: 100%;
}
.search-list .search-star--value {
  margin-left: 10upx;
  color: #0bb9ee;
  vertical-align: middle;
}
.search-list .search-star--num {
  font-size: 20upx;
  margin-left: 10upx;
  vertical-align: middle;
}
.search-list .uni-icon {
  vertical-align: middle;
}
.search-list .uni-media-list-logo {
  width: 182rpx;
  height: 182rpx;
}

.uni-product-price-original {
  color: #d83c2a;
}
</style>
