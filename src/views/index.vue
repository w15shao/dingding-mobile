<template>
  <div class="home">
    <loading />
 <van-swipe :autoplay="3000">
  <van-swipe-item v-for="(item, index) in images" :key="index">
    <img v-lazy="`${$baseUrl}${item.pic}`" />
  </van-swipe-item>
</van-swipe>
<!-- 选项卡 -->
<div class="indextab">
  <ul class="index_ul">
    <li  @click="swichNav(1)" :class="{'active':flag}">乘客</li>
    <li :class="{'active':!flag}" @click="swichNav(2)">车主</li>
  </ul>
  <div class="index_field" >
    <div class="field_input green"  @click="handleGo(1)">
      <!-- <input type="text" placeholder="请稍候，正在定位...." v-model="startname" readonly> -->
      <span class="txt_ad">{{startname||'从哪里出发？'}}</span>
    
    </div>
    <div class="field_input orange"  @click="handleGo(2)">
      <!-- <input type="text" placeholder="你要去哪儿" readonly > -->
       <span>您要去哪儿</span>
    </div>
  </div>
</div>

  <div class="index_field2" v-show="!flag">  
       <!-- 待处理信息(司机身份) -->
    <div class="index_field2 user_order" v-if="Object.keys(carorder).length>0">
     <van-cell title="待处理信息" class="index_icon index_icon4"/>
     <div class="user_flex"  @click="lookorder(item,1)" v-for="item in carorder" :key="item.id">
      <div class="user_lf"><img src="../assets/biao.png" alt=""></div>      <div class="user_rg">
        <div class="user_txt1" >{{item.dates}}&nbsp;&nbsp;{{item.times}}</div>
        <div class="user_txt2">{{item.origin_name|textSlice}}&nbsp;→&nbsp;&nbsp;{{item.end_name|textSlice}}</div>
        <div class="user_txt3">{{item.statusname}}</div>
      </div>
      <div class="user_del" @click.stop="delOrder(item.id)"><img src="../assets/del.png" alt=""></div>
      </div>
    </div>
      <van-cell title="附近信息咨询"  is-link  class="index_icon index_icon2" @click="handleGoTrip()" :value="areaNum.total" />
       <div class="bar_cell" v-if="areaNum.total>0">
          <span class="bar_area" v-if="areaNum.lc" @click="handleGoTrip('lc')" ><i class="bar_i1">鹿城区</i><i class="bar_i1">{{areaNum.lc}}人</i></span>
           <span class="bar_area" v-if="areaNum.oh"  @click="handleGoTrip('oh')"><i class="bar_i1">瓯海区</i><i class="bar_i1">{{areaNum.oh}}人</i></span>
           <span class="bar_area" v-if="areaNum.lw"  @click="handleGoTrip('lw')"><i class="bar_i1">龙湾区</i><i class="bar_i1">{{areaNum.lw}}人</i></span>
           <span class="bar_area" v-if="areaNum.dt"  @click="handleGoTrip('dt')"><i class="bar_i1">洞头区</i><i class="bar_i1">{{areaNum.dt}}人</i></span>
          <span class="bar_area" v-if="areaNum.ra"  @click="handleGoTrip('ra')"><i class="bar_i1">瑞安市</i><i class="bar_i1">{{areaNum.ra}}人</i></span>
          <span class="bar_area" v-if="areaNum.yq"  @click="handleGoTrip('yq')"><i class="bar_i1">乐清市</i><i class="bar_i1">{{areaNum.yq}}人</i></span>
          <span class="bar_area" v-if="areaNum.yj"  @click="handleGoTrip('yj')"><i class="bar_i1">永嘉县</i><i class="bar_i1">{{areaNum.yj}}人</i></span>
          <span class="bar_area" v-if="areaNum.cn"  @click="handleGoTrip('cn')"><i class="bar_i1">苍南县</i><i class="bar_i1">{{areaNum.cn}}人</i></span>
          <span class="bar_area" v-if="areaNum.py"  @click="handleGoTrip('py')"><i class="bar_i1">平阳县</i><i class="bar_i1">{{areaNum.py}}人</i></span>
          <span class="bar_area" v-if="areaNum.wc"  @click="handleGoTrip('wc')"><i class="bar_i1">文成县</i><i class="bar_i1">{{areaNum.wc}}人</i></span>
          <span class="bar_area" v-if="areaNum.ts"  @click="handleGoTrip('ts')"><i class="bar_i1">泰顺县</i><i class="bar_i1">{{areaNum.ts}}人</i></span>
          <span class="bar_area" v-if="areaNum.notWenZhou"  @click="handleGoTrip('notWenZhou')"><i class="bar_i1">非温州</i><i class="bar_i1">{{areaNum.notWenZhou}}人</i></span>
        </div>
        <div class="barline"></div>
      <van-cell title="常见路线管理" is-link class="index_icon" to="/common_way"/>
      <van-cell title="推荐给好友" is-link class="index_icon index_icon3" />
  </div>

  <div v-show="flag">
    <!-- 待处理信息乘客 -->
    <div class="index_field2 user_order" v-if="Object.keys(userorder).length>0">
     <van-cell title="待处理信息" class="index_icon index_icon4"/>
     <div class="user_flex" @click="lookorder(userorder,2)">
      <div class="user_lf"><img src="../assets/biao.png" alt=""></div>      <div class="user_rg">
        <div class="user_txt1">{{userorder.dates}}&nbsp;&nbsp;{{userorder.times}}</div>
        <div class="user_txt2">{{userorder.origin_name|textSlice}}&nbsp;&nbsp;→&nbsp;&nbsp;{{userorder.end_name|textSlice}}</div>
        <div class="user_txt3">{{userorder.statusname}}</div>
      </div>
      <div class="user_del" @click.stop.prevent="delOrder(userorder.id)"><img src="../assets/del.png" alt=""></div>
      </div>
    </div>


  <div class="index_field2">
  <van-cell value="平台服务"  class="index_border"/>
  <div class="index_per">
    <ul class="serviceul">
      <li class="serviceli">
        <a :href="zcphone"><img src="../assets/zhuanche.png" alt="">
        <span>联系专车</span>
        </a>
      </li>
      <li class="serviceli">
         <a :href="hyphone">
        <img src="../assets/yunhuo.png" alt="">
        <span>联系运货</span>
        </a>
      </li>
      <li class="serviceli">
         <a :href="zcphone">
        <img src="../assets/zuche.png" alt="">
        <span>联系租车</span>
        </a>
      </li>
      <li class="serviceli">
         <a :href="djphone">
        <img src="../assets/daijia.png" alt="">
        <span>联系代驾</span>
        </a>
      </li>
      </ul> 
  </div>
  </div>
 
  <div class="index_field2">
      <van-cell title="推荐给好友" is-link class="index_icon index_icon3" />
  </div>
     <div id="container" style="display:none"></div>

