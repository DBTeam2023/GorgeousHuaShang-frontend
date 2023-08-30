import {ElMessage} from "element-plus";
import router from "@/router";
import store from "@/store/index";

export default {
    state: {
        storeId: "",
    },
    getters: {
    },
    mutations: {
        setStoreId(state, storeId) {
            state.storeId = storeId;
        }
    },
    actions: {
    },
    modules: {
    }
}