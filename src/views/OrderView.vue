<!--html模板-->
<template>
    <!-- <div class="common-layout"> -->
    <!-- <div> -->
        <el-container class="orderMainView">
            <el-aside><!--侧边栏-->
                <userInfoMenu/>
            </el-aside>   
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
                <el-main class="allOrder">                
                    <!--显示全部订单-->
                    <div v-if="activeIndex === '1'">
                        <el-table
                            ref="multipleTableRef"
                            :data="allorderTableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="orderID" label="订单编号" width="150" />
                            <el-table-column property="goods" label="宝贝" width="180" >
                                <template v-slot="{ row }">
                                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                                    <div>{{ row.goods.description }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="unitprice" label="单价" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="number" label="数量" width="60" :formatter="formatQuantity"/>
                            <el-table-column property="payment" label="实付" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="orderstate" label="订单状态" width="150" />
                            <el-table-column property="operation" label="交易操作" width="150" >
                                <template v-slot="{ row }">
                                    <el-button v-if="row.orderstate === '待付款'" type="primary" round size="mini" @click="payOrder(row)">立即支付</el-button>
                                    <el-button v-else-if="row.orderstate === '待发货'" type="danger" round size="mini" @click="confirmOrder(row)">确认收货</el-button>
                                    <el-button v-else-if="row.orderstate === '待收货'" type="danger" round size="mini" @click="confirmOrder(row)">确认收货</el-button>
                                    <el-button v-else-if="row.orderstate === '待评价'" type="warning" round size="mini" @click="commentOrder(row)">评价</el-button>
                                    <el-button v-else-if="row.orderstate === '已完成'" type="warning" round size="mini" @click="moreOrder(row)">再来一单</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="operationforOder" label="订单操作" width="150" >
                                <template v-slot="{ row }">
                                    <div>
                                        <div>
                                            <el-link :icon="View" :underline="false">订单详情</el-link>
                                        </div>
                                        <div>
                                            <el-link :icon="Edit" :underline="false">修改订单</el-link>
                                        </div>
                                        <div>
                                            <el-link
                                            :icon="Delete"
                                            :underline="false"
                                            :class="{ 'is-disabled': row.orderstate === '待收货' || row.orderstate === '待发货' }"
                                            @click.stop.prevent="row.orderstate !== '待收货' && row.orderstate !== '待发货' ? deleteOrder(row) : null"
                                            >
                                            删除订单
                                            </el-link>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    <!--显示待付款内容-->
                    <div v-else-if="activeIndex === '2'">
                        <el-table
                            ref="multipleTableRef"
                            :data="toPayTableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="orderID" label="订单编号" width="150" />
                            <el-table-column property="goods" label="宝贝" width="180" >
                                <template v-slot="{ row }">
                                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                                    <div>{{ row.goods.description }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="unitprice" label="单价" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="number" label="数量" width="60" :formatter="formatQuantity"/>
                            <el-table-column property="payment" label="实付" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="orderstate" label="订单状态" width="150" />
                            <el-table-column property="operation" label="交易操作" width="150" >
                                <template v-slot="{ row }">
                                    <el-button v-if="row.orderstate === '待付款'" type="primary" round size="mini" @click="payOrder(row)">立即支付</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="operationforOder" label="订单操作" width="150" >
                                <div>
                                    <div>
                                        <el-link :icon="View" :underline="false">订单详情</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Edit" :underline="false">修改订单</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Delete" :underline="false">删除订单</el-link>
                                    </div>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--显示待发货内容-->
                    <div v-else-if="activeIndex === '3'">
                        <el-table
                            ref="multipleTableRef"
                            :data="toSendTableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="orderID" label="订单编号" width="150" />
                            <el-table-column property="goods" label="宝贝" width="180" >
                                <template v-slot="{ row }">
                                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                                    <div>{{ row.goods.description }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="unitprice" label="单价" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="number" label="数量" width="60" :formatter="formatQuantity"/>
                            <el-table-column property="payment" label="实付" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="orderstate" label="订单状态" width="150" />
                            <el-table-column property="operation" label="交易操作" width="150" >
                                <template v-slot="{ row }">
                                    <el-button v-if="row.orderstate === '待发货'" type="danger" round size="mini" @click="confirmOrder(row)">确认收货</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="operationforOder" label="订单操作" width="150" >
                                <div>
                                    <div>
                                        <el-link :icon="View" :underline="false">订单详情</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Edit" :underline="false">修改订单</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Delete" :underline="false" disabled>删除订单</el-link>
                                    </div>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--显示待收货内容-->
                    <div v-else-if="activeIndex === '4'">
                        <el-table
                            ref="multipleTableRef"
                            :data="toReceiveTableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="orderID" label="订单编号" width="150" />
                            <el-table-column property="goods" label="宝贝" width="180" >
                                <template v-slot="{ row }">
                                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                                    <div>{{ row.goods.description }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="unitprice" label="单价" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="number" label="数量" width="60" :formatter="formatQuantity"/>
                            <el-table-column property="payment" label="实付" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="orderstate" label="订单状态" width="150" />
                            <el-table-column property="operation" label="交易操作" width="150" >
                                <template v-slot="{ row }">
                                    <el-button v-if="row.orderstate === '待收货'" type="danger" round size="mini" @click="confirmOrder(row)">确认收货</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="operationforOder" label="订单操作" width="150" >
                                <div>
                                    <div>
                                        <el-link :icon="View" :underline="false">订单详情</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Edit" :underline="false">修改订单</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Delete" :underline="false" disabled>删除订单</el-link>
                                    </div>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--显示待评价内容-->
                    <div v-else-if="activeIndex === '5'">
                        <el-table
                            ref="multipleTableRef"
                            :data="commmentTableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="orderID" label="订单编号" width="150" />
                            <el-table-column property="goods" label="宝贝" width="180" >
                                <template v-slot="{ row }">
                                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                                    <div>{{ row.goods.description }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="unitprice" label="单价" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="number" label="数量" width="60" :formatter="formatQuantity"/>
                            <el-table-column property="payment" label="实付" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="orderstate" label="订单状态" width="150" />
                            <el-table-column property="operation" label="交易操作" width="150" >
                                <template v-slot="{ row }">
                                    <el-button v-if="row.orderstate === '待评价'" type="warning" round size="mini" @click="commentOrder(row)">评价</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="operationforOder" label="订单操作" width="150" >
                                <div>
                                    <div>
                                        <el-link :icon="View" :underline="false">订单详情</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Edit" :underline="false">修改订单</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Delete" :underline="false">删除订单</el-link>
                                    </div>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--显示已完成内容-->
                    <div v-else-if="activeIndex === '6'">
                        <el-table
                            ref="multipleTableRef"
                            :data="finishTableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55" />
                            <el-table-column property="orderID" label="订单编号" width="150" />
                            <el-table-column property="goods" label="宝贝" width="180" >
                                <template v-slot="{ row }">
                                    <img :src="row.goods.image" alt="goods image" style="width: 50px; height: 50px;"/>
                                    <div>{{ row.goods.description }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="unitprice" label="单价" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="number" label="数量" width="60" :formatter="formatQuantity"/>
                            <el-table-column property="payment" label="实付" width="80" :formatter="formatCurrency"/>
                            <el-table-column property="orderstate" label="订单状态" width="150" />
                            <el-table-column property="operation" label="交易操作" width="150" >
                                <template v-slot="{ row }">
                                    <el-button v-if="row.orderstate === '已完成'" type="warning" round size="mini" @click="moreOrder(row)">再来一单</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="operationforOder" label="订单操作" width="150" >
                                <div>
                                    <div>
                                        <el-link :icon="View" :underline="false">订单详情</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Edit" :underline="false">修改订单</el-link>
                                    </div>
                                    <div>
                                        <el-link :icon="Delete" :underline="false">删除订单</el-link>
                                    </div>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-main>
                <el-footer>
                    <el-row>
                        <el-col :span="12">
                            <div class="demo-pagination-block">
                                <el-pagination
                                v-model:current-page="currentPage3"
                                v-model:page-size="pageSize3"
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
import userInfoMenu from "../components/common/userInfoMenu.vue"
import { defineComponent, ref } from 'vue';
import { ElTable, ElMenu, ElMenuItem, ElHeader } from 'element-plus';
import { Edit, View , Delete as IconView } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'Order',
  components: {
    userInfoMenu,
    ElTable,
    ElMenu,
    ElMenuItem,
    ElHeader
  },
  setup() {
    const activeIndex = ref('1');
    const handleSelect = function(index) {
      activeIndex.value = index;
    };

    const allorderTableData = ref([
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

    const toPayTableData = ref([
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
    ]);

    const toSendTableData = ref([
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
    ]);

    const toReceiveTableData = ref([
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
    ]);

    const commmentTableData = ref([
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
    ]);
    const finishTableData =ref([
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

    const formatCurrency = (row, column, cellValue) => {
      return '￥' + cellValue;
    }
    const formatQuantity = (row, column, cellValue) => {
      return 'x' + cellValue;
    }
    const payOrder = function(order) {
        // 执行支付订单的逻辑，可能包括向服务器发送请求等
        console.log("Paying for order:", order);
    };
    const confirmOrder = function(order) {
        // 执行确认订单的逻辑
        console.log("Confirming order:", order);
    };
    const commentOrder = function(order) {
        // 执行评价订单的逻辑
        console.log("Commenting order:", order);
    };
    const moreOrder = function(order) {
        //执行再来一单的逻辑
        console.log("more order:", order);
    };
    const deleteOrder = function(order) {
        // 执行删除订单的逻辑
        console.log("Deleting order:", order);
    };


    return {
      activeIndex,
      handleSelect,
      allorderTableData,
      toPayTableData,
      toSendTableData,
      toReceiveTableData,
      commmentTableData,
      finishTableData,
      formatCurrency,
      formatQuantity,
      payOrder,
      confirmOrder,
      commentOrder,
      moreOrder,
      deleteOrder
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
    .is-disabled {
        cursor: not-allowed;
        color: #ccc;
    }
    .deleteSelect {
        margin-left: 360px;
    }

  </style>