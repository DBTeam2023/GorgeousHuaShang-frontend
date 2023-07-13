import request from '@/utils/request';

// todo: data
export function doLogin(data) {
    return request({
        url: "/api/UserSystem/user/",
        method: "POST",
        data: data,
    });
}

// todo: headers
export function getUserInfo(data) {
    return request({
        url: "/api/UserSystem/userlnfo/",
        method: "POST",
        // headers: {
        //     Authorization: "Bearer " + localStorage.getItem("jwtToken")
        // }
        data: data
    })
}

export function doRegister(data) {
    return request({
        url: "/api/UserSystem/newuser/",
        method: "POST",
        data: data,
    })
}

