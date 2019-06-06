<template>
  <div>
     <div>
        <div id="mapCnt"></div>
     </div>
     <fix-box/>
   <div class="order_detail">
    <div class="pend_bk " v-if="Object.keys(order).length>0">
      <div class="pend_top">
        <div class="pend_tup"><img :src="order.hearpic" alt=""></div>
        <div class="pend_info">
          <div class="pend_name">{{order.name}}
            <span class="pend_score">{{order.carxj}}分</span>         
          </div>
          <div class="pend_txt1">{{order.carnums}}&nbsp;{{order.car_color}}</div>
          <div class="pend_txt1">车牌号：{{order.car_id}}</div>
          

        </div>
        <div class="pend_toptip" v-if="order.is_status<1">
        <img :src="callNo" alt="">
        </div>
         <div class="pend_toptip" v-else>
         <a :href="'tel:' + user_phone"><img :src="callImg" alt=""></a>
        </div>

        
      </div>

      <div class="pend_main">
        <div class="pendlf">
          <div class="pend1"><img src="../assets/shijian.png" alt="">{{order.dates}}&nbsp;&nbsp;{{order.times}}
           <span v-if="type==2">空座：{{order.car_num}} 座</span>
          </div>
          <div class="pend2">{{order.origin_name}}</div>
          <div class="pend3">{{order.end_name}}</div>
          <div class="pend4" v-if="type==1">备注：{{order.remk}}</div>
          
        </div>
        <div class="pendrg"><div class="pendsn2">{{order.ppd}}%的顺路程度</div></div>
      </div>
      <div class="pend_three">
         <div class="pend_threesub" @click="mapGo">导航</div>
        <div class="pend_threesub" @click="Share">分享信息</div>
       
         <div class="pend_threesub" @click="Chat">在线联系</div>
        <div class="pend_threesub" @click="delOrder">取消信息</div>
        
      </div>
      <div class="pendbar" >
        <div class="pendsnlf">{{myorder.statusname==null?'等待他人确认':myorder.statusname}}</div>
          <!-- 邀请状态为0 -->
        <div v-if="order.yq_order==0">
            <div class="pendbtn2" v-if="order.is_status==0">
              <span >
                <i v-if="type==2" @click="showModal">申请查看</i>
                <i v-if="type==1" @click="checksorder">申请查看</i>

              </span>
            </div>
            <div class="pendbtn1" v-if="order.is_status==1" @click="checksorder">
              <span>
                <i v-if="type==2">取消申请</i>
                <i v-if="type==1">取消申请</i>

              </span>
            </div>

        </div>
        <!-- 邀请状态为1 -->
        <div v-if="order.yq_order==1&&order.is_status==1">
             <div class="pendbtn2" @click="checksorder">取消</div>
             <div class="pendbtn3" @click="agreeorder">同意</div> 

        </div>
        
        <!-- 双方同意，司机去往起点 -->
        <div v-if="myorder.is_status==2&&type==1">
             <div class="pendbtn2" @click="ordersub">确认到达</div>
        </div>
        <!-- 到达起点 -->
         <div class="pendbtn2" v-if="myorder.is_status==3&&myorder.is_type==1" @click="ordersub">点击付款</div>

          <div class="pendbtn2" v-if="myorder.is_status==4&&myorder.is_type==2" @click="ordersub">完成</div>
        <!-- 已到达终点 -->
        <div class="pendbtn2" v-if="myorder.is_status==5&&myorder.is_type==1" @click="ordersub">确认完成</div>
        <div class="pendbtn2" v-if="myorder.is_status==6&&myorder.is_type==1" @click="ordersub">去评价</div>
        <div class="pendbtn2" v-if="myorder.is_status==6&&myorder.is_type==2" @click="ordersub">去评价</div>
      
      </div>

    </div>
    </div>

    <!-- 分享弹窗 -->
    <div class="mode" v-show="showShare" @click="showShare=false">
      <div class="mode_cnt">
        <img src="../assets/share.png" alt="">
      </div>
    </div>



    <!-- 资料显示 -->
    <van-actionsheet v-model="showFlag" title="请确认您的信息">
      <div class="pend_bk pend_bk2">
        <div class="pend_main">
          <div class="pendlf">
            <div class="pend1"><img src="../assets/shijian.png" alt="">{{myorder.dates}} &nbsp;&nbsp;{{myorder.times}}</div>
            <div class="pend2">{{myorder.origin_name }}</div>
            <div class="pend3">{{myorder.end_name }}</div>
            <div class="pend4">备注：{{myorder.remk||"无"}}</div>
            
          </div>
          <div class="pendrg"><i>{{myorder.user_price}}</i>元</div>
          
        </div>
          <div class="pend_apply" @click="applyLook">确认申请</div> 
      </div>
    </van-actionsheet>

   <!-- 导航去乘客起点终点 -->
   <van-popup v-model="show" position="bottom" >
   <van-picker :columns="columns" @cancel="onCancel"
  @confirm="onConfirm"  show-toolbar
  title="导航"/>
   </van-popup>

  </div>



