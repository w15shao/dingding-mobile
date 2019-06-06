<template>
    <div>

      <ul class="car_uploadbk">
        <li>
          <div class="car_sn1">行驶证图片</div>
          <van-uploader :after-read="onRead" name="0">
            <div class="upload" >
                <img :src="source[0]!=''?source[0]:oneImg" >
              </div>
             
          </van-uploader>
        </li>
        <li>
          <div class="car_sn1">驾驶证图片</div>
          <van-uploader :after-read="onRead" name="1">
            <div class="upload">
                <img :src="source[1]!=''?source[1]:twoImg">
              </div>
          </van-uploader>
        </li>
        <li>
          <div class="car_sn1">身份证正面</div>
          <van-uploader :after-read="onRead" name="2">
            <div class="upload">
                <img :src="source[2]!=''?source[2]:threeImg">
              </div>
          </van-uploader>
        </li>
        <li>
          <div class="car_sn1">身份证反面</div>
          <van-uploader :after-read="onRead" name="3">
            <div class="upload">
                <img :src="source[3]!=''?source[3]:fourImg">
              </div>
          </van-uploader>
        </li>
        <li>
          <div class="car_sn1">车辆正面图片</div>
          <van-uploader :after-read="onRead" name="4">
            <div class="upload">
                <img :src="source[4]!=''?source[4]:fiveImg">
              </div>
          </van-uploader>
        </li>
      </ul>

      <div class="loadbk" v-show="showLoad">
      <van-loading type="spinner" color="white" />
      </div>
      <div class="info_btn" @click="submit">确认</div>
      <fix-box/>
    </div>



</template>
<script>
import { UploadAdd, UserCert, getSwiper } from "@/api";

import { mapGetters } from "vuex";
import common_base from "@/utils/token";
import axios from "axios";
import { isDev } from "@/utils/fetch";
import oneImg from "../assets/xingshizheng.jpg";
import twoImg from "../assets/jiashizheng.jpg";
import threeImg from "../assets/shenfenz1.jpg";
import fourImg from "../assets/shenfenz2.jpg";
import fiveImg from "../assets/cheliang.jpg";
export default {
  data() {
    return {
      source: ["", "", "", "", ""], //img的显示
      imageUrls: [0, 0, 0, 0, 0], //img的id'
      oneImg,
      twoImg,
      threeImg,
      fourImg,
      fiveImg,
      showLoad: false
    };
  },
  computed: {
    ...mapGetters(["openid"])
  },
  methods: {
    onRead(file, detail) {
      console.info(file);
      this.$set(this.source, parseInt(detail.name), file.content);
      this.showLoad = true;

      let formData = new FormData();
      let token = common_base.deal_token();
      let { signal, timestamp, overTimeIvalStr, device } = token;
      formData.append("file", file.file);
      formData.append("signal", signal);
      formData.append("timestamp", timestamp);
      formData.append("overTimeIvalStr", overTimeIvalStr);
      let url = isDev ? "/api/index/add" : "/index.php?s=/Api/index/add";
      axios.post(url, formData).then(res => {
        res = res.data;
        this.showLoad = false;
        this.$set(this.imageUrls, parseInt(detail.name), res);
      });

      // UploadAdd({
      //   formData
      // }).then(res => {
      //   console.info(res);
      //   this.showLoad = false;
      //   this.$set(this.imageUrls, parseInt(detail.name), res);
      //   console.info(this.imageUrls);
      // });
    },

    submit() {
      let [
        positive_pic,
        reverse_pic,
        idcar_zimg,
        idcar_fimg,
        driving_img
      ] = this.imageUrls;
      // let { car_id, car_num, car_color, car_truename } = this.$route.path;
      let { car_id, car_num, car_color, car_truename } = this.$route.query;
      // console.info(car_id, car_num, car_color, car_truename);
      // console.log(
      //   positive_pic,
      //   reverse_pic,
      //   idcar_zimg,
      //   idcar_fimg,
      //   driving_img
      // );

      if (
        positive_pic &&
        reverse_pic &&
        idcar_zimg &&
        idcar_fimg &&
        driving_img
      ) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "上传后不能再修改，确认修改"
          })
          .then(() => {
            getSwiper();

            UserCert({
              openid: this.openid,
              positive_pic,
              reverse_pic,
              driving_img,
              idcar_zimg,
              idcar_fimg,
              driving_img,
              car_id,
              car_num,
              car_color,
              turename: car_truename
            }).then(res => {
              console.info(res);
              this.$toast(res.info);
              if (res.status == 1) {
                this.$router.push("/");
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$dialog.alert({
          title: "提示",
          message: "完善相关信息"
        });
      }
    }
  },
  mounted() {
    // console.info(this.$route.query);
    let { car_id, car_num, car_color, car_truename } = this.$route.query;
    console.log(car_id, car_num, car_color, car_truename);
  }
};
</script>
<style>
.loadbk {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgba(0, 0, 0, 0.6);
  width: 2rem;
  height: 2rem;
  margin: -1rem 0 0 -1rem;
  border-radius: 6%;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>

<style lang="less" scoped>
body {
  background: #f2f2f2;
}
.car_uploadbk {
  // display: flex;
  text-align: center;
  color: #333;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0 0.6rem;
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


