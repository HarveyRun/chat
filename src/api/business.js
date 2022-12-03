import request from "@/utils/request";

export function login(data) {
	return request({
		url: "/user/login",
		method: "post",
		data,
	});
}

export function regiterReq(data) {
	return request({
		url: "/user/register",
		method: "post",
		data,
	});
}

export function logout() {
	return request({
		url: "/user/outLogin",
		method: "get",
	});
}

export function getFriendsReq(data) {
	return request({
		url: "/relation/findFriendsRequest",
		method: "post",
		data,
	});
}

export function getMustUserReq(data) {
	return request({
		url: "/user/userMuster",
		method: "post",
		data,
	});
}

export function findFriends(data) {
	return request({
		url: "/user/findPhoneByUser",
		method: "post",
		data,
	});
}

export function addFriends(data) {
	return request({
		url: "/relation/addFriends",
		method: "post",
		data,
	});
}

export function checkIsFriendReq(data) {
	return request({
		url: "/relation/checkIsFriend",
		method: "post",
		data,
	});
}


export function addFriendsResultReq(data) {
	return request({
		url: "/relation/handleFriendsRequest",
		method: "post",
		data: data.data,
		params: data.params
	});
}


export function getFriendsListReq(data) {
	return request({
		url: "/relation/getFriendList",
		method: "post",
		data
	});
}