import request from '@/utils/request';

export function getUserInfo() {
    return request({
        url: "/api/UserSystem/getUserInfo/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

