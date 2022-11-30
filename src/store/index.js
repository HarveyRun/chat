import Vue from 'vue';
import Vuex from 'vuex';
import getters from "./getters";
import wsMoules from "./modules/ws";

Vue.use(Vuex);


const store = new Vuex.Store({
	modules: {
		wsMoules
	},
	getters
});

export default store;

//setNum({ commit },data) {
//         console.log("--------123----");
//         console.dir(data);
//       return new Promise(resolve => {
//         setTimeout(() => {
//             commit('setNumberMutation', { number: data.number });
//             resolve("你好");
//         }, 1000);
//       });
//     },