<template>
<div>
  <div class="cash" v-if="Object.keys(user).length>0">
    <div class="cashsn1">{{user.bank_name}}</div>
    <div class="cashsn2">尾号{{bank_id}} 储蓄卡</div>
  </div>
  <div class="cash_top">
    提现金额
  </div>
  <div class="cash_input">
    <span>¥</span>
    <input type="number" :placeholder="'可用余额'+balance+'元'" v-model="moneyNum">
  </div>
<div class="info_btn info_tixian" @click="Submit">提现</div>
 <fix-box/>
</div>
  
</template>

<script>
import { mapGetters } from "vuex";
import { getUserInfo, PutForward } from "@/api";
import fixBox from "@/components/fixBox";
export default {
  data() {
    return {
      user: {},
      bank_id: "",
      balance: 0.0,
      moneyNum: null
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  components: { fixBox },
  methods: {
    Submit() {
      if (!this.moneyNum) {
        this.$toast({
          message: "请输入您的金额"
        });
        return;
      }

      if (parseFloat(this.moneyNum) > parseFloat(this.user.balance)) {
        this.$toast({
          message: "您的余额不足"
        });
        return;
      }

      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认提现"
        })
        .then(() => {
          PutForward({
            openid: this.openid,
            price: this.moneyNum,
            bank_id: this.user.bank_id,
            bank_name: this.bank_name,
            bank_pop: this.user.bank_pop
          }).then(res => {
            this.$toast({
              message: res.info
            });
            if (res.status == 1) {
              this.$router.push("/usercenter");
            }
          });
        });
    },
    getUserData() {
      getUserInfo({
        openid: this.openid
      }).then(res => {
        if (res.status == 1) {
          this.user = res.list;
          this.balance = res.list.balance ? res.list.balance : 0.0;
          this.bank_id = res.list.bank_id.substring(
            res.list.bank_id.length - 4
          );
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
input::-webkit-input-placeholder {
  color: #e6e6e6;
}
</style>

<style lang="less" scoped>
.info_tixian {
  position: inherit;
  margin-top: 0.26rem;
}
.cash {
  margin: 0.2rem 0;
  width: 10rem;

  padding: 0.23rem 0.5rem;
  background-color: #ffffff;
  overflow: hidden;
  .cashsn1 {
    color: #323232;
    font-size: 0.43rem;
    padding-bottom: 0.1rem;
  }
  .cashsn2 {
    color: #999999;
    font-size: 0.32rem;
  }
}
.cash_top {
  height: 0.8rem;
  border-bottom: 0.01rem solid #f2f2f2;
  padding: 0 0.5rem;
  font-size: 0.32rem;
  color: #666666;
  background: #fff;
  line-height: 0.8rem;
}
.cash_input {
  height: 1.88rem;
  line-height: 1.88rem;
  background: #fff;
  padding-left: 0.5rem;
  span {
    font-size: 0.8rem;
    color: #323232;
    padding-right: 0.3rem;
  }
  input {
    font-size: 0.43rem;
    height: 1.6rem;
    line-height: 1.6rem;
  }
  &::-webkit-input-placeholder {
    color: #fff;
  }
}
</style>

