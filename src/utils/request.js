import axios from "axios";

// // 发送请求时携带cookie信息
// axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] = "application/json";


// todo： 线上还要改
export const defaultDomain =
    process.env.NODE_ENV === "development"
        ? "http://localhost:7198"
        : "http://xxx:7279";

const service = axios.create({
    baseURL: defaultDomain,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    //withCredentials: true
    async: true,
    crossDomain: true,
});

// todo: content-type为什么是空的？
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

service.interceptors.response.use(
    (response) => {
        console.log(response);
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