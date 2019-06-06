<template>
  <div>
    <van-cell :title="countName" is-link arrow-direction="down" :value="sex==0?'筛选':(sex==1?'男':'女')" @click="show=!show"/>
    <van-popup v-model="show" position="bottom" >
      <!-- <van-picker :columns="columns" @change="onChange" /> -->
    <van-picker
      show-toolbar
     
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    </van-popup>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div v-if="list.length>0" style="min-height:12rem;">
       

    <div class="pend_bk" v-for="(item,index) in list" :key="item.id+index" @click="handleGo(item)">
      <div class="pend_top">
        <div class="pend_tup"><img :src="item.hearpic" alt=""></div>
        <div class="pend_info">
          <div class="pend_name"><div class="pend_txt8">{{item.name||item.nickname}}</div>
            <div class="pend_star star_position">
              <div class="pend_star_bk">{{item.carxj}} 分</div>
          </div>
          
          </div>
          <div class="pend_txt1">{{item.carnums}}</div>
          <div class="pend_txt1">{{item.car_color}}</div>
          

        </div>
        <div class="pend_toptip">
          <div class="pendsn1">空座：{{item.car_num}}座</div>
          <div class="pendsn2">{{item.ppd}}%的顺路程度</div>
        </div>
        
      </div>

      <div class="pend_main">
        <div class="pendlf">
          <div class="pend1"><img src="../assets/shijian.png" alt="">{{item.dates}} &nbsp;&nbsp; {{item.times}}</div>
          <div class="pend2">{{item.origin_name|textSlice}}</div>
          <div class="pend3">{{item.end_name|textSlice}}</div>
          <div class="pend4" v-if="type==1">备注：{{item.remk||"无"}}</div>
          
        </div>
        <!-- <div class="pendrg"><i>35.4</i>元</div> -->
      </div>
      <div class="pendbar" >
        <div class="pendsnlf">{{item.statusname}}</div>
        <div class="pendbtn1" v-if="item.yq_order=='0'" @click.stop="checkOrder(item)" >{{item.is_status==1?'取消申请':'申请查看'}}</div>
        <div v-if="item.yq_order=='1'" >
            <div class="pendbtn2">取消</div>
            <div class="pendbtn3" @click.stop="AgreeOrder(item)">{{type==2?'同意申请':'确认申请'}}</div> 
        </div>        
      </div>

    </div>
     

    </div>
     <notrips :type="loadStatus" v-else />
    </van-pull-refresh>
   
     
    <fix-box/>
  </div>
