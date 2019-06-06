import SHA2 from './sha1'
import cookie from './cookie'

var common_base = {};
// 访问接口需要密钥
var token = 'BRAND';
common_base.deal_token = function () {
  var temp_array = new Array(),
    timestamp, overTimeIvalStr, temp, temp_signal, signal, Token, jsonTmpl;
  Token = {};

  timestamp = Date.parse(new Date()) / 1000;
  overTimeIvalStr = timestamp + 120;
  temp = timestamp + token;
  temp_array = temp.split("");
  temp_signal = Array.prototype.sort.call(temp_array, function (a, b) {
    return a.charCodeAt(0) - b.charCodeAt(0)
  });
  temp_signal = temp_signal.join("");
  signal = SHA2(temp_signal);
  Token = {
    signal: signal,
    timestamp: timestamp,
    overTimeIvalStr: overTimeIvalStr,
    device: 'wechat'
  };
  return Token
}
common_base.check_token = function () {

  var temp_array = new Array(),
    timestamp, overTimeIvalStr, temp, temp_signal, signal, Token, jsonTmpl;
  Token = {};

  timestamp = Date.parse(new Date()) / 1000;
  overTimeIvalStr = timestamp + 120;
  temp = timestamp + token;
  temp_array = temp.split("");
  temp_signal = Array.prototype.sort.call(temp_array, function (a, b) {
    return a.charCodeAt(0) - b.charCodeAt(0)
  });
  temp_signal = temp_signal.join("");
  signal = SHA2(temp_signal);
  return signal;
}

export default common_base;
