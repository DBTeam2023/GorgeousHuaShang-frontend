import request from '@/utils/request';

export function getLogisticsInfo(data) {
    return request({
        url: "/api/Logistics/getLogistics/", 
        method: 'POST',
        data:data,
    });
}

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
