<template>
    <el-card class="row-3-card">
        <el-table :data="orderTableData" style="width: 100%">
            <el-table-column prop="orderID" label="订单号" width="220px"/>
            <el-table-column prop="goods" label="商品" width="220px">
                <template v-slot="{ row }">
                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                    <div>{{ row.goods.description }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="unitprice" label="单价" width="160px" :formatter="formatCurrency"/>
            <el-table-column prop="number" label="数量" width="160px" :formatter="formatQuantity"/>
            <el-table-column prop="total" label="总额" width="160px" :formatter="formatCurrency"/>
            <el-table-column prop="payment" label="实付" width="160px" :formatter="formatCurrency"/>
        </el-table>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'


const orderTableData = ref([
    {
        orderID: 338760119287662,
        goods: {
            image:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            description:"商品名",
        },
        unitprice: 298.00,
        number: 1,
        total: 298.00,
        payment: 290.00,

    },
])

const formatCurrency = (row, column, cellValue) => {
  return '￥' + cellValue;
}

const formatQuantity = (row, column, cellValue) => {
  return 'x' + cellValue;
}

</script>

<style scoped>
.row-3-card {
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 60px;
    width: 1300px;
}
</style>