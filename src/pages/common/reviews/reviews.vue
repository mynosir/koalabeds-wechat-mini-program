<template>
  <scroll-view
    @scrolltolower="loadMore"
    style="background:#fff;padding:20upx;height:100%"
    :scroll-y="true"
    :enable-back-to-top="true"
  >
    <comments :list="comments" :showMore="false"></comments>
    <uni-load-more iconType="spinner" :status="loadmoreStatus" />
  </scroll-view>
</template>

<script>
import comments from "@/components/comments/comments.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    comments,
    uniLoadMore
  },
  data() {
    return {
      comments: [],
      count: 1,
      loadmoreStatus: "more" //more（loading前）、loading（loading中）、noMore（没有更多了
    };
  },
  onLoad() {
    this.getComments(1);
  },
  methods: {
    getComments() {
      if(this.loadmoreStatus === 'loading'){
          return
      }
      this.loadmoreStatus = 'loading'
      if (this.count > 3) {
        this.loadmoreStatus = "noMore";
        return;
      }
      setTimeout(() => {
        for (let i = 0; i < this.count * 10; i++) {
          this.comments.push({
            username: "username",
            userimg:
              "http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg",
            stars: parseInt(Math.random() * 5 + 1),
            content:
              "reviwess contentreviwess contentreviwess contentreviwess content"
          });
        }
        this.loadmoreStatus = 'more'
      }, 1000);
    },
    loadMore() {
      console.log(1);
      this.count++;
      this.getComments();
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.ff {
}
</style>
