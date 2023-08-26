<script setup>
    import BasicInfo from '@/views/userinfo/BasicInfo.vue';
    import FollowedShop from '@/views/userinfo/FollowedShop.vue';
    import CollectedItem from '@/views/userinfo/CollectedItem.vue';
    import AccountSetting from '@/views/userinfo/AccountSetting.vue';
    import OrderViewVue from '@/views/order/OrderView.vue';
    import myWallet from '@/views/userinfo/myWallet.vue';
    import myCoupon from '@/views/userinfo/Coupon.vue';
    import store from '@/store';

    import { watchEffect } from 'vue';
    import { useRoute } from 'vue-router';
    import { reactive, ref, computed} from 'vue'

    // 左侧菜单栏头部：用户名/用户头像
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
   

    // 左侧菜单栏用到的

    import {
        Setting,User,Tickets,CollectionTag,Goods,Wallet,Position,
    } from '@element-plus/icons-vue'

    const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
    }

    const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
    }

    const route = useRoute(); // 获取路由对象
    // 使用路由参数作为初始值，如果未传递参数，则默认为 'basicinfo'
    const selectedMenu = ref(route.params.selected || 'basicInfo' );
    // 监听路由参数的变化
    watchEffect(() => {
    	selectedMenu.value = route.params.selected || 'basicInfo';
    });

    // 菜单项选择响应函数
    const MenuSelect=(menuItem)=>{
        selectedMenu.value=menuItem;
        console.log(selectedMenu);
    }

    //用户角色：buyer/seller
    const role = store.state.user.role;//"seller"或"buyer"

</script>


<template>
    <el-row>
        <el-col span="4">
            <!-- 侧边菜单栏 -->
            <div class="aside" >
                <!-- <div class="container"> -->
                    <el-header class="header" >
                        <!--用户头像-->
                        <el-row class="avatar-row">
                            <el-avatar :size="100" :src="info.avatarUrl" />            
                        </el-row>
                        <!--用户姓名-->
                        <el-row class="name-row">{{ info.userName }}</el-row>
                    </el-header>
                <!--个人中心菜单栏-->
                    <el-row class="menu-row" style="height:100%">
                        <el-col :span="24" style="height:100%">
                            <el-menu
                                style="height:100%"
                                active-text-color="#ffd04b"
                                background-color="#545c64"
                                class="el-menu-vertical-demo"
                                text-color="#fff"
                                :default-active="selectedMenu"
                                @selected="handleMenuSelect"
                                @open="handleOpen"
                                @close="handleClose"
                            >
                                <el-menu-item index="basciInfo" class="menu-item" @click="MenuSelect('basicInfo')">
                                    <span>
                                        <el-icon><User /></el-icon>
                                        <span style="margin-left:10px">个人信息</span>
                                    </span>
                                </el-menu-item>
                                <el-menu-item v-if="role === 'buyer'" index="collectedItem" class="menu-item" @click="MenuSelect('collectedItem')">
                                    <span>
                                        <el-icon><Goods /></el-icon>
                                        <span style="margin-left:10px">我的收藏</span>
                                    </span>
                                </el-menu-item>
                                <el-menu-item v-if="role === 'buyer'" index="followedShop" class="menu-item" @click="MenuSelect('followedShop')">
                                    <span>
                                        <el-icon><CollectionTag /></el-icon>
                                        <span style="margin-left:10px">关注店铺</span>
                                    </span>
                                </el-menu-item>
                                <el-menu-item v-if="role === 'buyer'" index="myOrder" class="menu-item" @click="MenuSelect('myOrder')">
                                    <span>
                                        <el-icon><Tickets /></el-icon>
                                        <span style="margin-left:10px">我的订单</span>
                                    </span>
                                </el-menu-item>
                                <el-menu-item v-if="role === 'buyer'" index="footprint" class="menu-item" @click="MenuSelect('myCoupon')">
                                    <span>
                                        <el-icon><Position /></el-icon>
                                        <span style="margin-left:10px">我的优惠券</span>
                                    </span>
                                </el-menu-item>
                                <el-menu-item index="myWallet" class="menu-item" @click="MenuSelect('myWallet')">
                                    <span>
                                        <el-icon><Wallet /></el-icon>
                                        <span style="margin-left:10px">我的钱包</span>
                                    </span>
                                </el-menu-item>
                                <el-menu-item index="accountSetting" class="menu-item" @click="MenuSelect('accountSetting')">
                                    <span>
                                        <el-icon><setting /></el-icon>
                                        <span style="margin-left:10px">账号设置</span>                                        
                                    </span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                <!-- </div> -->
            </div>
        </el-col>
        
        <el-col span="20" >
            <!-- 个人信息页 -->
            <div v-if="selectedMenu === 'basicInfo'">
                <BasicInfo />
            </div>

            <!-- 关注店铺页 -->
            <div v-else-if="selectedMenu === 'followedShop'">
                <FollowedShop />
            </div>

            <!-- 商品收藏 -->
            <div v-else-if="selectedMenu === 'collectedItem'">
                <CollectedItem />
            </div>

            <!-- 账号设置 -->
            <div v-else-if="selectedMenu === 'accountSetting'">
                <AccountSetting /> 
            </div>
            <!--我的订单-->
            <div v-else-if="selectedMenu === 'myOrder'">
                <OrderViewVue/>
            </div>
            <!-- 我的钱包 -->
            <div v-else-if="selectedMenu === 'myWallet'">
                <myWallet/>
            </div>

            <!-- 我的优惠券 -->
            <div v-else-if="selectedMenu === 'myCoupon'">
                <myCoupon/>
            </div>


        </el-col>

    </el-row>
  
  </template>



<!-- 样式表 -->
<style lang="scss" scoped>

    // 左侧菜单栏样式
    .aside{
        width:250px;
        height:100%;
    }

    .container{
        // background-color:#545c64;
        width:250px;
        /* height:100%; */
    }
    .header {
        background-color: #393f44;
        padding-top:20px;
        height:180px;
        display: flex;
        flex-direction:column;
        align-items: center;
    }

    // .menu-row {
    //     // margin-left:0;
    // }

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
