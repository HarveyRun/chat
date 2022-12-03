import axios from "axios";

const service = axios.create({
	baseURL: '/api', 
	timeout: 50000,
});

let loadingInstance;

service.defaults.headers.common["Content-Type"] =
	"application/json;charset=UTF-8";

service.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = localStorage.getItem("token") || "";
		if (config.loading) {
			loadingInstance = Loading.service({ background: "transparent" });
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
	async (response) => {

		if (response.config.loading) {
			loadingInstance.close();
		}
		
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default service;
