<script setup>
    import { reactive} from 'vue'
    import {
        Setting,User,Tickets,CollectionTag,Goods,Wallet,Position,
    } from '@element-plus/icons-vue'
    import { defineEmits, defineProps} from 'vue';

    const info=reactive({
        avatarUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName:'userName',
    })

    const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
    }

    const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
    }

    const props=defineProps(['selectedMenuItem'])  //选中的菜单项
    const handleMenuSelect = (menuItem) =>{
        props.selectedMenuItem = menuItem;
    }

</script>

<template>
    <el-container class="container">
        <el-header class="header" >
            <!--用户头像-->
            <el-row class="avatar-row">
                <el-avatar :size="100" :src="info.avatarUrl" />            
            </el-row>
            <!--用户姓名-->
            <el-row class="name-row">{{ info.userName }}</el-row>
        </el-header>
    <!--个人中心菜单栏-->
        <el-row class="menu-row">
            <el-col :span="24" backgroundColor="#545c64">
                <el-menu
                    style="height:100%"
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    text-color="#fff"
                    default-active="basicInfo"
                    @selected="handleMenuSelect"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-menu-item index="basciInfo" class="menu-item">
                        <span>
                            <el-icon><User /></el-icon>
                            <span style="margin-left:10px">个人信息</span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="collectedItem" class="menu-item">
                        <span>
                            <el-icon><Goods /></el-icon>
                            <span style="margin-left:10px">我的收藏</span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="followedShop" class="menu-item">
                        <span>
                            <el-icon><CollectionTag /></el-icon>
                            <span style="margin-left:10px">关注店铺</span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="myOrder" class="menu-item">
                        <span>
                            <el-icon><Tickets /></el-icon>
                            <span style="margin-left:10px">我的订单</span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="footprint" class="menu-item">
                        <span>
                            <el-icon><Position /></el-icon>
                            <span style="margin-left:10px">我的足迹</span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="myWallet" class="menu-item">
                        <span>
                            <el-icon><Wallet /></el-icon>
                            <span style="margin-left:10px">我的钱包</span>
                            
                        </span>
                    </el-menu-item>
                    <el-menu-item index="accountSetting" class="menu-item">
                        <span>
                            <el-icon><setting /></el-icon>
                            <span style="margin-left:10px">账号设置</span>
                            
                        </span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-container>
</template>



<style scoped>

    .container{
        background-color:#545c64;
        width:250px;
        /* height:100%; */
    }
    .header {
        /* background-color: #fff; */
        /* width: 300px; */
        background-color: #393f44;
        padding-top:20px;
        height:180px;
        display: flex;
        flex-direction:column;
        align-items: center;
    }


    .menu-row {
        margin-left:0;
    }

    .menu-item{
        display: flex;
        align-items: center;
    }

    .menu-item span{
        margin:0 25%;
    }

    

    /* 头像和用户名上下居中显示 */
    .header .avartar-row,
    .header .name-row{
        align-self: center;
        padding-top: 10px;
    }

    .header .name-row{
        color:white;
    }

</style>