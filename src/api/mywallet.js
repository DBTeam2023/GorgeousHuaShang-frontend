import request from '@/utils/request';

// 获取用户钱包
export function getWallet() {
    return request({
        url: "/api/Payment/GetWallet/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

// 修改用户钱包状态
export function updateWalletStatus(data){
    return request({
        url:"/api/Payment/SetStatus/",
        method:"POST",
        data:data,
    })
}

//充值钱包
export function rechargeWallet(data){
    return request({
        url:"/api/Payment/RechargeWallet/",
        method:"POST",
        data:data,
    })
}
