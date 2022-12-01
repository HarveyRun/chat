import Vue from 'vue';
import Vuex from 'vuex';
import getters from "./getters";
import wsMoules from "./modules/ws";
import userMoules from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		wsMoules,
		userMoules
	},
	getters
});

export default store;
