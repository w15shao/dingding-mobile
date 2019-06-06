<template>
  <div class="verify_phone">
    <div class="ve_input">
      <img src="../assets/shouji.png" alt="">
      <div class="ve_border">
        <input type="text" placeholder="请输入手机号码" v-model="phone">
        <div class="ve_num">
          <span>+86</span>
          <img src="../assets/xiala.png" alt="">
        </div>
      </div>
    </div>
    <div class="ve_input">
      <img src="../assets/yanzheng.png" alt="">
      <div class="ve_border">
        <input type="text" placeholder="验证码" v-model="code" >
        <div class="ve_yzm" @click="handleSendCode" v-show="isSend">
          获取验证码
        </div>
        <div class="ve_yzm" v-show="!isSend">
         {{timeText}}
        </div>
      </div>
    </div>
    <div class="yzbtn active" @click="setUserinfo" >立即绑定</div>
    <fix-box/>
  </div>


</template>
<script>
import { mapGetters } from "vuex";
import { isPhoneAvailable } from "@/utils";
import { getMobileCode, setUserInfo } from "@/api";

export default {
  data() {
    return {
      phone: null,
      code: "",
      isSend: true,
      timer: null,
      timeText: "",
      sex: 1,
      expirationTime: ""
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo", "openid"])
  },
  methods: {
    handleSendCode() {
      if (!isPhoneAvailable(this.phone)) {
        this.$toast({
          message: "手机号码格式不正确"
        });
      } else if (this.phone == this.userInfo.phone) {
        this.$toast({
          message: "手机号没有变化，无需更改"
        });
      } else {
        getMobileCode({ cellphone: this.phone }).then(res => {
          console.info(res);
          this.$toast({
            message: res.datas.info
          });
          if (res.datas.status == 1) {
            this.expirationTime = res.datas.send.expirationTime;
            this.isSend = false;
            let time = 120;
            this.timer = setInterval(() => {
              time--;
              this.timeText = `${time}秒后发送`;
              if (time <= 0) {
                clearInterval(this.timer);
                this.isSend = true;
                return;
              }
            }, 1000);
          }
        });
      }
    },
    setUserinfo() {
      this.$toast({
        message: "提交"
      });
      setUserInfo({
        openid: this.openid,
        sex: this.sex,
        nickname: this.userInfo.nickname,
        turename: this.userInfo.turename,
        code: this.code,
        code_phone: this.phone,
        hearpic: this.userInfo.hearpic,
        phone: this.phone,
        expirationTime: this.expirationTime
      }).then(res => {
        this.$toast({
          message: res.info
        });
        if (res.status == 1) {
          this.$router.push("/usercenter");
        }
      });
    }
  },
  mounted() {
    let { phone, sex } = this.$route.query;
    this.phone = phone;
    this.sex = sex;
  }
};
</script>

<style>
body {
  background: #fafafa;
}
</style>
<style lang="less" scoped>
.verify_phone {
  margin-top: 1rem;
  .ve_input {
    margin: 0 1rem;
    display: flex;
    align-items: center;
    height: 1.1rem;
    line-height: 1.1rem;
    margin-top: 0.3rem;

    img {
      width: auto;
      height: 0.56rem;
    }
    .ve_border {
      border-bottom: 0.03rem solid #e6e6e6;

      flex: 1;
      margin-left: 0.4rem;
      input {
        height: 1.1rem;
        line-height: 1.1rem;
        float: left;
        background: none;
      }
    }
    .ve_num {
      color: #333333;
      font-size: 0.37rem;
      width: 1.4rem;
      position: relative;
      float: right;
      padding-left: 0.3rem;
      &::before {
        position: absolute;
        left: 0;
        top: 0.4rem;
        content: "";
        width: 0.02rem;
        height: 0.32rem;
        background-color: #cccccc;
      }
      img {
        height: 0.16rem;
        margin-left: 0.3rem;
      }
    }
  }
  .ve_yzm {
    color: #f74699;
    font-size: 0.37rem;
    float: right;
  }
  .yzbtn {
    width: 7.96rem;
    height: 1.39rem;
    background-color: #e6e6e6;
    border-radius: 0.16rem;
    font-size: 0.43rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.39rem;
    margin: 0.55rem auto 0;
    &.active {
      background-color: #38b5f0;
    }
  }
}
</style>




