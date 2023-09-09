import request from '@/utils/request';

// 分页获取优惠券（买家）
export function getCouponPage(data) {
    return request({
        url:"/api/Payment/Coupon/getMyCoupon/", 
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 分页获取优惠券（卖家）
export function getStoreCoupon(data) {
    return request({
        url:"/api/Payment/Coupon/getStoreCoupon/", 
        method: "POST",
        data:data,
    })
}

// 用户删除优惠券
export function deleteUserCoupon(data) {
    return request({
        url:"/api/Payment/Coupon/deleteByUser/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 商家删除优惠券
export function deleteStoreCoupon(data) {
    return request({
        url:"/api/Payment/Coupon/deleteByStore/",
        method: "POST",
        data:data,
    })
}

// 商家生成优惠券
export function generateCoupon(data) {
    return request({
        url:"/api/Payment/Coupon/generate/", 
        method: "POST",
        data:data,
    })
}

// 商家为指定用户添加优惠券
export function addCoupon(data) {
    return request({
        url:"/api/Payment/Coupon/add/", 
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}
