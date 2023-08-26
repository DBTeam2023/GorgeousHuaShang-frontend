import request from '@/utils/request';

export function getLogisticsInfo(orderNumber) {
    return request({
        url: "/api/order/logisticsDetails/${orderNumber}", 
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
    });
}