</div>
 <!-- 分享弹窗 -->
    <div class="mode" v-show="showShare" @click="showShare=false">
      <div class="mode_cnt">
        <img src="../assets/share.png" alt="">
      </div>
    </div>


<foot-bar :isFlag="isDot"/>
</div>
</template>
<script>
import swiperImg from "@/assets/swiper.png";
import swiperImg1 from "@/assets/swiper.png";
import footBar from "@/components/footBar";
import {
  getSwiper,
  WebchatLogin,
  setUpData,
  orderListData,
  orderDel,
  indexCount
} from "@/api";
// import { MP } from "@/api/map.js";

import { mapGetters } from "vuex";
import { getUserData, initWebsocket } from "@/utils/commonApi";
import loading from "@/components/loading";
import fixBox from "@/components/fixBox";
import { constants } from "fs";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      images: [],
      flag: true,
      startname: "",
      startlat: "",
      startlng: "",
      endaddress: "您要去哪儿？",
      endLat: "",
      endLong: "",
      czphone: "",
      djphone: "",
      hyphone: "",
      zcphone: "",
      userorder: {},
      carorder: {}, //司机信息
      fjcount: 0, //附近信息，司机功能
      areaNum: { total: 0 },
      isDot: true,
      showShare: false
    };
  },
  components: { footBar, loading, fixBox },
  computed: {
    ...mapGetters(["openid", "userInfo", "indexData"])
  },
  watch: {
    indexData: function(data, oldVal) {
      this.userorder = data.userorder != "" ? data.userorder : [];
      this.carorder = data.carorder != "" ? data.carorder : [];
      this.fjcount = data.count;
    }
  },
  methods: {
    swichNav(type) {
      if (this.userInfo.is_look == 2) {
        this.$toast({
          message: "您的账号被锁请联系平台管理员"
        });
        return;
      }
      if (type == 2) {
        if (
          this.userInfo.is_type == "1" ||
          this.userInfo.status != "2" ||
          this.userInfo.is_look == "0"
        ) {
          this.$toast({
            message: "您还不是认证司机"
          });
          return;
        }
      }
      this.flag = !this.flag;
    },
    Share() {
      this.showShare = !this.showShare;
    },

    //轮播图
    SwiperData() {
      getSwiper().then(res => {
        if (res.code == 200) {
          this.images = res.datas;
        }
      });
    },
    //获取设置信息
    getSetData() {
      setUpData().then(res => {
        // console.info(res);
        this.czphone = "tel:" + res.list.czphone;
        this.djphone = "tel:" + res.list.djphone;
        this.hyphone = "tel:" + res.list.hyphone;
        this.zcphone = "tel:" + res.list.zcphone;
      });
    },
    //页面跳转
    handleGo(type) {
      if (type == 2) {
        if (this.startname == "") {
          this.$toast({
            message: "请填写你的出发位置"
          });
        } else {
          this.$router.push({
            path: "/search",
            query: {
              type: type,
              startlat: this.startlat,
              startlng: this.startlng,
              startname: this.startname,
              currentTab: this.flag ? 1 : 2
            }
          });
        }
      } else {
        this.$router.push({
          path: "/search",
          query: {
            type: type,
            currentTab: this.flag ? 1 : 2,
            endlat: "",
            endlng: "",
            endname: ""
          }
        });
      }
    },
    //查看附近订单
    handleGoTrip(obj = "") {
      this.$router.push({
        path: "/order_trip",
        query: {
          cartype: 3,
          type: 1,
          area: obj || ""
        }
      });
    },

    //获取定位信息
    getLoact() {
      let that = this;
      var map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 1
      });
      map.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB"
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
      });
      //解析定位结果
      function onComplete(data) {
        var str = ["定位成功"];
        str.push("经度：" + data.position.getLng());
        str.push("纬度：" + data.position.getLat());
        let lnglatXY = [data.position.getLng(), data.position.getLat()]; //已知点坐标
        regeocoder(lnglatXY);
        if (data.accuracy) {
          str.push("精度：" + data.accuracy + " 米");
        } //如为IP精确定位结果则没有精度信息
        str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
        // console.log(str.join("<br>"));

        if (process.env.NODE_ENV != "production") {
          that.startlat = data.position.getLat();
          that.startlng = data.position.getLng();
          that.$store.commit("getPosition", {
            positionlat: that.startlat,
            positionlng: that.startlng
          });
        }
        that.areaCount();
      }
      //解析定位错误信息
      function onError(data) {
        console.log("定位失败");
      }

      function regeocoder(loc) {
        //逆地理编码
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress(loc, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // console.dir(result);
            geocoder_CallBack(result);
          }
        });
      }
      function geocoder_CallBack(data) {
        var address = data.regeocode.formattedAddress; //返回地址描述
        console.info(address);

        that.startname = address;
        that.$store.commit("getPositionName", {
          positionName: address
        });
      }
    },
    getWxLoact() {
      let that = this;
      wx.getLocation({
        type: "gcj02",
        success: function(res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          let url =
            "https://restapi.amap.com/v3/geocode/regeo?output=json&location=" +
            res.longitude +
            "," +
            res.latitude +
            "&key=5c140d70aca84b65146da5f0ac249810&radius=1000&extensions=all";
          axios
            .get(url, {
              params: {}
            })
            .then(obj => {
              console.info(obj);
              let address = obj.data.regeocode.formatted_address.replace(
                /浙江省温州市/,
                ""
              );
              that.startname = address;
              that.startlat = res.latitude;
              that.startlng = res.longitude;

              that.$store.commit("getPositionName", {
                positionName: address
              });
              that.$store.commit("getPosition", {
                positionlat: that.startlat,
                positionlng: that.startlng
              });
              that.areaCount();
            });

          // alert(latitude);
          // if (typeof (callback) != 'undefined' && typeof (callback) != 'function') {
          //   callback(latitude, longitude);
          // }
        },
        fail: function() {
          alert("sdfsf");
        }
      });
    },

    //订单数据
    orderList() {
      this.$store.dispatch("getIndexAction");
    },

    //附近数量
    areaCount() {
      indexCount({
        type: 1,
        openid: this.openid,
        startLong: this.startlng,
        startLat: this.startlat
      }).then(res => {
        if (res.status == 1) {
          this.areaNum = res.list;
        }
      });
    },
    //删除订单
    delOrder(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认取消此消息吗？"
        })
        .then(() => {
          orderDel({ myid: id }).then(res => {
            this.$toast({
              message: res.info
            });
            if (res.status == 1) {
              this.$store.dispatch("getIndexAction");
              // this.orderList();
            }
          });
        });
    },
    //查看订单
    lookorder(Obj, type) {
      if (this.userInfo.is_look == 2) {
        this.$toast({
          message: "您的账户被锁，请联系平台管理员"
        });
        return;
      }
      if (Obj.is_status > 1) {
        this.$router.push({
          path: "/order_detail",
          query: {
            id: Obj.check_listid,
            myid: Obj.id,
            type: type
          }
        });
      } else {
        this.$router.push({
          path: "/order_trip",
          query: {
            orderid: Obj.id,
            type: type,
            startlat: Obj.origin_lat,
            startlng: Obj.origin_log,
            startname: Obj.origin_name
          }
        });
      }
    }
  },
  mounted() {
    this.SwiperData();
    this.getSetData();
    let type = this.$route.query.type;
    if (type == 1) {
      this.startname = this.$route.query.name;
      this.startlat = this.$route.query.lat;
      this.startlng = this.$route.query.lng;
    } else {
      if (process.env.NODE_ENV === "production") {
        wx.ready(res => {
          this.getWxLoact();
        });
      } else {
        this.getLoact();
      }
    }
    this.orderList();

    if (!window.webSocket) {
      initWebsocket({
        query: {
          vm: this
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.txt_ad {
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: block;
}
#container {
  width: 100%;
  height: 180px;
  z-index: 0;
}
.home {
  text-align: center;
  background: #fbfbfb;
  .van-swipe img {
    width: 100%;
    max-height: 3.33rem;
  }
  .bar_cell {
    height: auto;
    width: 100%;
    line-height: inherit;
    background: #fff;
    position: relative;
    text-align: left;
    padding-left: 0.4rem;
    width: auto;
    text-align: left;
    padding: 0.3rem 0.6rem;
    &::before {
      border: #fff;
    }
  }

  .barline {
    margin-left: 0.6rem;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: 0.02667rem solid #ebedf0;
  }
  .bar_area {
    border: 0.02rem solid #ccc;
    border-radius: 0.08rem;
    font-size: 0.3rem;
    padding: 0.2rem 0.26rem;
    margin-right: 0.6rem;
    display: inline-block;
    margin-bottom: 0.2rem;
    &:nth-child(3n) {
      margin-right: 0rem;
    }
  }
  .user_flex {
    display: flex;
    padding-bottom: 0.2rem;
  }
  .user_order {
    // padding: 0.3rem 0.4rem;
    position: relative;
    overflow: hidden;
    // padding-top: 0;

    .user_lf {
      margin-top: 0.4rem;
      width: 0.9rem;
      margin-right: 0.6rem;
      padding-left: 0.3rem;
      img {
        width: 100%;
      }
    }
    .user_rg {
      flex: 1;
      padding-top: 0.3rem;
      .user_txt1 {
        font-size: 0.4rem;
        padding-bottom: 0.1rem;
      }
      .user_txt2,
      .user_txt3 {
        color: #333;
        font-size: 0.36rem;
      }
      .user_txt3 {
        text-align: center;
        font-size: 0.3rem;
        padding-top: 0.3rem;
      }
    }
    .user_del {
      width: 0.7rem;
      align-self: flex-end;
      padding-right: 0.3rem;

      img {
        width: 100%;
      }
    }
  }

  .index_ul {
    padding: 0.3rem 0.6rem;
    overflow: hidden;
    box-shadow: 0rem 0.06rem 0.13rem 0rem rgba(222, 222, 222, 0.42);
    background: #fff;
    li {
      font-size: 0.4rem;
      margin-right: 0.7rem;
      line-height: 0.41rem;
      float: left;
      color: #cdcdcd;
      line-height: 1.5;
      &.active {
        color: #ff8523;
        border-bottom: 1px solid #ff8523;
      }
    }
  }
  .index_field {
    background: #fff;
    box-shadow: 0rem 0.05rem 0.12rem 0rem rgba(222, 222, 222, 0.42);
    border-radius: 0.11rem;
    height: 2.9rem;
    margin: 0.16rem;

    .field_input {
      height: 1.4rem;
      position: relative;
      line-height: 1.4rem;
      margin: 0 0.57rem 0 1.15rem;
      text-align: left;

      &:first-child {
        border-bottom: 1px solid #e6e6e6;
      }
      &::after {
        content: "";
        position: absolute;
        left: -0.53rem;
        top: 0.6rem;
        background: #38eac2;
        width: 0.19rem;
        height: 0.19rem;
        border-radius: 100%;
      }
      &.orange::after {
        background: #ff8523;
        input {
          :-webkit-input-placeholder {
            /* WebKit browsers */
            color: #ff8523;
          }
          :-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #ff8523;
          }
          ::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #ff8523;
          }
          ::-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #ff8523;
          }
        }
      }
      input {
        height: 1.4rem;
        width: 7rem;
      }
    }
  }
  .field_btn {
    width: 8.53rem;
    height: 1.2rem;
    background-color: #7ccff6;
    border-radius: 0.08rem;
    font-size: 0.37rem;
    color: #ffffff;
    line-height: 1.2rem;
    margin: 0 auto;
  }
  .index_field2 {
    text-align: left;
    width: 9.68rem;
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
    background: url(../assets/luxian.png) no-repeat #fff;
    padding-left: 1.2rem;

    background-size: 0.5rem auto;
    background-position: 4% center;
    &.index_icon2 {
      background-image: url(../assets/fujin.png);
      &.van-cell:not(:last-child)::after {
        border-color: #fff;
      }
    }
    &.index_icon3 {
      background-image: url(../assets/tuijian.png);
    }
    &.index_icon4 {
      background-image: url(../assets/clxc.png);
    }
  }
  .index_per {
    clear: both;
    .serviceul {
      display: flex;
      height: 2.32rem;
      align-items: center;
      .serviceli {
        flex: 1;
        position: relative;
        text-align: center;
        &:nth-child(3)::after {
          right: 4px;
          left: 2.23rem;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0.5rem;
          bottom: 0.6rem;
          background: #e6e6e6;
          height: 0.01rem;
          right: 0px;
          width: 0.01rem;
          height: 1.12rem;
        }
        img {
          height: 0.48rem;
          margin: 0.5rem auto 0.2rem;
          vertical-align: middle;
        }
        span {
          display: block;
        }
      }
    }
  }
}
</style>
