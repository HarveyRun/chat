import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import EventBus from './lib/eventBus'
import  "./utils/native";
import 'ant-design-vue/dist/antd.css'
import "@/styles/business-style.css";
import "@/styles/business-style-Impl.css";


Vue.config.productionTip = false;

Vue.use(Antd);
Vue.prototype.$EventBus = EventBus


router.beforeEach(async (to, from, next) => {
	const hasToken = localStorage.getItem("token");
	if(hasToken){
		next();
	}else{
		if (to.path === "/login") {
			next();
		}else{
			next(`/login?redirect=${to.path}`);
		}
	}
});

new Vue({
	el: "#app",
	router,
	store,
	render: (h) => h(App)
});