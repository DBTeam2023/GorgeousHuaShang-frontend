<template>
  <div class="order-summary">
    <h1 class="title">订单汇总表</h1>
    <el-row :gutter="20" class="filters">
      <el-col :span="6">
        <el-input v-model="searchOrderId" placeholder="订单ID"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchBuyerId" placeholder="买家ID"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="filterStatus" placeholder="订单状态">
          <el-option label="待支付" value="待支付"></el-option>
          <el-option label="已支付" value="已支付"></el-option>
          <el-option label="已发货" value="已发货"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
          <el-option label="已取消" value="已取消"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="searchOrders">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="filteredOrders" border stripe>
      <el-table-column prop="orderId" label="订单ID"></el-table-column>
      <el-table-column prop="buyerId" label="买家ID"></el-table-column>
      <el-table-column prop="createTime" label="订单创建时间"></el-table-column>
      <el-table-column prop="price" label="订单价格"></el-table-column>
      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column prop="logisticsId" label="物流ID"></el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="pageSize"
        :total="Math.ceil(totalOrders / pageSize)"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
    <div class="summary">
      <span>总订单数: {{ totalOrders }}</span>
      <span>待支付: {{ countOrdersByStatus('待支付') }}</span>
      <span>已支付: {{ countOrdersByStatus('已支付') }}</span>
      <span>已发货: {{ countOrdersByStatus('已发货') }}</span>
      <span>已完成: {{ countOrdersByStatus('已完成') }}</span>
      <span>已取消: {{ countOrdersByStatus('已取消') }}</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { ElButton, ElCol, ElInput, ElRow, ElSelect, ElTable, ElTableColumn, ElPagination } from 'element-plus';

export default {
  components: {
    ElButton,
    ElCol,
    ElInput,
    ElRow,
    ElSelect,
    ElTable,
    ElTableColumn,
    ElPagination,
  },
  setup() {
    // 订单数据
    const orders = [
      {
        orderId: '1a',
        buyerId: '001',
        createTime: '2023-07-01 09:00:00',
        price: 100,
        status: '已支付',
        logisticsId: '123456',
      },
      {
        orderId: '2b',
        buyerId: '002',
        createTime: '2023-07-02 10:00:00',
        price: 200,
        status: '待支付',
        logisticsId: '789012',
      },
      // 其他订单数据...
    ];

    // 查询条件
    const searchOrderId = ref('');
    const searchBuyerId = ref('');
    const filterStatus = ref('');

    // 分页状态
    const currentPage = ref(1);
    const pageSize = ref(10);

    // 查询订单
    const searchOrders = () => {
      // 根据订单ID或买家ID进行查询逻辑
    };

    // 重置查询条件
    const resetFilters = () => {
      searchOrderId.value = '';
      searchBuyerId.value = '';
      filterStatus.value = '';
    };

    // 筛选后的订单数据
    const filteredOrders = computed(() => {
      // 根据订单状态进行筛选逻辑
      return orders.filter((order) => {
       return (
          (order.orderId.includes(searchOrderId.value) ||
            order.buyerId.includes(searchBuyerId.value)) &&
          (order.status === filterStatus.value || filterStatus.value === '')
        );
      });
    });

    // 根据订单状态统计订单数量
    const countOrdersByStatus = (status) => {
      return filteredOrders.value.filter((order) => order.status === status).length;
    };

    // 总订单数量
    const totalOrders = computed(() => {
      return filteredOrders.value.length;
    });

    // 当前页的订单数据
    const paginatedOrders = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value;
      return filteredOrders.value.slice(startIndex, startIndex + pageSize.value);
    });

    // 处理页码变化
    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
    };

    return {
      searchOrderId,
      searchBuyerId,
      filterStatus,
      currentPage,
      pageSize,
      searchOrders,
      resetFilters,
      filteredOrders,
      countOrdersByStatus,
      totalOrders,
      paginatedOrders,
      handlePageChange,
    };
  },
};
</script>

<style>
.order-summary {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.filters {
  margin-bottom: 20px;
}

.summary {
  margin-top: 20px;
  text-align: right;
}
.pagination-wrapper {
  margin-top: 20px;
}
</style>
