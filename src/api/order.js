import request from '@/utils/request';

export function getOrderInfo(data) {
    return request({
        url: "/api/Order/getOrderInfo/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    })
}

// 更改订单状态为取消
export function cancelorder(data) {
    return request({
        url: "/api/Order/ChangeOrderCancel",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function deleteOrder(data) {
    return request({
        url: "/api/Order/deleteOrder/",
        method: "POST",
        data: data,
    })
}

// 更改订单状态为已经完成
export function finishOrder(data) {
    return request({
        url: "/api/Order/ChangeOrderPaidComplete",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    })
}

// 获得我的订单--订单分页查询
export function myOrders(data) {
    return request({
        url: "/api/Order/orderPageQuery",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    })
}

export function getOrderDetails(data) {
    return request({
        url: "/api/Order/getOrderInfo",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    })
}

