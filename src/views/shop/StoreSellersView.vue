<template>
  <div class="order-summary">
    <h1 class="title">卖家列表</h1>
    <el-row :gutter="20" class="filters">
      <el-col :span="4" class="shop-actions">
        <el-button type="primary" @click="dialogVisibleForManager = true"
                   style="margin-top: 30px;">邀请管理员</el-button>
      </el-col>

      <el-dialog
          v-model="dialogVisibleForManager"
          title="邀请管理员"
          width="30%"
          :before-close="handleClose"
      >
        <el-form label-width="80px" ref="form">
          <el-form-item label="卖家账号">
            <el-input v-model="account"></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleForManager = false">取消</el-button>
        <el-button type="primary" @click="saveChangesForManager">保存</el-button>
      </span>
        </template>
      </el-dialog>
    </el-row>
    <el-table :data="sellers" border stripe>
      <el-table-column prop="userId" label="卖家ID" width="360"></el-table-column>
      <el-table-column prop="nickName" label="卖家昵称" width="180"></el-table-column>
      <el-table-column prop="username" label="卖家账号" width="180"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" width="180"></el-table-column>
      <el-table-column prop="delete" label="删除卖家" width="90">
        <template v-slot="scope">
          <el-button type="danger" @click="deleteSellerInPage(scope.$index)" round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination-wrapper">
      <el-pagination
          background
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="handlePageChange"
      >
      </el-pagination>
    </el-row>

  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {
  ElButton,
  ElInput,
  ElRow,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessage,
  ElFormItem, ElDialog, ElForm, ElMessageBox
} from 'element-plus';
import {deleteSeller, getSellers, inviteSellers} from "@/api/store";
import {useRoute} from "vue-router";

const route = useRoute();

const dialogVisibleForManager = ref(false);
const account = ref();

// 分页状态
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(1);

// 订单数据
const sellers = ref([])

onMounted(() => {
  getSellersInPage();
})

watch(currentPage, () => {
  getSellersInPage();
})

function deleteSellerInPage(index) {
  if (sellers.value[index].username === localStorage.getItem("username")) {
    ElMessage({
      message: '您不能删除自己！',
      type: 'warning',
    })
    return;
  }

  deleteSeller({
    userName: sellers.value[index].username,
    storeId: route.query.storeid
  })
      .then(resp => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        })

        getSellersInPage();
      })
      .catch(resp => {
        ElMessage({
          message: '删除失败',
          type: 'warning',
        })
      })
}

function getSellersInPage() {
  getSellers({
    pageNo: currentPage.value,
    pageSize: pageSize.value,
    storeId: route.query.storeid
  })
      .then(resp => {
        sellers.value = [];
        for (let i = 0; i < resp.data.records.length; i ++) {
          sellers.value.push({
            userId: resp.data.records[i].userId,
            nickName: resp.data.records[i].nickName,
            username: resp.data.records[i].username,
            phoneNumber: resp.data.records[i].phoneNumber,

          //   todo: 头像
          })
        }
        total.value = resp.data.total;
      })
      .catch(resp => {
        ElMessage.error("拉取卖家列表失败！")
      })
}

function saveChangesForManager() {
  //   todo: 邀请别人
  inviteSellers({
    userName: account.value,
    storeId: route.query.storeid
  })
      .then(resp => {
        ElMessage({
          message: '邀请成功！',
          type: 'success',
        })

        getSellersInPage();
      })
      .catch(resp => {
        ElMessage({
          message: '邀请失败！',
          type: 'warning',
        })
      })


  dialogVisibleForManager.value = false;
}

const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭对话框吗？')
      .then(() => {
        done();
      })
      .catch(() => {
        // 处理错误
      });
};

// 处理页码变化
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
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
  margin-top:20px;
  margin-bottom:20px;
  justify-content: center;
  text-align:center;
}
</style>
