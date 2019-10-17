<template>
  <view class="uni-container">
    <view class="uni-panel uni-panel-h">
      <view v-if="list.length > 0">
        <uni-list>
          <uni-swipe-action
            :options="options"
            v-for="(item, index) in list"
            :key="index"
            @click="bindClick(item, index)"
          >
            <uni-list-item :show-arrow="false" :showExtra="true">
              <view @tap="selectAddress(item)">
                <view>{{item.name}} {{item.tel}}</view>
                <view class="koa-desc">{{item.address}}</view>
              </view>
              <view slot="extra" @tap="goDetail(item)">
                <text>edit</text>
                <uni-icons type="compose"></uni-icons>
              </view>
            </uni-list-item>
          </uni-swipe-action>
        </uni-list>
      </view>
      <view v-else style>No Shipping Address Yet, Please Add.</view>
    </view>
    <view style="height:80px"></view>
    <view class="uni-panel">
      <view style="height:60px"></view>
      <view class="goods-carts">
        <button type="primary" style="border-radius:0;" @tap="goDetail(null)">Add Address</button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
import uniList from "@/components/uni-list/uni-list.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
export default {
  components: {
    uniSwipeAction,
    uniList,
    uniListItem,
    uniIcons
  },
  data() {
    return {
      list: [
        {
          id: "123",
          name: "username",
          tel: "+12329343993",
          address: "address"
        },
        {
          id: "123",
          name: "username1",
          tel: "+12329343993",
          address: "address"
        },
        {
          id: "123",
          name: "username2",
          tel: "+12329343993",
          address: "address"
        }
      ],
      options: [
        {
          id: "del",
          text: "删除",
          style: {
            backgroundColor: "rgb(255,58,49)"
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setSelectedAddress"]),
    selectAddress(item) {
      this.setSelectedAddress(item);
      uni.navigateBack({
        delta: 1
      });
    },
    bindClick(item, index) {
      this.list.splice(index, 1);
      uni.showToast({
        title: "删除成功！",
        duration: 2000,
        mask: true,
        icon: "success"
      });
    },
    goDetail(item) {
      let id = item == null ? "" : item.id;
      uni.navigateTo({
        url: "/pages/common/address/detail?id=" + id
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
