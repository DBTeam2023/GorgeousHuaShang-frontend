<template>
    <el-container class="order-container">
        <el-header class="order-header">
            <el-menu :default-active="activeIndex" class="ordermenu" mode="horizontal" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="waitPay">待支付</el-menu-item>
                <el-menu-item index="successPaid">已支付</el-menu-item>
                <el-menu-item index="cancelPay">已取消</el-menu-item>
                <el-menu-item index="completed">已完成</el-menu-item>
            </el-menu>
        </el-header>
        <!-- 订单详情 -->
        <el-main class="order-main">
            <!-- 订单列表信息 -->
            <el-row>
                <el-table :data="orderList" :show-header="true" :highlight-current-row="false"
                    @selection-change="selectOrders" empty-text="订单列表为空" v-loading="isload">
                    <el-table-column type="selection" width="50" :selectable="checkSelect" />
                    <el-table-column label="订单列表" width="1000">
                        <!-- 使用 slot-scope 定义作用域 -->
                        <template v-slot:default="{ row }">
                            <el-row class="t-header">
                                <el-col :span="20">订单编号: {{ row.orderID }}</el-col>
                                <el-col :span="4">订单状态: {{ showStatus[row.state] }}</el-col>
                            </el-row>
                            <el-row class="t-body">
                                <!-- 具体商品列表 -->
                                <el-col :span="14">
                                    <pickList :orderPicks="row.picks" />
                                </el-col>
                                <!-- 订单操作 -->
                                <el-col class="right-col" :span="3" style="color:red;font-weight: bold;">
                                    ￥{{ row.money }}
                                </el-col>

                                <el-col class="right-col" :span="3">
                                    <el-row class="btn">
                                        <el-button link class="detail-btn"
                                            @click="goOrderDetail(row.orderID)">订单详情</el-button>
                                    </el-row>
                                </el-col>
                                <!-- 订单操作 -->
                                <el-col class="right-col  btn-col" :span="3">
                                    <el-row class="btn">
                                        <el-button v-if="row.state === 'wait to pay'" type="primary"
                                            @click="goPay(row.orderID)">立即支付</el-button>
                                        <el-button v-if="row.state === 'paid'" type="success"
                                            @click="finish(row.orderID)">确认收货</el-button>
                                    </el-row>
                                    <el-row class="btn">
                                        <el-button v-if="row.state === 'wait to pay'" type="warning"
                                            @click="cancel(row.orderID)">取消订单</el-button>
                                        <el-button v-if="row.state === 'order complete' || row.state === 'cancelled'"
                                            type="danger" @click="deleteMyOrder(row.orderID)">删除订单</el-button>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- 分页栏  -->
            <el-row class="pagination">
                <el-button type="danger" plain @click="deleteAll"
                    :disabled="activeIndex === 'successPaid' || activeIndex === waitPay">
                    删除所选订单
                </el-button>
            </el-row>
            <el-row class="pagination">
                <el-pagination v-model:currentPage="currentPage" v-model:pageSize="pageSize" :small="small"
                    :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="total"
                    @current-change="handleCurrentChange" />
            </el-row>

        </el-main>
    </el-container>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import pickList from '@/views/order/pickList.vue'
import { myOrders, cancelorder, deleteOrder, finishOrder } from '@/api/order'
import { ElMessage } from 'element-plus';
import { base64ToUrl } from '@/utils/photo'
import { useRouter } from 'vue-router';

const router = useRouter();
const isload = ref(false);

// 菜单栏选项
const activeIndex = ref('all');

// 分页栏用到的数据
const currentPage = ref(1);
const pageSize = 5;
let total = ref(1);//总数据

// 获取订单列表
const orderList = ref([]);

// 选择的订单列表
const selectedOrders = ref([]);

// 订单状态
const status = ref({
    'all': null,
    'successPaid': 'paid',
    'cancelPay': 'cancelled',
    'completed': 'order complete',
    'waitPay': 'wait to pay',
})

const showStatus = ref({
    'paid': '已支付',
    'cancelled': '已取消',
    'order complete': '已完成',
    'wait to pay': '待支付',
})

