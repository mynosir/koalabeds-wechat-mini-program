<template>
  <view class="uni-container">
    <panel-image
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :imgUrl="item.image"
      @beforeGo="beforeGo"
      :goUrl="`/pages/ticket/detail/detail?id=${item.productId}&type=${item.type}`"
    ></panel-image>
    <uni-load-more iconType="spinner" :status="loadmoreStatus" />
  </view>
</template>
<script>
import panelImage from "@/components/panel-image/panel-image.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    panelImage,
    uniLoadMore
  },
  data() {
    return {
      list: [],
      loadmoreStatus: "nomore"
    };
  },
  onShareAppMessage() {
    return {
      title: "Welcome to Koalabeds",
      path: "/pages/index/home/home"
    };
  },
  onLoad() {
    this.getGraylineNationalityList();
  },
  onReady() {},
  onShow() {},
  onHide() {},
  methods: {
    beforeGo({ imgUrl }) {
      console.log(imgUrl);
      this.$store.commit("setTicketImg", imgUrl);
    },
    getGraylineNationalityList() {
      this.$fetch({
        url:
          this.$store.state.domain + "api/get?actionxm=getGraylineProductList",
        data: {
          language: this.$store.state.language
        },
        showLoading: true
      }).then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
