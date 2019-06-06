import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)
console.log(process.env)
export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  // base: "/dist/",
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('./views/index.vue')
    },

    {
      path: '/usercenter',
      name: 'usercenter',
      meta: { title: '个人中心' },
      component: () => import('./views/usercenter')
    },
    {
      path: '/person_info',
      name: 'person_info',
      meta: { title: '个人资料' },
      component: () => import('./views/person_info')
    },
    {
      path: '/common_way',
      name: 'common_way',
      meta: { title: '常用路线管理' },
      component: () => import('./views/common_way')
    },
    {
      path: '/person_edit',
      name: 'person_edit',
      meta: { title: '个人资料' },
      component: () => import('./views/person_edit')
    },
    {
      path: '/car_info',
      name: 'car_info',
      meta: { title: '车辆信息' },
      component: () => import('./views/car_info')
    },
    {
      path: '/car_infoshow',
      name: 'car_infoshow',
      meta: { title: '车辆信息' },
      component: () => import('./views/car_infoshow')
    },
    {
      path: '/car_upload',
      name: 'car_upload',
      meta: { title: '车辆信息' },
      component: () => import('./views/car_upload')
    },
    {
      path: '/pending_trip',
      name: 'pending_trip',
      meta: { title: '待处理行程' },
      component: () => import('./views/pending_trip')
    },
    {
      path: '/order_trip',
      name: 'order_trip',
      meta: { title: '订单界面' },
      component: () => import('./views/order_trip')
    },
    {
      path: '/coupon',
      name: 'coupon',
      meta: { title: '优惠劵' },
      component: () => import('./views/coupon')
    },
    {
      path: '/member',
      name: 'member',
      meta: { title: '会员' },
      component: () => import('./views/member')
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      meta: { title: '评价' },
      component: () => import('./views/evaluate')
    },
    {
      path: '/set',
      name: 'set',
      meta: { title: '设置' },
      component: () => import('./views/set')
    },
    {
      path: '/verify_phone',
      name: 'verify_phone',
      meta: { title: '验证手机号' },
      component: () => import('./views/verify_phone')
    },
    {
      path: '/issue_order',
      name: 'issue_order',
      meta: { title: '发布订单' },
      component: () => import('./views/issue_order')
    },
    {
      path: '/driver_order',
      name: 'driver_order',
      meta: { title: '司机订单发布' },
      component: () => import('./views/driver_order')
    },
    {
      path: '/cash_out',
      name: 'cash_out',
      meta: { title: '提现' },
      component: () => import('./views/cash_out')
    },
    {
      path: '/balance',
      name: 'balance',
      meta: { title: '余额' },
      component: () => import('./views/balance')
    },
    {
      path: '/message',
      name: 'message',
      meta: { title: '我的消息' },
      component: () => import('./views/message')
    },
    {
      path: '/mytrips',
      name: 'mytrips',
      meta: { title: '我的行程' },
      component: () => import('./views/mytrips')
    },
    {
      path: '/notrips',
      name: 'notrips',
      meta: { title: '暂无行程' },
      component: () => import('./components/notrips')
    },
    {
      path: '/bindbank',
      name: 'bindbank',
      meta: { title: '绑定银行卡' },
      component: () => import('./views/bindbank')
    },
    {
      path: '/confirm_order',
      name: 'confirm_order',
      meta: { title: '确认订单' },
      component: () => import('./views/confirm_order')
    },
    {
      path: '/invitate_order',
      name: 'invitate_order',
      meta: { title: '邀请订单' },
      component: () => import('./views/invitate_order')
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      meta: { title: '订单详情' },
      component: () => import('./views/order_detail')
    },
    {
      path: '/setting',
      name: 'setting',
      meta: { title: '常用路线管理' },
      component: () => import('./views/setting')
    },
    {
      path: '/statement',
      name: 'statement',
      meta: { title: '服务协议' },
      component: () => import('./views/statement')
    },
    {
      path: '/search',
      name: 'search',
      meta: { title: '地点查询' },
      component: () => import('./views/search')
    },
    {
      path: '/routeadd',
      name: 'routeadd',
      meta: { title: '常用路线添加' },
      component: () => import('./views/routeadd')
    },
    {
      path: '/chat',
      name: 'chat',
      meta: { title: '聊天' },
      component: () => import('./views/chat')
    },
    {
      path: '/complaint',
      name: 'complaint',
      meta: { title: '投诉' },
      component: () => import('./views/complaint')
    },
    {
      path: '*',
      redirect: "/"
    },


  ]
})

