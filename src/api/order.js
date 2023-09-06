import request from '@/utils/request';

export function getOrderInfo(data) {
    return request({
        url: "http://47.115.231.142:1031/Order/getOrderInfo/",
        // url: "/api/Order/getOrderInfo/",
        method: "POST",
        data: data,
    })
}

// export function cancelorder(data) {
//     return request({
//         url: "",
//         method: "POST",
//         data: data
//     })
// }

export function deleteOrder(data) {
    return request({
        url: "http://47.115.231.142:1031/deleteOrder/",
        method: "POST",
        data: data,
    })
}

export function updateOrder(data) {
    return request({
        url: "http://47.115.231.142:1031/Order/updateOrder/",
        method: "POST",
        data: data,
    })
}

export function myOrders(data) {
    return request({
        url: "http://47.115.231.142:1031/orderPageQury",
        method: "POST",
        data: data,
    })
}