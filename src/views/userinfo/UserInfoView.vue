<script setup>
import BasicInfo from '@/views/userinfo/BasicInfo.vue';
import FollowedShop from '@/views/userinfo/FollowedShop.vue';
import CollectedItem from '@/views/userinfo/CollectedItem.vue';
import AccountSetting from '@/views/userinfo/AccountSetting.vue';
import OrderViewVue from '@/views/order/OrderView.vue';
import myWallet from '@/views/userinfo/myWallet.vue';
import myCoupon from '@/views/userinfo/Coupon.vue';
import userInfoMenu from '@/components/common/userInfoMenu.vue';
import router from '@/router';

import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { reactive, ref, computed } from 'vue'


const route = useRoute(); // 获取路由对象
// 使用路由参数作为初始值，如果未传递参数，则默认为 'basicinfo'
const selectedMenu = ref(route.params.selected || 'basicInfo');
// 监听路由参数的变化
// watchEffect(() => {
//     router.replace({ params: { selected: selectedMenu.value } });//修改路由参数
// });

// 点击菜单项事件：
const handleSelect = (val) => {
    selectedMenu.value = val.item;
}

const title = ref({
    'basicInfo': '个人信息',
    'followedShop': '关注店铺',
    // 'collectedItem':'我的收藏',
    'accountSetting': '账号设置',
    'myOrder': '我的订单',
    'myWallet': '我的钱包',
    'myCoupon': '我的优惠券'
})

</script>


<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边导航栏 -->
            <el-aside width="15%" class="aside">
                <userInfoMenu :selectedMenu="selectedMenu" @MenuSelect="handleSelect" />
            </el-aside>
            <!-- 主要内容 -->
            <el-container style="background-color: #F4F4F4;">
                <!-- 菜单项对应标题 -->
                <el-header class="header">
                    {{ title[selectedMenu] }}
                </el-header>
                <!-- main组件 -->
                <el-main>
                    <!-- 个人信息页 -->
                    <div v-if="selectedMenu === 'basicInfo'">
                        <BasicInfo />
                    </div>

                    <!-- 关注店铺页 -->
                    <div v-else-if="selectedMenu === 'followedShop'">
                        <FollowedShop />
                    </div>

                    <!-- 商品收藏 -->
                    <!-- <div v-else-if="selectedMenu === 'collectedItem'"> -->
                    <!-- <CollectedItem /> -->
                    <!-- </div> -->

                    <!-- 账号设置 -->
                    <div v-else-if="selectedMenu === 'accountSetting'">
                        <AccountSetting />
                    </div>
                    <!--我的订单-->
                    <div v-else-if="selectedMenu === 'myOrder'">
                        <OrderViewVue />
                    </div>
                    <!-- 我的钱包 -->
                    <div v-else-if="selectedMenu === 'myWallet'">
                        <myWallet />
                    </div>

                    <!-- 我的优惠券 -->
                    <div v-else-if="selectedMenu === 'myCoupon'">
                        <myCoupon />
                    </div>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<!-- 样式表 -->
<style lang="scss" scoped>
.aside {
    min-height: 80vh;
    background-color: #545c64;
}

// 左侧菜单栏样式
.header {
    font-size: 30px;
    font-weight: bold;
    margin: 0 auto;
    padding-top: 20px;
}
</style>
