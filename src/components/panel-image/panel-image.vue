<template>
  <view class="uni-panel uni-panel-h" @tap="onClick">
    <view class="panel-image-title uni-center">{{title}}</view>
    <view class="panel-image-content">
      <image :src="imgUrl"  mode="widthFix"/>
    </view>
  </view>
</template>

<script>
export default {
  name: "Ticket",
  props: {
    title: {
      type: String,
      default: ""
    }, // 标题
    imgUrl: {
      type: String,
      default: ""
    }, // 图片地址
    goUrl: {
      type: String,
      default: ""
    }, // 跳转地址
  },
  methods: {
    onClick() {
      this.$emit("beforeGo", {
        title: this.title,
        imgUrl: this.imgUrl,
        goUrl: this.goUrl
      });
      this.$nextTick(() => {
        uni.navigateTo({
          url: this.goUrl
        });
      }, 0);
    }
  }
};
</script>

<style>
@charset "UTF-8";
.panel-image-title {
  font-size: 28upx;
}
.panel-image-content image {
  width: 100%;
  border-radius: 16upx;
  overflow: hidden;
}
</style>