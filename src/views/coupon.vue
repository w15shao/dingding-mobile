<template>
  <div>
    <div class="coupon_bar">
      <div class="coupon_tab" :class="{'active':isActive}" @click="isActive=!isActive" >
        可用优惠劵
      </div>
      <div class="coupon_tab" :class="{'active':!isActive}" @click="isActive=!isActive" >
        过期优惠劵
      </div>
       
    </div> 

    <div class="coupon_cnt">
      <div v-show="isActive" >
        
      <ul class="coupon_ul" v-if="listOne.length>0" >
         <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :offset="10"
                > -->

        <li class="coupon_li" v-for="(item,index) in listOne" :key="index" @click="checkyh(item)">
         <img :src="validImg" alt=""> 
         <div class="coupon_info">
           <div class="coupon_top">
              <div class="coupon_bt">{{item.title}}</div>
              <div class="coupon_num">¥<i>{{item.money}}</i></div>
              <div class="coupon_rg">
                <div class="coupon1">满{{item.condition}}减{{item.money}}</div>
                <div class="coupon2">顺风车</div>
                <div class="coupon3">优惠劵</div>
              </div>
           </div>
           <div class="coupon_btm">
             <span class="coupon_sn1">
               使用期限：{{item.starttime}}  -  {{item.sendtime}}
             </span>
             <span class="coupon_sn2">
               {{item.is_status==2?"已使用":"未使用"}}           
             </span>
           </div>
         </div>
        </li>
        <!-- </van-list>
            </van-pull-refresh> -->
        
      </ul>
      <div v-else class="noData"> 暂无可用优惠劵</div>
      </div>
  <!-- 过期优惠劵 -->
      <div v-show="!isActive">
       <ul class="coupon_ul"  v-if="listTwo.length>0" >
        <li class="coupon_li" v-for="(item,index) in listTwo" :key="index">
         <img :src="overdueImg" alt=""> 
         <div class="coupon_info">
           <div class="coupon_top">
              <div class="coupon_bt">{{item.title}}</div>
              <div class="coupon_num">¥<i>{{item.money}}</i></div>
              <div class="coupon_rg over_duce">
                <div class="coupon1">满{{item.condition}}减{{item.money}}</div>
                <div class="coupon2">顺风车</div>
                <div class="coupon3">优惠劵</div>
              </div>

              <div class="coupon_over">
                <img src="../assets/guoqi_logo.png" alt="">
              </div>
           </div>
           <div class="coupon_btm">
             <span class="coupon_sn1">
               使用期限：{{item.starttime}}  -  {{item.sendtime}}
             </span>
             <span class="coupon_sn2">
               已过期
             </span>
           </div>
         </div>
        </li>
      </ul>
       <div v-else class="noData"> 暂无可用优惠劵</div>
      </div>
    </div>


<fix-box/>
  </div>

  
</template>
<script>
import overdueImg from "@/assets/yhq.png";
import validImg from "@/assets/yhqtu1.png";
import { CouponList } from "@/api";
import { mapGetters } from "vuex";
import { constants } from "fs";
export default {
  data() {
    return {
      overdueImg,
      validImg,
      isActive: true,
      listOne: [],
      pageOne: 1,
      pageTwo: 1,
      listTwo: [],
      myid: "",
      id: "",
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false //控制下拉刷新的加载动画
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    changeActive() {},
    getData(type, p) {
      CouponList({
        openid: this.openid,
        type: type,
        p: p,
        myid: this.myid
      }).then(res => {
        if (res.status == 1) {
          type == 1 ? (this.listOne = res.list) : (this.listTwo = res.list);
          this.loading = false;
        }
      });
    },
    checkyh(item) {
      if (this.myid == "") {
        return;
      }
      if (item.is_status == 1) {
        this.$router.push({
          path: "/confirm_order",
          query: {
            coup_id: item.sid,
            coup: item,
            myid: this.myid,
            id: this.id
          }
        });
      } else {
        this.$toast({
          message: "该优惠劵已被使用"
        });
      }
    },
    onRefresh() {
      //下拉刷新
      alert(2333);
      setTimeout(() => {
        let type, page;
        if (this.isActive) {
          type = 1;
          page = this.pageOne++;
        } else {
          type = 2;
          page = this.pageTwo++;
        }
        this.getData(type, page);
        this.loading = false;
        this.isLoading = false;
      }, 500);
    }
  },
  mounted() {
    let Obj = this.$route.query;
    (this.myid = Obj.myid || ""), (this.id = Obj.id || "");
    this.getData(1, this.pageOne);
    this.getData(2, this.pageTwo);
  }
};
</script>
<style>
body {
  background: #f1f5f8;
}
</style>

<style lang="less" scoped>
.noData {
  display: flex;
  height: 4rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 0.4rem;
  color: #666;
}
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
    border-right: 0.03rem solid #f2f2f2;

    &.active {
      color: #ffad42;

      &::before {
        width: 1.8rem;
        height: 0.03rem;
        background-color: #ffb355;
        position: absolute;
        left: 50%;
        content: "";
        top: 0.7rem;
        margin-left: -0.9rem;
      }
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
</style>

