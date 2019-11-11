<template>
  <view class="uni-panel uni-panel-h">
    <view class="uni-panel">
      <uni-search-bar
        placeholder="Search location or hotel name"
        @input="input"
        @search="search"
        :radius="100"
        :hideCancel="true"
        :showSearch="true"
      />
    </view>
    <view v-if="showList">
      <uni-list>
        <uni-list-item
          :show-arrow="false"
          :title="searchContent"
          @tap="search"
        />
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
      searchContent: '',
      showList: false,
      list: []
    };
  },
  watch:{
    searchContent(newVal){
      if(newVal !== ''){
        this.list = this.$store.state.hotelTemps.filter(item=>item.propertyName.indexOf(newVal)>=0)
      }else{
        this.list = []
      }
      return newVal;
    }
  },
  methods: {
    search() {
      this.$store.commit("setSearch", this.searchContent);
      uni.navigateBack({
        url: "/pages/hotel/search/search"
      });
    },
    input({ value }) {
      if (value.length > 0) {
        this.showList = true;
        this.searchContent = value;
      } else {
        this.showList = false;
      }
    },
    goHotel(id) {
      uni.navigateTo({
        url: "/pages/hotel/detail/detail?id="+id
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
