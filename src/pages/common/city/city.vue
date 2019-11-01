<template>
  <view>
    <city-select
      @cityClick="cityClick"
      :formatName="formatName"
      :activeCity="activeCity"
      :hotCity="hotCity"
      :obtainCitys="obtainCitys"
      :isSearch="true"
      ref="citys"
    ></city-select>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import citys from "./citys.js";
import citySelect from "@/components/city-select/city-select.vue";
export default {
  data() {
    return {
      //需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
      formatName: "cityName",
      //热门城市
      hotCity: [],
      //显示的城市数据
      obtainCitys: []
    };
  },
  computed:{
    ...mapState({
		activeCity: state => state.activeCity,//当前城市
    }),
  },
  components: {
    citySelect
  },
  onLoad() {
    //修改热门城市
    this.hotCity = [
      {
        cityCode: "110100",
        cityName: "BEIJING"
      },
      {
        cityCode: "130301",
        cityName: "SHENZHEN"
      }
    ];
    //修改构建索引数据
    this.obtainCitys = citys;
  },
  methods: {
    cityClick(item) {
      //修改当前城市
      this.$store.commit("setCity", item);
      uni.navigateBack({
          delta: 1
      })
    }
  }
};
</script>

<style></style>
