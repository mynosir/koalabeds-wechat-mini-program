<template>
  <view class="uni-panel uni-center" style="padding:40upx">
    <view class="uni-panel">
      <icon type="success" size="80"></icon>
    </view>
    <view class="uni-panel" style="font-size:50upx">
      PayMent Success
    </view>
    <view class="uni-panel" style="margin-top:120upx">
      <button type="primary" @tap="goOrderDetail">Booking Detail</button>
    </view>
    <view class="uni-panel" style="margin-bottom:220upx">
      <button type="info" @tap="backHome">Back To Homepage</button>
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
  onUnload() {
      this.backHome()
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
    goOrderDetail(){
      
    },
    backHome(){
        uni.navigateBack({
            delta: 10
        });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
