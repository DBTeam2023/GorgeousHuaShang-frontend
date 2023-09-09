<template>
  <div class="store-management">
    <el-row :gutter="20" class="store-list">
      <el-col :span="5.5" v-for="(store, index) in currentStores" :key="store.id"  :gutter="20">
        <Card class="card">
          <RouterLink :to="{path: '/shopmanage', query: {storeid: store.storeId }}" class="router-link-active">
            <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
              <img class="store-image" :src="store.image" alt="Product Image" />
              <h3 class="store-name">{{ store.storeName }}</h3>
              <div class="button-group">
                <p>店铺ID: {{ store.storeId }}</p>
              </div>
            </div>
          </RouterLink>
          <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon-color="#626AEF"
              title="确定注销店铺吗？"
              @confirm="deleteShop(index)"
          >
            <template #reference>
              <el-button type="danger" size="small">注销</el-button>
            </template>
          </el-popconfirm>
        </Card>
      </el-col>
    </el-row>
<!--    <div class="container">-->
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, pager, next"
      ></el-pagination>
<!--    </div>-->
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue';
import {ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination, ElMessage} from 'element-plus';
import Card from "@/components/common/Card.vue";
import {deleteStore, getMySTore, getStoreAvatar} from "@/api/store";
import { base64ToUrl } from '@/utils/photo';


let stores = ref([]);

const searchProductName = ref('');
const isHovered = reactive(Array(stores.value.length).fill(false));
const currentPage = ref(1);
const pageSize = 2;
let total = ref(1);

const getAvatar = () =>{
  for( const store of stores.value ){
      getStoreAvatar({
        storeId:store.storeId
      })
      .then(resp =>{
        if(resp.data === null){
          Object.assign(store, { image: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' }); 
        }
        else{
          const imageUrl = base64ToUrl(resp.data.fileContents,resp.data.contentType);
          Object.assign(store, { image: imageUrl }); 
        }
      })
      .catch(error =>{
          ElMessage('获取店铺头像失败');
      })
  }
}

watch(currentPage, (newVal) => {
  getMySTore({
    pageNo: newVal,
    pageSize: pageSize
  })
      .then(resp => {
        stores.value = []
        console.log(resp);
        for (let i = 0; i < resp.data.records.length; i ++) {
          stores.value.push({
            storeId: resp.data.records[i].storeId,
            storeName: resp.data.records[i].storeName,
          })
        }
        total.value = resp.data.total;
        getAvatar();
      })
      .catch(resp => {
        console.log(resp)
      })
})

const filteredStores = computed(() => {
  const searchText = searchProductName.value.trim().toLowerCase();
  if (searchText === '') {
    return stores.value;
  } else {
    return stores.value.filter(store => store.name.toLowerCase().includes(searchText));
  }
});

const currentStores = computed(() => {
  const startIndex = 0;
  const endIndex = startIndex + pageSize;
  return filteredStores.value.slice(startIndex, endIndex);
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

onMounted(() => {
  getMySTore({
    pageNo: currentPage.value,
    pageSize: pageSize
  })
      .then(resp => {
        console.log(resp);

        stores.value = []
        for (let i = 0; i < resp.data.records.length; i ++) {
          stores.value.push({
            storeId: resp.data.records[i].storeId,
            storeName: resp.data.records[i].storeName,
          })
        }
        total.value = resp.data.total;
        getAvatar();
      })
      .catch(resp => {
        console.log(resp)
      })
})

function deleteShop(index) {
  deleteStore({
    storeId: stores.value[index].storeId
  })
      .then(resp => {
        ElMessage({
          message: '注销成功',
          type: 'success',
        })
        stores.value.splice(index, 1)
      })
      .catch(resp => {
        ElMessage({
          message: '注销失败',
          type: 'warning',
        })
      })
}

</script>

<style scoped>
.store-management.sign-up-model{
    opacity: 0;
    transition: 1s ease-in-out;
    z-index: 0;
}
.card{
  width: 240px;
  height: 375px;
  margin-top: 20px
}

.store-management {
  grid-column: 1;
    grid-row: 1;
    opacity: 1;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    /* 上下 | 左右 */
    padding: 0% 10%;
    z-index: 1;
    justify-content: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.filters {
  margin-bottom: 20px;
}

.store-list {
  margin-bottom: 20px;
}

.store-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.store-image {
  border-radius: 20px;
  width:200px;
  height:200px;
}

.store-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.store-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.store-actions {
  display: flex;
  justify-content: space-between;
}
.search-box {
  display: flex;
  align-items: center;
}
.search-box .el-input {
  margin-left: 10px; /* 修改 icon 和 input 之间的间距 */
}
.container {
  display: flex;
  justify-content: center;
  margin-left: -30px;
}

/* 禁用 router-link 的下划线 */
.router-link-active {
  text-decoration: none;
}
</style>
