<!--html模板-->
<template>
    <el-container class="orderDetailMainView">

        <el-main>
            <el-row class="row-1"><!--返回按钮+页面功能描述-->
                <el-col :span="2" class="row-1-text">
                    <el-button class="returnButton" type="return" plain>返回</el-button><!--返回按钮，返回我的订单-->
                </el-col>
                <el-col :span="3" class="row-1-text">
                    <el-text  tag="b" >我的订单/订单详情</el-text>
                </el-col>
            </el-row>
            <el-row class="row-2" justify="space-between"><!--订单发货信息-->
                <el-col :span="24" class="row-2-card"><!--订单状态--><orderStateCard/></el-col>
            </el-row>
            <el-row class="row-3" justify="space-between"><!--订单发货信息-->
                <el-col :span="12" class="row-3-card"><!--物流时间线--><logisticsCard/></el-col>
                <el-col :span="12" class="row-3-card"><!--订单时间线--><timelineCard/></el-col>
                
            </el-row>
            <el-row class="row-4"><!--订单明细表--><orderdetailsCard/></el-row>
            <el-row class="row-5" ><!--订单支付信息列表--><paymentInfoCard/></el-row>
        </el-main>
    </el-container>
</template>

<!--js脚本函数-->
<script>
import userInfoMenu from "../components/common/userInfoMenu.vue"
import orderStateCard from "../views/orderDetail_subs/orderStateCard.vue"
import timelineCard from "../views/orderDetail_subs/timelineCard.vue"
import orderdetailsCard from "../views/orderDetail_subs/orderdetailsCard.vue"
import paymentInfoCard from "../views/orderDetail_subs/paymentInfoCard.vue"
import logisticsCard from "../views/orderDetail_subs/logisticsCard.vue"
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
// 里面不能没东西？
console.log("ddd")
</script>

<style scoped>
    .orderDetailMainView {
        background-color: #fff;
        margin-top: 10px;
    }
    .returnButton {
        margin-left: 20px;
    }
    .row-1-text {
        display: flex;
        align-items: center;
    }
    .row-2-card {
        align-self: 100px;
    }
    .row-3-card {
        display: flex;
        align-self: 100px;
    }
    
</style>