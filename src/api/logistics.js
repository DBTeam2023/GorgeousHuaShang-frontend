import request from '@/utils/request';

export function getLogisticsInfo(orderId) {
    return request({
        url: "/api/order/logisticsDetails/${orderId}",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}
