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