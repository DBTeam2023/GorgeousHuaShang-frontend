<template>
    <el-card class="orderState-card">
        <template #header>
        <div class="orderState-card-header">
            <span style="font-weight: bold;">订单状态</span>
            <el-button text @click="openAddressDialog">申请修改订单</el-button>
        </div>
        </template>
        <div class="text item">订单状态：{{ OrderState.state }}</div>
        <div class="text item">仓库地址：{{ OrderState.shipAddress }}</div>
        <div class="text item">收货地址：{{ OrderState.pickAddress }}</div>
        <div class="text item">快递公司：{{ OrderState.company }}</div>
    </el-card>
    
    <!-- 新增：弹窗内容 -->
    <el-dialog v-model="isAddressDialogVisible" title="修改收货地址">
        <el-form label-width="120px">
            <el-form-item label="新的收货地址">
                <el-input v-model="editedPickAddress"></el-input>
            </el-form-item>
        </el-form>
        <!-- 新增：弹窗按钮 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="saveEditedPickAddress">保存</el-button>
        </span>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLogisticsInfo } from '@/api/logistics'
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由实例


const itemList = ref([])

const OrderState = ref({
    state: '',
    shipAddress: '',
    pickAddress: '',
    company: ''
})


// 新增：弹窗状态和收货地址数据
const isAddressDialogVisible = ref(false)
const editedPickAddress = ref('')

// 新增：打开弹窗的方法
const openAddressDialog = () => {
    isAddressDialogVisible.value = true
    editedPickAddress.value = OrderState.value.pickAddress
}

// 新增：保存修改的方法
const saveEditedPickAddress = () => {
    // 保存修改后的收货地址到 OrderState 中
    OrderState.value.pickAddress = editedPickAddress.value
    
    // 更新 itemList 数组
    itemList.value = [
        OrderState.value.state,
        OrderState.value.shipAddress,
        OrderState.value.pickAddress,
        OrderState.value.company
    ]

    // // 调用 sendDataToBackend 将修改后的数据发送到后端
    // sendDataToBackend();
    
    // 关闭弹窗
    isAddressDialogVisible.value = false
}

// 新增：取消修改的方法
const cancelEdit = () => {
    // 关闭弹窗
    isAddressDialogVisible.value = false
}

// //模拟从后端获取数据
// onMounted(() => {
//     // 假设从后端获取的数据后，将其更新到OrderState中
//     OrderState.value = {
//         state: '订单已发货',
//         shipAddress: '浙江省嘉兴市某区某路某号',
//         pickAddress: '张x，16578765678, 上海市嘉定区安亭镇曹安公路4800号同济大学嘉定校区',
//         company: '韵达'
//     }
// })

onMounted(() => {
    const orderNumber = route.params.orderID; // 获取订单号
    getLogisticsInfo(orderNumber)
        .then(response => {
            // OrderState.state = response.state;
            OrderState.shipAddress = response.shipAddress;
            OrderState.pickAddress = response.pickAddress;
            OrderState.company = response.company;
        })
        .catch(error => {
            console.error('Error fetching logistics information:', error);
        });
});


// const sendDataToBackend = () => {
//     // 要发送到后端的数据
//     const updatedData = {
//         pickAddress: editedPickAddress.value,
//     }
    
//     // 发送数据到后端的 API 端点
//     axios.post('/api/Logistics/getLogistics/', updatedData)
//         .then(response => {
//             // 处理后端的成功响应
//             console.log('Data sent successfully:', response.data);
//         })
//         .catch(error => {
//             // 处理错误
//             console.error('Error sending data:', error);
//         });
// }
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