import request from '@/utils/request';

export function doLogin(data) {
    return request({
        url: "/user/login/",
        method: "post",
        data: data,
    });
}