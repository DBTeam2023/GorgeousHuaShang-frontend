import request from '@/utils/request'
export function getTest() {
    return request({
        url: '/GetWeatherForecast',
        method: 'get',
        params:{kk: "zjk"}
    })
}