import request from '@/utils/request';

// todo: api
export function getGoodsDetail(data) {
    return request({
        url: "/api/Product/displayPicks/",
        method: "POST",
        data: data,
    });
}

export function getGoodsInPage(data) {
    return request({
        url: "/api/Product/CommoditypageQuery/",
        method: "POST",
        data: data,
    });
}

export function getSingleCommodity(data) {
    return request({
        url: "/api/Product/getCommodity/",
        method: "POST",
        data: data,
    });
}


export function deleteSingleCommodity(data) {
    return request({
        url: "/api/Product/deleteCommodity/",
        method: "POST",
        data: data,
    });
}

export function updateCommodity(data) {
    return request({
        url: "/api/Product/updateCommodity/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data,
    });
}

export function updateConcreteCommodity(data) {
    return request({
        url: "/api/Product/updatePick/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data,
    });
}

export function createOrderInGoods(data) {
    return request({
        url: "/api/Order/createOrder",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data,
    });
}

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
