import request from '@/utils/request';

// todo: 改成Post     data
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
        url: "/api/getuserinfo/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        }
    })
}

// todo: url 规范
export function doRegister(data) {
    return request({
        url: "/UserIdentification/",
        method: "POST",
        data: data,
    })
}