<template>
    <view class="tabs">
        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
        <view class="line-h"></view>
        <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
            <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<!-- #ifndef APP-NVUE -->
				<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y>
            <view class="ticke-box" v-for="(data,i) in tab.data" :key="i">
              <my-coupon :ticketObj="data"></my-coupon>
            </view>

				</scroll-view>
				<!-- #endif -->
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
    import myCoupon from "@/components/my-coupon/my-coupon.vue";

    // // 缓存每页最多
    // const MAX_CACHE_DATA = 100;
    // // 缓存页签数量
    // const MAX_CACHE_PAGE = 3;


    export default {
        components: {
            myCoupon
        },
        data() {
            return {
              tabIndex: 0,
                newsList: [],
                list: [
                  {
                    price: 10,
                    fullPrice: 1000,
                    valid: 1,
                    isUsed: false,
                    validdate:"2019/XX/XX",
                    isExpired:false
                  },
                  {
                    price: 10,
                    fullPrice: 1000,
                    valid: 30,
                    isUsed: false,
                    validdate:"2019/XX/XX",
                    isExpired:false
                  },
                  {
                    price: 10,
                    fullPrice: 1000,
                    valid: 0,
                    isUsed: false,
                    validdate:"2019/XX/XX",
                    isExpired:true
                  },
                  {
                    price: 10,
                    fullPrice: 1000,
                    valid: 30,
                    isUsed: true,
                    validdate:"2019/XX/XX",
                    isExpired:true
                  },

                ],
                tabBars: [
                  {
                    name: 'Valid',
                    id: 't1'
                  },
                  {
                    name: 'Used',
                    id: 't2'
                  },
                  {
                    name: 'Expired',
                    id: 't3'
                  }
                ]
            }
        },
        onLoad() {
            setTimeout(()=>{
              this.tabBars.forEach((tabBar) => {
                  this.newsList.push({
                      data: []
                  });
              });
              this.getList(0);
            },350)
        },
        methods: {
            getList(index) {
              let list = [];
              if(index==0){
                for (var i = 0; i < this.list.length; i++) {
                  if (!this.list[i].isUsed&&!this.list[i].isExpired) {
                    list.push(this.list[i])
                  }
                }

              }else if (index==1) {
                for (var i = 0; i < this.list.length; i++) {
                  if (this.list[i].isUsed) {
                    list.push(this.list[i])
                  }
                }

              }else if (index==2) {
                for (var i = 0; i < this.list.length; i++) {
                  if (this.list[i].isExpired) {
                    list.push(this.list[i])
                  }
                }

              }

              this.newsList[index].data = list
            },
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                this.switchTab(index);
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                if (this.newsList[index].data.length === 0) {
                    this.getList(index);
                }

                if (this.tabIndex === index) {
                    return;
                }

                // // 缓存 tabId
                // if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
                //     let isExist = this.cacheTab.indexOf(this.tabIndex);
                //     if (isExist < 0) {
                //         this.cacheTab.push(this.tabIndex);
                //         //console.log("cache index:: " + this.tabIndex);
                //     }
                // }

                this.tabIndex = index;
                this.scrollInto = this.tabBars[index].id;

                // // 释放 tabId
                // if (this.cacheTab.length > MAX_CACHE_PAGE) {
                //     let cacheIndex = this.cacheTab[0];
                //     this.clearTabData(cacheIndex);
                //     this.cacheTab.splice(0, 1);
                //     //console.log("remove cache index:: " + cacheIndex);
                // }
            },

        }
    }
</script>

<style>
    @import '../../../common/uni-nvue.css';
    .tabs,
    swiper-item,
    scroll-view {
      display:-webkit-box;
      display:-webkit-flex;
      display:flex;
      -webkit-box-orient:vertical;
      -webkit-box-direction:normal;
      -webkit-flex-direction:column;
              flex-direction:column;
      -webkit-flex-shrink: 0;
              flex-shrink: 0;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
              flex-grow: 0;
      -webkit-flex-basis: auto;
              flex-basis: auto;
      -webkit-box-align: stretch;
      -webkit-align-items: stretch;
              align-items: stretch;
      -webkit-align-content: flex-start;
              align-content: flex-start;
    }
    .tabs,
    image,
    input,
    scroll-view,
    swiper,
    swiper-item,
    text,
    textarea,
    video {
      position: relative;
      border: 0px solid #000000;
      box-sizing: border-box;
    }
    swiper-item {
      position: absolute;
    }

    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750upx;
        height: 80upx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1upx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 85upx;
        padding-right: 85upx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30upx;
        height: 80upx;
        line-height: 80upx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750upx;

    }

    .update-tips {
        position: absolute;
        left: 0;
        top: 41px;
        right: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #FDDD9B;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .update-tips-text {
        font-size: 14px;
        color: #ffffff;
    }

    .refresh {
        width: 750upx;
        height: 64px;
        justify-content: center;
    }

    .refresh-view {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

  	.refresh-icon {
  		width: 30px;
  		height: 30px;
  		transition-duration: .5s;
  		transition-property: transform;
  		transform: rotate(0deg);
  		transform-origin: 15px 15px;
  	}

  	.refresh-icon-active {
  		transform: rotate(180deg);
  	}

  	.loading-icon {
  		width: 20px;
  		height: 20px;
  		margin-right: 5px;
  		color: #999999;
  	}

    .loading-text {
        margin-left: 2px;
        font-size: 16px;
        color: #999999;
    }

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28upx;
        color: #999;
    }


    .ticke-box {
      flex: none;
      width: 360upx;
      margin: 20upx auto;
      /* margin-right: 20upx;
      margin-bottom: 20upx; */
    }
    .popup-content,
    .popup-content .ticke-box {
      margin-bottom: 20upx;
    }

    /* .list{
      display: flex;
      justify-content:center;
      flex-direction: row;
      flex-wrap: wrap;

    } */
</style>
