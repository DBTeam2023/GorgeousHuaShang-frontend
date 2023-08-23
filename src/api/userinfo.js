import request from '@/utils/request';

// 获取用户个人信息
export function getUserInfo() {
    return request({
        url: "/api/UserSystem/getUserInfo/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

// 修改用户信息
export function updateUserInfo(data){
    return request({
        url:"/api/UserSystem/update/",
        method:"POST",
        data:data,
    })
}

// 修改用户头像
export function modifyUserAvatar(data){
    return request({
        url:" https://mock.apifox.cn/m1/2970478-0-default/api/UserSystem/modifyUserAvatar/",
        method:"POST",
        headers: {
            'Content-Type': 'application/form-data',
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}