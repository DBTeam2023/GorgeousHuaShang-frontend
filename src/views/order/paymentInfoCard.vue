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
            <el-descriptions-item label="商品总价" >￥298.00</el-descriptions-item>
            <el-descriptions-item label="优惠" >-￥8.00</el-descriptions-item>
            <el-descriptions-item label="运费" >￥0</el-descriptions-item>
            <el-descriptions-item label="实付款" >￥298.00</el-descriptions-item>
            <el-descriptions-item label="支付方式" >
            <el-tag size="small">微信支付</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支付时间" >2023-07-02 20:46</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script></script>

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