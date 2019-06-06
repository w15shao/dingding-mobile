<template>

<div class="evaluate">
  <div class="evaluate_btn" v-if="type==2" @click="toushu">投诉</div>

   <div class="pend_bk">
      <div class="pend_top">
        <div class="pend_tup"><img :src="order.hearpic" alt=""></div>

        <div class="pend_info">
          <div class="pend_name">{{type==1?order.nickname:order.name}}
            <span class="pend_score" v-if="type==2">{{order.carxj}}分</span>    
             <span class="pend_score" v-if="type==1">{{order.xingji}}分</span>         
          </div>
          <div class="pend_txt1" v-if="type==2">{{order.carnums}}  车牌号:{{order.car_id}}</div>
          <div class="pend_txt1" v-if="type==2"> {{order.car_color}}</div>
          

        </div>
        <div class="pend_toptip">
         <a :href="'tel:' + order.callphone"><img src="../assets/call.png" alt=""></a>
        </div>
        
      </div>

      <div class="pend_main">
        <div class="pendlf">
          <div class="pend1"><img src="../assets/shijian.png" alt="">{{list.dates}} {{list.times}}</div>
          <div class="pend2">{{list.origin_name}}</div>
          <div class="pend3">{{list.end_name}}</div>
          <div class="pend4" v-if="type==1">备注：{{list.remk==''?'无':list.remk}}</div>
          
        </div>
        <div class="pendrg" v-if="type==2"><i>{{list.car_price}}</i>元</div>
      </div>

    </div>
    <div class="pend_serve">
      <div class="pend_line1">
        <span v-if="type==2">司机服务</span>
        <span v-if="type==1">评价乘客</span>
      </div>
      <div id="box">
          <div v-for="n in 5" :key="n" @mouseenter="enter(n)" @mouseleave="leave()" @click="Selected(n)" :class="{'on':cur>=n}"></div>
      </div>
      <ul class="pend_tab">
        <li :class="{active:remark.includes(item.value)}" v-for="item in selectedTag" :key="item.name" @click="changeActive(item.value)">{{item.value}}</li>
         
      </ul>

    </div>
<fix-box/>
    <div class="info_btn" @click="Submit">确认评价</div>
  </div>  

</template>
<script>
import { TagList, orderFind, SubGrade } from "@/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cur: 5,
      flag: false, //鼠标点击后变成true，鼠标进入进出事件就不会改变背景图
      type: null,
      myid: 0,
      id: 0,
      myorder: {},
      order: {},
      list: {},
      selectedTag: {},
      remark: []
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    enter(idx) {
      if (!this.flag) {
        this.cur = idx;
      }
    },
    changeActive(value) {
      if (this.remark.includes(value)) {
        thie.remark.splice(this.remark.indexOf(value), 1);
      } else {
        this.remark.push(value);
      }
    },
    leave() {
      if (!this.flag) {
        this.cur = -1;
      }
    },
    Selected(n) {
      this.flag = true;
      this.cur = n;
    },
    getData() {
      orderFind({
        openid: this.openid,
        myid: this.myid,
        id: this.id,
        type: this.type
      }).then(res => {
        if (res.status == 1) {
          this.order = res.list.order;
          this.myorder = res.list.myorder;
          this.list = res.list.myorder;
          if (this.type === 1) {
            this.list = res.list.order;
          }
        }
      });
    },
    getTag() {
      TagList({
        type: this.type
      }).then(res => {
        this.selectedTag = res.list;
      });
    },
    Submit() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定提交对本次服务的评价?"
        })
        .then(() => {
          SubGrade({
            myid: this.myid,
            id: this.id,
            type: this.type,
            grade: this.cur,
            remark: this.remark.join(",")
          }).then(res => {
            this.$toast({
              message: res.info
            });
            if (res.status == 1) {
              this.$router.push("/");
            }
          });
        });
    },
    toushu() {
      console.info(233);
      this.$router.push({
        path: "/complaint",
        query: {
          myid: this.myid,
          id: this.id,
          type: this.type
        }
      });
    }
  },
  mounted() {
    let Obj = this.$route.query;
    this.myid = Obj.myid;
    this.id = Obj.id;
    this.type = Obj.type;
    this.getData();
    this.getTag();
  }
};
</script>
<style>
body {
  background: #fff;
}
</style>
<style lang="less" scoped>
.evaluate {
  .pend_bk {
    margin: 0;
    padding: 0;
    box-shadow: 0 0 0;
  }
  .evaluate_btn {
    color: #999999;
    font-size: 0.32rem;
    line-height: 0.63rem;
    height: 0.63rem;
    text-align: right;
    text-decoration: underline;
    padding-right: 0.4rem;
    padding-top: 0.3rem;
  }
  .pend_score {
    width: 1rem;
    height: 0.5rem;
    border: solid 0.01rem #ff8523;
    font-size: 0.32rem;
    color: #ff8523;
    line-height: 0.5rem;
    text-align: center;
    display: inline-block;
    margin-left: 0.2rem;
  }
  .pend_toptip {
    float: right;
    img {
      width: 1.04rem;
      height: 1.04rem;
    }
  }
  .pend_bk .pendrg {
    font-size: 0.37rem;
    color: #333;
  }
  .pend_serve {
    padding: 0.8rem 0;
  }
  .pend_line1 {
    text-align: center;
    font-size: 0.43rem;
    color: #666666;
    position: relative;
    padding-bottom: 0.7rem;
    &::before {
      left: 3rem;
      top: 0.3rem;
      position: absolute;
      content: "";
      background: #ccc;
      height: 0.03rem;
      width: 1rem;
    }
    span::after {
      right: 3rem;
      content: "";
      top: 0.3rem;
      position: absolute;
      background: #ccc;
      height: 0.03rem;
      width: 1rem;
    }
  }
  #box {
    // padding: 0 1.3rem;
    text-align: center;
  }
  #box .on {
    background: url("../assets/xingxing.png") no-repeat;
    background-size: contain;
  }
  #box div {
    width: 0.85rem;
    height: 0.83rem;
    margin-right: 0.5rem;
    display: inline-block;
    background: url("../assets/xingxing-2.png") no-repeat;
    background-size: contain;
    &:last-child {
      margin-right: 0;
    }
  }
  .pend_tab {
    padding: 0.9rem 1.3rem 0 1.3rem;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;

    li {
      width: 2rem;
      height: 0.76rem;
      border: solid 0.03rem #cccccc;
      line-height: 0.8rem;
      font-size: 0.36rem;
      color: #cccccc;
      margin-right: 0.25rem;
      margin-bottom: 0.5rem;
      &.active {
        border: solid 0.03rem #ff8523;
        color: #ff8523;
      }
    }
  }
}
</style>
