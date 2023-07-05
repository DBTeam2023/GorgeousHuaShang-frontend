import request from '@/utils/request';

export function doLogin(data) {
    return request({
        url: "/UserIdentification/",
        method: "GET",
        params: data,
    });
}

// todo: 这个后端还没做
export function getUserInfo() {
    return request({
        url: "/user/info/",
        method: "GET",
    })
}

export function doRegister(data) {
    return request({
        url: "/UserIdentification/",
        method: "POST",
        data: data,
    })
}