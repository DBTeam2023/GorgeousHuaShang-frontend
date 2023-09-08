import request from '@/utils/request';

// 获取用户购物车列表
export function getCartList() {
    return request({
        url:"/api/Cart/getCart/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

// 删除购物车里的商品（支持批量删除）
export function deleteCartGoods(data) {
    return request({
        url: "/api/Cart/deleteItems/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
 
// 加入购物车的接口=>修改购物车商品数量
export function addCartByGoods(data) {
    return request({
        url: "/api/Cart/addItem",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    });
}

// 购物车中下单结算————创建订单
export function createOrder(data) {
    return request({
        url: "/api/Order/createOrder",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    });
}