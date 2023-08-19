<!--把搜索栏、购物车固定在顶部-->
<template>
    <div class="searchbar">
        <el-row justify="center" :gutter="15">
            <!-- 
            <el-col :span="2" class="cart">
                <el-affix :offset="10">
                    <img src="@/assets/login/HuashangLogo2.jpg" alt="logo" class="logo" />
                    <h1>华裳异彩</h1>
                </el-affix>
            </el-col> -->
            <el-col :span="14">
                <el-affix :offset="10"> <!--固定顶部偏移量-->
                    <el-input class="search" v-model="search" placeholder="请输入搜索内容" @keyup.enter="search"
                        suffix-icon="el-icon-search" clearable />
                </el-affix>
            </el-col>
            <el-col :span="1" class="serach">
                <el-affix :offset="10">
                    <el-button type="primary">搜索</el-button>
                </el-affix>
            </el-col>
            <!-- <el-col :span="2" class="cart" display: flex>
                <el-affix :offset="10">
                    <el-button type="primary">购物车</el-button>
                </el-affix>
            </el-col> -->
        </el-row>
    </div>
</template>

<script setup>


</script>

<style scoped>
.searchbar {
    margin-top: 6px;
    background-color: #b6e0eb;

}

.logo {
    display: inline-block;
    display: flex;
    /*布局*/
    align-items: center;
    height: 50px;
    margin-right: 10px;
}

.logo img {
    height: 32px;
    margin-right: 10px;
}
</style>