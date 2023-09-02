import request from '@/utils/request';

// todo: api
export function getGoodsDetail(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/displayPicks/",
        method: "POST",
        data: data,
    });
}

export function getGoodsInPage(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/CommoditypageQuery/",
        method: "POST",
        data: data,
    });
}

export function getSingleCommodity(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/getCommodity/",
        method: "POST",
        data: data,
    });
}


export function deleteSingleCommodity(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/deleteCommodity/",
        method: "POST",
        data: data,
    });
}

export function updateCommodity(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/updateCommodity/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data,
    });
}

export function updateConcreteCommodity(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/updatePick/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data,
    });
}

