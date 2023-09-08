import request from '@/utils/request';

// 获取订单详情
export function getOrderInfo(data){
    return request({
        url:"/api/Order/getOrderInfo/",
        method:"POST",
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 获取订单对应可用优惠券
export function getValidCoupon(data){
    return request({
        url:"/api/Payment/Coupon/getValid/",
        method:"POST",
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 支付
export function payOrder(data){
    return request({
        url:"/api/Payment/Coupon/calculate/",
        method:"POST",
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}
