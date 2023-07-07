import {doLogin, getUserInfo} from "@/api/login";
import {ElMessage} from "element-plus";
import {decodeToken} from "@/utils/jwtHelper";
import router from "@/router";

export default {
    state: {
        userId: "",
        username: "",
        userPhoto: "",
        token: "", // todo: jwt token
        isLogin: false,
        roleId: null,
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
        setRoleId(state, roleId) {
            state.roleId = roleId;
        },
        setUserPhoto(state, userPhoto) {
            state.userPhoto = userPhoto;
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
                    if (resp.msg === 'success') {
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })

                        localStorage.setItem("jwtToken",  resp.data);
                        context.commit("setToken", resp.data);
                    }
                    else {
                        // todo: 不同的错误
                        ElMessage.error('登录错误');
                    }
                })
                .catch(resp => {
                    console.log(resp);
                    ElMessage.error('登录异常');
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