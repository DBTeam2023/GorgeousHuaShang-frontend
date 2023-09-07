<!--html模板-->
<template>
    <el-container class="orderDetailMainView">
        <el-main>
            <el-row class="row-1"><!--返回按钮+页面功能描述-->
                <el-col :span="2" class="row-1-text">
                    <router-link to="/userinfo/myOrder/"><!--添加路由跳转-->
                        <el-button class="returnButton" type="return" plain @click="onReturnButtonClick">返回</el-button><!--返回按钮，返回我的订单-->
                    </router-link>
                </el-col>
                <el-col :span="3" class="row-1-text">
                    <el-text  tag="b" >我的订单/订单详情</el-text>
                </el-col>
            </el-row>
            <el-row class="row-2" justify="space-between"><!--订单发货信息-->
                <el-col :span="24" class="row-2-card"><!-- 订单状态 --><orderStateCard/></el-col>
            </el-row>
            <el-row class="row-3" justify="space-between"><!--订单发货信息-->
                <el-col :span="12" class="row-3-card"><!--物流时间线--><logisticsCard/></el-col>
                <!-- <el-col :span="12" class="row-3-card"><timelineCard/></el-col> -->
                <el-col :span="12" class="row-3-card"><paymentInfoCard/></el-col>
                
            </el-row>
            <el-row class="row-4"><orderdetailsCard/></el-row>
            
        </el-main>
    </el-container>
</template>

<script>
import userInfoMenu from "../../components/common/userInfoMenu.vue"
import orderStateCard from "@/views/order/orderStateCard.vue"
import timelineCard from "@/views/order/timelineCard.vue"
import orderdetailsCard from "@/views/order/orderdetailsCard.vue"
import paymentInfoCard from "@/views/order/paymentInfoCard.vue"
import logisticsCard from "@/views/order/logisticsCard.vue"
import { defineComponent } from 'vue';
import { ElAside, ElMain, ElMenu ,ElMenuItem, ElSubMenu} from 'element-plus';

export default defineComponent({
  name: 'OrderDetail',
  components: {
    [ElAside.name]: ElAside,
    [ElMain.name]: ElMain,
    [ElMenu.name]: ElMenu,
    [ElMenuItem.name]: ElMenuItem,
    [ElSubMenu.name]: ElSubMenu,
    userInfoMenu
  }
});

</script>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter(); // 获取路由实例
const onReturnButtonClick = () => { // 点击返回按钮时的跳转逻辑
    // router.push('/order/');
    router.push({ name: 'UserInfo', params: { selected: 'myOrder' } });
}


</script>

<style scoped>
    .orderDetailMainView {
        background-color: #fff;
        margin-top: 10px;
    }
    .returnButton {
        margin-left: 55px;
        text-decoration: none; /* 去掉下划线 */
    }
    .row-1-text {
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
    .row-2-card {
        align-self: 100px;
    }
    .row-3-card {
        display: flex;
        align-self: 100px;
    }
    
</style>