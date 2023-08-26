import request from '@/utils/request';

// 获取用户钱包
export function getWallet(data) {
    return request({
        // url: "/api/Payment/Wallet/get/",
        // url:"https://mock.apifox.cn/m1/2970478-0-default/Wallet/get/", //bakend
        // url:"https://mock.apifox.cn/m1/2970478-0-default/Payment/GetWallet/", //网关
        url:"https://mock.apifox.cn/m1/2970478-0-default/api/Payment/GetWallet/", //fronted
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
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
        // url:"/api/Payment/Wallet/recharge/",
        // url:"https://mock.apifox.cn/m1/2970478-0-default//Wallet/recharge/",  //bakend
        method:"PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
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