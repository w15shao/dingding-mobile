<template>
  
<div style="background:#f0f4f7;">
  <div class="user_top">
    <div v-show="isLogin" v-if="Object.keys(userInfo).length>0">
    <div class="user_set">
      <!-- <img src="../assets/shezhi.png" alt=""> -->
      <!-- <router-link tag="span" to="/set" >设置
      </router-link>   -->
    </div>
    <div class="user_icon"><img :src="userInfo.hearpic" alt=""></div>
    <div class="user_name">{{userInfo.nickname}}<img src="../assets/huiyuan.png" alt=""></div>
    <!-- <div class="user_text"><span class="user_sn1">非会员</span>
      <router-link tag="span" class="user_sn2" to="/member" >开通会员</router-link>  
      </div> -->
   
    </div>
    <div class="btn_login" v-show="!isLogin" @click="Userinfo">
      登录
    </div>
  </div>
 <div class="user_bar">
      <router-link class="user_barbk" tag="div" to="/balance">
        <div class="user_money" >
          <img src="../assets/yu-e.png" alt="">
          <span>{{userInfo.balance}}</span>
        </div>
        <span>我的余额（元）</span>
        <div class="user_line"></div>
      </router-link>
       <router-link class="user_barbk" tag="div" to="/coupon">
        <div class="user_money">
          <img src="../assets/youhuiquan.png" alt="">
          <span>{{userInfo.coupon}}</span>
        </div>
        <span>我的优惠劵（张）</span>
      </router-link>
    </div>
 <div class="index_field2" >
    
      <van-cell title="我的行程" is-link class="index_icon index_icon2" to="/mytrips"/>

      <van-cell :value="(userInfo.status == 0 ? '未审核' : userInfo.status == 1 ? '审核中' : userInfo.carxj == null || userInfo.carxj == '' ? '0.0分':userInfo.carxj+'分')" is-link  class="index_icon index_icon2"  :to="(userInfo.status == 0 ?'/car_info':'/car_infoshow')">
        <template slot="title">
          <span class="custom-text">
          车主认证
            </span>    
        </template>
      </van-cell>
       <van-cell :value="(userInfo.xingji==null || userInfo.xingji =='' ? '未完善':userInfo.xingji+'分')" is-link  class="index_icon index_icon3"  to="/person_info">
        <template slot="title">
          <span class="custom-text">个人信息</span>    
        </template>
      </van-cell>
      <van-cell title="推荐给好友" is-link class="index_icon index_icon4" @click="Share"/>
     <a :href="'tel:' + userInfo.kefu" class="kefu_a"><van-cell title="联系客服" is-link  class="index_icon index_icon5"/></a>
      <van-cell title="服务协议" is-link class="index_icon index_icon6" to="/statement"/>
  </div>
 <!-- 分享弹窗 -->
    <div class="mode" v-show="showShare" @click="showShare=false">
      <div class="mode_cnt">
        <img src="../assets/share.png" alt="">
      </div>
    </div>


<foot-bar/>
</div>

  
</template>

<script>
import { mapGetters } from "vuex";
import footBar from "../components/footBar";
export default {
  data() {
    return {
      userInfo: {},
      showShare: false
    };
  },
  components: { footBar },
  computed: {
    ...mapGetters(["openid", "isLogin"])
  },
  methods: {
    Userinfo() {
      this.$store.dispatch("getUserAction", {
        params: { openid: this.openid }
      });
    },
    getData() {},
    // 分享
    Share() {
      this.showShare = !this.showShare;
    }
  },
  mounted() {
    this.$store.dispatch("getUserAction", {
      params: {
        openid: this.openid
      },
      cb: res => {
        this.userInfo = res.list;
      }
    });
  }
};
</script> 
<style lang="less" scoped>
.kefu_a {
  position: relative;
  display: block;
  overflow: hidden;
  &::after {
    content: " ";
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 0.4rem;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: 0.02667rem solid #ebedf0;
  }
}

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
.user_top {
  background: url(../assets/bg.png) no-repeat;
  width: 100%;
  height: 5.07rem;
  background-size: contain;
  overflow: hidden;
  text-align: center;
  position: relative;
  z-index: 1;
  .btn_login {
    color: #333;
    background: #fff;
    border: 0.02rem solid #38b5f0;
    font-size: 0.38rem;
    width: 2.2rem;
    height: 1rem;
    line-height: 1.1rem;
    text-align: center;
    margin: 1.8rem auto 0;
    border-radius: 6%;
  }
  .user_set {
    position: absolute;
    top: 0.4rem;
    right: 0.3rem;
    color: #fff;
    font-size: 0.29rem;
    img {
      width: 0.4rem;
      height: 0.35rem;
      vertical-align: middle;
      padding-right: 0.1rem;
    }
  }
  .user_icon {
    padding: 0.6rem 0 0;

    margin: 0 auto;
    img {
      width: 1.77rem;
      height: 1.77rem;
      border-radius: 100%;
    }
  }
  .user_name {
    font-size: 0.48rem;
    color: #fff;
    padding: 0.28rem 0 0;
    img {
      width: 0.4rem;

      padding-left: 0.1rem;
    }
  }
  .user_text {
    text-align: center;
    margin-top: 0.15rem;

    .user_sn1 {
      color: #fff;
      font-size: 0.32rem;
    }
    .user_sn2 {
      font-size: 0.32rem;
      padding-left: 10px;
      color: #f88b15;
    }
  }
}
.user_bar {
  height: 2.35rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.04rem 0.24rem 0rem rgba(197, 197, 197, 0.3);
  border-radius: 0.16rem;
  display: flex;
  margin: -0.88rem 0.33rem 0.2rem;
  color: #333;
  position: relative;
  z-index: 2;

  .user_barbk {
    flex: 1;
    position: relative;
    padding: 0.4rem 0;
    text-align: center;
    img {
      width: 0.59rem;
      height: 0.59rem;
    }
    .user_money {
      padding-bottom: 0.2rem;
    }
    .user_money span {
      font-size: 0.67rem;
      padding-left: 0.2rem;
    }
    span {
      font-size: 0.37rem;
      margin-top: 0.35rem;
    }
  }
  .user_line {
    position: absolute;
    width: 0.02rem;
    height: 1.07rem;
    background-color: #f2f2f2;
    top: 0.64rem;
    right: 0;
  }
}

.index_field2 {
  text-align: left;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0rem 0.05rem 0.12rem 0rem rgba(222, 222, 222, 0.42);
  border-radius: 0.11rem;
  margin-bottom: 0.2rem;
}
.index_border {
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  &::after {
    width: 0.03rem;
    height: 1.1rem;
    position: absolute;
    left: 0;
    top: 0.08rem;
    background: #23b4ff;
    content: "";
  }
}
.index_icon {
  background: url(../assets/xingcheng.png) no-repeat #fff;
  padding-left: 1.2rem;
  height: 1.33rem;
  justify-content: center;
  align-items: center;

  background-size: 0.4rem auto;
  background-position: 4% center;
  &.index_icon2 {
    background-image: url(../assets/renzhen.png);
  }
  &.index_icon3 {
    background-image: url(../assets/gerenxinxi.png);
  }
  &.index_icon4 {
    background-image: url(../assets/tuijian.png);
  }
  &.index_icon5 {
    background-image: url(../assets/kefu.png);
  }
  &.index_icon6 {
    background-image: url(../assets/xieyi.png);
  }
}
.van-cell:not(:last-child)::after {
  left: 0;
}
</style>