</template>
<script>
import { mapGetters } from "vuex";
import { orderFind, ApiOrderDel, AddOrder, OrderStatus } from "@/api";
import { checkLook, initWebsocket } from "@/utils/commonApi";
import callImg from "../assets/call.png";
import callNo from "../assets/call_no.png";
import fixBox from "@/components/fixBox";
export default {
  data() {
    return {
      type: 1,
      orderid: 0,
      myid: 0,
      id: 0,
      order: {},
      myorder: {},
      user_phone: 0,
      cartype: 1,
      showFlag: false,
      show: false,
      callImg,
      callNo,
      columns: ["去乘客起点", "去乘客终点"],
      num: 0,
      showShare: false
    };
  },
  components: { fixBox },
  computed: {
    ...mapGetters([
      "openid",
      "positionlat",
      "positionlng",
      "userInfo",
      "orderDetailData"
    ])
  },
  watch: {
    orderDetailData: function(res, oldVal) {
      console.info(res);
      if (res.status == 1) {
        let data = res.list;
        this.order = data.order;
        this.myorder = data.myorder;
        let list = this.order;
        if (data.order.is_status > 1) {
          list = this.myorder;
          if (this.type == 1) {
            list = this.order;
          }
        }
        if (this.order.is_status == 8) {
          this.$toast({
            message: "该用户订单过期或被取消"
          });
          this.$router.push("/");
          return;
        }

        if (this.order.is_status < 1) {
          if (this.myorder.is_status != 0) {
            this.$router.push({
              path: "/order_trip",
              query: {
                orderid: this.myid,
                type: this.type
              }
            });
          }
        }
        if (this.order.is_status == 6) {
          this.$router.push({
            path: "/evaluate",
            query: {
              myid: this.myid,
              id: this.id,
              type: this.type
            }
          });
        }

        // if (res.list.order.id == oldVal.list.order.id && this.num == 1) {
        //   return;
        // }
        console.info("进入地图");
        this.showMap(
          list.origin_lat,
          list.origin_log,
          list.end_lat,
          list.end_log
        );
      }
    }
  },
  methods: {
    getData() {
      this.$store.dispatch("getOrderDetailAction", {
        params: {
          myid: this.myid,
          id: this.id,
          type: this.type,
          openid: this.openid
        }
      });
    },
    showMap(startlat, startlog, endlat, endlog) {
      // console.info(startlat, startlog, endlat, endlog);
      var that = this;
      var map = new AMap.Map("mapCnt", {
        resizeEnable: true
      });
      AMap.service(["AMap.Driving", "AMap.DrivingRender"], function() {
        var driving = new AMap.Driving({
          map: map
        });
        // 根据起终点经纬度规划驾车导航路线
        driving.search(
          new AMap.LngLat(startlog, startlat),
          new AMap.LngLat(endlog, endlat),
          function(status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === "complete") {
              console.info("绘制驾车路线完成");
              that.num = 1;
            } else {
              console.info("获取驾车数据失败：" + result);
            }
          }
        );
      });
    },
    //显示遮罩
    showModal() {
      this.showFlag = true;
    },
    //同意订单 yq_order 1,is_status 1
    agreeorder() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "您确认同意吗？"
        })
        .then(() => {
          AddOrder({
            myid: this.myid,
            id: this.id
          }).then(res => {
            this.$toast({
              message: res.info
            });
            if (res.status == 1) {
              this.getData();
            }
          });
        });
    },

    applyLook() {
      let Obj = this.order;
      checkLook({
        params: {
          item: Obj,
          vm: this
        },
        cb: res => {
          if (res.status == 1) {
            this.getData();
            this.showFlag = false;
          }
        }
      });
    },
    //申请查看（type:1.status=0）、取消申请(type1/2,status=1)
    checksorder() {
      let Obj = this.order;
      checkLook({
        params: {
          item: Obj,
          vm: this
        },
        cb: res => {
          if (res.status == 1) {
            if (Obj.is_status == 1) {
              this.handleGoList();
            } else {
              this.getData();
            }
          }
        }
      });
    },
    //确认到达，（支付）
    ordersub() {
      let status = this.order.is_status;
      if (status == 6 || status == 7) {
        this.$router.push({
          path: "/evaluate",
          query: {
            myid: this.myid,
            id: this.id,
            type: this.type
          }
        });
        return;
      }
      //确认到达，等待支付
      if (status == 3) {
        this.$router.push({
          path: "/confirm_order",
          query: {
            id: this.id,
            myid: this.myid,
            type: this.type
          }
        });
        return;
      }
      OrderStatus({
        id: this.id,
        isstatus: status,
        myid: this.myid,
        orderid: this.order.order_id,
        type: this.type
      }).then(res => {
        if (res.status == 1) {
          console.info(status);
          this.getData();
        } else {
          this.$toast({
            message: res.info
          });
        }
      });
    },
    //建立连接
    getWebsocket() {
      initWebsocket({
        query: {
          vm: this
        }
      });
    },
    //取消信息
    delOrder() {
      console.info(this.order.is_status);
      if (this.order.is_status < 4) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定取消此信息吗？"
          })
          .then(() => {
            ApiOrderDel({
              id: this.id,
              myid: this.myid,
              type: this.type
            }).then(res => {
              this.$toast({
                message: res.info
              });
              if (res.status == 1) {
                this.$router.push("/");
              }
            });
          });
      } else if (this.order.is_status > 4) {
        this.$toast({
          message: "本订单进程已不能取消"
        });
      }
    },
    // 分享
    Share() {
      this.showShare = !this.showShare;
    },
    //导航
    mapGo() {
      this.show = !this.show;
    },

    onConfirm(value, index) {
      this.show = !this.show;
      let Obj = this.type == 2 ? this.myorder : this.order;
      let latitude, longitude, name;
      if (index == 1) {
        latitude = Obj.end_lat;
        longitude = Obj.end_log;
        name = Obj.end_name;
      } else {
        latitude = Obj.origin_lat;
        longitude = Obj.origin_log;
        name = Obj.origin_name;
      }
      wx.openLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name: name,
        scale: 28
      });
    },
    onCancel() {
      this.show = !this.show;
    },
    handleGoList() {
      this.$router.push({
        path: "/order_trip",
        query: {
          orderid: this.myid,
          type: this.type
        }
      });
    },
    Chat() {
      this.$router.push({
        path: "/chat",
        query: {
          id: this.order.uid
        }
      });
    }
  },
  mounted() {
    let Obj = this.$route.query;
    this.type = Obj.type;
    this.orderid = Obj.myid;
    this.myid = Obj.myid;
    this.id = Obj.id;
    this.cartype = Obj.cartype;
    // this.showMap();
    this.getData();
    if (!window.webSocket) {
      this.getWebsocket();
    }
  }
  // destroyed: function() {
  //   window.webSocket.close();
  // }
};
</script>
<style scoped lang="less">
.mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  .mode_cnt {
    img {
      margin: 0.3rem 0.3rem 0 0;
      width: 80%;
      float: right;
    }
  }
}

