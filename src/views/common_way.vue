<template>
  <div >
    <div  v-if="list.length>0">
   <div class="oneway" v-for="item in list" :key="item.id" >
     <div class="oneclose" @click="delRoute(item.id)">
       <van-icon name="cross" />
     </div>
      <div class="waysn1">
        <img src="../assets/luxian2.png" alt="">
        <span style="flex:1;">{{item.start_time}}</span> &nbsp;&nbsp;
         <span>空位数：{{item.seats_num}}</span>
      </div>
      <div class="waysn2"><img src="../assets/qidian.png" alt="">
       <span> 起点：{{item.startaddress}}</span></div>
      <div class="waysn3"><img src="../assets/zhongdian.png" alt="">
     <span> 目的地：{{item.endaddress}}</span></div>
      <div class="oneuse" @click="Submit(item)" v-if="item.is_issue==1">
        发布
      </div>
      <div v-else class="onuse">发布中...</div>
   </div>
   </div>


<fix-box/>
<router-link class="info_btn" tag="div" to="/routeadd" >新增常用路线</router-link>
  </div>
</template>

<script>
import { routeList, routeDel, addOrder } from "@/api";
import { mapGetters } from "vuex";
import { format, formatTime } from "@/utils";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      list: [],
      isSubmit: true
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    getData() {
      routeList({
        openid: this.openid
      }).then(res => {
        if (res.status == 1) {
          if (res.list != undefined) {
            this.list = res.list;
          } else {
            this.list = [];
          }
        }
      });
    },
    delRoute(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除这条常用路线吗？"
        })
        .then(() => {
          routeDel({
            openid: this.openid,
            id: id
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
    Submit(item) {
      let time = formatTime(new Date(), 2);
      time = time + " " + item.start_time;
      let nowTime = new Date();
      let curTime = new Date().getTime();
      let starttime = new Date(Date.parse(time.replace(/-/g, "/"))).getTime();

      if (curTime >= starttime) {
        this.isSubmit = false;
        this.$dialog
          .confirm({
            title: "提示",
            message: "该出发时间已早于现在时间，是否发布为明天的行程"
          })
          .then(() => {
            nowTime = nowTime.setDate(nowTime.getDate() + 1);
            nowTime = formatTime(nowTime, 2);
            nowTime = nowTime + " " + item.start_time;

            this.Addorder(item, nowTime);
          })
          .catch(() => {});
      } else {
        this.Addorder(item, starttime);
      }
    },
    Addorder(item, starttime) {
      addOrder({
        currentTab: 2,
        number: item.seats_num,
        times: starttime,
        startaddress: item.startaddress,
        startLat: item.startlat,
        startLong: item.startlong,
        endaddress: item.endaddress,
        endLat: item.endlat,
        endLong: item.endlong,
        km: item.km,
        openid: item.openid,
        uid: item.uid,
        carprice: item.car_price,
        userprice: item.user_price,
        route_id: item.id,
        is_sue: 1
      }).then(res => {
        this.$toast({
          message: res.info
        });
        if (res.status == 1) {
          let handleGo = () => {
            this.$router.push({
              path: "/order_trip",
              query: {
                orderid: res.list,
                type: 1,
                cartype: 2,
                startlat: item.startlat,
                startlng: item.startlong,
                startname: item.startaddress
              }
            });
          };
          setTimeout(handleGo, 3000);
        }
      });
    },
    handleGo(res, item) {
      console.info(233);
      // this.$router.push({
      //   path: "/order_trip",
      //   query: {
      //     orderid: res.list,
      //     type: 1,
      //     cartype: 2,
      //     startlat: item.startlat,
      //     startlng: item.startlong,
      //     startname: item.startaddress
      //   }
      // });
    }
  },

  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.oneway {
  background-color: #57afcd;
  box-shadow: 0rem 0.12rem 0.28rem 0rem rgba(131, 131, 131, 0.28);
  border-radius: 0.16rem;
  margin: 0.4rem;
  color: #fff;
  text-align: left;
  position: relative;
  padding: 0.5rem;
  .oneclose {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
  }
  .waysn1,
  .waysn2,
  .waysn3 {
    justify-content: center;
    align-items: center;
    line-height: 2;
    font-size: 0.37rem;
    padding-bottom: 0.3rem;
    display: flex;
    img {
      width: 0.4rem;
      height: 0.4rem;
      padding-right: 0.3rem;
    }
  }

  .waysn2,
  .waysn1 {
    width: 90%;

    span {
      flex: 1;
    }
  }
  .waysn3 {
    font-size: 0.37rem;
    padding-bottom: 0.3rem;
    width: 70%;
    line-height: 2;
    display: flex;
    span {
      flex: 1;
    }
  }
  img {
    width: 0.36rem;
    padding-right: 0.3rem;
  }
  .oneuse,
  .onuse {
    width: 2.16rem;
    height: 0.83rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    position: absolute;
    text-align: center;
    right: 0.4rem;
    bottom: 0.4rem;
    color: #57afcd;
    line-height: 0.83rem;
  }
  .onuse {
    background: none;
    color: #fff;
  }
}
</style>


