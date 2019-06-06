<template>
  <div class="loading-wrapper" v-show="showLoading">
    <van-loading size="60px"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'showLoading'
    ])
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit('SET_LOADING', false) 
    }, 500)
  }
}
</script>

<style lang="less" scoped>
  .loading-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    z-index: 111111111111;
  }
</style>
