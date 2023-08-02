import request from '@/utils/request';

// // 获取用户个人信息
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