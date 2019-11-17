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
      page: 1,
      num: 10,
      hotelId: '170048',
      loadmoreStatus: "more" //more（loading前）、loading（loading中）、noMore（没有更多了
    };
  },

  onLoad(options) {
    this.hotelId = options.id || "170048";
    this.getComments();
  },
  methods: {
    getComments() {
      if (
        this.loadmoreStatus === "loading" ||
        this.loadmoreStatus == "noMore"
      ) {
        return;
      }
      this.loadmoreStatus = "loading";
      this.$fetch({
        url: this.$store.state.domain + "api/get?actionxm=getReviews",
        data: {
          propertyID: this.hotelId,
          page: this.page,
          num: this.num
        }
      }).then(res => {
        if (!res.data || res.data.length <= 0) {
          this.loadmoreStatus = "noMore";
        } else {
          if(res.data.length < this.num){
            this.loadmoreStatus = "noMore";
          }
          this.comments = res.data.map(item => {
            return {
              username: item.userinfo.wx_nickname,
              userimg: item.userinfo.wx_avatarUrl,
              stars: item.rate,
              content: item.content
            };
          });
          this.page++;
        }
      });
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
