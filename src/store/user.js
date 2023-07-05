import {doLogin, getUserInfo} from "@/api/login";
import {ElMessage} from "element-plus";

export default {
    state: {
        userId: "",
        username: "",
        token: "", // todo: jwt token
        isLogin: false,
    },
    getters: {
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setToken(state, token) {
            state.token = token;
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
    },
    actions: {
        setUser(context, data) {
            context.commit("setUserId", data.userId);
            context.commit("setUsername", data.username);
            context.commit("setToken", data.token);
            context.commit("setIsLogin", data.isLogin);
        },

        // 采用jwt
        doLogin(context, data) {
            doLogin(data)
                .then(resp => {
                    if (data.msg === 'success') {
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })

                        console.log(data);
                        console.log(resp);

                        const token = resp.data;
                        localStorage.setItem("jwtToken", token);

                        context.commit("setToken", token);
                        context.commit("setIsLogin", true);

                        context.dispatch("setUserInfo");
                    }
                })
                .catch(resp => {
                    console.log(resp);
                })
        },

        // todo: resp 的token     并且待定   data也有问题
        setUserInfo(context) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then(resp => {
                        if (resp.msg === "success") {
                            context.commit("setUserId", resp.data.userId);
                            context.commit("setUsername", resp.data.username);
                            // context.commit("setToken", resp.data.token);
                            // context.commit("setIsLogin", true);
                            resolve(resp.data);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    },
    modules: {
    }
}