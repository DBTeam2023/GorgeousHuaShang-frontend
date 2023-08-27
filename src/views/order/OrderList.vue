<template>
    <div>
      <el-table
        ref="multipleTableRef"
        :data="orderData"
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

        <!-- 订单操作列 -->
        <el-table-column property="operationforOder" label="订单操作" width="150">
          <template v-slot="{ row }">
            <div>
              <div>
                <el-link :icon="View" :underline="false" @click="checkDetails(row)">订单详情</el-link>
              </div>
              <div>
                <el-link
                :icon="Delete"
                :underline="false"
                :class="{ 'is-disabled': isDeleteDisabled(row) }"
                @click.stop.prevent="!isDeleteDisabled(row) ? deleteOrder(row) : null"
                >
                删除订单
                </el-link>

              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      orderData: Array, // 订单数据
      title: String, // 标题
      deleteOrder: Function,
      confirmOrder: Function,
      checkDetails: Function,
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
    },
  };
  </script>
  