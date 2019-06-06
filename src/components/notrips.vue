<template>
  <div>
  <div class="notrips">
    <div  v-if="type&&type==1">
     <div class="loadbk" >
      <van-loading type="spinner"  size="50px" color="white" />
    </div>
      <div class="loadtxt">加载中...</div>
    </div>
    <div v-else>
    <img src="../assets/notrips.png" alt="">
    <div class="noData">
      暂无数据
    </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["type"]
};
</script>

<style lang="less" scoped>
.notrips {
  height: 12rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  img {
    width: 2.48rem;
    height: 2.17rem;
  }
  .noData {
    font-size: 0.36rem;
    color: #666666;
    margin-top: 0.36rem;
    text-align: center;
    letter-spacing: 0.14rem;
  }
}
.loadbk {
  background: rgba(0, 0, 0, 0.4);
  padding: 0.4rem;
  border-radius: 10%;
  text-align: center;
  margin: 0 auto;
}
.loadtxt {
  text-align: center;
}
</style>

