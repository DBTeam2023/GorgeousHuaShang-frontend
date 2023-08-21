<!--推荐商品-->
<template>
    <div class="recommend">
        <!-- 行 -->
        <el-row v-for="(row, index) in itemRows" :key="index" class="itemrow">
            <!-- 列 -->
            <el-col v-for="(item, i) in row" :key="i" class="itemcol" :xs="24" :sm="12" :md="8"
                :lg="4"><!--响应式布局：超小屏幕、小屏幕、中等屏幕、大屏幕-->
                <Card class="card">
                    <RouterLink :to="{path: '/goodsdetail', query: {goodsId: 'a618c78d-3329-4126-a7fe-4120b050e54c'}}" 
                    class="router-link-active">
                        <!-- 商品图片 -->
                        <div class="item">
                            <img :src="item.url" class="img" />
                        </div>
                        <div class="info">
                            <!-- 商品名称 -->
                            <div class="name">{{ item.productName }}</div>
                            <!-- 商品价格 -->
                            <div class="price">￥{{ item.price }}</div>
                        </div>
                    </RouterLink>
                </Card>
            </el-col>
        </el-row>
        <el-row class="pagination">
            <!-- <div class="demonstration">Jump to</div> -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" 
             layout="prev, pager, next, jumper" :total="pages.total"
                @current-change="handleCurrentChange" />

        </el-row>

    </div>
</template>

<script setup>
import Card from "@/components/common/Card.vue"
import {computed, onMounted, toRefs} from 'vue'
import { defineProps } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(["pageOption"])
const props = defineProps(['value'])

let pages = props

const itemList = [
    {
      url: 'https://th.bing.com/th/id/OIP.Eev9RJ9CWteAfu3lIZgHagHaGQ?pid=ImgDet&rs=1',
        productName: '商品名称',
        price: '199.99'
    },
];

// let itemList = ref(pages.value.records);
// console.log(pages.value)


onMounted(() => {
  emit("pageOption", {
    pageIndex: currentPage.value,
    pageSize: pageSize,
  })
})

// setInterval(() => {
//   console.log(pages.value.records)
// }, 1000)

// 分页栏用到的数据
const currentPage = ref(1)  //当前页数，默认为第1页
const pageSize = 15  //每页的图片数量，设置为25
// 计算属性，计算imageList中图片对应的行；每行4列
const itemRows = computed(() => {
    const start = 0; //当前页的起始数据编号
    const end = start + pageSize;  //当前页的最后数据号
    const paginatedItemRows = itemList.slice(start, end);
    const rows = []
    const rowSize = 5  //每行rowSize个商品
    const rowCount = pageSize / rowSize //行数
    for (let i = 0; i < rowCount; i++) {
        rows.push(paginatedItemRows.slice(i * rowSize, (i + 1) * rowSize))
    }
    return rows
})
const handleCurrentChange = (page) => {
    currentPage.value = page;

    // 根据当前页数，从服务器获取对应页的数据
    fetchData();
};

const fetchData = () => {
    // 根据当前页数和每页显示数量，向服务器请求数据
    // 更新数据列表
};

</script>

<style scoped>
.card {
    width: 100%;
    height: auto;
    border: 0;
    /*被覆盖了？ */
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    margin-left: 5px;
    /* 设置卡片之间的水平间距 */

}

.recommend {
  padding-bottom: 20px;
    margin: 10px 140px;
    /*上下左右四个方向的外部空白区域 */
    border: 0;
    /* 设置边框样式 */
    border-radius: 10px;
    /* 设置圆角半径 */
    background-color: #ffffff;
}

.recommend h2 {
    font-size: 24px;
    /*字体大小 */
    font-weight: bold;
    /*加粗 */
    margin-bottom: 20px;
}

.itemrow {
    margin-left: 2%;
    margin-right: -16%;
    margin-top: 30px;

}

.itemcol {
    border: 0;
    /*1像素宽度、实现样式、灰色颜色的边框 */
    border-radius: 5px;
    /*5像素的圆角边框 */
    padding: 1px;
    /*元素内部内容与边框之间的距离 */
    text-align: center;
}

.item img {
    width: 100%;
    border-radius: 5px;
}

.info .name {
    margin: 10px 0;
    font-size: 16px;
}

.info .price {
    font-size: 18px;
    font-weight: bold;
    color: red
}

.logo img {
    height: 32px;
    margin-right: 10px;
}

/* 禁用 router-link 的下划线 */
.router-link-active {
    text-decoration: none;
}

/*分页栏样式 */
.pagination {
    margin-top: 10px;

    justify-content: center;
    text-align: center;
  margin-bottom: 20px;
}
</style>