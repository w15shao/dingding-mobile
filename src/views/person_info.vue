<template>
  <div style="background:#f1f5f8;" class="person_info" v-if="Object.keys(userInfo).length>0">
   <van-cell title="昵称" :value="userInfo.nickname" />
   <van-cell title="性别" :value="userInfo.sex=='1'?'男':'女'" />
   <van-cell title="手机号" :value="userInfo.phone" />
   <router-link class="info_btn" to="/person_edit" >编辑</router-link>
   <fix-box/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo", "openid"])
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.info_btn {
  width: 100%;
  height: 1.39rem;
  background-color: #38b5f0;
  color: #fff;
  font-size: 0.43rem;
  line-height: 1.39rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
}
.person_info {
  text-align: left;
  background: #f1f5f8;
  height: 100%;
}
</style>

