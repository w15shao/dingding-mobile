<template>
  <div id="app">
  
    <router-view/>
  </div>
</template>

<script>
import { initPage } from "@/utils/commonApi";

import { initWebsocket, WebchatInit } from "@/utils/commonApi";
import { WxShare } from "@/api";
export default {
  data() {
    return {};
  },
  created() {
    process.env.NODE_ENV === "production" ? initPage(this) : "";
    let openId = window.localStorage.getItem("openId");
    if (openId && process.env.NODE_ENV === "production") {
      WebchatInit(this);
    }

    // initWebsocket({
    //   query: {
    //     vm: this
    //   }
    // });

    // if (openId) {
    //   WxShare({
    //     openid: openId
    //   }).then(res => {
    //     console.info(res);
    //     let data = res.pkg;
    //     var shareData = {
    //       title: "测试测试",
    //       desc: "xxx",
    //       link: data.url,
    //       imgUrl: "",
    //       pkg: {
    //         appId: data.appId,
    //         timestamp: data.timestamp,
    //         nonceStr: data.nonceStr,
    //         signature: data.signature
    //       }
    //     };

    //     this.wechat.init(shareData);
    //   });
    // }

    window.addEventListener("pageshow", function(e) {
      // 通过persisted属性判断是否存在 BF Cache
      if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent) && e.persisted) {
        location.reload();
      }
    });
  },
  methods: {}
};
</script>

<style>
#app {
  padding-bottom: 2rem;
}
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
