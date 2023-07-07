import request from '@/utils/request';

// todo: 改成Post     data
// export function doLogin(data) {
//     return request({
//         url: "/api/UserIdentification/login/",
//         method: "GET",
//         params: data,
//     });
// }

// todo: 加api
export function doLogin(data) {
    return request({
        url: "/UserIdentification/user/",
        method: "POST",
        params: data,
    });
}

// todo: 这个后端还没做
export function getUserInfo() {
    return request({
        url: "/api/UserIdentification/getUserInfo/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        }
    })
}

// todo: url 规范
// export function doRegister(data) {
//     return request({
//         url: "/api/UserIdentification/register/",
//         method: "POST",
//         data: data,
//     })
// }
// todo: 加api
export function doRegister(data) {
    return request({
        url: "/UserIdentification/newuser/",
        method: "POST",
        params: data,
    })
}

// 传入jwtToken
export function getUserRoleId() {
    return request({
        url: "/api/UserIdentification/getUserRoleId/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        }
    })
}
