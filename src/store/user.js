import {doLogin, getUserInfo} from "@/api/login";
import {ElMessage} from "element-plus";
import {decodeToken} from "@/utils/jwtHelper";
import router from "@/router";
import store from "@/store/index";

export default {
    state: {
        username: "",
        role: null,
        userPhoto: "",
        token: "", // todo: jwt token
        isLogin: false,
    },
    getters: {
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setToken(state, token) {
            state.token = token;
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        setRole(state, role) {
            state.roleId = role;
        },
        setUserPhoto(state, userPhoto) {
            state.userPhoto = userPhoto;
        },
    },
    actions: {
        setUser(context, data) {
            context.commit("setUsername", data.username);
            context.commit("setToken", data.token);
            context.commit("setIsLogin", data.isLogin);
        },

        // getUserInfoForRouter(context) {
        //     return new Promise((resolve, reject) => {
        //         getUserInfo()
        //         .then((resp) => {
        //             context.commit("setIsLogin", true);
        //             context.commit("setUsername", resp.data.username);
        //             context.commit("setUserId", resp.data.userId);
        //             context.commit("setUserPhoto", resp.data.userPhoto);
        //             resolve(store.state.user.isLogin);
        //         })
        //         .catch((error) => {
        //             reject(error);
        //         })
        //     })
        // }


        getUserInfoForRouter(context) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((resp) => {
                        context.commit("setIsLogin", true);
                        context.commit("setUsername", resp.data.username);
                        context.commit("setUserPhoto", resp.data.userPhoto);
                        resolve(store.state.user.isLogin);
                    })
                    .catch((resp) => {
                        context.commit("setIsLogin", true);
                        context.commit("setUsername", "test");
                        context.commit("setUserPhoto", "test");
                        resolve(store.state.user.isLogin);
                    })
            })
        }

    },
    modules: {
    }
}