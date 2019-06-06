<template>
  <div>
    <van-cell title="4位顺路乘客" is-link arrow-direction="down" value="筛选" @click="show=!show"/>
    <van-popup v-model="show" position="bottom" :overlay="false">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    </van-popup>
    <div class="pend_bk">
      <div class="pend_top">
        <div class="pend_tup"><img src="../assets/touxiang1.png" alt=""></div>
        <div class="pend_info">
          <div class="pend_name">张三 <span><img src="../assets/woman.png" alt="">
          <img src="../assets/man.png" alt="">
          
          </span>
          </div>
          <div class="pend_star">
            <img src="../assets/wuxing pingfen.png"
             alt="">
             <img src="../assets/wuxing pingfen.png"
             alt="">
             <img src="../assets/wuxing pingfen.png"
             alt="">
             <img src="../assets/wuxing pingfen.png"
             alt="">
             <img src="../assets/wuxing pingfen.png"
             alt="">
          </div>

        </div>
        <div class="pend_toptip">
          <div class="pendsn1">1人</div>
          <div class="pendsn2">80%的顺路程度</div>
        </div>
        
      </div>

      <div class="pend_main">
        <div class="pendlf">
          <div class="pend1"><img src="../assets/shijian.png" alt="">2018年7月31日 13:09</div>
          <div class="pend2">温州科技城</div>
          <div class="pend3">温州大学</div>
          <div class="pend4">备注：有急事</div>
          
        </div>
        <div class="pendrg"><i>35.4</i>元</div>
      </div>
      <div class="pendbar">
        <div class="pendsnlf">等待乘客确认中.....</div>
        <div class="pendbtn1">取消邀请</div>
      </div>
      <div class="pendbar">
        <div class="pendsnlf">乘客等待确认中</div>
        <div class="pendbtn2">确认</div>
      </div>


    </div>






  </div>
  



</template>
<script>
export default {
  data() {
    return {
      show: false,
      columns: ["全部", "男", "女"]
    };
  },
  methods: {
    onConfirm(value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.$toast("取消");
    }
  }
};
</script>

<style>
body {
  background: #f1f5f8;
}
</style>
<style lang="less" scoped>
</style>



