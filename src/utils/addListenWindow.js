// if (typeof window !== 'undefined') {
//   window.onresize = () => {
//     console.log('123')
//     var wWidth = document.documentElement.clientWidth
//     // console.log(wWidth)
//     if (wWidth > 750) {
//       console.info(222)
//       window.location.href = '/index.html'
//       return
//     }
//   }
// }
//  window.location.href = '/jindian-mobile/dist/index.html'
// var system = {
//   win: false,
//   mac: false,
//   xll: false,
//   ipad: false
// };
//检测平台
// var p = navigator.platform;
// system.win = p.indexOf("Win") == 0;
// system.mac = p.indexOf("Mac") == 0;
// system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
// system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
// //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
// if (system.win || system.mac || system.xll) {

// } else {

//   window.location.href = '/index.html'

// }