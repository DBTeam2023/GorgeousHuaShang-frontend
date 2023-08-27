<template>
    <!-- <div class="common-layout"> -->
    <!-- <div> -->
        <el-container class="orderMainView">
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
                        <el-menu-item index="5">待评价</el-menu-item>
                        <el-menu-item index="6">已完成</el-menu-item>
                        
                    </el-menu>
                    
                </el-header>
                <div v-if="!showDetails">
                <el-main class="allOrder"> <div>
                    <!-- 显示全部订单 -->
                    <OrderList v-if="activeIndex === '1'" :orderData="orderSections.all" title="全部订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" :checkDetails="checkDetails"/>
                    <!-- 显示待付款内容 -->
                    <OrderList v-else-if="activeIndex === '2'" :orderData="orderSections.toPay" title="待付款订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" />
                    <!-- 显示待发货内容 -->
                    <OrderList v-else-if="activeIndex === '3'" :orderData="orderSections.toSend" title="待发货订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" />
                    <!-- 显示待收货内容 -->
                    <OrderList v-else-if="activeIndex === '4'" :orderData="orderSections.toReceive" title="待收货订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder"/>
                    <!-- 显示待评价内容 -->
                    <OrderList v-else-if="activeIndex === '5'" :orderData="orderSections.toComment" title="待评价订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" />
                    <!-- 显示已完成内容 -->
                    <OrderList v-else-if="activeIndex === '6'" :orderData="orderSections.finish" title="已完成订单" :deleteOrder="deleteOrder" :confirmOrder="confirmOrder" />
                </div></el-main>
                </div>
                <OrderDetailView v-else :order="currentOrder" />
                <el-footer>
                    <!-- 分页栏 -->
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
                            <el-button class="deleteSelect" type="danger" plain>删除选中订单</el-button>
                        </el-col>
                    </el-row>
                </el-footer>   
            </el-main>
        </el-container>
    <!-- </div> -->
</template>

<script>
import userInfoMenu from "../../components/common/userInfoMenu.vue"
import OrderDetailView from '@/views/order/OrderDetailView.vue';
import OrderList from '@/views/order/OrderList.vue';
import { defineComponent, ref, computed } from 'vue';
import { ElTable, ElMenu, ElMenuItem, ElHeader } from 'element-plus';
// import { Edit, View , Delete as IconView } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

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
        orderID: '5676381848455309723',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 298.00,
        number: 1,
        payment: 298.00,
        orderstate: '待评价',
      },
      {
        orderID: '9864381848455308655',
        goods : {
            image:"https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg",
            description:"商品名",
        },
        unitprice: 99.00,
        number: 1,
        payment: 99.00,
        orderstate: '待评价',
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
    ]);

    const orderSections = computed(() => {
        // 根据订单状态将订单组织成不同的部分
        const sections = {
            all: orders.value,
            toPay: orders.value.filter(order => order.orderstate === '待付款'),
            toSend: orders.value.filter(order => order.orderstate === '待发货'),
            toReceive: orders.value.filter(order => order.orderstate === '待收货'),
            toComment: orders.value.filter(order => order.orderstate === '待评价'),
            finish: orders.value.filter(order => order.orderstate === '已完成'),
        };
        return sections;
    });

    const formatCurrency = (row, column, cellValue) => {
      return '￥' + cellValue;
    }
    const formatQuantity = (row, column, cellValue) => {
      return 'x' + cellValue;
    }

    const confirmOrder = function(order) {
        // 执行确认订单的逻辑
        console.log("Confirming order:", order);

        // 更新订单状态为 "待评价"
        const index = orders.value.findIndex(item => item.orderID === order.orderID);
        if (index !== -1) {
            orders.value[index].orderstate = '待评价';
        }
    };
    const deleteOrder = function(order) {
        const index = orders.value.findIndex(item => item.orderID === order.orderID);
        if (index !== -1) {
            orders.value.splice(index, 1); // 从主订单数组中删除订单
        }
        console.log("Deleting order:", order);
    };

    // TODO
    const payOrder = function(order) {
        // 执行支付订单的逻辑，可能包括向服务器发送请求等
        console.log("Paying for order:", order);
    };
    const commentOrder = function(order) {
        // 执行评价订单的逻辑
        console.log("Commenting order:", order);
    };
    const moreOrder = function(order) {
        //执行再来一单的逻辑
        console.log("more order:", order);
    };

    return {
      activeIndex,
      handleSelect,
      formatCurrency,
      formatQuantity,
      payOrder,
      confirmOrder,
      commentOrder,
      moreOrder,
      deleteOrder,
      checkDetails,
      orders,
      orderSections,
    }
  }
});

</script>


  <!--CSS风格-->
  <style scoped>
    .orderMainView {
        background-color: #ffffff;
        margin-top: 10px;
    }

    .demo-pagination-block + .demo-pagination-block {
        margin-top: 10px;
    }
    .demo-pagination-block .demonstration {
        margin-bottom: 16px;
    }
    /* .is-disabled {
        cursor: not-allowed;
        color: #ccc;
    } */
    .deleteSelect {
        margin-left: 360px;
    }

  </style>