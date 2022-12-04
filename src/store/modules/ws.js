window.wsOpen = (data) => {
	console.log("成功创建会话")
}
window.wsClose = (data) => {
	console.log("断开连接");
}
window.wsError = (data) => {
	console.log("连接出错");
}

const ws = {
	state: {
		wsExample: null,
		chatList: []
	},
	mutations: {
		CREATE_CONNECT(state,data){
			if(!data.userId){
				alert("未获取到用户信息");
				return;
			}
			let wsUrl = `ws://127.0.0.1:8085/websocket/userId=${data.userId}`
			state.wsExample = new WebSocket(wsUrl);
			state.wsExample.onopen = window.wsOpen;
			state.wsExample.onclose = window.wsClose;
			state.wsExample.onerror = window.wsError;
		},
		PUT_CHAT(state,data){
			state.chatList = data;
		}
	},
	actions: {
		createConnect({ commit },data){
			return new Promise(resolve => {
				commit("CREATE_CONNECT", data);
				resolve();
			});
		},
		setChatList({ commit },data){
			return new Promise(resolve => {
				commit("PUT_CHAT", data);
				resolve();
			});
		}
	},
	namespaced: true
};
export default ws;
