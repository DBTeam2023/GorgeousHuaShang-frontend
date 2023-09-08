<script setup>
    import { reactive, computed,ref } from 'vue'
    import store from '@/store';
    import { defineEmits } from 'vue' //子组件传值给父组件
    import { defineProps } from 'vue' //子组件接收来自父组件的值
    import {
        Setting,User,Tickets,CollectionTag,Edit,Wallet,Position,
    } from '@element-plus/icons-vue'
    import AvatarUpload from '@/views/userinfo/AvatarUpload.vue';



    const dialogUploadVisible = ref(false); 
    const showShadow = ref(false);
    // 菜单栏顶部头像和昵称信息
    const info = reactive({
        avatarUrl: computed(() => {
            if (store.state.user.isLogin) {
                return store.state.user.userPhoto;
            }
            else {
                return "https://avatars.githubusercontent.com/u/583231?v=4";
            }
        }),
        userName: computed(() => {
            if (store.state.user.isLogin) {
                return store.state.user.username;
            }
            else {
                return "未登录";
            }
        })
    })

    // 接受来自父组件的初始菜单项
    const props = defineProps({
        selectedMenu: String, //模板template可直接使用
    })

    const emit = defineEmits(['MenuSelect']);//定义传值给父组件的方法

    // 菜单项选择响应函数
    const MenuSelect = (value) =>{
        props.selectedMenu = value;

        //传给父组件的数据
        let param ={
            item: value //字段名可以自定义 
        }
        //传递给父组件
        emit('MenuSelect',param);
    }

    //用户角色：buyer/seller
    const role = store.state.user.role;//"seller"或"buyer"

</script>

<template>
    <el-container>
        <!-- 顶部个人头像+昵称 -->
        <el-header class="header" >
            <!--用户头像-->
            <el-row class="avatar-row">
                <el-col :span="18">
                    <el-avatar :size="100" :src="info.avatarUrl">
                    </el-avatar>  
                </el-col>
                <el-col :span="6">
                    <Edit type="primary" color="#ffcc00" @click = "dialogUploadVisible=true"/>
                </el-col>
                <el-dialog v-model="dialogUploadVisible" title="修改头像">
                    <AvatarUpload @onCancel = "dialogUploadVisible=false"/>
                </el-dialog>        
            </el-row>
            <!--用户昵称-->
            <el-row class="name-row">{{ info.userName }}</el-row>
        </el-header>

        <!--main菜单栏-->
        <el-main class="main">
            <el-menu  class="menu-container" style="height:100%"
                active-text-color="#ffd04b"
                background-color="#545c64"
                text-color="#fff"
                :default-active="selectedMenu"
                @select="MenuSelect">
                <el-menu-item index="basicInfo" class="menu-item">
                    <span>
                        <el-icon><User /></el-icon>
                        <span style="margin-left:10px">个人信息</span>
                    </span>
                </el-menu-item>
                <!-- <el-menu-item v-if="role === 'buyer'" index="collectedItem" class="menu-item">
                    <span>
                        <el-icon><Goods /></el-icon>
                        <span style="margin-left:10px">我的收藏</span>
                    </span>
                </el-menu-item> -->
                <el-menu-item v-if="role === 'buyer'" index="followedShop" class="menu-item">
                    <span>
                        <el-icon><CollectionTag /></el-icon>
                        <span style="margin-left:10px">关注店铺</span>
                    </span>
                </el-menu-item>
                <el-menu-item v-if="role === 'buyer'" index="myOrder" class="menu-item">
                    <span>
                        <el-icon><Tickets /></el-icon>
                        <span style="margin-left:10px">我的订单</span>
                    </span>
                </el-menu-item>
                <el-menu-item v-if="role === 'buyer'" index="myCoupon" class="menu-item">
                    <span>
                        <el-icon><Position /></el-icon>
                        <span style="margin-left:10px">我的优惠券</span>
                    </span>
                </el-menu-item>
                <el-menu-item index="myWallet" class="menu-item" >
                    <span>
                        <el-icon><Wallet /></el-icon>
                        <span style="margin-left:10px">我的钱包</span>
                    </span>
                </el-menu-item>
                <el-menu-item index="accountSetting" class="menu-item" >
                    <span>
                        <el-icon><setting /></el-icon>
                        <span style="margin-left:10px">账号设置</span>                                        
                    </span>
                </el-menu-item>
            </el-menu>
        </el-main>

    </el-container>
</template>



<style lang="scss" scoped>


    .header {
        background-color: #393f44;
        padding-top:20px;
        height:180px;
        display: flex;
        flex-direction:column;
        align-items: center;
    }

    .main{
        height:100%;
        display:flex;
        flex-direction: column;
        align-items:center;
        padding:0;
    }

    .main .menu-container{
        width:100%;
        height:100%;
        display:block;
        border:0;
    }

    .main .menu-container .menu-item{
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .upload-image-button {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 14px;
        text-align: center;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .upload-image-button:hover {
        opacity: 1;
    }

    .shadow{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

</style>