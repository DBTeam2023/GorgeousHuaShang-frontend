import axios from "axios";
import {ElMessage} from "element-plus";

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
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // if (error.response.data.code !== 200) {
        //     ElMessage.error(error.response.data.msg);
        // }
        return Promise.reject(error);
    }
);

export default service;