import request from '@/utils/request';

// 获取用户钱包
export function getWallet(data) {
    return request({
        url: "/api/Wallet/get/",
        method: "PUT",
        data:data,
    })
}

// 修改用户钱包状态
export function updateWalletStatus(data){
    return request({
        url:"/api/Wallet/SetStatus/",
        method:"PUT",
        data:data,
    })
}

//充值钱包
export function rechargeWallet(data){
    return request({
        url:"/api/Wallet/recharge/",
        method:"PUT",
        data:data,
    })
}

export function addWallet(data){
    return request({
        url:"/api/Wallet/add",
        method:"PUT",
        data:data,
    })
}