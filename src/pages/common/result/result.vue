<template>
  <view class="uni-panel uni-center" style="padding:40upx">
    <template v-if="status == 0">
      <view class="uni-panel">
        <icon type="warn" size="80"></icon>
      </view>
      <view class="uni-panel" style="font-size:50upx">Payment Fail!</view>
    </template>
    <template v-else-if="status == -1">
      <view class="uni-panel">
        <icon type="cancel" size="80"></icon>
      </view>
      <view class="uni-panel" style="font-size:50upx">Order Cancel!</view>
    </template>
    <template v-else>
      <view class="uni-panel">
        <icon type="success" size="80"></icon>
      </view>
      <view class="uni-panel" style="font-size:50upx">Payment Success!</view>
    </template>
    <view class="uni-panel" style="margin-top:120upx">
      <button type="primary" @tap="goOrderDetail" v-if="status != -1">Booking Detail</button>
    </view>
    <view class="uni-panel" style="margin-bottom:220upx">
      <navigator class="uni-btn-info" target="miniProgram" open-type="exit">Back To Homepage</navigator>
      <!-- <button type="info" @tap="backHome">Back To Homepage</button> -->
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
      showList: false,
      type: "hotel",
      status: 1
    };
  },
  onLoad: function(option) {
    console.log(option)
    this.status = option.status || 1;
    this.id = option.id || "";
    this.type = option.type || "hotel";
  },
  onUnload() {
    this.backHome();
  },
  methods: {
    goOrderDetail() {
      const urls = {
        hotel: `/pages/hotel/book/book?type=order&id=${this.id}`,
        ticket: `/pages/my/my-ticket/detail?id=${this.id}`
      };
      console.log('url:', urls[this.type])
      uni.navigateTo({
        url: urls[this.type]
      });
    },
    backHome() {
      uni.navigateBack({
        delta: 10
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.uni-btn-info {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 2.55555556;
  border-radius: 5px;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
}
</style>
