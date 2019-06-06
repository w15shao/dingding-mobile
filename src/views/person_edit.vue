<template>
<div class="person_edit" >
  <van-cell-group>
  <van-field  
    type="text"
    label="昵称"
    placeholder="请输入昵称"
    :value="userInfo.nickname"
    disabled
   />
   <div class="bar_cell">
     <span class="bar_title">性别</span>
     <span class="bar_select">
       <i :class="{active:sex==1}" @click="changeSex(1)"><em></em>男</i>
       <i :class="{active:sex==2}" @click="changeSex(2)"><em></em>女</i>
     </span>
   </div>

   <van-field  
    type="text"
    label="手机号"
    placeholder="请输入手机号"
    v-model="phone"
   
   
   />
</van-cell-group>
<div class="info_btn" @click="surePhone">确认</div>
<fix-box/>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import { isPhoneAvailable } from "@/utils";
export default {
  data() {
    return {
      sex: 2,
      phone: ""
    };
  },
  computed: {
    ...mapGetters(["openid", "userInfo"])
  },
  methods: {
    changeSex(num) {
      this.sex = parseInt(num);
    },
    surePhone() {
      if (!isPhoneAvailable(this.phone)) {
        this.$toast({
          message: "手机格式不规范"
        });
      } else {
        this.$router.push({
          path: "/verify_phone",
          query: {
            phone: this.phone,
            sex: this.sex
          }
        });
      }
    }
  },
  mounted() {
    this.sex = parseInt(this.userInfo.sex);
    this.phone = this.userInfo.phone;
  }
};
</script>
<style>
body {
  background: #f1f5f8;
}
</style>
<style lang="less">
.person_edit {
  text-align: left;
  .van-field__label {
    max-width: 1.4rem;
  }
  .van-field__control {
    text-align: right;
  }
  .bar_cell .bar_select {
    float: right;
    padding-right: 0.3rem;
  }
}
</style>

