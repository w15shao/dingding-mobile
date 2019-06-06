<template>
  <div class="balance" style="background:#fff;">
    <div class="balance_top">
      <div class="balan_sn1">余额（元）</div>
      <div class="balan_sn2">{{balance}}</div>

    </div>
    
    <div class="bank_card card_none" v-if="user.bank_id==null||user.bank_id==''">
      <div class="bank_top">
        <div class="bank_name">
          <div class="bank_name1">银行卡绑定</div>
          <div class="bank_name2">您还未添加银行卡</div>
        

        </div>
        <div class="bank_add" @click="bind_bank">点击添加</div>
        

      </div>
    </div>
    <div class="bank_card" v-else >
      <div class="bank_top">
        <div class="bank_name">
          <div class="bank_name1">{{user.bank_name}}</div>
          <div class="bank_name2">储蓄卡</div>
        

        </div>
        <div class="bank_btn"  @click="bind_bank">更换</div>
        <div class="bank_code">{{bank_id}}</div>

      </div>
    </div>
    <div class="balance_bk">
      <div class="balan_get">
        <div class="balan_sn3">我的收入</div>
        <div class="balan_sn4">{{user.shouru== null || user.shouru == '' ? '0.00':user.shouru}}</div>
      </div>
      <div class="balan_get">
        <div class="balan_sn3">我的支出</div>
        <div class="balan_sn4">{{user.zhichu== null || user.zhichu == '' ? '0.00':user.zhichu}}</div>
      </div>
    </div>
    <div class="balan_out" @click="goPutForward">提现</div>
    <div class="balan_sn5">历史交易</div>
    <ul class="balan_ul" v-if="list.length>0">
      <li class="balan_li" v-for="item in list" :key="item.id">
          <div class="balan_lf">
            <div class="balan_sn6">{{item.is_type == 1 ? '银行卡提现' :item.is_type == 2 ? '行程支付' :item.is_type==3?'车主接单':item.is_type==4?'乘客投诉':'乘客投诉失败'}}</div>
            <div class="balan_sn7">{{item.addtime}}</div>
          </div>
          <div class="balan_rg">{{item.is_type == 1 ? '-'+item.price :item.is_type == 2 ? '-'+item.price :item.is_type==3?'+'+item.price:item.is_type==4?'-'+item.price:'+'+item.price}}</div>
      </li>
     
    </ul>
    <div v-else class="nodata">暂无记录</div>
  <fix-box/>
  </div>


