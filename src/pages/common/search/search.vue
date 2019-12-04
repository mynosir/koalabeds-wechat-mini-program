<template>
  <view class="uni-panel uni-panel-h">
    <view class="uni-panel">
      <uni-search-bar
        :placeholder="$t('pages.home.searchPlaceHolod')"
        @input="input"
        @search="search"
        :radius="100"
        :hideCancel="true"
        :showSearch="true"
        :value="searchContent"
      />
    </view>
    <view v-if="showList">
      <uni-list>
        <uni-list-item :show-arrow="false" :title="searchContent" @tap="search" />
        <uni-list-item
          :show-arrow="false"
          :title="item.propertyName"
          v-for="item in list"
          :key="item.id"
          @tap="goHotel(item.propertyID)"
          thumb="/static/hotel.png"
        />
      </uni-list>
    </view>
  </view>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
export default {
  components: {
    uniSearchBar,
    uniList,
    uniListItem
  },
  data() {
    return {
      searchContent: this.$store.state.hotel.search,
      showList: false,
      list: [],
      hotelList: []
    };
  },
  onLoad() {
    this.getHotels();
  },
  watch: {
    searchContent(newVal) {
      this.searchHotel(newVal);
      return newVal;
    }
  },
  methods: {
    searchHotel(newVal) {
      if (newVal !== "") {
        this.showList = true;
        this.list = this.hotelList.filter(
          item => item.propertyName.indexOf(newVal) >= 0
        );
      } else {
        this.list = [];
        this.showList = false;
      }
    },
    getHotels() {
      this.$fetch({
        url: this.$store.state.domain + "/api/get?actionxm=getHotelListInDB" //仅为示例，并非真实接口地址。
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          return;
        }
        this.hotelList = res.data;
        this.$nextTick(() => {
          this.searchHotel(this.$store.state.hotel.search);
        });
      });
    },
    search() {
      console.log(this.searchContent);
      this.$store.commit("setSearch", this.searchContent);
      this.$store.commit("setRefresh", 'Y');
      uni.navigateBack({
        url: "/pages/hotel/search/search"
      });
    },
    input({ value }) {
      this.searchContent = value;
    },
    goHotel(id) {
      uni.navigateTo({
        url: "/pages/hotel/detail/detail?id=" + id
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
