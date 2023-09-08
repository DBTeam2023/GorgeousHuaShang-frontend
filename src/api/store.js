import request from '@/utils/request';

export function getMySTore(data) {
    return request({
        url: "/api/Store/getMyStore/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function addStore(data) {
    return request({
        url: "/api/Store/add/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            'Content-Type': 'application/form-data',
        },
        data: data
    })
}

export function getStoreInfo(data) {
    return request({
        url: "/api/Store/getInfo/",
        method: "POST",
        data: data
    })
}

export function createNewCommodity(data) {
    return request({
        url: "/api/Product/createCommodity/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data
    })
}

export function addStoreDescription(data) {
    return request({
        url: "/api/Store/setDes/",
        method: "POST",
        data: data
    })
}

export function addStoreAddress(data) {
    return request({
        url: "/api/Store/setAddress/",
        method: "POST",
        data: data
    })
}

export function deleteStore(data) {
    return request({
        url: "/api/Store/remove/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function collectStore(data) {
    return request({
        url: "/api/Store/addCollection/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function removeCollectStore(data) {
    return request({
        url: "/api/Store/removeCollection/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function getSellers(data) {
    return request({
        url: "/api/Store/getSeller/",
        method: "POST",
        data: data
    })
}

export function inviteSellers(data) {
    return request({
        url: "/api/Store/invite/",
        method: "POST",
        data: data
    })
}

export function setScore(data) {
    return request({
        url: "/api/Store/setScore/",
        method: "POST",
        data: data
    })
}

export function deleteSeller(data) {
    return request({
        url: "/api/Store/delete/",
        method: "POST",
        data: data
    })
}

// 修改店铺头像
export function setStoreAvatar(data) {
    return request({
        url: "/api/Store/setAvatar/",
        method: "POST",
        headers: {
            'Content-Type': 'application/form-data',
        },
        data: data
    })
}

// 获取店铺头像
export function getStoreAvatar(data){
    return request({
        url:"/api/Store/getAvatar/",
        method:"POST",
        data:data,
    })
}

// 获取关注该店铺的买家
export function getBuyers(data) {
    return request({
        url: "/api/Store/getBuyer/",
        method: "POST",
        data: data
    })
}