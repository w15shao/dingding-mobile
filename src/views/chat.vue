<template>
  <div id="list-content">
     <div class="talk_bk" v-if="list.length>0">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <!-- <van-list
                    v-model="loading"
                    :finished="finished"
                    :offset="10"
                > -->
        <div v-for="(item,index) in list" :key="item.id" >
          <div v-if="index%5==0" style="text-align:center"><div class="talk_time" >{{item.send_at | formatDate}}</div></div>
       <div class="talk" :class ="{talk_my:item.is_self==1}" >
         
         <div class="talk_head"><img :src="item.hearpic" alt=""></div>
         <div class="talk_cnt"><div class="talk_box">{{item.msg}}</div></div> 
       </div>
       </div>
        <!-- </van-list> -->
            </van-pull-refresh>
      
     </div>

     <div class="talk_key">
       <div class="talk_input">
          <input type="text" placeholder="请输入想说的话" v-model="msg" >
       </div>
       <div class="talk_btn" @click="Send">发送</div>   
     </div>
    <fix-box/>
  </div>
  


</template>
<script>
import { mapGetters } from "vuex";
import { ChatDetail, ChatReaded, ChatSend, orderListData } from "@/api";
import { initWebsocket } from "@/utils/commonApi";
import { constants } from "fs";

export default {
  data() {
    return {
      target_id: 0,
      msg: "",
      list: [],
      page: -1,
      mylist: null,
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false //是否处于下拉刷新状态
    };
  },
  computed: {
    ...mapGetters(["userInfo", "mesInfo"])
  },
  watch: {
    mesInfo: function(newVal, oldVal) {
      let info = newVal.message;
      if (info.from == this.target_id) {
        this.list.push(info);

        window.scrollTo(0, document.documentElement.clientHeight);
      }
    }
  },
  methods: {
    getData() {
      ChatDetail({
        uid: this.userInfo.id,
        target_id: this.target_id,
        page: this.page == -1 ? "" : this.page,
        count: 10,
        last_send_at: this.list.length > 0 ? this.list[0].send_at : ""
      }).then(res => {
        if (res.status == 1 && res.hasOwnProperty("list")) {
          if (this.list.length > 0 && this.page != -1) {
            let arr = res.list.reverse();
            // console.info(...res.list);
            this.list.unshift(...arr);
          } else {
            this.list = res.list.reverse();
            this.finished = false;
          }
        } else {
          this.$toast({
            message: "已到底，没有更多聊天记录"
          });
          this.finished = true;
        }
      });
    },
    Send() {
      if (this.msg != "") {
        ChatSend({
          uid: this.userInfo.id,
          target_id: this.target_id,
          msg: this.msg
        }).then(res => {
          if (res.status == 1) {
            let json = { msg: this.msg, send_at: Date.parse(new Date()) };
            let Obj = Object.assign({}, json, this.mylist);
            this.msg = "";
            // this.page = 0;
            this.list.push(Obj);
            window.scrollTo(0, document.documentElement.clientHeight);

            // this.getData();
          }
        });
      } else {
        this.$toast({
          message: "发送消息不能为空"
        });
      }
    },
    ChatRead() {
      ChatReaded({
        uid: this.userInfo.id,
        target_id: this.target_id
      }).then(res => {});
    },
    orderList(type = 1) {
      orderListData({
        type: 1,
        openid: this.openid,
        startLong: this.startlng,
        startLat: this.startlat
      }).then(res => {
        if (res.status == 1) {
          this.isDot = res.list.chat_bubble == 0 ? false : true;
          this.$store.commit("set_dot", this.isDot);
        }
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
        //   // console.info(res.hasOwnProperty("message"));
        //   if (res.hasOwnProperty("message")) {
        //     let info = res.message;
        //     if (info.from == this.target_id) {
        //       this.list.push(info);
        //       window.scrollTo(0, document.documentElement.clientHeight);
        //     }
        //   } else {
        //   }
        // }
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
        this.page++;
        console.info(this.page);
        this.getData();
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
  filters: {
    formatDate(value) {
      if (!value) return "";
      value = new Date(value * 1000);
      let Y = value.getFullYear() + "-";
      let M =
        (value.getMonth() + 1 < 10
          ? "0" + (value.getMonth() + 1)
          : value.getMonth() + 1) + "-";
      let D = value.getDate() + " ";
      let h = value.getHours() + ":";
      let m =
        value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
      //console.log(Y+M+D+h+m)
      return Y + M + D + h + m;
    }
  },
  mounted() {
    this.target_id = this.$route.query.id;
    this.getData();
    if (!window.webSocket) {
      this.getWebsocket();
    }

    let winHeight = document.documentElement.clientHeight;
    // document.getElementById("list-content").style.height = winHeight + "px";

    this.mylist = {
      hearpic: this.userInfo.hearpic,
      is_self: 1,
      turename: this.userInfo.turename,
      uid: this.userInfo.id
    };
  },
  destroyed() {
    this.ChatRead();
    this.orderList();
  }
};
</script>

<style lang="less" scoped>
.talk_time {
  color: #999;
  font-size: 0.3rem;
  border-radius: 1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0.3rem 0 0 0;
}
#list-content {
  overflow: scroll;
}
.talk_bk {
  padding: 0.4rem 0.54rem;
  .talk_head {
    width: 1rem;

    img {
      border-radius: 100%;
      width: 1rem;
    }
  }
  .talk {
    display: flex;
    margin-top: 0.3rem;
  }
  .talk_my {
    flex-direction: row-reverse;

    // flex-wrap: wrap-reverse;
    .talk_cnt {
      text-align: right;
    }
    .talk_box {
      margin-right: 0.26667rem;
      text-align: left;
      background: #b5ee7e;
      margin-left: 0rem;
    }
    .talk_box::after {
      border-left-color: #b5ee7e;
      border-right-color: transparent;
      left: inherit;
      right: -0.4rem;
    }
  }
  .talk_cnt {
    flex: 1;
  }
  .talk_box {
    position: relative;
    background: #fff;
    color: #333333;
    border-radius: 0.13333rem;
    margin-left: 0.26667rem;
    word-break: break-word;
    padding: 0.12rem 0.2rem;
    line-height: 0.6rem;
    display: inline-block;
    margin-top: 0.1rem;
    min-height: 0.8rem;
    min-width: 0.6rem;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 0.21333rem solid transparent;
      border-right-color: #fff;
      top: 0.2rem;
      left: -0.37333rem;
    }
  }
}
.talk_key {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1.2rem;
  background: #fff;
  padding: 0.1rem 0.3rem 0.1rem 0.4rem;
  display: flex;
  .talk_input {
    border-bottom: solid 0.03rem #e5e5e5;
    flex: 1;
    input {
      height: 1rem;
    }
  }
  .talk_btn {
    width: 1.6rem;
    height: 0.9rem;
    background-color: #8ede41;
    border-radius: 0.11rem;
    color: #fff;
    text-align: center;
    line-height: 0.9rem;
    margin: 0.2rem 0 0 0.2rem;
  }
}
</style>


