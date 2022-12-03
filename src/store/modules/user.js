const user = {
	state: {
		userInfomation: null,
		userLoginStatus: false
	},
	mutations: {
		SET_USER_INFO(state,data){
			state.userInfomation = data;
		},
		SET_USER_STATUS(state,data){
			state.userLoginStatus = data;
		}
	},
	actions: {
		setUserInfo({ commit },data){
			return new Promise(resolve => {
				commit("SET_USER_INFO", data);
				resolve();
			});
		},
		setUserStatus({ commit },data){
			return new Promise(resolve => {
				commit("SET_USER_STATUS", data);
				resolve();
			});
		}
	},
	namespaced: true
};
export default user;
