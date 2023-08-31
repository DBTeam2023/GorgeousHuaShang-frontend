import request from '@/utils/request';

export function getItemInfo() {
    return request({
        url: "/api/order/goodsDetails/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}