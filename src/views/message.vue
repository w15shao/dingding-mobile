<template>
<div>
  <div class="message" v-if="list.length>0">
    <ul class="messageul" >
      <li class="messageli" v-for="item in list" :key="item.chat_id" @click="handleGo(item.chat_id)">
        <img :src="item.hearpic" alt="">
        <div class="mes_lf">
          <div class="mes_sn1">{{item.turename}}</div>
          <div class="mes_sn2">{{item.msg}}</div>
        </div>
        <div class="mes_new" v-if="item.newMessage>0">{{item.newMessage}}</div>
        <div class="mes_rg">
          {{item.send_at | formatDate}}
        </div>
      </li>
       <!-- <li class="messageli">
        <img src="../assets/touxiang1.png" alt="">
        <div class="mes_lf">
          <div class="mes_sn1">张三</div>
          <div class="mes_sn2">请给我打电话，谢谢</div>
        </div>
        <div class="mes_rg">
          七天前
        </div>
      </li> -->
       

    </ul>

   


  </div>
  <div v-else class="noDatabk">
      <img src="../assets/notrips.png" alt="">
    <div class="noData">
      暂无聊天记录
    </div>
   </div>
   <foot-bar/>
</div>

</template>
<script>
import notrips from "../components/notrips";
import { ChatList } from "@/api";
import { mapGetters } from "vuex";
import { initWebsocket } from "@/utils/commonApi";
import footBar from "../components/footBar";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapGetters(["userInfo", "openid"])
  },
  components: { footBar, notrips },
  methods: {
    getData() {
      ChatList({
        uid: this.userInfo.id
      }).then(res => {
        if (res.status == 1 && res.hasOwnProperty("list")) {
          this.list = res.list;
        }
      });
    },
    handleGo(id) {
      this.$router.push({
        path: "/chat",
        query: {
          id: id
        }
      });
    },
    getWebsocket() {
      initWebsocket({
        query: {
          vm: this
        },
        cb: res => {
          console.info(res);
          if (res.hasOwnProperty("message")) {
            this.getData();
          }
        }
      });
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
    if (!this.userInfo.id) {
      this.$store.dispatch("getUserAction", {
        params: {
          openid: this.openid
        },
        cb: res => {
          this.userInfo = res.list;
        }
      });
    }
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
<style lang="less" scoped>
.noDatabk {
  height: 12rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  img {
    width: 2.48rem;
    height: 2.17rem;
  }
  .noData {
    font-size: 0.36rem;
    color: #666666;
    margin-top: 0.36rem;
    text-align: center;
    // letter-spacing: 0.14rem;
  }
}
.message {
  background: #fff;
  .messageli {
    border-bottom: solid 0.01rem #f2f2f2;
    padding: 0.26rem;
    display: flex;
    position: relative;
    img {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.4rem;
      border-radius: 100%;
    }
    .mes_lf {
      flex: 1;
      color: #333333;
      .mes_sn1 {
        color: #333333;
        font-size: 0.4rem;
      }
      .mes_sn2 {
        color: #999999;
        font-size: 0.32rem;
      }
    }
    .mes_rg {
      width: 4rem;
      color: #999999;
      font-size: 0.27rem;
      text-align: right;
    }
  }
  .mes_new {
    background: red;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 100%;
    text-align: center;
    line-height: 0.4rem;
    color: #fff;
    font-size: 0.3rem;
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
  }
}
</style>

