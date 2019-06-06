import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,

  },
  plugins: [
    createVuexAlong({
      name: "hello", // 设置保存的集合名字，避免同站点下的多项目数据冲突
      session: {
        list: ["app",] // 保存 count 和模块 ma 中的 a1 到 sessionStorage
      }
    })
  ]
})
