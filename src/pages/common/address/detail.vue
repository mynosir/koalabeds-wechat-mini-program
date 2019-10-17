<template>
  <view class="uni-container">
    <form @submit="formSubmit">
      <view class="uni-panel uni-panel-h">
        <uni-list>
          <uni-list-item :show-arrow="false">
            <view>Name:</view>
            <view>
              <input
                type="text"
                name="name"
                v-model="shipping.name"
                placeholder="Please input Shipping Name"
              />
            </view>
          </uni-list-item>
          <uni-list-item :show-arrow="false">
            <view>Telphone:</view>
            <view>
              <input
                type="tel"
                name="tel"
                v-model="shipping.tel"
                placeholder="Please input Shipping Telphone"
              />
            </view>
          </uni-list-item>
          <uni-list-item :show-arrow="false">
            <view>Address:</view>
            <view>
              <textarea
                v-model="shipping.address"
                name="address"
                :auto-height="true"
                placeholder="Please input Shipping Address"
              />
            </view>
          </uni-list-item>
        </uni-list>
        <view class="panel" style="margin-top:60px">
          <button class="btn-submit" formType="submit" type="primary">Submit</button>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
const graceChecker = require("../../../common/graceChecker.js");
import { mapState, mapMutations } from "vuex";

import uniList from "@/components/uni-list/uni-list.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
export default {
  components: {
    uniList,
    uniListItem,
    uniIcons
  },
  data() {
    return {
      shipping: {
        name: "",
        address: "",
        tel: ""
      }
    };
  },
  onLoad(option) {
    //option为object类型，会序列化上个页面传递的参数
    if (option.id) {
      this.init();
    }
  },
  methods: {
    ...mapMutations(["setSelectedAddress"]),
    init() {
      this.shipping = {
        name: "test",
        address: "addressaddress addressaddress",
        tel: "123123213"
      };
    },
    formSubmit(e) {
      //定义表单规则
      var rule = [
        {
          name: "name",
          checkType: "string",
          checkRule: "1,40",
          errorMsg: "name should be 1 ~ 40"
        },
        {
          name: "tel",
          checkType: "int",
          checkRule: "7,13",
          errorMsg: "tel should be number"
        },
        {
          name: "address",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "address should not be null"
        }
      ];
      //进行表单检查
      var formData = e.detail.value;
      var checkRes = graceChecker.check(formData, rule);
      if (checkRes) {
        uni.showToast({ title: "Sumit Success", icon: "success" });
        this.goList();
      } else {
        uni.showToast({ title: graceChecker.error, icon: "none" });
      }
    },
    goList() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style>
@import "../../../common/uni-nvue.css";
</style>
