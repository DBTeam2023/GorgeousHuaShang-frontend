<template>
    <el-card class="row-4-card" :span="24">
        <el-descriptions
            class="margin-top"
            :column="2"
            :style="blockMargin"
        >
            <el-descriptions-item label="商品总价">￥298.00</el-descriptions-item>
            <el-descriptions-item label="优惠">-￥8.00</el-descriptions-item>
            <el-descriptions-item label="运费">￥0</el-descriptions-item>
            <el-descriptions-item label="实付款">￥298.00</el-descriptions-item>
            <el-descriptions-item label="支付方式">
            <el-tag size="small">微信支付</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="支付时间">2023-07-02 20:46</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script></script>

<style scoped>
/* 订单支付信息卡片 */
.row-4-card {
    margin-top: 30px;
    width: 1300px;
    margin-left: 50px;
    margin-right: 60px;
}
</style>