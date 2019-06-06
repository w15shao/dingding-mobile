<template>
  <div class="issue_order">
    <div class="indextab">
      
      <div class="index_field" >
        <div class="field_input green"  @click="handleGo(3)"><input type="text" placeholder="温州科技城" :value="startname" readonly></div>
        <div class="field_input orange"  @click="handleGo(2)"><input type="text" placeholder="你要去哪儿" :value="endname" readonly></div>
        <div class="index_order">
            <div class="index_empty" @click="num_show=!num_show">
              <img src="../assets/chenkeshu.png" alt="">
              <span>{{passengerNum}}</span>
            </div>
            <div class="index_empty" @click=" time_show=! time_show">
              <img src="../assets/chuxingshijian.png" alt="">
              <span>{{startTime}}</span>
            </div>
       
        </div>
        <div v-if="currentTab==1">
      <div class="index_chose" v-if="remarkList.length>0">
        <span>备注</span>
        <ul >
          <li v-for="remark in remarkList" :key="remark.name" ><div @click="changeActive(remark.name,1)" :class="{active:remarkIds.includes(remark.name)}">{{remark.value}}</div></li>
         
        </ul>
      </div>
       <div class="index_chose" v-if="priceList.length>0">
        <span>感谢费</span>
        <ul >
          <li v-for="price in priceList" :key="price"><div @click="changeActive(price,2)" :class="{active:priceId==price && isOther!=-1}">{{price}}元</div></li>
          
          <li @click="otherActive"><div :class="{active:priceId===otherFee&& isOther==-1}">{{otherFee?otherFee+'元':'其他'}}</div></li>
        </ul>
      </div>
      </div>
    </div>  
      </div>
     

      <div class="info_rule" v-if="currentTab==1" >
       <router-link tag="span"  to="/statement">我已同意《叮叮顺风车服务协议》</router-link><img :src="is_check==1?checkImg:checkNoImg" alt="" @click="is_check=!is_check">
      </div>
      <div class="info_price" v-if="currentTab==1&&price.userprice>0">
        {{price.userprice}}元<span v-if="priceId>0">(含感谢费{{priceId}}元)</span>
      </div>
<div class="info_btn" @click="submitOrder">确认发布</div>
      

<van-popup v-model="num_show"  position="bottom" :overlay="true">
 <van-picker :columns="columns" show-toolbar
  @confirm="onConfirmNum" @cancel="onCancel"
 />
</van-popup>
<van-popup v-model="time_show"  position="bottom" :overlay="true">
  <van-datetime-picker
    v-model="currentDate"
    type="datetime"
    :min-date="minDate"
    :max-date="maxDate"
  @confirm="onConfirm"
   @cancel="onCancel"
  readonly="readonly"
  :formatter="formatter"
  />
</van-popup>

<!-- 输入金额 -->
<van-dialog
   v-model="isShow"
   show-cancel-button
   :beforeClose="beforeClose"
>
<van-cell title="请输入感谢费" value="" size="large" />
   <van-field
      v-model="otherFee"
      label="金额"
      type="number"
      placeholder="请输入金额"
   />
   
</van-dialog>
  <fix-box/>
  </div>


</template>
<script>
import fixBox from "@/components/fixBox";
import checkImg from "@/assets/gou.png";
import checkNoImg from "@/assets/gou2.png";
import {
  getThisTime,
  getPrice,
  setUpData,
  getChangePrice,
  addOrder
} from "@/api";
import { formatTime } from "@/utils";
import { mapGetters } from "vuex";

