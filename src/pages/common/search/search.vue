<template>
  <view class="uni-panel uni-panel-h">
    <view class="uni-panel">
        <uni-search-bar placeholder="Search location or hotel name" @input="input" @search="search" :radius="100" :hideCancel="true" :showSearch="true"/>
    </view>
    <view v-if="showList">
        <uni-list>
            <uni-list-item :show-arrow="false" :title="'hotel name'+i" v-for="i in 6" :key="i" @tap="goHotel"/>
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
        showList: false
    };
  },
  methods:{
    search(){
        uni.navigateBack({
            url: "/pages/hotel/search/search"
        });
    },
    input({value}){
        if(value.length > 0){
          this.showList = true
        }else{
          this.showList = false
        }
    },
    goHotel(){
        uni.navigateTo({
            url: "/pages/hotel/detail/detail"
        });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
