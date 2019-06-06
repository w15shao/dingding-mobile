<template>
<div class="car_info" v-if="Object.keys(userInfo).length>0">
  
<van-cell-group>
  <van-cell title="车牌号" :value="userInfo.car_id" />
  <van-cell title="车辆型号" :value="userInfo.car_num" />
  <van-cell title="车辆颜色" :value="userInfo.car_color" />
  <van-cell title="车主姓名" :value="userInfo.turename" />
</van-cell-group>
 <ul class="car_uploadbk">
       
        <li>
          <div class="car_sn1">驾驶证图片</div>         
            <div class="upload">
                <img :src="userInfo.positive_pic">
              </div>        
        </li>
         <li>
          <div class="car_sn1">行驶证图片</div>        
            <div class="upload" >
                <img :src="userInfo.reverse_pic" >
              </div>    
        </li>
        <li>
          <div class="car_sn1">身份证正面</div>          
            <div class="upload">
                <img :src="userInfo.idcar_zimg">
              </div>
         
        </li>
        <li>
          <div class="car_sn1">身份证反面</div>       
            <div class="upload">
                <img :src="userInfo.idcar_fimg">
              </div>
         
        </li>
        <li>
          <div class="car_sn1">车辆正面图片</div>        
            <div class="upload">
                <img :src="userInfo.driving_img">
              </div>
         
        </li>
      </ul>

<div class="info_btn">{{userInfo.status == '1'?'审 核 中':'编 辑' }}</div>
<fix-box/>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo", "openid"])
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="css" >
body {
  background: #f1f5f8;
}
.car_info {
  text-align: left;
  box-shadow: 0rem 0.05rem 0.12rem 0rem rgba(222, 222, 222, 0.42);
  margin: 0.15rem;
}
.car_info .van-field__control {
  text-align: right;
}
</style>
<style lang="less" scoped>
.car_uploadbk {
  // display: flex;
  text-align: center;
  color: #333;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0 0.3rem;
  background: #f2f2f2;
  overflow: hidden;
  height: 100%;
  /* margin: 0.65rem 0; */
  padding-top: 0.65rem;
  padding-bottom: 2rem;
  .car_sn1 {
    margin-bottom: 0.2rem;
  }
  li {
    width: 4.13rem;
    margin-bottom: 0.6rem;
    float: left;
    &:nth-child(2n + 1) {
      margin-right: 0.35rem;
    }
    &:last-child {
      width: 7.47rem;

      margin-right: 0;
      float: none;
      margin: 0 auto;
      clear: both;
      img {
        width: 100%;
        height: 3.6rem;
        width: 6.7rem;
      }
    }
    .upload {
      border: solid 0.03rem #cccccc;

      padding: 0.2rem;
      border-style: dashed;
    }
    .car_sn1 {
      font-size: 0.43rem;
    }
    img {
      width: 100%;
      width: 3.7rem;
      height: 2.6rem;
    }
  }
}
</style>

