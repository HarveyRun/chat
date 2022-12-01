const user = {
	state: {
		userInfomation: null
	},
	mutations: {
		SET_USER_INFO(state,data){
			state.userInfomation = data;
		},
	},
	actions: {
		setUserInfo({ commit },data){
			return new Promise(resolve => {
				commit("SET_USER_INFO", data);
				resolve();
			});
		}
	},
	namespaced: true
};
export default user;
