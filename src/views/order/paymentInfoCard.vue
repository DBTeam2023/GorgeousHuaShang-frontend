<template>
    <el-card class="row-4-card" :span="24">
        <div>
            <h3 class="paymentText">支付详情</h3>
        </div>
        <el-descriptions
            class="margin-top"
            :column="2"
            :style="blockMargin"
        >
            <el-descriptions-item label="商品总价：" >￥{{ orderInfo.goodsTotalPrice }}元</el-descriptions-item>    
        </el-descriptions>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getOrderInfo } from '@/api/order';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const orderInfo = ref({
  goodsTotalPrice: 0,
  discount: 0,
  totalPrice: 0,
});

const route = useRoute();
const orderID = route.params.orderID;

onMounted(() => {

    getOrderInfo({ orderId: orderID })
    .then(response => {
      orderInfo.value.totalPrice = response.data.money;
      orderInfo.value.goodsTotalPrice = response.data.money;
    })
    .catch(error => {
        ElMessage('获取订单信息失败，请刷新！');
    });
});

</script>

<style scoped>
/* 订单支付信息卡片 */
.row-4-card {
    margin-top: 30px;
    width: 1000px;
    margin-left: 30px;
    margin-right: 80px;
}
.paymentText {
    margin-top: 10px;
    margin-left: 35px;
    margin-bottom: 30px;
}
.margin-top{
    margin-top: 50px;
    margin-left: 40px;
}
.row-4-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}


</style>