import {getUserInfo} from "@/api/login";

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

        // todo: resp 的token     并且待定
        getUserInfo(context) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then(resp => {
                        if (resp.msg === "success") {
                            context.commit("setUserId", resp.data.userId);
                            context.commit("setUsername", resp.data.username);
                            context.commit("setToken", resp.data.token);
                            context.commit("setIsLogin", true);
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