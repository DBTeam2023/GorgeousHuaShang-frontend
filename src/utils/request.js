import axios from "axios";

// // 发送请求时携带cookie信息
// axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] = "application/json";

// todo： 线上还要改
export const defaultDomain =
    process.env.NODE_ENV === "development"
        ? "http://47.115.231.142:8081"
        : "http://xxx:7198";

const service = axios.create({
    baseURL: defaultDomain,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    //withCredentials: true
    async: true,
    crossDomain: true,
});

// request interceptor请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers = {
            "Content-Type": "application/json",
        };
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
        console.log("成功响应");
                         // if the custom code is not 200, it is judged as an error.
        // if (response.data.statusCode != 200) {
            // Message({
            //     message: response.data.msg || "请求发生错误",
            //     type: "error",
            // });
            // return Promise.reject(new Error(response.data.msg || "code error"));
        // } else {
            return response.data;
        // }
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

export default service;