<template>
  <div>
    <div class="coupon_bar">
      <div class="coupon_tab" :class="{'active':isActive}" @click="(isActive=!isActive,type=1)" >
        我是发布者
      </div>
      <div class="coupon_tab" :class="{'active':!isActive}" @click="(isActive=!isActive,type=2)" >
        我是车主
      </div>
       
    </div> 

    <div class="coupon_cnt" v-show="isActive" v-if="listOne.length>0">
      <div class="pend_bk"  v-for="item in listOne" :key="item.id" @click="lookOrder(item)" >
            <div class="pend_main">
              <div class="pendlf">
                <div class="pend1"><img src="../assets/shijian.png" alt="">{{item.dates}} {{item.times}}</div>
                <div class="pend2">{{item.origin_name}}</div>
                <div class="pend3">{{item.end_name}}</div>
                <div class="pend5">{{item.remk == '' ? '无备注': item.remk}}</div>
                
              </div>
              <div class="pendrg"  @click="delOrder(item.id)"><img src="../assets/x.png" alt="" class="close"></div>
            </div>
            <div class="pendbar">   
               <div class="pendsnlf">信息状态：{{item.statusname |passengerStatus(item.is_ts)}}</div>     
              <div class="pendbtn1" v-if='(item.is_status == 6 || item.is_status == 7 )&&item.is_ts==0' @click="lookOrder(item)" >{{item.is_status == 6 ? '待评价':'已评价'}}</div>
              <div class="pendsn4"><i>{{item.user_price
}}</i>元</div>
          </div>
          
        </div>
        
    </div>
    <notrips v-else v-show="isActive"/>
     <div class="coupon_cnt" v-show="!isActive"  v-if="listTwo.length>0">
      <div class="pend_bk" v-for="item in listTwo" :key="item.id" @click="lookOrder(item)">
            <div class="pend_main">
              <div class="pendlf">
                <div class="pend1"><img src="../assets/shijian.png" alt="">2018年7月31日 13:09</div>
                <div class="pend2">{{item.origin_name}}</div>
                <div class="pend3">{{item.end_name}}</div>
                <div class="pend5">{{item.remk}}</div>
                
              </div>
              <div class="pendrg"  @click="delOrder(item.id)"><img src="../assets/x.png" alt="" class="close"></div>
            </div>
            <div class="pendbar">   
               <div class="pendsnlf">信息状态：{{item.is_status | carStatus(item.is_ts,item.statusname)}}</div>    <div class="pendbtn1" v-if='(item.is_status == 6 || item.is_status == 7)&&item.is_ts==0 ' @click="lookOrder(item)" >{{item.is_status == 6 ? '待评价':'已评价'}}</div>
              <div class="pendsn4"><i>{{item.user_price
}}</i>元</div>
          </div>
          
        </div>
    </div>
     <notrips v-else v-show="!isActive"/>

<fix-box/>
  </div>

  
