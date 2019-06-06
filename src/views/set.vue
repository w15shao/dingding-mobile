<template>


<div class="set_bk">
  <van-cell-group>
    <van-switch-cell v-model="checked" title="开启拼车提醒（总开关）" />
  </van-cell-group>  
  <div class="set_tip">温馨提示：开启拼车提醒前，请先点击下方绑定平台!</div>
  <div class="check_bk">
      <van-checkbox v-model="checked2" shape="square" checked-color="#fff">有顺路的乘客或车主时通知我</van-checkbox>
<van-checkbox v-model="checked3"  shape="square" checked-color="#fff">有拼友给我发私信消息时通知我</van-checkbox>
  </div>
<div class="pendbar" style="margin-top:1rem;">
        <div class="pendsnlf">绑定平台<i>(已绑定)</i></div>
        <div class="pendrg">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="pendbar">
        <div class="pendsnlf">绑定手机<i>(已绑定)</i></div>
         <div class="pendrg">
          <van-icon name="arrow" />
        </div>
      </div>
 <fix-box/>
</div> 
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      checked2: false,
      checked3: false
    };
  }
};
</script>
<style lang="less">
.van-icon-arrow:before {
  content: "\F00A";
  color: #ccc;
  font-size: 0.5rem;
}
.van-checkbox__icon,
.van-checkbox__label {
  line-height: 0.35rem !important;
}
.van-checkbox__icon .van-icon {
  border: 0.02667rem solid #e5e5e5 !important;
  width: 0.35rem;
  height: 0.35rem;
  line-height: 0.35rem !important;
}
.van-checkbox__icon--checked .van-icon-success:before {
  color: #ff9451;
}
.set_bk {
  background: #fff;
  .check_bk {
    margin-left: 0.6rem;
    margin-top: 0.45rem;
  }
}
</style>


<style lang="less" scoped>
.van-switch {
  background: #e6e6e6;
}
.van-cell__title {
  padding-left: 0.2rem;
}
.van-hairline--top-bottom::after {
  border: 0;
}
.van-switch--on {
  background-color: #38b5f0;
}
.set_tip {
  color: #ff9451;
  font-size: 0.32rem;
  padding-left: 0.6rem;
}
.pendbar {
  border-bottom: 0.01rem solid #f2f2f2;
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 0.4rem;
  .pendsnlf {
    font-size: 0.37rem;
    color: #333;
    float: left;
    i {
      color: #44c970;
      padding-left: 0.2rem;
    }
  }
  .pendrg {
    float: right;
  }
}
</style>

