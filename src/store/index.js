import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: '张三',
    number: 0,
  },
  mutations: {
    setNumberMutation(state,data) {
      state.number = data.number;
    },
  },
  actions: {
    setNum({ commit },data) {
        console.log("--------123----");
        console.dir(data);
      return new Promise(resolve => {
        setTimeout(() => {
            commit('setNumberMutation', { number: data.number });
            resolve("你好");
        }, 1000);
      });
    },
    wsMessage(e){
      console.log("------store----------");
      console.log(e);
    },
    wsOpen({ commit },data){
       console.log(`用户${data.userId},成功创建会话`)
    },
    wsClose(e){
        console.log("服务器关闭");
    },
    wsError(e){
        console.log("连接出错");
    },
  }
});

export default store;