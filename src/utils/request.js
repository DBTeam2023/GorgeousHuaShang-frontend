import axios from "axios";

// // 发送请求时携带cookie信息
// axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] = "application/json";

const service = axios.create({
    // baseURL: defaultDomain,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    //withCredentials: true
    async: true,
    crossDomain: true,
});

// request interceptor请求拦截器
service.interceptors.request.use(
    (config) => {
        console.log(config.url + " 成功请求, 请求信息如下：");
        console.log(config);
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        console.log(response.config.url + " 成功响应, 响应信息如下：");
        console.log(response);
        return response.data;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

export default service;