<template>
  <div class="confirm_order">
     <div class="pend_bk">
      <div class="pend_top">
        <div class="pend_tup"><img :src="order.hearpic==null? faceImg:order.hearpic" alt=""></div>
        <div class="pend_info">
          <div class="pend_name">{{order.name}}
            <span class="pend_score">{{order.callphone}}</span>         
          </div>
          <div class="pend_txt1">{{order.carnums}}  {{order.car_color}}  车牌号:{{order.car_id}}</div>
        </div> 
      </div>
      <div class="pend_main">
        <div class="pendlf">
          <div class="pend1"><img src="../assets/shijian.png" alt="">{{myorder.dates}} {{myorder.times}}</div>
          <div class="pend2">{{myorder.origin_name}}</div>
          <div class="pend3">{{myorder.end_name}}</div>
          <div class="pend4">备注：{{myorder.remk==''?'无':myorder.remk}}</div>        
        </div> 
      </div>
      <van-cell :value="coup!=''?'满'+coup.condition+'减'+coup.money:''" is-link class="confirm_icon" @click ="checkhy">
        <template slot="title">
          <span class="custom-text">平台优惠劵</span>
          
        </template>
      </van-cell>
      <div class="order_price">
        <span class="order_sn1">订单 ¥{{myorder.user_price}}</span>
        <span class="order_sn1">优惠 ¥
          {{coup!=''?coup.money:'0'}}
          </span>
        <span class="order_sn2">待支付¥{{myorder.tot}}</span>
      </div>
    </div>
    <div class="info_btn2">
      <div class="info_num">待支付 ¥{{myorder.tot}}</div>
      <div class="info_go" @click="requestPayment">去支付</div>
    </div>
    <fix-box/>
  </div>
  
</template>
<script>
import { mapGetters } from "vuex";
import { orderFind, PayJoinFee } from "@/api";
import { WebchatInit } from "@/utils/commonApi";
import faceImg from "../assets/touxiang1.png";
export default {
  data() {
    return {
      coup: "",
      id: null,
      myid: null,
      coup_id: null,
      order: {},
      myorder: {},
      faceImg,
      type: 2
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    getData() {
      orderFind({
        myid: this.myid,
        id: this.id,
        coup_id: this.coup_id,
        openid: this.openid
      }).then(res => {
        let data = res.list;
        this.myorder = data.myorder;
        this.order = data.order;
        this.coup = data.coup;
      });
    },
    requestPayment() {
      PayJoinFee({
        id: this.id,
        myid: this.myid,
        openid: this.openid,
        coup_id: this.coup_id
      }).then(res => {
        var that = this;
        var poas = res;

        wx.chooseWXPay({
          appId: poas.appId,
          timestamp: poas.timeStamp,
          nonceStr: poas.nonceStr,
          package: poas.package,
          signType: poas.signType,
          paySign: poas.paySign,
          success: function(res) {
            if (res.errMsg == "chooseWXPay:ok") {
              that.$toast({
                message: "支付成功"
              });

              that.$router.push({
                path: "/order_detail",
                query: {
                  myid: that.myid,
                  id: that.id,
                  type: that.type
                }
              });
            }
          },
          cancel: function(err) {
            that.$toast({
              message: "支付失败"
            });
            // that.$router.push({
            //   path: "/pay/wxPayFail",
            //   query: {
            //     courseId: that.content.id,
            //     orderNo: that.orderId
            //   }
            // });
          }
        });

        wx.error(function(res) {
          console.log(res);
          alert("wx.error");
        });
      });
    },
    checkhy() {
      this.$router.push({
        path: "/coupon",
        query: {
          myid: this.myid,
          id: this.id
        }
      });
    }
  },
  mounted() {
    let Obj = this.$route.query;
    console.info(Obj);
    this.id = Obj.id;
    this.myid = Obj.myid;
    this.coup = Obj.coup || "";
    this.coup_id = Obj.coup_id || "";
    this.type = Obj.type;
    this.getData();
    // WebchatInit(this);
  }
};
</script>
<style>
body {
  background: #f2f2f2;
}
</style>
<style lang="less" scoped>
.confirm_order {
  .pend_bk {
    margin: 0rem;
  }
  .pend_bk .pend_top .pend_tup img {
    width: 1.17rem;
    height: 1.17rem;
  }
  .pend_bk .pend_top .pend_info {
    font-size: 0.37rem;
  }
  .van-cell__value {
    color: #ff8523;
  }
  .confirm_icon {
    background: url(../assets/ptyouhuiquan.png) no-repeat #fff;
    padding-left: 1.2rem;
    background-size: 0.5rem auto;
    background-position: 4% center;
  }
  .order_price {
    height: 1.3rem;
    text-align: right;
    line-height: 1.3rem;
    padding-right: 0.4rem;
    .order_sn1 {
      color: #999999;
      font-size: 0.32rem;
      padding-right: 0.3rem;
    }
    .order_sn2 {
      color: #333333;
      font-size: 0.43rem;
    }
  }
}
</style>


