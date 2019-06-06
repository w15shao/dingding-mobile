<template>
  <div>
    <van-cell-group>
  <van-field
    v-model="bank_name"
    label="开户银行"
    placeholder="请输入银行名称"  
  />
  <van-field
    v-model ="bank_id"
    label="银行卡号"
    placeholder="请输入银行卡号"  
  />
  <van-field
    v-model="bank_pop"
    label="持卡人姓名"
    placeholder="请输入真实姓名"  
  />
  <van-field
   v-model="phone"
    label="手机号"
    placeholder="请输入手机号码"  
  />
   <van-field
    v-model="code"
    center
    clearable
    label="验证码"
    placeholder="验证码"
  >
    <van-button slot="button" size="small" @click="handleSendCode" v-show="isSend" >发送验证码</van-button>
     <van-button slot="button" size="small"  v-show="!isSend" >{{timeText}}</van-button>
  </van-field>

</van-cell-group>
<div class="info_btn" @click="Submit">提交</div>
  <fix-box/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { isPhoneAvailable, isBankAvailable } from "@/utils";
import { getMobileCode, setUserInfo, SetBank, getUserInfo } from "@/api";
import fixBox from "@/components/fixBox";
export default {
  data() {
    return {
      phone: null,
      bank_id: null,
      bank_name: "",
      bank_pop: "",
      code: null,
      isSend: true,
      timer: null,
      timeText: "",
      expirationTime: "",
      verifycode: null,
      code_phone: null,
      isChangePhone: false,
      user: {}
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  components: { fixBox },
  methods: {
    handleSendCode() {
      if (!isPhoneAvailable(this.phone)) {
        this.$toast({
          message: "手机号码格式不正确"
        });
      } else {
        getMobileCode({ cellphone: this.phone }).then(res => {
          console.info(res);
          this.$toast({
            message: res.datas.info
          });
          if (res.datas.status == 1) {
            this.expirationTime = res.datas.send.expirationTime;
            this.verifycode = res.datas.send.code;
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
    Submit() {
      if (
        this.bank_name == "" ||
        this.bank_id == "" ||
        this.bank_pop == "" ||
        this.code == "" ||
        this.phone == ""
      ) {
        this.$toast({
          message: "请完善所需内容"
        });
        return;
      }

      if (!isBankAvailable(this.bank_id)) {
        this.$toast({
          message: "银行卡号不符合规范"
        });
        return;
      }

      if (this.code != this.verifycode) {
        this.$toast({
          message: "验证码输入错误"
        });
        return;
      }
      SetBank({
        openid: this.openid,
        code: this.code,
        phone: this.phone,
        bank_id: this.bank_id,
        bank_name: this.bank_name,
        bank_pop: this.bank_pop,
        expirationTime: this.expirationTime,
        code_phone: this.phone
      }).then(res => {
        this.$toast({
          message: res.info
        });
        if (res.status == 1) {
          this.$router.push("/balance");
        }
      });
    },
    getUserData() {
      getUserInfo({
        openid: this.openid
      }).then(res => {
        if (res.status == 1) {
          this.user = res.list;
          this.phone = res.list.phone;
        }
      });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>
<style>
body {
  background: #f1f5f8;
}
.van-button--default {
  border: none;
  color: #f74699;
  font-size: 0.37rem;
}
.van-field__button {
  border-left: 0.02rem solid #ccc;
}
</style>

