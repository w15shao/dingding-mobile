var xmlHttp;

//判断浏览器是否支持ActiveX控件

if (window.ActiveXObject) {

  //支持-通过ActiveXObject的一个新实例来创建XMLHttpRequest对象

  xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

}

//不支持

else if (window.XMLHttpRequest) {

  xmlHttp = new XMLHttpRequest()

}
