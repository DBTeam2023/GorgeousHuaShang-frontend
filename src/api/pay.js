import request from '@/utils/request';

// 获取订单详情
export function getOrderInfo(data){
    return request({
        url:"http://47.115.231.142:1029/Order/getOrderInfo/",
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
        url:"http://47.115.231.142:1027/Payment/Coupon/calculate/",
        method:"POST",
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}
