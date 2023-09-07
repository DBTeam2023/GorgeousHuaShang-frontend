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
        url:"/api/UserSystem/setAvatar/",
        method:"POST",
        headers: {
            'Content-Type': 'application/form-data',
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 获取用户头像信息
export function getUserAvatar(data){
    return request({
        url:"/api/UserSystem/getAvatar/",
        method:"GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 分页获取用户关注列表
export function getFollowedStore(data){
    return request({
        url:"/api/Store/getCollection/",
        method:"POST",
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}