</template>
<script>
import { mapGetters } from "vuex";
import { MoneyList, getUserInfo } from "@/api";
export default {
  data() {
    return {
      list: [],
      user: {},
      hide_bind_bank: 1,
      bank_id: null,
      balance: 0.0
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    getData() {
      MoneyList({
        openid: this.openid,
        p: 1
      }).then(res => {
        if (res.status == 1 && res.hasOwnProperty("list")) {
          this.list = res.list;
        }
      });
    },
    getUserData() {
      getUserInfo({
        openid: this.openid
      }).then(res => {
        if (res.status == 1) {
          this.user = res.list;
          this.balance =
            (this.user.balance && this.user.balance != "") ||
            this.user.balance != null
              ? this.user.balance
              : 0.0;
          let bankNum = this.user.bank_id;
          this.bank_id =
            bankNum != null
              ? bankNum.substring(0, 4) +
                " **** " +
                " **** " +
                bankNum.substring(bankNum.length - 4)
              : "";
        }
      });
    },
    //
    bind_bank() {
      this.$router.push("/bindbank");
    },
    goPutForward() {
      if (this.user.bank_id != null) {
        this.user.is_look == 2
          ? this.$toast({
              message: "账号已被锁定，无法提现"
            })
          : this.$router.push("/cash_out");
      } else {
        this.$toast({
          message: "请先添加银行卡"
        });
      }
    },
    changeBank() {}
  },
  mounted() {
    this.getData();
    this.getUserData();
  }
};
</script>
<style lang="less" scoped>
.nodata {
  text-align: center;
  color: #ccc;
  font-size: 0.52rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.balance {
  .balance_top {
    width: 10rem;
    height: 4.67rem;
    background-image: linear-gradient(0deg, #729dff 0%, #44b3f9 100%);
    color: #ffffff;
    text-align: center;
  }
  .balan_sn1 {
    font-size: 0.37rem;
    padding-top: 0.89rem;
    margin: 0rem auto 0.3rem;
  }
  .balan_sn2 {
    font-size: 1.07rem;
  }
  .bank_card {
    width: 8.21rem;
    height: 3.47rem;
    background-image: linear-gradient(90deg, #72d9e5 0%, #35acce 100%);
    box-shadow: 0rem 0.09rem 0.28rem 0rem rgba(108, 108, 108, 0.31);
    border-radius: 0.16rem;
    margin: -1.2rem auto 0;
    color: #fff;
    padding: 0.36rem 0.7rem;
    position: relative;
    &.card_none {
      box-shadow: 0rem 0rem 0.57rem 0rem rgba(108, 108, 108, 0.14);
      border-radius: 0.16rem;
      background-color: #ffffff;
      background-image: none;
      color: #333;
      .bank_name1 {
        font-size: 0.48rem;
      }
      .bank_name1 {
        font-size: 0.37rem;
      }
    }
    .bank_add {
      position: absolute;
      width: 2.6rem;
      border-radius: 1.2rem;
      box-shadow: 0rem 0.09rem 0.28rem 0rem rgba(111, 195, 243, 0.31);
      height: 0.9rem;
      top: 1.56rem;
      right: 0.4rem;
      font-size: 0.37rem;
      background: #38b5f0;
      color: #ffffff;
      text-align: center;
      line-height: 0.9rem;
    }
    .bank_top {
    }
    .bank_name {
    }
    .bank_btn {
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      font-size: 0.32rem;
    }
    .bank_name1 {
      font-size: 0.48rem;
      padding-bottom: 0.3rem;
    }
    .bank_name2 {
      font-size: 0.32rem;
    }
  }
  .bank_code {
    font-size: 0.54rem;
    text-align: center;
    margin-top: 0.8rem;
  }
  .balance_bk {
    display: flex;
    width: 8.21rem;
    margin: 0.7rem auto 0;
    .balan_get {
      flex: 1;
      color: #333;
      position: relative;
      padding-left: 0.7rem;
      .balan_sn3 {
        font-size: 0.32rem;
        line-height: 2;
      }
      .balan_sn4 {
        font-size: 0.67rem;
      }
      &:first-child::after {
        position: absolute;

        width: 0.01rem;
        height: 0.81rem;
        background-color: #e6e6e6;
        right: 0;
        top: 0.4rem;
        content: "";
      }
    }
  }
  .balan_out {
    width: 10rem;
    height: 1.33rem;
    background-color: #38b5f0;
    color: #fff;
    font-size: 0.43rem;
    text-align: center;
    line-height: 1.33rem;
    margin-top: 1rem;
  }
  .balan_sn5 {
    width: 100%;
    padding: 0 0.3rem;
    line-height: 0.74rem;
    height: 0.74rem;
    color: #999;
    font-size: 0.32rem;
    background: #f2f2f2;
  }
  .balan_ul {
    .balan_li {
      clear: both;
      height: 1.4rem;
      margin-left: 0.7rem;
      border-bottom: 1px #e6e6e6 solid;
      overflow: hidden;
      .balan_lf {
        color: #333333;
        font-size: 0.37rem;
        padding: 0.18rem 0 0;
        float: left;
        .balan_sn6 {
          padding-bottom: 0.1rem;
        }
        .balan_sn7 {
          font-size: 0.32rem;
          color: #cccccc;
        }
      }
      .balan_rg {
        float: right;
        line-height: 1.4rem;
        color: #333333;
        font-size: 0.48rem;
        padding-right: 0.9rem;
      }
    }
  }
}
</style>

