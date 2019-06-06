<template>
  <div>
     <div class="index_field" >
      <div class="field_input green"  @click="handleGo(6)"><input type="text" placeholder="从哪里出发" v-model="startname" readonly></div>
      <div class="field_input orange"  @click="handleGo(5)"><input type="text" placeholder="你要去哪儿" readonly v-model="endname" ></div>
   
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
        </div> 

        <div class="info_btn" @click="Submit">确认提交</div>
        <van-popup v-model="num_show"  position="bottom" :overlay="true">
 <van-picker :columns="columns" show-toolbar
  @confirm="onConfirmNum"  @cancel="onCancel"
 />
</van-popup>
<van-popup v-model="time_show"  position="bottom" :overlay="true">
  <van-datetime-picker
  v-model="currentDate"
  @confirm="onConfirm"
  @cancel="onCancel"
  type="time"
  :min-hour="minHour"
  :max-hour="maxHour"
/>
</van-popup>
<fix-box/>
  </div>
</template>
<script>
import fixBox from "@/components/fixBox";
import { mapGetters } from "vuex";
import { formatTime } from "@/utils";
import axios from "axios";
import { RouteAdd } from "@/api";
import {
  getThisTime,
  getPrice,
  setUpData,
  getChangePrice,
  addOrder
} from "@/api";
export default {
  data() {
    return {
      startlat: "",
      startlng: "",
      startname: "",
      endlat: "",
      endlng: "",
      endname: "",
      currentDate: "12:00",
      selectTime: false,
      type: 0,
      passengerNum: "乘车人数",
      startTime: "出发时间", //出发时间
      columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      num: null,
      minHour: 0,
      maxHour: 23,
      time_show: false,
      num_show: false,
      km: 0,
      price: {}
    };
  },
  computed: {
    ...mapGetters([
      "positionlat",
      "positionlng",
      "positionName",
      "openid",
      "userInfo"
    ])
  },
  methods: {
    handleGo(type) {
      if (type == 5) {
        this.$router.push({
          path: "/search",
          query: {
            type: type,
            startlat: this.startlat,
            startlng: this.startlng,
            startname: this.startname
          }
        });
      } else {
        this.$router.push({
          path: "/search",
          query: {
            type: type,
            endlat: this.endlat || "",
            endlng: this.endlng || "",
            endname: this.endname || ""
          }
        });
      }
    },
    onConfirm(value) {
      this.startTime = "出发时间：" + this.currentDate;
      this.selectTime = true;
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
      // this.getNewPrice();
    },
    onCancel() {
      this.num_show = false;
      this.time_show = false;
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
            this.km = km;

            //计算价格
            this.getUserPrice(km);
          }
        });
    },
    getUserPrice(km) {
      getPrice({ km: km }).then(res => {
        if (res.status == 1) {
          // this.oldprice = JSON.parse(JSON.stringify(res.list));
          this.price = res.list;
        }
      });
    },
    Submit() {
      if (!this.endname) {
        this.$toast({
          message: "请填写完整起始地址"
        });
        return;
      }
      if (!this.num) {
        this.$toast({
          message: "请选择空位数"
        });
        return;
      }
      if (!this.selectTime) {
        this.$toast({
          message: "请选择出发时间"
        });
        return;
      }
      RouteAdd({
        openid: this.openid,
        uid: this.userInfo.id,
        number: this.num,
        times: this.currentDate,
        startLat: this.startlat,
        startLong: this.startlng,
        startaddress: this.startname,
        endLat: this.endlat,
        endLong: this.endlng,
        endaddress: this.endname,
        km: this.km,
        car_price: this.price.carprice,
        user_price: this.price.userprice
      }).then(res => {
        this.$toast({
          message: res.info
        });
        if (res.status == 1) {
          this.$router.push("/common_way");
        }
      });
    }
  },
  mounted() {
    let Obj = this.$route.query;

    this.startlat = Obj.startlat || this.positionlat;
    this.startlng = Obj.startlng || this.positionlng;
    this.startname = Obj.startname || this.positionName;
    this.endlat = Obj.endlat;
    this.endlng = Obj.endlng;
    this.endname = Obj.endname;
    this.currentTab = Obj.currentTab;
    if (this.endname != "") {
      this.getKmPrice();
    }
  }
};
</script>
<style lang="less" scoped>
.index_field {
  background: #fff;
  box-shadow: 0rem 0.05rem 0.12rem 0rem rgba(222, 222, 222, 0.42);
  border-radius: 0.11rem;
  // height: 2.9rem;
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
