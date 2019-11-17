<template>
  <view class="uni-panel">
    <view class="uni-list">
      <radio-group @change="selectLanguage">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="(item, index) in languages"
          :key="index"
        >
          <view class="uni-flex-item">{{item.value}}</view>
          <view>
            <radio :value="item.key" :checked="item.key === selected" />
          </view>
        </label>
      </radio-group>
    </view>
    <view class="goods-carts" :style="'padding-bottom: '+(isIphoneX ? 68 : 0)+'rpx;'">
      <button type="primary" style="border-radius:0;" @tap="confirm">Select</button>
    </view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      languages: [
        {
          key: "en",
          value: "English"
        },
        {
          key: "zh-cn",
          value: "简体中文"
        },
        {
          key: "zh-hk",
          value: "繁體中文"
        }
      ],
      selected: this.$i18n.locale
    };
  },
  onLoad() {
    console.log(this.$i18n.locale);
  },
  methods: {
    selectLanguage(e) {
      const { value } = e.detail;
      this.selected = value;
    },
    confirm() {
      this.$fetch({
        url: this.$store.state.domain + "api/post?actionxm=updateLang",
        method: "post",
        data: {
          lang: this.selected
        },
        showLoading: true
      }).then(res => {
        this.$i18n.locale = this.selected;
        this.$store.commit("setLanguage", this.selected);
        uni.navigateBack({
          delta: 1
        });
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
