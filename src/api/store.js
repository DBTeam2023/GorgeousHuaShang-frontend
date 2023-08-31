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

export function createNewCommodity(data) {
    return request({
        url: "http://47.115.231.142:1030/Product/createCommodity/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data
    })
}

export function addStoreDescription(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/setDes/",
        method: "POST",
        data: data
    })
}

export function addStoreAddress(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/setAddress/",
        method: "POST",
        data: data
    })
}

export function deleteStore(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/remove/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function collectStore(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/addCollection/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function removeCollectStore(data) {
    return request({
        url: "http://47.115.231.142:1028/Store/removeCollection/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}