import fetch from '@/utils/fetch'

/*
 *@param {*} query 参数 String
 *@method {*} 请求方式 Object
 *@url {*} 请求地址 String
 */

//获取轮播图
export function getSwiper(query) {
  return fetch({
    url: "index/index",
    method: 'get',
    params: query
  })
}
//获取用户信息
export function getUserInfo(query) {
  console.info(query);
  return fetch({
    url: "User/userinfo",
    method: 'post',
    params: query
  })
}

//获取openid
export function WechatLogin(query) {
  return fetch({
    url: 'Wechat/login',
    method: 'get',
    params: query
  })

}
export function getUserAppId(query) {
  return fetch({
    url: "Myuser/getUserByOpenIdAndAppId",
    method: "get",
    params: query
  })
}

//上传图片
export function UploadAdd(query) {
  console.log(query)
  return fetch({
    url: "index/add",
    method: "get",
    params: query

  })
}
//微信分享信息
export function WxShare(query) {
  console.log(query)
  return fetch({
    url: "Base/share",
    method: "post",
    params: query

  })
}
//我的发布
export function OrderList(query) {
  return fetch({
    url: "User/orderlist",
    method: "post",
    params: query

  })
}

// "is_look": "1",0 申请中 1审核通过 2已锁

//删除发布订单
export function OrderDel(query) {
  return fetch({
    url: "User/orderdel",
    method: "post",
    params: query
  })
}

//车主认证接口
export function UserCert(query) {
  console.info(23);
  return fetch({
    url: 'User/certification',
    method: 'post',
    params: query
  })
}

// 获取手机验证码
export function getMobileCode(query) {
  return fetch({
    url: 'user/getCodeNew',
    method: 'get',
    params: query
  })
}
//修改个人信息
export function setUserInfo(query) {
  return fetch({
    url: "User/set_userinfo",
    method: "post",
    params: query
  })
}
//获取配置信息
export function setUpData(query) {
  return fetch({
    url: "index/setupdata",
    method: "post",
    params: query
  })
}
//获取时间
export function getThisTime(query) {
  return fetch({
    url: "index/thistime",
    method: "post",
    params: query
  })
}
//计算乘客价格
export function getPrice(query) {
  return fetch({
    url: "Index/jisuanprice",
    method: "post",
    params: query
  })
}
//人数变更获取价格变化
export function getChangePrice(query) {
  return fetch({
    url: "index/setpricenum",
    method: "post",
    params: query
  })
}
//提交订单
export function addOrder(query) {
  return fetch({
    url: "index/add_order",
    method: "post",
    params: query
  })
}
//订单接口
export function orderListData(query) {
  return fetch({
    url: "index/indexorder",
    method: "post",
    params: query
  })
}
//删除订单接口
export function orderDel(query) {
  return fetch({
    url: "order/orderdel",
    method: "post",
    params: query
  })
}
//常用路线管理
export function routeList(query) {
  return fetch({
    url: "index/routelist",
    method: "post",
    params: query
  })
}
//删除路线
export function routeDel(query) {
  return fetch({
    url: "index/routedel",
    method: "post",
    params: query
  })
}
//订单列表
export function orderList(query) {
  return fetch({
    url: "order/orderlist",
    method: "post",
    params: query
  })
}
//申请同意
export function checkOrderList(query) {
  return fetch({
    url: "Order/checkorderlist",
    method: "post",
    params: query
  })
}

//订单状态改变 
export function orderListType(query) {
  return fetch({
    url: "Order/orderlisttype",
    method: "post",
    params: query
  })

}
//同意申请
export function AddOrder(query) {
  return fetch({
    url: "Order/addOrder",
    method: "post",
    params: query
  })
}

//某一条订单数据
export function orderFind(query) {
  return fetch({
    url: "order/orderfind",
    method: "post",
    params: query
  })
}
//取消订单
export function ApiOrderDel(query) {
  return fetch({
    url: "Order/orderdel",
    method: "post",
    params: query
  })
}
//优惠劵
export function CouponList(query) {
  return fetch({
    url: "User/coupon_list",
    method: "post",
    params: query
  })
}
//确认到达
export function OrderStatus(query) {
  return fetch({
    url: "Order/orderstatus",
    method: "post",
    params: query
  })
}
//资金列表
export function MoneyList(query) {
  return fetch({
    url: "user/moneylist",
    method: "post",
    params: query
  })
}

