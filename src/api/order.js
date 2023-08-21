import request from '@/utils/request';

export function getOrderInfo() {
    return request({
        url: "/api/order/details/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}