import axios from "axios";
export default {
  data() {
    return {
      checkImg,
      checkNoImg,
      is_check: true,
      isShow: false,
      passengerNum: "乘车人数",
      num: null,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      time_show: false,
      num_show: false,
      columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      startlat: "",
      startlng: "",
      startname: "",
      endlat: "",
      endlng: "",
      endname: "",
      startTime: "", //出发时间
      km: 0,
      oldprice: { carprice: 0, userprice: 0 },
      price: { carprice: 0, userprice: 0 },
      priceList: [],
      remarkList: [],
      remarkIds: [], //点亮的备注
      currentTab: 0,
      priceId: 0, //点亮的价格
      otherFee: "",
      isOther: 0 //-1表示选择了other
    };
  },
  components: { fixBox },
  computed: {
    ...mapGetters(["openid", "userInfo", "isLogin"])
  },
  methods: {
    otherActive() {
      if (/^\d+(\.\d+)?$/.test(this.otherFee) && this.otherFee >= 0) {
        this.isOther = -1;
      }
      this.isShow = !this.isShow;
    },
    //跳转到地图搜索页
    handleGo(type) {
      if (type == 2) {
        if (this.startname == "") {
          this.$toast({
            message: "请填写你的位置或者等待定位"
          });
        } else {
          this.$router.push({
            path: "/search",
            query: {
              type: type,
              startlat: this.startlat,
              startlng: this.startlng,
              startname: this.startname,
              currentTab: this.currentTab
            }
          });
        }
      } else if (type == 3) {
        this.$router.push({
          path: "/search",
          query: {
            type: type,
            endlat: this.endlat,
            endlng: this.endlng,
            endname: this.endname,
            currentTab: this.currentTab
          }
        });
      }
    },
    //获取时间
    getTime() {
      getThisTime().then(res => {
        this.startTime = res.list.time;
        this.currentDate = res.list.time;
      });
    },
    onConfirm(value) {
      this.startTime = formatTime(value);
      this.time_show = !this.time_show;
    },
    onConfirmNum(value) {
      // console.info(value);
      this.num = value;
      if (this.currentTab == 1) {
        this.passengerNum = "乘客：" + value;
      } else {
        this.passengerNum = "空位：" + value;
      }

      this.num_show = !this.num_show;
      this.getNewPrice();
    },
    onCancel() {
      this.num_show = false;
      this.time_show = false;
    },

    //人数变化、感谢费变化价格变化
    getNewPrice() {
      if (this.oldprice.carprice == 0) {
        return;
      }
      getChangePrice({
        carprice: this.oldprice.carprice,
        userprice: this.oldprice.userprice,
        num: this.num || 1,
        zzprice: this.isOther == -1 ? this.isOther : this.priceId,
        qtprice: this.isOther != -1 ? "" : this.otherFee
      }).then(res => {
        if (res.status == 1) {
          this.price = res.list;
        }
      });
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    getKmPrice() {
      let url = "https://restapi.amap.com/v3/direction/driving";
      axios
        .get(url, {
          params: {
            origin: this.startlng + "," + this.startlat,
            destination: this.endlng + "," + this.endlat,
            key: "c4e9759a557b5e01c427d5aedc6b41ef"
          }
        })
        .then(res => {
          res = res.data;
          // console.info(res);
          if (res.status == 1) {
            let km = parseInt(Math.ceil(res.route.paths[0].distance / 1000));

            //计算价格
            this.getUserPrice(km);
          }
        });
    },
    getUserPrice(km) {
      getPrice({ km: km }).then(res => {
        if (res.status == 1) {
          this.km = km;
          this.oldprice = JSON.parse(JSON.stringify(res.list));
          this.price = res.list;
        }
      });
    },
    getSetData() {
      setUpData().then(res => {
        console.log(res);
        this.priceList = res.list.pricelist;
        this.remarkList = res.list.remarklist;
      });
    },
    changeActive(id, type) {
      if (type == 1) {
        if (this.remarkIds.includes(id)) {
          this.remarkIds.splice(this.remarkIds.indexOf(id), 1);
        } else {
          this.remarkIds.push(id);
        }
      } else {
        this.isOther = 0;

        if (this.priceId == id) {
          this.priceId = 0;
        } else {
          this.priceId = id;
        }
        //计算感谢费
        // this.getFee();
        this.getNewPrice();
      }
    },
    //计算感谢费
    getFee() {
      let old_car = this.oldprice.carprice,
        old_user = this.oldprice.userprice;
      this.price.carprice = this.FloatAdd(
        parseFloat(old_car),
        parseFloat(this.priceId),
        2
      );
      this.price.userprice = this.FloatAdd(
        parseFloat(old_user),
        parseFloat(this.priceId),
        2
      );
    },

    beforeClose(action, done) {
      if (action === "confirm") {
        if (/^\d+(\.\d+)?$/.test(this.otherFee)) {
          this.otherFee = parseFloat(this.otherFee);
          this.priceId = parseFloat(this.otherFee);
          this.isOther = -1;
          this.getNewPrice();

          done();
        } else {
          this.$toast({
            message: "请输入数字"
          });
          done(false);
          this.priceId = 0;
          this.isOther = 0;
        }
      } else if (action === "cancel") {
        done(); //关闭
      }
    },
    //提交订单
    submitOrder() {
      // console.info(this.userInfo);
      let remarkName = [],
        remark;
      for (let o of this.remarkList) {
        // debugger;
        if (this.remarkIds.includes(o.name)) remarkName.push(o.value);
      }
      remark = remarkName.join(",");

      if (!this.startlat) {
        this.$toast({
          message: "请输入出发地点"
        });
        return;
      }
      if (!this.endlat) {
        this.$toast({
          message: "请输入目的地"
        });
        return;
      }
      if (!this.num) {
        this.$toast({
          message: "请选择乘车人数"
        });
        return;
      }
      if (!this.is_check) {
        this.$toast({
          message: "服务协议没确认"
        });
        return;
      }

      addOrder({
        currentTab: this.currentTab,
        number: this.num,
        zzprice: this.isOther == -1 ? this.isOther : this.priceId,
        qtprice: this.isOther != -1 ? "" : this.otherFee,
        times: this.startTime,
        startaddress: this.startname,
        startLat: this.startlat,
        startLong: this.startlng,
        endaddress: this.endname,
        endLat: this.endlat,
        endLong: this.endlng,
        km: this.km,
        openid: this.openid,
        remark: remark,
        uid: this.userInfo.id,
        carprice: this.price.carprice,
        userprice: this.price.userprice
      }).then(res => {
        // console.info(res);
        this.$toast({
          message: res.info
        });
        if (res.status == 1) {
          this.$router.push({
            path: "/order_trip",
            query: {
              orderid: res.list,
              type: this.currentTab == 1 ? 2 : 1,
              startname: this.startname,
              startlat: this.startlat,
              startlng: this.startlng
            }
          });
        }
      });
    },
    FloatAdd: function(num1, num2, Nlen) {
      // console.info(num1, num2, Nlen);
      var r1, r2, m, n;
      //try执行错误走catch路线
      try {
        //把浮点数替换为字符串 ，用点分割成数组取得点后面有多少位小数；
        r1 = num1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = num2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      //获取到俩个浮点数多少位小数 Math.max取最大值 得到10的最大多少位小数次方
      m = Math.pow(10, Math.max(r1, r2));
      if (Nlen == null) {
        n = r1 >= r2 ? r1 : r2;
      } else {
        n = Nlen;
      }
      // console.log(this.oldprice);
      //输出得到俩个浮点数乘以10的多少位小数次方 相加 再除于10的最大多少位小数次方
      //toFixed 取多少位小数
      return ((num1 * m + num2 * m) / m).toFixed(n);
    },
    //浮点数减法运算
    FloatSub: function(num1, num2, Nlen) {
      var r1, r2, m, n;
      try {
        r1 = num1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = num2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      if (Nlen == null) {
        n = r1 >= r2 ? r1 : r2;
      } else {
        n = Nlen;
      }
      return ((num1 * m - num2 * m) / m).toFixed(n);
    }
  },
  mounted() {
    //获取对应地址信息
    let Obj = this.$route.query;
    (this.startlat = Obj.startlat),
      (this.startlng = Obj.startlng),
      (this.startname = Obj.startname),
      (this.endlat = Obj.endlat),
      (this.endlng = Obj.endlng),
      (this.currentTab = Obj.currentTab),
      (this.endname = Obj.endname);
    if (Obj.currentTab == 2) {
      this.passengerNum = "空位数";
    }

    this.minDate = new Date(
      this.currentDate.setMinutes(this.currentDate.getMinutes() + 15)
    );
    //获取出发时间
    this.getTime();
    //获取公里数价格
    this.getKmPrice();
    //获取设置信息
    this.getSetData();
  }
};
</script>


<style>
body {
  background: #f1f5f8;
}
</style>

<style lang="less" scoped>
.index_field {
  background: #fff;

  box-shadow: 0rem 0.05rem 0.12rem 0rem rgba(222, 222, 222, 0.42);
  border-radius: 0.11rem;

  margin: 0.16rem;

  .field_input {
    height: 1.4rem;
    position: relative;
    line-height: 1.4rem;
    margin: 0 0.57rem 0 1.15rem;
    border-bottom: 1px solid #e6e6e6;
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
</style>

