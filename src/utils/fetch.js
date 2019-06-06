// import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import { Toast } from 'vant'
// const common_base = require('./token')
import common_base from './token'

export const isDev = process.env.NODE_ENV === 'development'

/**
  * @axios  配置axios参数
  * @baseUrl {string} 基地址
  * @timeout {number} 请求回调最大时间范围
  * @withCredentials {boolean} 是否跨域
  */

const service = axios.create({
  baseURL: isDev ? '/api' : '/index.php?s=/Api',
  timeout: 600000,
  withCredentials: true
})

/**
  * @request axios请求拦截器
  * @config {object} 请求一系列参数
  * @data {object} post请求 formData 参数
  * @headers {object} 配置请求头  可自定义配置
  * @methods {string} 请求方式
  * @params {object} get请求 参数
  * @url {string} 请求地址
*/

function changeUrl(arr) {
  var str = '';
  for (let key in arr) {
    str = `${str}&${key}=${arr[key]}`
  }
  return str
}

service.interceptors.request.use(
  config => {
    let token = common_base.deal_token()
    // if (config.method === 'get') {
    //   config.params = {
    //     ...config.params,
    //     ...token
    //   }
    // }
    // console.log(config)
    config.data = {
      ...config.data,
      ...token
    }
    if (config.method === 'post') {
      config.data = Object.assign({}, config.data, config.params)
      config.params = Object.create(null)
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else {
      config.params = Object.assign(token, config.params)
      config.url = config.url + changeUrl(config.params)
      config.params = Object.create(null)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
  * @response axios响应拦截器
  */

service.interceptors.response.use(
  response => {

    const res = response.data
    return res
    //获取微信相关信息
    // if (res.status == -2) {
    //   var jump_link = window.location.href;
    //   jump_link = encodeURIComponent(jump_link);
    //   self.location.href = api_base_url + "Index/login&jump_link=" + jump_link;


    // } else {

    // if (result && result.share_info) {
    //   var share_info = result.share_info;
    //   var shareData = {
    //     "title": share_info.title,
    //     "desc": share_info.description,
    //     "link": share_info.url,
    //     "imgUrl": share_info.img,
    //     "pkg": {
    //       "appId": share_info.pkg.appId,
    //       "timestamp": share_info.pkg.timestamp,
    //       "nonceStr": share_info.pkg.nonceStr,
    //       "signature": share_info.pkg.signature
    //     }
    //   };
    //   wechat.init(shareData);
    // }
    // }
    // else if (res.status == 0) {
    //   // Toast({
    //   //   message: res.info,
    //   //   className: 'rewriteToastStyle'
    //   // })
    //   return res
    // }
    // else if (res.status == -1) {
    //   Toast({
    //     message: '登录失效, 或未登录, 前往登录',
    //     // className: 'rewriteToastStyle'
    //   })
    //   store.commit('SET_USER_LOGINS_STATUS', {
    //     type: 'logout'
    //   })
    //   store.commit('CLEAR_USERID')
    //   // router.replace({ path: '/login' })
    //   return Promise.reject(res)
    // } else {
    //   return res
    // }
    // else {
    //   Toast({
    //     message: res.info,
    //     // className: 'rewriteToastStyle'
    //   })
    //   return Promise.reject(res)
    // }
  },
  error => {
    Toast('请求超时, 联系技术人员')
    if (401 === error.response.status) {
      window.location = '/login';
    } else {
      return Promise.reject(error);
    }
    // return Promise.reject(error)
  }
)
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default service


