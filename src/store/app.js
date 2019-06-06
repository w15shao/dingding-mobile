import router from '@/router'
import { Dialog } from 'vant';
import {
  getUserInfo, WechatLogin, WxShare, getUserAppId,
  orderListData, orderList, orderFind, ChatList, ChatDetail
} from '@/api/index.js'
import { WxAuth, urlDelP } from "@/utils/commonApi"
import { appTypes } from './actionTypes.js'
export default {
  state: {
    isLogin: false,
    userInfo: {},
    showLoading: false,
    uId: '',
    openid: 'o0XRw0bv-c7y201KXjXWjEWsyams',
    positionlat: '',
    positionlng: '',
    positionName: '',
    app_id: 'wxb71bfedbc59294fa',
    isDot: false,
    indexData: {},
    orderListData: {},
    orderDetailData: {},
    mesInfo: {}

  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.showLoading = payload
    },
    set_islogin: (state, payload) => {
      if (payload.type == appTypes.userLogin) {
        state.isLogin = true
        state.userInfo = payload.res
        state.uId = payload.res.uid
      } else if (payload.type == appTypes.userLogout) {
        state.isLogin = false
        state.userInfo = {}
        state.uId = ''
      }
    },
    set_code: (state, payload) => {
      state.openid = payload.res
    },
    //获取定位信息
    getPosition: (state, payload) => {
      // console.info(payload)
      state.positionlat = payload.positionlat
      state.positionlng = payload.positionlng
      // state.startlat = payload
    },
    //获取定位名字
    getPositionName: (state, payload) => {
      // console.info(payload)
      state.positionName = payload.positionName
    },
    //获取微信jdk
    getWxJDK: (state, payload) => {

    },
    //是否显示红点
    set_dot: (state, payload) => {
      state.isDot = payload
    },
    //获取首页信息
    getIndexData: (state, payload) => {
      // console.info(payload);
      state.indexData = payload
    },
    getOrderListData: (state, payload) => {
      state.orderListData = payload
    },
    getOrderDetailData: (state, payload) => {
      state.orderDetailData = payload
    },
    getMessage: (state, payload) => {
      state.mesInfo = payload
    }


  },
  actions: {
    //获取用户信息，判断是否登录
    getUserAction({ commit }, query) {
      let { params, cb } = query
      getUserInfo(params).then(res => {
        //用户被删除但本地存储有openId的情况
        if (res.status == 0) {
          Dialog.alert({
            message: "您还没有登录，请先登录"
          })
            .then(() => {
              commit('set_islogin', {
                type: 'logout'
              })
              //重新授权
              window.localStorage.removeItem("openId");
              // console.info("重新刷新页面，获取授权");
              WxAuth();
            });
        } else if (res.status == 1) {
          commit('set_islogin', {
            res: res.list,
            type: 'login'
          })
        }
        cb && cb(res);



      })
    },
    //获取授权信息
    async getWechatLoginAction({ commit }, query) {
      let { params, cb } = query
      let res1 = await WechatLogin(params)
      // console.info(res1)
      let user = res1.user_info;
      if (user.openid == undefined) {
        //可能code过期
        window.localStorage.removeItem("openId");
        WxAuth();
      } else {
        //获取信息成功
        window.localStorage.setItem("openId", user.openid);
        let res2 = await getUserAppId({
          open_id: user.openid,
          hearpic: user.headimgurl,
          nickname: user.nickname,
          app_id: "wxb71bfedbc59294fa"
        })
        //获取用户信息
        let res3 = await getUserInfo({
          openid: user.openid
        })

        //初始化微信

        commit('set_islogin', {
          res: res3.list,
          type: 'login'
        })
        commit('set_code', {
          res: user.openid
        })

      }
    },

    //获取微信jdk
    getWechatInfo({ commit }, query) {

      WxShare().then(res => {
        // console.info(res);
      })
    },

    //获取用户
    getUserAppIdAction({ commit }, query) {
      let { params, cb } = query
      getUserAppId(params).then(res => {
        console.info(res);
      })
      cb && cb(res);
    },
    //获取首页
    getIndexAction({ commit }, query) {
      // let { params, cb } = query
      orderListData({
        type: 1,
        openid: this.getters.openid,
        startLong: this.getters.positionlng,
        startLat: this.getters.positionlat
      }).then(res => {
        if (res.status == 1) {
          let isDot = res.list.chat_bubble == 0 ? false : true;
          commit('set_dot', isDot)
          commit('getIndexData', res.list)
        }
      })
    },
    //获取列表页
    getOrderListAction({ commit }, query) {
      let { params } = query
      orderList(params).then(res => {
        commit('getOrderListData', res)
      })
    },
    //获取订单详情页
    getOrderDetailAction({ commit }, query) {
      let { params, cb } = query
      orderFind(params).then(res => {
        commit('getOrderDetailData', res)
      })
    },
    //获取消息列表
    getChatListAction({ commit }, query) {
      let { params, cb } = query
      ChatList({
        uid: this.getters.userInfo.id
      }).then(res => {
        if (res.status == 1 && res.hasOwnProperty("list")) {
          commit('getChatListData', res.list)
        }
      });

    },


  },

  getters: {
    userInfo: state => state.userInfo,
    isLogin: state => state.isLogin,
    uId: state => state.uId,
    openid: state => state.openid,
    showLoading: state => state.showLoading,
    positionlat: state => state.positionlat,
    positionlng: state => state.positionlng,
    positionName: state => state.positionName,
    code: state => state.code,
    isDot: state => state.isDot,
    indexData: state => state.indexData,
    orderListData: state => state.orderListData,
    orderDetailData: state => state.orderDetailData,
    mesInfo: state => state.mesInfo
  }
}
