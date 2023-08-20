import {ElMessage} from "element-plus";
import router from "@/router";
import store from "@/store/index";

export default {
    state: {
        selectClassification: "",
    },
    getters: {
    },
    mutations: {
        setSelectClassification(state, selectClassification) {
            state.selectClassification = selectClassification;
        }
    },
    actions: {
    },
    modules: {
    }
}