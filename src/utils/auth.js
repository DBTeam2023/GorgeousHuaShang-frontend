import router from "@/router";
import {ElMessage} from "element-plus";

export function checkPermission(validList) {
    if (!localStorage.getItem("role")) {
        router.push("/login/");
    }

    const currentRole = localStorage.getItem("role");

    // 登录，分别讨论有无role
    if (currentRole) {
        console.log("当前页面运行访问的role有如下：")
        console.log(validList);
        console.log("当前登录的role是：" + currentRole);

        if (validList.includes(currentRole)) {
            return;
        } else {
            ElMessage.error('您没有权限访问该页面');
            router.push("/404/");
        }
        return;
    } else {
        ElMessage.error('当前用户无角色信息');
        router.push("/404/");
    }
}