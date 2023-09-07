<template>
    <div class="common-layout">
    <!-- <div> -->
        <el-container class="orderMainView custom-main">
            <el-main>
                
                <el-header class="totalorder-head">
                    <el-menu
                        :default-active="activeIndex"
                        class="ordermenu"
                        mode="horizontal"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @select="handleSelect"
                    >
                        <el-menu-item index="1">全部订单</el-menu-item>
                        <el-menu-item index="2">待付款</el-menu-item>
                        <el-menu-item index="3">待发货</el-menu-item>
                        <el-menu-item index="4">待收货</el-menu-item>
                        <!-- <el-menu-item index="5">待评价</el-menu-item> -->
                        <el-menu-item index="5">已完成</el-menu-item>
                        
                    </el-menu>
                    
                </el-header>
                <el-container class="white-background-container">
                <div v-if="!showDetails">
                <el-main class="allOrder"> <div>
                    <!-- 显示全部订单 -->
                    <OrderList v-if="activeIndex === '1'" :orderData="orderSections.all" title="全部订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" :checkDetails="checkDetails" :payOrder="payOrder"  :cancelOrder="cancelOrder" :selectedOrders="selectedOrders"/>
                    <!-- 显示待付款内容 -->
                    <OrderList v-else-if="activeIndex === '2'" :orderData="orderSections.toPay" title="待付款订单" :deleteOrder="deleteOrder" :payOrder="payOrder" :cancelOrder="cancelOrder" />
                    <!-- 显示待发货内容 -->
                    <OrderList v-else-if="activeIndex === '3'" :orderData="orderSections.toSend" title="待发货订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" />
                    <!-- 显示待收货内容 -->
                    <OrderList v-else-if="activeIndex === '4'" :orderData="orderSections.toReceive" title="待收货订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" />
                    <!-- 显示待评价内容 -->
                    <!-- <OrderList v-else-if="activeIndex === '5'" :orderData="orderSections.toComment" title="待评价订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" /> -->
                    <!-- 显示已完成内容 -->
                    <OrderList v-else-if="activeIndex === '5'" :orderData="orderSections.finish" title="已完成订单" :deleteOrder="deleteOrder" />
                </div></el-main>
                </div>
                <OrderDetailView v-else :order="currentOrder" />
                <!-- <el-footer>
                    <el-row>
                        <el-col :span="12">
                            <div class="demo-pagination-block">
                                <el-pagination
                                v-model:current-page="currentPage"
                                v-model:page-size="pageSize"
                                :small="small"
                                :disabled="disabled"
                                :background="background"
                                layout="prev, pager, next, jumper"
                                :total="1000"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                />
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="deleteSelect" type="danger" plain @click="handleDeleteSelectedOrder">删除选中订单</el-button>
                        </el-col>
                    </el-row>
                </el-footer>    -->
            </el-container></el-main>
        </el-container>
    </div>
</template>

<script>
import userInfoMenu from "../../components/common/userInfoMenu.vue"
import OrderDetailView from '@/views/order/OrderDetailView.vue';
import OrderList from '@/views/order/OrderList.vue';
import { defineComponent, ref, computed } from 'vue';
import { ElTable, ElMenu, ElMenuItem, ElHeader } from 'element-plus';
// import { Edit, View , Delete as IconView } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { cancelorder, deleteOrder, finishOrder } from '@/api/order'



