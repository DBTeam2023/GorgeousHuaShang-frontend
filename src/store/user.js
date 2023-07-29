import {doLogin, getUserInfo} from "@/api/login";
import {ElMessage} from "element-plus";
import {decodeToken} from "@/utils/jwtHelper";
import router from "@/router";
import store from "@/store/index";

export default {
    state: {
        username: "", // 目前的处理逻辑为既是账号，又是可以显示的用户昵称  LoginView的resp里返回的是nikeName
        role: null, // “buyer” "seller"

        userPhoto: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // todo: 大家可以先写死

        token: "", // "jwt token"
        isLogin: false, // 当前状态是否登录
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
            state.role = role;
        },
        setUserPhoto(state, userPhoto) {
            state.userPhoto = userPhoto;
        },
        logout(state) {
            state.isLogin = false;
            state.token = "";
            if (localStorage.getItem("jwtToken") != null) {
                localStorage.removeItem("jwtToken");
            }
            if (localStorage.getItem("role") != null) {
                localStorage.removeItem("role");
            }

            ElMessage('退出登录');
            router.push('/');
        }
    },
    actions: {


        getUserInfoForRouter(context) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                .then((resp) => {
                    context.commit("setIsLogin", true);
                    context.commit("setUsername", resp.data.nickName);
                    // context.commit("setToken", localStorage.getItem("jwtToken"))
                    context.commit("setRole",resp.data.type);
                    resolve(store.state.user.isLogin);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        }


        // getUserInfoForRouter(context) {
        //     return new Promise((resolve, reject) => {
        //         getUserInfo({
        //             token: localStorage.getItem("jwtToken"),
        //         })
        //             .then((resp) => {
        //                 context.commit("setIsLogin", true);
        //                 context.commit("setUsername", resp.data.nickName);
        //                 context.commit("setToken", localStorage.getItem("jwtToken"))
        //                 context.commit("setRole",resp.data.type);
        //                 resolve(store.state.user.isLogin);
        //             })
        //             .catch((resp) => {
        //                 context.commit("setIsLogin", true);
        //                 context.commit("setUsername", resp.data.nickName);
        //                 context.commit("setRole",resp.data.type);
        //                 resolve(store.state.user.isLogin);
        //             })
        //     })
        // }

    },
    modules: {
    }
}