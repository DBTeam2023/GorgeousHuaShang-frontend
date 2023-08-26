import request from '@/utils/request';

export function getLogisticsInfo() {
    return request({
        url: "/api/order/logisticsDetails/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}
