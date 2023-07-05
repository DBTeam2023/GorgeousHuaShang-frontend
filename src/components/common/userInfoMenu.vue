<template>
    <el-header class="header" >
        <div class="demo-basic--circle" >
            <div class="block" ><!--用户头像-->
                <el-avatar :size="100" :src="circleUrl " />
            </div>
            <p class="name">userName</p><!--用户姓名-->
        </div>
    </el-header>
    <el-main class="asideMenu"><!--个人中心-->
        <el-row class="tac">
            <el-col :span="18">
                <h5 class="mb-2">个人中心</h5>
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo" 
                    @open="handleOpen"
                     @close="handleClose"
                >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>全部</span>
                    </template>
                    <el-menu-item index="1-1">个人信息</el-menu-item>
                    <el-menu-item index="1-2">我的收藏</el-menu-item>
                    <el-menu-item index="1-3">关注店铺</el-menu-item>
                    <el-menu-item index="1-4">我的订单</el-menu-item>
                    <el-menu-item index="1-5">足迹</el-menu-item>
                    <el-menu-item index="1-6">钱包</el-menu-item>
                </el-sub-menu>
                 <el-menu-item index="2">
                    <el-icon><setting /></el-icon>
                    <span>账号设置</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
    </el-main>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import {
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}


const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  
})

const { circleUrl } = toRefs(state)
</script>

<style scoped>
    .header {
        background-color: #fff;
        display: flex;
        width: 50;
        border: 1px solid #d7d4d4;
        justify-content: space-between;/*子元素沿着主轴等间距地分布，并且第一个子元素和最后一个子元素分别对齐容器的起始端和末尾端 */
        align-items: center;/*子元素在垂直方向上居中对齐 */
        padding: 80px 85px; 
    }
    .asideMenu {
        background-color: #fff;
        border: 1px solid #d7d4d4;
        height: 550px;
        justify-content: space-between;/*子元素沿着主轴等间距地分布，并且第一个子元素和最后一个子元素分别对齐容器的起始端和末尾端 */
        align-items: center;/*子元素在垂直方向上居中对齐 */
    }

</style>