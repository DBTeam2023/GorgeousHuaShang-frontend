import request from '@/utils/request';

// 获取用户购物车列表
export function getCartList() {
    return request({
        // url: "/api/cart/getCartList/",
        url:"https://mock.apifox.cn/m1/2970478-0-default/api/getCartList/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

// 删除购物车里的商品（支持批量删除）
export function deleteCartGoods(data) {
    return request({
        url: "https://mock.apifox.cn/m1/2970478-0-default/api/cart/deleteGood/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
 
// 修改商品属性（尺码）信息
export function updateSize(data){
    return request({
        url:"https://mock.apifox.cn/m1/2970478-0-default/api/cart/update/",
        method:"POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}