</template>
<script>
import overdueImg from "@/assets/yhq.png";
import validImg from "@/assets/yhqtu1.png";
import { format } from "@/utils/index";
import { OrderList, OrderDel } from "@/api";
import { mapGetters } from "vuex";
import notrips from "@/components/notrips";
export default {
  data() {
    return {
      overdueImg,
      validImg,
      isActive: true,
      listOne: [],
      listTwo: [],
      type: 1,
      p: 1
    };
  },
  components: { notrips },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    getList(type) {
      if (type) {
        this.type = type;
      }
      console.info(type);
      OrderList({
        openid: this.openid,
        type: type,
        p: this.p
      }).then(res => {
        if (res.status == 1) {
          if (type == 2) {
            this.listTwo = res.list;
          } else {
            this.listOne = res.list;
          }
        } else {
          if (type == 2) {
            this.listTwo = [];
          } else {
            this.listOne = [];
          }
        }
      });
    },
    //删除订单

    delOrder(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您确定删除当前发布吗"
        })
        .then(() => {
          OrderDel({
            openid: this.openid,
            id: id
          }).then(res => {
            this.$toast({
              message: res.info
            });
            if (res.status == 1) {
              this.getList(1);
              this.getList(2);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //查看订单
    lookOrder(item) {
      if (item.is_status > 7) {
        return;
      }
      if (item.is_status > 1) {
        this.$router.push({
          path: "/order_detail",
          query: {
            type: this.type,
            myid: item.id,
            id: item.check_listid
          }
        });
      }
    }
  },
  mounted() {
    this.getList(1);
    this.getList(2);
  },
  filters: {
    passengerStatus(statusname, is_ts) {
      if (is_ts == 0) {
        return statusname;
      } else if (is_ts == 1) {
        return "投诉中";
      } else if (is_ts == 2) {
        return "已处理，投诉成功";
      } else if (is_ts == 3) {
        return "已处理，投诉失败";
      }
      return;
    },
    carStatus(status, is_ts, statusname) {
      if (is_ts == 0) {
        if (status == 0) {
          return "等待用户申请";
        } else if (status == 1) {
          return "等待用户确认";
        } else if (status == 2) {
          return "前往起点中";
        } else if (status == 3) {
          return "到达起点(等待乘客付款)";
        } else if (status == 4) {
          return "支付完成(正在前往目的地)";
        } else if (status == 5) {
          return "到达目的地(等待乘客确认)";
        } else if (status == 6) {
          return "确认到达";
        } else if (status == 7) {
          return "已评价";
        } else if (status == 8) {
          return "已取消";
        } else {
          return statusname;
        }
      } else if (is_ts == 1) {
        return "投诉中";
      } else if (is_ts == 2) {
        return "已处理，投诉成功";
      } else if (is_ts == 3) {
        return "已处理，投诉失败";
      }
      return;
    }
  }
};
</script>
<style>
body {
  background: #f1f5f8;
}
</style>

<style lang="less" scoped>
.coupon_bar {
  height: 1.33rem;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;

  .coupon_tab {
    text-align: center;
    font-size: 0.37rem;
    color: #333333;
    position: relative;
    flex: 1;
    text-align: center;
    color: #cccccc;
    // border-right: 0.03rem solid #f2f2f2;

    &.active {
      color: #333333;
    }
  }
}
.coupon_ul {
  margin: 0.2rem;
}
.coupon_li {
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  .coupon_info {
    position: absolute;
    width: 100%;

    top: 0.2rem;
  }
  .coupon_top {
    height: 2.3rem;
    color: #fff;
    padding: 0 0.4rem;
    display: flex;
    margin-bottom: 0.7rem;
    position: relative;
    .coupon_over {
      position: absolute;
      left: 50%;
      width: 3.2rem;
      height: 2.36rem;
      top: 0.24rem;
      margin-left: -1.6rem;
      z-index: 2;
    }
  }
  .coupon_bt {
    font-size: 0.4rem;
    float: left;
  }
  .coupon_num {
    font-size: 0.67rem;
    text-align: right;
    flex: 1;
    align-self: flex-end;
    padding-right: 0.8rem;
    i {
      font-size: 1.6rem;
    }
  }
  .coupon_rg {
    float: right;
    .coupon1 {
      font-size: 0.4rem;
      line-height: 2;
    }
    .coupon2 {
      font-size: 0.6rem;
      color: #005697;
      opacity: 0.36;
      font-weight: bold;
    }
    .coupon3 {
      color: #005ba0;
      opacity: 0.79;
      font-size: 0.4rem;
    }

    &.over_duce {
      .coupon2,
      .coupon3 {
        color: #666;
      }
    }
  }
  .coupon_btm {
    padding: 0 0.2rem;
    .coupon_sn1 {
      font-size: 0.4rem;
      color: #999999;
      text-align: left;
      float: left;
    }
    .coupon_sn2 {
      color: #666666;
      font-size: 0.4rem;
      text-align: right;
      float: right;
    }
  }
}

.coupon_cnt .pend_bk {
  padding: 0;
  .pendbar {
    border-bottom: 0;
  }
  .pendrg {
    right: 0rem;
  }
}
</style>


