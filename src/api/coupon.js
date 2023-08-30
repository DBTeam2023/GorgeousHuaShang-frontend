import request from '@/utils/request';

// 分页获取优惠券
export function getCouponPage(data) {
    return request({
        url:"https://mock.apifox.cn/m1/2970478-0-default/api/Payment/getCouponInPage/", //fronted
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 删除用户某个优惠券

export function deleteUserCoupon(data) {
    return request({
        url:"https://mock.apifox.cn/m1/2970478-0-default/api/Payment/deleteUserCoupon/", //fronted
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}