//绑定银行卡
export function SetBank(query) {
  return fetch({
    url: "User/set_bank",
    method: "post",
    params: query
  })
}
//提现
export function PutForward(query) {
  return fetch({
    url: "User/putforward",
    method: "post",
    params: query
  })
}
//将client_id发给后台进行uid绑定

export function GateBind(query) {
  return fetch({
    url: "gate/bind",
    method: "post",
    params: query
  })
}

//车主支付订单
export function PayJoinFee(query) {
  return fetch({
    url: "order/h5payJoinfee",
    method: "post",
    params: query
  })
}
//增加常用路线
export function RouteAdd(query) {
  return fetch({
    url: "Index/routeadd",
    method: "post",
    params: query
  })
}
//聊天
export function Chat(query) {
  return fetch({
    url: "Chat/message",
    method: "post",
    params: query
  })
}
//附近数量
export function indexCount(query) {
  return fetch({
    url: "index/nearCount",
    method: "post",
    params: query
  })
}

//聊天列表
export function ChatList(query) {
  return fetch({
    url: "chat/chatList ",
    method: "post",
    params: query
  })
}
//聊天详情
export function ChatDetail(query) {
  return fetch({
    url: "Chat/chat ",
    method: "post",
    params: query
  })
}
//聊天发送
export function ChatSend(query) {
  return fetch({
    url: "Chat/message",
    method: "post",
    params: query
  })
}
//确认已读
export function ChatReaded(query) {
  return fetch({
    url: "chat/chatRead",
    method: "post",
    params: query
  })
}
//评价标签
export function TagList(query) {
  return fetch({
    url: "Order/taglist",
    method: "post",
    params: query
  })
}
//提交评价
export function SubGrade(query) {
  return fetch({
    url: "Order/subgrade",
    method: "post",
    params: query
  })
}
//投诉
export function Orderts(query) {
  return fetch({
    url: "Order/orderts",
    method: "post",
    params: query
  })
}

// oefm84qKLSIxqIxs6fRwjlsMcRio

// is_status 0 :取消订单
// // 注册
// export function postRegister(query) {
//   return fetch({
//     url: '/User/register',
//     method: 'post',
//     params: query
//   })
// }

// // 登录
// export function postLogin(query) {
//   return fetch({
//     url: '/User/login',
//     method: 'post',
//     params: query
//   })
// }

// // 登出
// export function postLogout(query) {
//   return fetch({
//     url: '/User/logout',
//     method: 'post',
//     params: query
//   })
// }

// // 修改密码
// export function updatePwdApi(query) {
//   return fetch({
//     url: '/User/reset_password',
//     method: 'post',
//     params: query
//   })
// }

// // 图片上传
// export function uploadImageFile(query) {
//   return fetch({
//     url: '/File/uploadPictures',
//     method: 'post',
//     params: query
//   })
// }

// // 自定义表单提交数据
// export function customSubmitFormApi(query) {
//   return fetch({
//     url: '/Relation/update',
//     method: 'post',
//     params: query
//   })
// }

// // 获取导航栏目
// export function getNavsList(query) {
//   return fetch({
//     url: '/Category/get_lists',
//     method: 'post',
//     params: query
//   })
// }

// // 多分类分模块进行数据加载
// export function getMoreModuleData(query) {
//   return fetch({
//     url: '/Article/index_data',
//     method: 'get',
//     params: query
//   })
// }

// // 根据分类获取数据列表
// export function getArticleList(query) {
//   return fetch({
//     url: '/Article/index',
//     method: 'get',
//     params: query
//   })
// }

// // 获取内容详情
// export function getArticleDetails(query) {
//   return fetch({
//     url: '/Article/detail',
//     method: 'post',
//     params: query
//   })
// }

// // 上一篇和下一篇数据
// export function getArticlePrevAndNext(query) {
//   return fetch({
//     url: '/Article/front_after_data',
//     method: 'post',
//     params: query
//   })
// }

// // 新版获取数据列表带搜索
// export function getRelationIndex(query) {
//   return fetch({
//     url: '/Relation/index',
//     method: 'post',
//     params: query
//   })
// }

// // 取消删除数据
// export function delRelationDataApi(query) {
//   return fetch({
//     url: '/Relation/setStatus',
//     method: 'post',
//     params: query
//   })
// }

// // 获取商标推荐位
// export function getPositionApi(query) {
//   return fetch({
//     url: '/Brand/index_promotion',
//     method: 'get',
//     params: query
//   })
// }

// // 获取商标详情
// export function getBrandDetails(query) {
//   return fetch({
//     url: '/Brand/detail',
//     method: 'post',
//     params: query
//   })
// }