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
          <uni-search-bar :value="hotelName" radius="100" placeholder="Search" :hideCancel="true" :disabled="true" />
        </view>
      </view>
      <view class="uni-flex" style="align-items:center;">
        <view
          class="uni-flex-item filter-select"
          @tap="showPop('location')"
          :class="{'filter-select__light':selectKey == 'location'}"
        >
          <text class="koa-date--desc">{{cityName}}</text>
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
    <view class="uni-list search-list" v-if="list && list.length > 0">
      <view
        class="uni-list-cell"
        hover-class="uni-list-cell-hover"
        v-for="(item,key) in list"
        :key="key"
        @tap="goDetail(item)"
      >
        <view class="uni-media-list">
          <view class="uni-media-list-logo">
            <image :src="item.propertyImageThumb" />
          </view>
          <view class="uni-media-list-body">
            <view class="uni-media-list-text-top">{{item.propertyName}}</view>
            <view
              class="uni-media-list-text-bottom"
            >{{item.propertyAddress1}} {{item.propertyAddress2}} {{item.propertyCity}} {{item.propertyState}}</view>
            <view class="panel">
              <uni-icons type="star-filled" color="#ffdc64" size="26" />
              <text class="search-star--value">{{item.rate}}</text>
              <text class="search-star--num">{{item.rateNum}} rating</text>
            </view>
            <view class="uni-product-price" style="text-align:right">
              <view class="uni-product-price-original">
                {{item.propertyCurrencySymbol}}{{item.minMoney}}
                <text style="font-size:24upx;margin-left:6upx;">up</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="no-data" v-else>cann't find any hotel~</view>
    <!-- location -->
    <uni-popup ref="location" type="top" class="filter-pop" @change="changePop">
      <view class="uni-list" style="margin:-30upx">
        <radio-group @change="changeCity">
          <label
            class="uni-list-cell uni-list-cell-pd"
            v-for="(item, index) in obtainCitys"
            :key="index"
          >
            <view
              class="uni-flex-item"
              :class="{'text-light': item.cityName == cityName}"
            >{{item.cityName}}</view>
            <view>
              <radio :value="item.cityName" :checked="item.cityName == cityName" />
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
          :class="{'active':rank == '0' }"
          :data-value="0"
          @tap="changeRating($event)"
        >Any</view>
        <view
          class="filter-star"
          v-for="i in 5"
          :key="i"
          :class="{'active':rank == (i+1) }"
          :data-value="i+1"
          @tap="changeRating($event)"
        >
          <uni-icons type="star-filled" color="#ffdc64" size="26" v-for="i2 in (i+1)" :key="i2" />
        </view>
      </view>
    </uni-popup>
    <!-- sorting -->
    <uni-popup ref="sorting" type="top" class="filter-pop" @change="changePop">
      <view class="uni-list" style="margin:-30upx">
        <radio-group @change="changeSort">
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="uni-flex-item" :class="{'text-light': selectSort == 'price1'}">
              Price
              <text style="font-size:24rpx">(from low to hight)</text>
            </view>
            <view>
              <radio value="price1" :checked="selectSort == 'price1'" />
            </view>
          </label>
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="uni-flex-item" :class="{'text-light': selectSort == 'price2'}">
              Price
              <text style="font-size:24rpx">(from hight to low)</text>
            </view>
            <view>
              <radio value="price2" :checked="selectSort == 'price2'" />
            </view>
          </label>
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="uni-flex-item" :class="{'text-light': selectSort == 'rank1'}">
              Ranking
              <text style="font-size:24rpx">(from low to hight)</text>
            </view>
            <view>
              <radio value="rank1" :checked="selectSort == 'rank1'" />
            </view>
          </label>
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="uni-flex-item" :class="{'text-light': selectSort == 'rank2'}">
              Ranking
              <text style="font-size:24rpx">(from hight to low)</text>
            </view>
            <view>
              <radio value="rank2" :checked="selectSort == 'rank2'" />
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
import { mapState, mapMutations } from "vuex";
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
  computed: {
    ...mapState({
      cityName: state => {
        return state.cityName == "Choose City" ? "Location" : state.cityName;
      }
    }),
    i18n() {
      return this.$t("pages.search");
    },
    startDate() {
      return this.$store.state.hotel.startDate.toString().substr(4, 6);
    },
    endDate() {
      return this.$store.state.hotel.endDate.toString().substr(4, 6);
    },
    dayCount() {
      return this.$store.state.hotel.dayCount;
    },
    //显示的城市数据
    obtainCitys() {
      return this.$store.state.citys;
    },
    hotelName(){
      return this.$store.state.hotel.search
    }
  },
  data() {
    return {
      showCaledar: false,
      existPop: ["location", "filter", "sorting"],
      selectKey: "",
      filter: {
        maxMoney: 2000
      },
      priceStart: 0,
      priceEnd: 2000,
      rank: 0,
      moneySort: 0,
      rankSort: 0,
      selectSort: "",
      list: [],
      timeout: -1
    };
  },
  onLoad(options) {
    
  },
  onShow(){
    console.log('show')
  },
  methods: {
    getHotels() {
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=searchHotels",
        data: {
          city: this.cityName == "Location" ? "" : this.cityName,
          checkInDate: this.$store.state.hotel.startDate.format("yyyy-MM-dd"),
          checkOutDate: this.$store.state.hotel.endDate.format("yyyy-MM-dd"),
          hotelName: this.hotelName,
          moneySort: this.moneySort,
          rankSort: this.rankSort,
          priceStart: this.priceStart,
          priceEnd: this.priceEnd,
          rank: this.rank
        },
        showLoading: true
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          this.list = [];
          return;
        }
        this.list = res.data.map(item => {
          return {
            ...item,
            ...item.details,
            propertyImageThumb: item.details.propertyImageThumb.split(",")[0]
          };
        });
        if (this.$store.state.hotelTemps.length <= 0) {
          this.$store.commit('setHotelTemps', this.list);
        }
      });
    },
    changeCity(e) {
      this.$store.commit("setCity", {
        cityCode: "123",
        cityName: e.target.value
      });
      this.getHotels();
    },
    changeSort(e) {
      this.selectSort = e.target.value;
      if (this.selectSort.indexOf("price") >= 0) {
        this.moneySort = this.selectSort.split("price")[0];
        this.rankSort = 0;
      }
      if (this.selectSort.indexOf("rank") >= 0) {
        this.rankSort = this.selectSort.split("rank")[0];
        this.moneySort = 0;
      }
      this.getHotels();
    },
    format(val) {
      return val;
    },
    toggleCalendar() {
      this.showCaledar = !this.showCaledar;
    },
    dateChange({ choiceDate, dayCount }) {
      const startDate = new Date(choiceDate[0].dateTime);
      const endDate = new Date(choiceDate[1].dateTime);
      this.$store.commit("setHotelDate", {
        startDate,
        endDate,
        dayCount
      });
      this.getHotels();
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
      if (!show) {
        this.selectKey = "";
      }
    },
    sliderChange(values) {
      this.priceStart = values[0];
      this.priceEnd = values[1];
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getHotels();
      }, 500);
    },
    changeRating(event) {
      this.rank = event.currentTarget.dataset.value;
      this.getHotels();
    },
    goDetail(item) {
      uni.navigateTo({
        url: "/pages/hotel/detail/detail?id=" + item.propertyID
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
.filter-pop .uni-list:before {
  background: none;
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
</style>
