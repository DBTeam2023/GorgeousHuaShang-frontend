<!--展示分类筛选后的商品列表页-->
<!--html模板-->
<template>
    <div class="sort-select">
        <el-select v-model="sortOrder" placeholder="请选择排序方式">
            <el-option label="价格从低到高" value="price-asc" />
            <el-option label="价格从高到低" value="price-desc" />
            <el-option label="销量从高到低" value="sales-desc" />
        </el-select>
    </div>
</template>
  
<!--js脚本函数-->
<script setup>

</script>
  
  
<!--CSS风格-->
<style scoped></style>