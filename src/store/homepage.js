import {ElMessage} from "element-plus";
import router from "@/router";
import store from "@/store/index";

export default {
    state: {
        selectClassification: "", // 现在一直都是空值 不用了
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