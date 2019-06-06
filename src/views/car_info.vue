<template>
<div class="car_info">
  <van-cell-group>
  <van-field  v-model="car_id"
    type="text"
    label="车牌号"
    placeholder="例:浙c888888" 
   />
   <van-field  v-model="car_num"
    type="text"
    label="车辆型号"
    placeholder="例:宝马A4"
   />
   <van-field  v-model="car_color"
    type="text"
    label="车辆颜色"
    placeholder="例：黑色"
   />
    <van-field  v-model="car_truename"
    type="text"
    label="车主姓名"
    placeholder="请填写真实姓名"
   />
</van-cell-group>
<div class="info_btn" @click="next">下一步</div>
<fix-box/>
</div>
</template>
<script>
export default {
  data() {
    return {
      car_id: "",
      car_num: "",
      car_color: "",
      car_truename: ""
    };
  },
  methods: {
    next() {
      if (
        this.car_id == "" ||
        this.car_num == "" ||
        this.car_color == "" ||
        this.car_truename == ""
      ) {
        this.$dialog.alert({
          title: "提示",
          message: "请完善相关内容"
        });
      } else {
        this.$router.push({
          path: "car_upload",
          query: {
            car_id: this.car_id,
            car_num: this.car_num,
            car_color: this.car_color,
            car_truename: this.car_truename
          }
        });
      }
    }
  }
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

