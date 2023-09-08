<template>
    <el-card class="row-3-card">
        <el-table :data="orderTableData" >
            <el-table-column prop="goodsID" label="商品编号" width="300"/>
            <el-table-column prop="goods" label="商品" width="250">
                <template v-slot="{ row }">
                    <img :src="row.goods.image" alt="goods image" style="width: 50; height: 50;"/>
                    <div>{{ row.goods.description }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="unitprice" label="单价" width="160" :formatter="formatCurrency"/>
            <el-table-column prop="number" label="数量" width="160" :formatter="formatQuantity"/>
            <el-table-column prop="total" label="总额" width="160" :formatter="formatCurrency"/>
            <el-table-column prop="payment" label="实付" width="160" :formatter="formatCurrency"/>
        </el-table>
    </el-card>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { getOrderInfo } from '@/api/order';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderID = route.params.orderID;
const orderTableData = ref([]);

const fetchOrderInfo = () => {
    getOrderInfo({ orderId: orderID })
    .then(response => {

        const picks = response.data.picks;

        orderTableData.value = picks.map(item => ({
          goodsID: item.pickId,
          unitprice: item.price,
          number: item.number,
          payment: item.price*item.number,
          goods: {
            image: item.pickImage,
            description: item.description,
          },
        }));
      
    })
    .catch(error => {
      console.error('获取订单信息时发生错误:', error);
    });
};


// 报错！
onMounted(() => {
  fetchOrderInfo();
});

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
    margin-left: 70px;
    margin-right: 80px;
    width: 1300px;
}
.row-3-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>