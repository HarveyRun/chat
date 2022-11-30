import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import EventBus from './lib/eventBus'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.prototype.$EventBus = EventBus

new Vue({
	el: "#app",
	router,
	store,
	render: (h) => h(App)
});