import request from '@/utils/request';

// todo: data
export function doLogin(data) {
    return request({
        url: "/api/UserSystem/user/",
        method: "POST",
        params: data,
    });
}

// todo: headers
export function getUserInfo(data) {
    return request({
        url: "/api/UserSystem/user/",
        method: "GET",
        // headers: {
        //     Authorization: "Bearer " + localStorage.getItem("jwtToken")
        // }
        params: data
    })
}

export function doRegister(data) {
    return request({
        url: "/api/UserSystem/newuser/",
        method: "POST",
        params: data,
    })
}

