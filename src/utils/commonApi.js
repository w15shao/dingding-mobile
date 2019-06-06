import { orderList, checkOrderList, AddOrder, GateBind, WxShare } from "@/api";

/**
 * 微信授权
 * config:
 *  appId - 公众号appId
 *  REDIRECT_URI - 回调域名，授权后跳转的地址
 *  SCOPE - 授权类型，snsapi_userinfo／snsapi_base
 */

export function WxAuth() {
  let
    appid = 'wxb71bfedbc59294fa',
    old_url = urlDelP(location.href.split('#')[0], 'code'),
    REDIRECT_URI = encodeURIComponent(old_url),
    SCOPE = 'snsapi_userinfo',
    url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=' + SCOPE + '&state=1#wechat_redirect'
  window.location.href = url
}

//获取参数
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function initPage(vm) {
  let code = getUrlParam('code'),
    parentOpenId = getUrlParam("openId") || "",
    openId = window.localStorage.getItem("openId");

  if (!openId && !code) {
    WxAuth();
  } else if (openId) {
    //从数据库里查找用户信息
    vm.$store.dispatch("getUserAction", {
      params: {
        openid: openId
      }
    });
  } else if (code) {
    vm.$store.dispatch("getWechatLoginAction", {
      params: { code: code }

    });
  }
}

//对特定的url进行处理
export function urlDelP(url, name) {
  var urlArr = url.split('?');
  if (urlArr.length > 1 && urlArr[1].indexOf(name) > -1) {
    var query = urlArr[1];
    var obj = {}
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    };
    delete obj[name];
    var urlte = urlArr[0] + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    return urlte;
  } else {
    return url;
  };
}

//乘客向司机 申请查看
export function checkLook(query) {
  let { params: { item, vm }, cb } = query
  checkOrderList({
    status: item.is_status,
    id: item.id,
    myid: vm.orderid,
    openid: vm.openid,
    type: vm.type,
    cartype: vm.cartype

  }).then(res => {
    vm.$toast({
      message: res.info
    });
    cb & cb(res);

  });
}

//建立链接
export function initWebsocket(obj) {
  let { query, cb } = obj
  let vm = query.vm;
  if ("WebSocket" in window) {
    window.webSocket = new WebSocket("ws://47.97.107.10:8282");

    webSocket.onopen = function () {
      webSocket.send("发送数据");
    };
    webSocket.onmessage = function (evt) {
      let data = evt.data, type;
      console.info(evt.data);
      if (typeof data == "string" && typeof JSON.parse(data) == "object") {
        data = JSON.parse(data)
        type = data.type
        if (data.hasOwnProperty("message")) {
          vm.$store.commit("set_dot", true);
        }
      }
      switch (type) {
        case "init": GateBind({
          client_id: data.client_id,
          openid: vm.openid,
          uid: vm.userInfo.id
        }); break;
        default: ; break;
      }

      let path = vm.$route.path
      let query = vm.$route.query;

      if (data.order_status_change == 1) {
        let { type, orderid, cartype, startlat, startlng, startname, area, sex } = query
        if (path == "/order_trip") {

          if (data.hasOwnProperty("orderlist_uid")) {
            console.info(data.orderlist_uid)
            let id = data.orderlist_uid.filter(i => i != orderid)[0]
            console.info(id)

            vm.$router.push({
              path: "/order_detail",
              query: {
                id: id,
                myid: orderid,
                type: type,

              }
            })
            return
          }


          vm.$store.dispatch("getOrderListAction", {
            params: {
              type: type,
              orderid: orderid || 0,
              openid: vm.$store.getters.openid,
              sqtype: 0,
              count: 0,
              sex: sex,
              cartype: cartype || 1,
              shuaxin: 1,
              startaddress: startname || vm.$store.getters.positionName,
              startLat: startlat || vm.$store.getters.positionlat,
              startLong: startlng || vm.$store.getters.positionlng,
              area: area || "total"
            }
          });

        } else if (path == "/") {
          vm.$store.dispatch("getIndexAction")

        } else if (path == "/order_detail") {
          let { myid, id, type } = query
          vm.$store.dispatch("getOrderDetailAction", {
            params: {
              myid: myid,
              id: id,
              type: type,
              openid: vm.$store.getters.openid
            }

          });


        }
      } else if (data.hasOwnProperty("message")) {
        vm.$store.commit("getMessage", data);


      }

    };
    webSocket.onclose = function () {
      console.log('----链接关闭');
    };
    webSocket.onerror = function (evt) {  //连接错误
      console.log('----链接失败');

    };
  }

  else {
    alert("您的浏览器不支持 WebSocket!");
  }

}

//配置微信
export function WebchatInit(vm) {
  WxShare({
    openid: vm.openId
  }).then(res => {
    console.info(res);
    let data = res.pkg;
    var shareData = {
      title: "hhh测试测试",
      desc: "xxx",
      link: data.url,
      imgUrl: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLgibqHsl97OkQTztoqib4pHBIjn1Z9XAmicT0lrJfqe3USdG32Ab3JiaeA4j61WhbehV10rsOKxNHSg/132",
      pkg: {
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature
      }
    };

    vm.wechat.init(shareData);
  });

}