.pend_bk2 {
  padding-top: 0;
  box-shadow: 0 0 0;
}
.pend_bk2 .pend2,
.pend_bk2 .pendlf .pend3,
.pend_bk2 .pendlf .pend4 {
  line-height: 2.5;
}
.pend_bk.pend_bk2 .pend_main {
  margin-bottom: 0.24rem;
  border-bottom-color: #f1f1f1;
}
.order_detail {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 99;
  .pend_bk {
    margin: 0;
  }
  .pend_bk .pend_top,
  .pend_bk .pend_main {
    border-color: #f1f1f1;
  }
  .pend_bk .pendbar {
    border: 0;
  }
}
#mapCnt {
  width: 100%;
  height: 12rem;
  z-index: 11;
}
.pendsn2 {
  color: #ff8523;
  font-size: 0.37rem;
  padding-top: 0.1rem;
}
.pend_score {
  width: 1rem;
  height: 0.5rem;
  border: solid 0.02rem #ff8523;
  font-size: 0.32rem;
  color: #ff8523;
  line-height: 0.5rem;
  text-align: center;
  display: inline-block;
  margin-left: 0.2rem;
  border-radius: 0.4rem;
  border-radius: 10%;
}
.pend_three {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* border-top: 0.02rem solid #f1f1f1; */
  border-bottom: 0.02rem solid #f1f1f1;
  height: 0.8rem;
  line-height: 0.8rem;
  overflow: hidden;
  margin: 0 0.4rem;
  .pend_threesub {
    flex: 1;
    text-align: center;
    color: #777;
    font-size: 0.3rem;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      right: 0;
      top: 0.2rem;
      bottom: 0.2rem;
      /* height: 100%; */
      width: 0.026rem;
      background: #f1f1f1;
    }
    &:last-child::before {
      background: #fff;
    }
  }
}
.pend_apply {
  background: #77ccf6;
  text-align: center;
  color: #fff;
  height: 1.2rem;
  line-height: 1.2rem;
  margin: 0 0.3rem;
}
</style>

