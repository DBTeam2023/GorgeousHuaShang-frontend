import request from '@/utils/request';

export function getLogisticsInfo(data) {
    return request({
        url: "/api/Logistics/getLogistics/", 
        method: 'POST',
        data:data,
    });
}

export function getAllLogisticsInfo(data) {
    return request({
        url: "/api/Logistics/getAllLogisticsInfo/", 
        method: 'POST',
        data:data,
    });
}
