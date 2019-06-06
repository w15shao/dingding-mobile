<template>
<div class="foot_bar">


    <van-tabbar v-model="active" >
  <van-tabbar-item to="/" >
    <span>首页</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon1.active : icon1.normal"
    >
  </van-tabbar-item>
  <van-tabbar-item to="/message" :dot="isDot">
    <span>消息</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon2.active : icon2.normal"
    >
  </van-tabbar-item>
  <van-tabbar-item to="/usercenter"  >
    <span>个人中心</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon3.active : icon3.normal"
    >
  </van-tabbar-item>

</van-tabbar>
</div>


</template>
<script>
import icon1 from "../assets/shouye2.png";
import icon1_a from "../assets/shouye1.png";
import icon2 from "../assets/xiaoxi1.png";
import icon2_a from "../assets/xiaoxi3.png";
import icon3 from "../assets/geren1.png";
import icon3_a from "../assets/geren2.png";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 0,
      icon1: {
        normal: icon1,
        active: icon1_a
      },
      icon2: {
        normal: icon2,
        active: icon2_a
      },
      icon3: {
        normal: icon3,
        active: icon3_a
      }
    };
  },
  computed: {
    ...mapGetters(["isDot"])
  },
  methods: {
    change() {
      let path = this.$route.path;
      if (path == "/message") {
        this.active = 1;
      }
      if (path == "/usercenter") {
        this.active = 2;
      }
      if (path == "/") {
        this.active = 0;
      }
    }
  },
  created() {
    this.change();
  }
};
</script>
<style>
.foot_bar {
  box-shadow: 0rem 0rem 0.07rem 0rem rgba(179, 179, 179, 0.4);
  background-color: #ffffff;
}
</style>

