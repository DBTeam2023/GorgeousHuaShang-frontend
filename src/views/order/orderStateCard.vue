<template>
    <el-card class="orderState-card">
        <template #header>
        <div class="orderState-card-header">
            <span style="font-weight: bold; font-size: 1.15em;">订单信息</span>
        </div>
        </template>
        <el-descriptions
            class="margin-top"
            :column="2"
            :style="blockMargin"
        >
            <el-descriptions-item label="订单编号：" >{{ OrderState.orderID }}</el-descriptions-item>
            <el-descriptions-item label="用户编号：" >{{ OrderState.userID }}</el-descriptions-item>
            <el-descriptions-item label="用户名：" >{{ OrderState.username }}</el-descriptions-item>
            <el-descriptions-item label="手机号：" >{{ OrderState.phoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="仓库地址：" >{{ OrderState.shipAddress }}</el-descriptions-item>
            <el-descriptions-item label="收货地址：" >{{ OrderState.pickAddress }}</el-descriptions-item>
            <el-descriptions-item label="快递公司：" >{{ OrderState.company }}</el-descriptions-item>
        </el-descriptions>    
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLogisticsInfo } from '@/api/logistics'
import { getUserInfo } from '@/api/userinfo'
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由实例

const OrderState = ref({
    orderID: '',
    state: '',
    userID: '',
    username: '',
    phoneNumber: '',
    shipAddress: '',
    pickAddress: '',
    company: ''
})


// // 新增：弹窗状态和收货地址数据
// const isAddressDialogVisible = ref(false)
// const editedPickAddress = ref('')

// // 新增：打开弹窗的方法
// const openAddressDialog = () => {
//     isAddressDialogVisible.value = true
//     editedPickAddress.value = OrderState.value.pickAddress
// }

// // 新增：保存修改的方法
// const saveEditedPickAddress = () => {
//     // 保存修改后的收货地址到 OrderState 中
//     OrderState.value.pickAddress = editedPickAddress.value
    
//     // 更新 itemList 数组
//     itemList.value = [
//         OrderState.value.state,
//         OrderState.value.shipAddress,
//         OrderState.value.pickAddress,
//         OrderState.value.company
//     ]

//     // // 调用 sendDataToBackend 将修改后的数据发送到后端
//     // sendDataToBackend();
    
//     // 关闭弹窗
//     isAddressDialogVisible.value = false
// }

// // 新增：取消修改的方法
// const cancelEdit = () => {
//     // 关闭弹窗
//     isAddressDialogVisible.value = false
// }

onMounted(() => {
    const orderNumber = route.params.orderID;
    OrderState.value.orderID = orderNumber;

    // 获取用户信息并更新 OrderState 对象
    getUserInfo()
        .then(userInfoResponse => {
            OrderState.value.userID = userInfoResponse.data.userId;
            OrderState.value.username = userInfoResponse.data.username;
            OrderState.value.phoneNumber = userInfoResponse.data.phoneNumber;

            // 获取物流信息
            return getLogisticsInfo({logisticsId:orderNumber})
        })
        .then(logisticsResponse => {
            OrderState.value.shipAddress = logisticsResponse.data.shipAddress;
            OrderState.value.pickAddress = logisticsResponse.data.pickAddress;
            OrderState.value.company = logisticsResponse.data.company;
        })
        .catch(error => {
            ElMessage('获取物流信息失败，请刷新！')
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

.orderState-card{
    margin-top: 30px;
    margin-left: 70px;
    margin-right: 80px;
}
.orderState-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
    
</style>