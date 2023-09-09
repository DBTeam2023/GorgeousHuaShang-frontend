import request from '@/utils/request';

// 获取用户钱包
export function getWallet(data) {
    return request({
        url:"/api/Payment/Wallet/get/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

//充值钱包
export function rechargeWallet(data){
    return request({
        url:"/api/Payment/Wallet/recharge/",
        method:"PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}

// 钱包扣钱
export function deductWallet(data){
    return request({
        url:"/api/Payment/Wallet/deduct/",
        method:"PUT",
        headers:{
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data:data,
    })
}
