<template>
  <view>
    <view class="uni-flex">
      <view class="uni-flex-item" style="font-size:32upx">{{$t("components.comments.Reviews")}}</view>
      <view
        class="uni-flex-item uni-right"
        style="font-size:32upx;color:#707070"
        v-if="showMore"
        @tap="goReviews"
      >
        <text>{{$t("components.comments.More")}}</text>
        <uni-icons type="arrowright" size="32upx" style="vertical-align: middle;" />
      </view>
    </view>
    <view class="uni-padding-wrap">
      <!-- 评论区 start -->
      <view class="uni-comment" v-for="(item, index) in list" :key="index">
        <view class="uni-comment-list">
          <view class="uni-comment-face">
            <image :src="item.userimg" mode="widthFix" />
          </view>
          <view class="uni-comment-body">
            <view class="uni-comment-top">
              <text>{{item.username}}</text>
            </view>
            <view>
              <uni-icons
                type="star-filled"
                color="#ffdc64"
                size="26"
                v-for="i in (item.stars-1+1)"
                :key="i"
              />
              <uni-icons
                type="star-filled"
                color="#ccc"
                size="26"
                v-for="i in (5-item.stars)"
                :key="i"
              />
            </view>
            <view class="uni-comment-content">{{item.content}}</view>
          </view>
        </view>
      </view>
      <!-- 评论区 end -->
    </view>
  </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
  components: {
    uniIcons
  },
  name: "comments",
  props: {
    showMore: {
      type: Boolean,
      defalut: true
    },
    list: {
      type: Array,
      default: [
        {
          username: "username",
          userimg:
            "http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg",
          stars: 4,
          content:
            "reviwess contentreviwess contentreviwess contentreviwess content"
        }
      ]
    }
  },
  methods: {
    goReviews() {
      this.$emit("click");
    }
  }
};
</script>

<style>
</style>