</template>
<script>
import { orderList, checkOrderList, AddOrder } from "@/api";
import { mapGetters } from "vuex";
import { checkLook, initWebsocket } from "@/utils/commonApi";
import notrips from "@/components/notrips";
import fixBox from "@/components/fixBox";
export default {
  data() {
    return {
      show: false,
      columns: ["全部", "男", "女"],
      type: 1,
      orderid: 0,
      list: [],
      sex: 0,
      countName: "暂无信息发布",
      cartype: 1, //外部传来的三个值
      routeid: 0,
      shuaxin: 1,
      loadStatus: 1,
      startlat: "",
      startlng: "",
      startname: "",
      area: null,
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false //是否处于下拉刷新状态
    };
  },
  computed: {
    ...mapGetters([
      "openid",
      "positionlat",
      "positionlng",
      "positionName",
      "isLogin",
      "userInfo",
      "orderListData"
    ])
  },
  watch: {
    orderListData: function(res, oldVal) {
      if (res.status == 1) {
        this.list = res.list.order;
      } else {
        this.$toast({
          message: res.info
        });
        this.list = [];
        this.loadStatus = 2;
      }
      if (this.type == 2) {
        this.countName = res.list.count + "位顺路车主";
      } else {
        this.countName = res.list.count + "位顺路乘客";
      }
    }
  },
  components: { notrips, fixBox },
  methods: {
    onConfirm(value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.sex = index;
      this.show = !this.show;
      this.getlist();
    },
    onCancel() {
      this.show = !this.show;
      // this.$toast("取消");
    },
    getlist() {
      this.$store.dispatch("getOrderListAction", {
        params: {
          type: this.type,
          orderid: this.orderid || 0,
          openid: this.openid,
          sqtype: 0,
          count: 0,
          sex: this.sex,
          cartype: this.cartype,
          routeid: this.routeid,
          shuaxin: 1,
          startaddress: this.startname || this.positionName,
          startLat: this.startlat || this.positionlat,
          startLong: this.startlng || this.positionlng,
          area: this.area || "total"
        }
      });

      // orderList({
      //   type: this.type,
      //   orderid: this.orderid || 0,
      //   openid: this.openid,
      //   sqtype: 0,
      //   count: 0,
      //   sex: this.sex,
      //   cartype: this.cartype,
      //   routeid: this.routeid,
      //   shuaxin: 1,
      //   startaddress: this.startname || this.positionName,
      //   startLat: this.startlat || this.positionlat,
      //   startLong: this.startlng || this.positionlng,
      //   area: this.area || "total"
      // }).then(res => {
      //   if (res.status == 1) {
      //     this.list = res.list.order;
      //   } else {
      //     this.$toast({
      //       message: res.info
      //     });
      //     this.list = [];
      //     this.loadStatus = 2;
      //   }
      //   if (this.type == 2) {
      //     this.countName = res.list.count + "位顺路车主";
      //   } else {
      //     this.countName = res.list.count + "位顺路乘客";
      //   }
      // });
    },

    //乘客去向司机申请
    checkOrder(Obj) {
      checkLook({
        params: {
          item: Obj,
          vm: this
        },
        cb: res => {
          if (res.status == 1) {
            if (Obj.is_status == 0) {
              this.handleGo(Obj);
            } else {
              this.getlist();
            }
          }
        }
      });
    },

    //乘客同意司机的申请
    AgreeOrder(Obj) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定同意司机的邀请"
        })
        .then(() => {
          AddOrder({
            myid: this.orderid,
            id: Obj.id
          }).then(res => {
            this.$toast({
              message: res.info
            });

            if (res.status == 1) {
              this.handleGo(Obj);
            }
          });
        });
    },
    //建立连接
    getWebsocket() {
      initWebsocket({
        query: {
          vm: this
        }
        // cb: res => {
        //   console.info(res);
        //   if (res.order_status_change == "1") {
        //     this.getlist();
        //   }
        // }
      });
    },

    handleGo(Obj) {
      this.$router.push({
        path: "/order_detail",
        query: {
          id: Obj.id,
          myid: this.orderid,
          type: this.type,
          cartype: this.cartype,
          routeid: this.routeid
        }
      });
    },
    onLoad() {
      if (this.finished) {
        this.$toast({
          message: "暂无更多数据"
        });
        this.isLoading = false;
        this.loading = false;
        return;
      }
      //上拉加载
      setTimeout(() => {
        // this.page++;
        // console.info(this.page);
        // this.getData();
        this.getlist();
        this.loading = false;
        this.isLoading = false;
      }, 500);
    },
    onRefresh() {
      //下拉刷新

      setTimeout(() => {
        this.onLoad();
      }, 500);
    }
  },
  mounted() {
    //1:普通订单进入 2：常用订单：3：附近乘客
    //  this.type = this.$route.query
    let Obj = this.$route.query;
    this.type = Obj.type;
    this.orderid = Obj.orderid;
    this.cartype = Obj.cartype || 1;
    this.startlat = Obj.startlat;
    this.startlng = Obj.startlng;
    this.startname = Obj.startname;
    this.area = Obj.area || null;
    this.getlist();
    if (!window.webSocket) {
      this.getWebsocket();
    }
    // let winHeight = document.documentElement.clientHeight;
    // document.getElementById("list-content").style.height = winHeight + "px";
  }
  // destroyed: function() {
  //   window.webSocket.close();
  // }
};
</script>
<style lang="less" scoped>
.pend_bk .pend_top .pend_toptip {
  position: absolute;
  right: 0;
}
.pendbar {
  border-bottom: 0;
}
.pend_name {
  display: flex;
}
.pend_bk .pend_top .pend_toptip .pendsn2 {
  padding-top: 0.5rem;
}
.pend_name .pend_txt8 {
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  width: 2.8rem;
}
</style>



