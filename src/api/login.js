import request from '@/utils/request';

export function doLogin(data) {
    return request({
        url: "/UserIdentification/",
        method: "get",
        params: data,
    });
}