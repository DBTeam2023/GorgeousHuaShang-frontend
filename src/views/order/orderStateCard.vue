<template>
    <el-card class="orderState-card">
        <template #header>
        <div class="orderState-card-header">
            <span style="font-weight: bold;">订单状态</span>
            <!-- <el-button text @click="openAddressDialog">申请修改订单</el-button> -->
        </div>
        </template>
        <div class="text item">用户编号：{{ OrderState.userID }}</div>
        <div class="text item">用户昵称：{{ OrderState.nickName }}</div>
        <div class="text item">手机号：{{ OrderState.phoneNumber }}</div>
        <div class="text item">订单状态：{{ OrderState.state }}</div>
        <div class="text item">仓库地址：{{ OrderState.shipAddress }}</div>
        <div class="text item">收货地址：{{ OrderState.pickAddress }}</div>
        <div class="text item">快递公司：{{ OrderState.company }}</div>
    </el-card>
    

    <!-- <el-dialog v-model="isAddressDialogVisible" title="修改收货地址">
        <el-form label-width="120px">
            <el-form-item label="新的收货地址">
                <el-input v-model="editedPickAddress"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="saveEditedPickAddress">保存</el-button>
        </span>
    </el-dialog> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLogisticsInfo } from '@/api/logistics'
import { getUserInfo } from '@/api/userinfo'
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由实例


// const itemList = ref([])

const OrderState = ref({
    state: '',
    userID: '',
    nickName: '',
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

    // 获取用户信息并更新 OrderState 对象
    getUserInfo()
        .then(userInfoResponse => {
            OrderState.value.userID = userInfoResponse.data.userId;
            OrderState.value.nickName = userInfoResponse.data.nickName;
            // OrderState.value.phoneNumber = userInfoResponse.data.phoneNumber;

            // 获取物流信息
            return getLogisticsInfo({ logisticsId: "27f18a02-656b-4450-b659-640ffb57a590" });
            // return getLogisticsInfo({logisticsId:orderNumber})
        })
        .then(logisticsResponse => {
            OrderState.value.shipAddress = logisticsResponse.data.shipAddress;
            OrderState.value.pickAddress = logisticsResponse.data.pickAddress;
            OrderState.value.company = logisticsResponse.data.company;
        })
        .catch(error => {
            console.error('Error fetching logistics information:', error);
        });
});


// onMounted(() => {
//     const orderNumber = route.params.orderID; // 获取订单号
//     getLogisticsInfo({logisticsId:"27f18a02-656b-4450-b659-640ffb57a590"})
//     // getLogisticsInfo({logisticsId:orderNumber})
//         .then(response => {
//             // OrderState.value.state = response.data.state;
//             OrderState.value.shipAddress = response.data.shipAddress;
//             OrderState.value.pickAddress = response.data.pickAddress;
//             OrderState.value.company = response.data.company;
//         })
//         .catch(error => {
//             console.error('Error fetching logistics information:', error);
//         });
// });


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
    margin-left: 70px;
    margin-right: 80px;
}
.orderState-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
    
</style>