// 分页获取订单信息
const getOrderInPage = () => {
    isload.value = true;
    myOrders({
        pageSize: pageSize,
        pageIndex: currentPage.value,
        orderId: null,
        moneymin: 0,
        moneymax: null,
        orderStatus: status.value[activeIndex.value],
    })
        .then(resp => {
            orderList.value = resp.data.records;
            total.value = resp.data.total;
            console.log(resp);
            for (const order of orderList.value) {
                for (const pick of order.picks) {
                    const imageUrl = base64ToUrl(pick.image, pick.imageType);
                    Object.assign(pick, { picture: imageUrl });
                }
            }
        })
        .catch(error => {
            ElMessage('获取订单信息失败，请刷新重试！');
            console.log(error)
        })
        .finally(() => {
            isload.value = false;
        })
}


// 初始调用
onMounted(() => {
    getOrderInPage();
})

// 分页请求
const handleCurrentChange = () => {
    getOrderInPage();
}

// 菜单筛选
const handleSelect = (val) => {
    activeIndex.value = val;
    getOrderInPage();
};

// 多选订单
const selectOrders = (val) => {
    selectedOrders.value = val;
    console.log(selectedOrders.value);
}

// 表项是否可选
const checkSelect = (row) => {
    if (activeIndex.value === 'waitPay' || activeIndex.value === 'successPaid')
        return false;
    return (row.state === 'order complete' || row.state === 'cancelled');
}

// 跳转订单详情
const goOrderDetail = (id) => {
    router.push({ name: 'OrderDetail', params: { orderID: id } });
}

// 去支付
const goPay = (id) => {
    //   跳转支付
    router.push({
        path: '/pay',
        query: {
            orderId: id
        }
    })
}

// 取消订单
const cancel = (id) => {
    isload.value = true;
    cancelorder({
        orderId: id
    })
        .then(resp => {
            ElMessage.success('取消订单成功！');
            getOrderInPage();
        })
        .catch(error => {
            ElMessage.error('取消订单失败！');
        })
        .finally(() => {
            isload.value = false;
        })
}

// 删除订单
const deleteMyOrder = (id) => {
    isload.value = true;
    deleteOrder({
        orderId: id
    })
        .then(resp => {
            ElMessage.success('删除订单成功！');
            getOrderInPage();
        })
        .catch(erro => {
            ElMessage.error('删除订单失败');
        })
        .finally(() => {
            isload.value = false;
        })
}

// 删除已选所有订单
const deleteAll = async () => {
    isload.value = true;
    let showSuccess = ref(true);
    const promises = [];
    for (const order of selectedOrders.value) {
        const promise = deleteOrder({
            orderId: order.orderID
        })
            .then(resp => {
            })
            .catch(error => {
                ElMessage.error('删除订单失败！');
                showSuccess.value = false;
            })
        promises.push(promise);
    }
    await Promise.all(promises);//等待for循环结束

    if (showSuccess.value === true) {
        ElMessage.success('删除订单成功！！');
        getOrderInPage();
    }
}

// 确认订单（状态改为已完成）
const finish = (id) => {
    isload.value = true;
    finishOrder({
        orderId: id
    })
        .then(resp => {
            ElMessage.success('确认收货成功！');
            getOrderInPage();
        })
        .catch(error => {
            ElMessage.error('确认收货失败！');
        })
        .finally(() => {
            isload.value = false;
        })
}
</script>
  
<style scoped>
.order-container {
    padding: 0;
    margin: 0 5% 5% 5%;
    box-shadow: 0 0 23px rgb(107 106 106 / 83%);
}

.order-container .order-main {
    background-color: #fff;
    padding: 0;
}

.order-container .order-header {
    padding: 0;
}

.t-header {
    height: 30px;
    border-bottom: 1px solid rgb(83, 81, 81);
    padding: 0;
    font-size: 16px;
}

.t-body .right-col {
    background-color: #faf7ef;
    margin: 10px 0.5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.t-body .btn-col {
    display: flex;
    flex-direction: column;
}

.t-body .btn-col .btn {
    margin: 5%;
}

.pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
    text-align: center;
}

.detail-btn:hover {
    color: red !important;
}

.el-table thead {
    font-size: 20px !important;
}

.el-table tr {
    background-color: #fbe284 !important;
}
</style>