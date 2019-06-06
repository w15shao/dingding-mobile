<template>
  <div>
   
    <div class="pend_bk">
      <div class="pend_top">
        <div class="pend_tup"><img src="../assets/touxiang1.png" alt=""></div>
        <div class="pend_info">
          <div class="pend_name">张三
            <div class="pend_star star_position">
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
          <div class="pend_txt1">奥迪</div>
          <div class="pend_txt1">蓝色</div>
          

        </div>
        <div class="pend_toptip">
          <div class="pendsn1">4座</div>
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
        <div class="pendsnlf">等待司机确认中.....</div>
        <div class="pendbtn1">取消申请</div>
      </div>
      <div class="pendbar">
        <div class="pendsnlf">司机等待确认中</div>
        <div class="pendbtn3">取消</div>
        <div class="pendbtn2">确认</div>
        
      </div>
    </div>
    <fix-box/>
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
<style lang="less" scoped>
</style>



