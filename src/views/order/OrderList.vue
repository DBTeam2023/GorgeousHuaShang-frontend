<template>
    <div>
      <el-table
        ref="multipleTableRef"
        :data="orderData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="selection" width="40%" />
        <el-table-column property="orderID" label="订单编号" width="200%" />
        <el-table-column property="goods" label="宝贝" width="180%" >
            <template v-slot="{ row }">
                <img :src="row.goods.image" alt="goods image" style="width: 50%; height: 50px;"/>
                <div>{{ row.goods.description }}</div>
            </template>
        </el-table-column>
        <el-table-column property="unitprice" label="单价/元" width="80%" :formatter="formatCurrency"/>
        <el-table-column property="number" label="数量" width="80%" :formatter="formatQuantity"/>
        <el-table-column property="payment" label="实付/元" width="80%" :formatter="formatCurrency"/>
        <el-table-column property="orderstate" label="订单状态" width="150%" />
        <el-table-column property="operation" label="交易操作" width="120%" >
            <template v-slot="{ row }">
                <el-button v-if="row.orderstate === '待付款'" type="primary" round size="mini" @click="payOrder(row)">立即支付</el-button>
                <el-button v-else-if="row.orderstate === '待发货'" type="danger" round size="mini" @click="confirmOrder(row)">确认收货</el-button>
                <el-button v-else-if="row.orderstate === '待收货'" type="danger" round size="mini" @click="confirmOrder(row)">确认收货</el-button>
                <el-button v-else-if="row.orderstate === '已完成'" type="success" round size="mini" :disabled="true">已完成</el-button>
            </template>
        </el-table-column>

        <el-table-column property="operationforOder" label="&nbsp;&nbsp;&nbsp;订单操作" width="120%">
          <template v-slot="{ row }">
            <div>
              <div>
                <el-link :icon="View" :underline="false" @click="checkDetails(row)">&nbsp;&nbsp;&nbsp;订单详情</el-link>
              </div>
              <div>
                <el-link
                  :icon="row.orderstate === '待付款' ? 'Cancel' : 'Delete'" 
                  :underline="false"
                  :class="{ 'is-disabled': isDeleteDisabled(row) }"
                  @click.stop.prevent="row.orderstate === '待付款' ? cancelOrder(row) : (!isDeleteDisabled(row) ? deleteOrder(row) : null)" 
                >
                  {{ row.orderstate === '待付款' ? '取消订单' : '删除订单' }} 
                </el-link>
              </div>
            </div>
          </template>
        </el-table-column>

      </el-table>
      
      <el-footer class="page-container">
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
                <!-- <el-button class="deleteSelect" type="danger" plain>删除选中订单</el-button> -->
                <el-button class="deleteSelect" type="danger" plain @click="handleDeleteSelectedOrder">删除选中订单</el-button>
            </el-col>
        </el-row>
    </el-footer>   
    </div>
  </template>
  
  <script>
  import Vue from 'vue';

  export default {
    props: {
      orderData: Array, // 订单数据
      title: String, // 标题
      selectedOrders: Array,
      deleteOrder: Function,
      confirmOrder: Function,
      checkDetails: Function,
      payOrder: Function,
      cancelOrder: Function,
    },

    data() {
      return {
        selectedOrdersInternal: [], // 用于存储选中的订单
      };
    },

    methods: {
      isDeleteDisabled(row) {
        // 检查是否禁用删除按钮
        return row.orderstate === '待收货' || row.orderstate === '待发货';
      },
      deleteOrder(row) {
        if (this.deleteOrder) {
            this.deleteOrder(row); // Call the deleteOrder function from props
        }
      },
      confirmOrder(row) {
        if (this.confirmOrder) {
            this.confirmOrder(row); // Call the confirmOrder function from props
        }
      },
      checkDetails(row) {
        if (this.checkDetails) {
            this.checkDetails(row); 
        }
      },
      payOrder(row) {
        // 构建带有查询参数的支付页面路径
        const payPagePath = {
          path: '/pay', // 支付页面路径
          query: { orderId: row.orderID } // 查询参数
        };

        // 使用 Vue Router 导航到支付页面
        this.$router.push(payPagePath);
      },
      cancelOrder(row) {
        if (this.cancelOrder) {
            this.cancelOrder(row); 
        }
      },
      handleSelectionChange(selectedItems) {
        this.selectedOrdersInternal = selectedItems;
        this.$emit('selection-change', selectedItems);
      },
      handleDeleteSelectedOrder() {
        if (this.selectedOrdersInternal.length === 0) {
          console.log('没有选中订单');
          return;
        }

        const deletableOrders = this.selectedOrdersInternal.filter(row => !this.isDeleteDisabled(row) && row.orderstate !== '待付款');;

        if (deletableOrders.length === 0) {
          console.log('没有可删除的订单');
          return;
        }

        deletableOrders.forEach(selectedOrder => {
          this.deleteOrder(selectedOrder);
        });

        // 保留不能删除的订单
        const undeletableOrders = this.selectedOrdersInternal.filter(row => this.isDeleteDisabled(row) && row.orderstate !== '待付款');
        this.selectedOrdersInternal = undeletableOrders;
      },


    },

  };
  </script>
  <style scoped>
  
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
        margin-left: 400px;
    }
    .page-container {
      margin-top: 25px; /* 根据需要调整距离 */
    }
</style>
