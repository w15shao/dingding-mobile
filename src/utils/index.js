/*
 * @srt {string|number} 
 */

// 验证手机号
export function isPhoneAvailable(str) {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  return myreg.test(str)
}
//验证银行卡
export function isBankAvailable(str) {
  const myreg = /^([1-9]{1})(\d{14}|\d{18})$/
  return myreg.test(str)
}

// 验证邮箱
export function isEmailAvailable(str) {
  const myreg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  return myreg.test(str)
}

// 时间戳转日期 2019-3-11 long 2019-3-11 15:00
export function format(data, long) {
  let date = new Date(data * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() + ':'
  let m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()
  //console.log(Y+M+D+h+m)
  if (long) return Y + M + D + h + m
  return Y + M + D
}

//格式化Thu May 12 2017 08:00:00 GMT+0800 (中国标准时间)  至 2019-3-11 15:00
export function formatTime(data, type = 1) {

  let date = new Date(data);
  let date_value
  if (type == 1) {
    date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
  } else {
    date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  }

  return date_value

}


export function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }
  return i;
}

// export function CompareTime(begintime,endtime){
//   let starttime = new Date(Date.parse(begintime));
//   let endtime = new Date(Date.pares(endtime));
//   //进行比较
//   return (curTime>=starttime && cutTime<=endtime);
// }

// 区间内随机数
export function randomFrom(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

export function getAuditsTextByStatus(value) {
  switch (value) {
    case '-1':
      return '删除'
    case '0':
      return '禁用'
    case '1':
      return '已发布'
    case '2':
      return '待审核'
    case '3':
      return '草稿'
    default:
      return ''
  }
}

