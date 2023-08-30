import request from '@/utils/request';

// todo: data
export function doLogin(data) {
    return request({
        url: "/api/UserSystem/login/",
        method: "POST",
        data: data,
    });
}

export function getUserInfo() {
    return request({
        url: "/api/UserSystem/getUserInfo/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

export function doRegister(data) {
    return request({
        url: "/api/UserSystem/register/",
        method: "POST",
        data: data,
    })
}