<template>
  <view class="koa-ticket-detail uni-container">
    <view class="uni-panel">
      <view class="page-section swiper">
        <view class="page-section-spacing">
          <swiper
            class="swiper"
            :indicator-dots="swiperSetting.indicatordots"
            :autoplay="swiperSetting.autoplay"
            :interval="swiperSetting.interval"
            :duration="swiperSetting.duration"
          >
            <swiper-item v-for="(item, index) in imglist" :key="index">
              <image style="width: 100%; " :src="item" />
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <view class="uni-panel uni-panel-h">
      <view class="koa-title">HONGKONG DISNEY DSTIdskfjsdf</view>
      <view class="koa-desc">
        something say askdfl;asdfjasdf asldfjasd;fas dfklasjdf;
        safdlkasjf asaldf;asdfsaldf;asdfsaldf;asdfsaldf;asdfsaldf;asdf
        asdfkasldfjasl;dfasdfsaldf;asdf
      </view>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item title="Booking Instruction" />
        <uni-list-item
          title="Valid Date"
          :desc="validDate == ''?'Choose A Date': validDate"
          :showDesc="true"
          @click="goDate"
        />
      </uni-list>
    </view>
    <view class="uni-panel">
      <uni-list>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view>
            <view class="panel" style="font-size:32upx">Adult:</view>
            <view class="uni-product-price uni-flex" style="width:50%;align-items:center">
              <view class="uni-product-price-favour">￥{{ticket.adult.money1}}</view>
              <view class="uni-product-price-original">￥{{ticket.adult.money2}}</view>
            </view>
          </view>
          <view slot="extra">
            <uni-number-box :value="ticket.adult.ticketNum" @change="changeAdultNum" />
          </view>
        </uni-list-item>
        <uni-list-item :showArrow="false" :showExtra="true">
          <view>
            <view class="panel" style="font-size:32upx">Child:</view>
            <view class="uni-product-price uni-flex" style="width:50%;align-items:center">
              <view class="uni-product-price-favour">￥{{ticket.child.money1}}</view>
              <view class="uni-product-price-original">￥{{ticket.child.money2}}</view>
            </view>
          </view>
          <view slot="extra">
            <uni-number-box :value="ticket.child.ticketNum" @change="changeChildNum" />
          </view>
        </uni-list-item>
      </uni-list>
      <view style="height:120px"></view>
      <view class="goods-carts">
        <uni-list>
          <uni-list-item :showArrow="false" :showFull="true">
            <view class="uni-flex" style="align-items:center;">
              <view
                class="uni-flex-item"
                style="padding-left:24upx"
              >￥{{ticket.adult.money2*ticket.adult.ticketNum+ticket.child.money2*ticket.child.ticketNum}}</view>
              <view>
                <button type="primary" style="border-radius:0;" @tap="bookTicket">Booking Now</button>
              </view>
            </view>
          </uni-list-item>
        </uni-list>
      </view>
    </view>

    <uni-calendar
      ref="calendar"
      :start-date="startDate"
      :date="validDate"
      @change="change"
      @confirm="change"
    />
  </view>
</template>

<script>
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";

const Utils = require("../../../common/util.js");
export default {
  components: {
    uniList,
    uniListItem,
    uniCalendar,
    uniNumberBox
  },
  data() {
    return {
      validDate: "",
      startDate: Utils.getDate(new Date(), -1),
      date: "",
      imglist: [
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg",
        "https://picjumbo.com/wp-content/uploads/night-car-lights-on-the-road-1080x720.jpg"
      ],
      ticket: {
        adult: {
          money1: 300.0,
          money2: 200.0,
          ticketNum: 1
        },
        child: {
          money1: 200.0,
          money2: 100.0,
          ticketNum: 0
        }
      }
    };
  },
  methods: {
    goDate() {
      this.$refs.calendar.open();
    },
    change(e) {
      console.log(e);
      this.validDate = e.fulldate;
    },
    changeAdultNum(value) {
      this.ticket.adult.ticketNum = value;
    },
    changeChildNum(value) {
      this.ticket.child.ticketNum = value;
    },
    bookTicket() {
      uni.navigateTo({
        url: "/pages/ticket/book/book"
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
.koa-ticket-detail .uni-list-item__extra {
  max-width: 40%;
}
</style>