export default defineComponent({
  name: 'Order',
  components: {
    userInfoMenu,
    ElTable,
    ElMenu,
    ElMenuItem,
    ElHeader,
    OrderDetailView,
    OrderList,
  },

  setup() {
    const router = useRouter();

    const activeIndex = ref('1');
    const handleSelect = function(index) {
      activeIndex.value = index;
    };

    let showDetails = ref(false);
    let currentOrder = ref(null);

    const checkDetails = (order) => {
        currentOrder.value = order;
        showDetails.value = true;

        // 构建目标路径，跳转到订单详情页
        router.push({ name: 'OrderDetail', params: { orderID: order.orderID } });
    };

    const orders = ref([
    {
        orderID: '3406381848455359319',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 108.00,
        number: 1,
        payment: 108.00,
        orderstate: '待发货',
      },
      {
        orderID: '3406381848455309725',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 198.00,
        number: 1,
        payment: 198.00,
        orderstate: '待付款',
      },
      {
        orderID: '3404661193312359323',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 90.00,
        number: 2,
        payment: 180.00,
        orderstate: '待收货',
      },
      {
        orderID: '240655332765530422',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 1199.00,
        number: 1,
        payment: 1199.00,
        orderstate: '已完成',
      },
      {
        orderID: '240655332765530423',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 199.00,
        number: 1,
        payment: 199.00,
        orderstate: '已完成',
      },
    ]);

    const orderSections = computed(() => {
        // 根据订单状态将订单组织成不同的部分
        const sections = {
            all: orders.value,
            toPay: orders.value.filter(order => order.orderstate === '待付款'),
            toSend: orders.value.filter(order => order.orderstate === '待发货'),
            toReceive: orders.value.filter(order => order.orderstate === '待收货'),
            // toComment: orders.value.filter(order => order.orderstate === '待评价'),
            finish: orders.value.filter(order => order.orderstate === '已完成'),
        };
        return sections;
    });

    const selectedOrders = ref([]);


    const formatCurrency = (row, column, cellValue) => {
      return '￥' + cellValue;
    }
    const formatQuantity = (row, column, cellValue) => {
      return 'x' + cellValue;
    }
    // const confirmOrder = function(order) {
    //     // Assuming you have an order status field in your order object
    //     order.orderstate = '已完成'; // Update the order status locally

    //     // Create an object with the updated order data
    //     const updatedOrderData = {
    //         orderID: order.orderID,
    //         state: true, // Set the order status to '已完成' (or the appropriate value)
    //         // Add any other fields you need to update here
    //     };

    //     // Call the updateOrder API to update the order status on the server
    //     updateOrder(updatedOrderData)
    //         .then(response => {
    //             // Handle the successful response here, such as updating the UI
    //             console.log("Order confirmed successfully:", response.data);

    //             // You may want to update the local orders array with the updated order data
    //             const index = orders.value.findIndex(item => item.orderID === order.orderID);
    //             if (index !== -1) {
    //                 // Replace the existing order with the updated order data
    //                 orders.value[index] = response.data; // Assuming the response contains the updated order data
    //             }
    //         })
    //         .catch(error => {
    //             // Handle errors, such as displaying an error message to the user
    //             console.error("Error confirming order:", error);
    //             // Revert the local order status if the API call fails
    //             order.orderstate = '待发货'; // Revert to the previous status or handle it accordingly
    //         });
    // };


    const confirmOrder = function(order) {
        // 执行确认订单的逻辑
        console.log("Confirming order:", order);

        // 更新订单状态为 "已完成"->用 finishOrder
        const index = orders.value.findIndex(item => item.orderID === order.orderID);
        if (index !== -1) {
            orders.value[index].orderstate = '已完成';
            finishOrder({ orderId: order.orderID })
                .then(response => {
                    if (response.code === 200) {
                    console.log('订单状态已更新为已完成');
                    } else {
                    console.error('更新订单状态失败:', response.msg);
                    }
                })
                .catch(error => {
                    console.error('更新订单状态时发生错误:', error);
                });
        }
    };
    const deleteOrder = function(order) {
        // Call the deleteOrder API with the order ID
        // deleteOrder({ orderID: order.orderID })
        deleteOrder({ orderId: "aed4e77f-d23d-4734-a157-0315c4ef17d2"})
            .then(response => {
                // Handle the successful response here, such as updating the UI
                console.log("Order deleted successfully:", response.data);

                // Remove the deleted order from the local orders array
                const index = orders.value.findIndex(item => item.orderID === order.orderID);
                if (index !== -1) {
                    orders.value.splice(index, 1); // Remove the order from the local array
                }
            })
            .catch(error => {
                // Handle errors, such as displaying an error message to the user
                console.error("Error deleting order:", error);
            });
    };

    // const deleteOrder = function(order) {
    //     const index = orders.value.findIndex(item => item.orderID === order.orderID);
    //     if (index !== -1) {
    //         orders.value.splice(index, 1); 
    //     }
    //     console.log("Deleting order:", order);
    // };
    const payOrder = function(order) {
        console.log("Paying for order:", order);
    };

    const cancelOrder = function(order) {
        console.log("Cancelling order:", order);

        // 调用接口
        // cancelorder({ orderId: order.orderID })
        cancelorder({ orderId: "74bb9d17-e312-4988-9251-45a1a2d85a60" })
            .then(response => {
                console.log('Order cancelled successfully:', response.data);
                deleteOrder(order);
            })
            .catch(error => {
                console.error('Error cancelling order:', error);
            });
    };

    
    return {
      activeIndex,
      handleSelect,
      formatCurrency,
      formatQuantity,
      payOrder,
      confirmOrder,
      deleteOrder,
      checkDetails,
      cancelOrder,
      finishOrder,
      orders,
      orderSections,
      selectedOrders,
    }
  }
});

</script>


  <!--CSS风格-->
  <style scoped>
    .orderMainView {
        background-color: #ffffff;
        margin-top: -10px;
        display: flex;
    }
    /* .allOrder {
        display: flex;
        flex-wrap: wrap; 
        justify-content: space-between; 
        align-items: flex-start; 
    } */
    .custom-main {
        background-color: transparent !important; /* 使用 !important 确保样式覆盖默认样式 */
    }
    .white-background-container {
        /* 设置白底容器的样式，包括高度、背景颜色等 */
        /* 例如： */
        height: auto;
        background-color: white;
        width: 97%;
    }
    .totalorder-head{
        width: 100.5%;
        margin-left: -20px;
    }
    .common-layout {
        display: flex; /* 使用 flexbox 布局 */
        height: 100vh; /* 设置高度为视口高度，以使内容垂直居中 */
        margin-left: 35px;
    }

    

    /* 
    .demo-pagination-block + .demo-pagination-block {
        margin-top: 10px;
    }
    .demo-pagination-block .demonstration {
        margin-bottom: 16px;
    }

    .deleteSelect {
        margin-left: 360px;
    } */

  </style>