import request from '@/utils/request';

export function getMySTore(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/getMyStore/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function addStore(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/add/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function getStoreInfo(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/getInfo/",
        method: "POST",
        data: data
    })
}
