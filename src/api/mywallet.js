import request from '@/utils/request';

// 获取用户钱包
export function getWallet(data) {
    return request({
        url: "/api/Payment/Wallet/get/",
        method: "POST",
        data:data,
    })
}

// 修改用户钱包状态
export function updateWalletStatus(data){
    return request({
        url:"/api/Payment/Wallet/SetStatus/",
        method:"PUT",
        data:data,
    })
}

//充值钱包
export function rechargeWallet(data){
    return request({
        url:"/api/Payment/Wallet/recharge/",
        method:"PUT",
        data:data,
    })
}

// 为用户开通钱包功能呢
// export function addWallet(data){
//     return request({
//         url:"/api/Payment/Wallet/add",
//         method:"PUT",
//         data:data,
//     })
// }