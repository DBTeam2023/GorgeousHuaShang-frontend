<template>
    <el-card class="orderState-card">
        <template #header>
        <div class="orderState-card-header">
            <span style="font-weight: bold;">订单状态</span>
            <el-button class="button" text>申请修改订单</el-button>
        </div>
        </template>
        <div v-for="(item, index) in itemList" :key="index" class="text item">{{ item }}</div>
    </el-card>
</template>

<script setup>
import {reactive} from 'vue'
const itemList = ['订单已发货', '仓库位置：浙江省嘉兴市某区某路某号', '收货地址：张x，16578765678, 上海市嘉定区安亭镇曹安公路4800号同济大学嘉定校区', '快递公司：韵达']

const OrderState=reactive({
    state:'',
    shipAddress:'',
    pickAddress:'',
    company:'',
})

</script>

<style scoped>

.orderState-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.orderState-card{
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 60px;
}
    
</style>