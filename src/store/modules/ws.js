window.wsOpen = (data) => {
	console.log("成功创建会话")
}
window.wsClose = (data) => {
	console.log("服务器关闭");
}
window.wsError = (data) => {
	console.log("连接出错");
}

const ws = {
	state: {
		wsExample: null,
		chatList: [],
		count:0
	},
	mutations: {
		CREATE_CONNECT(state,data){
			if(state.count < 251){
				let wsUrl = `ws://127.0.0.1:7070?userid=${data.userId}`
				state.wsExample = new WebSocket(wsUrl);
				state.wsExample.onopen = window.wsOpen;
				state.wsExample.onclose = window.wsClose;
				state.wsExample.onerror = window.wsError;
				state.count++;
			}else{
				alert("连接已打上线");
			}
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
