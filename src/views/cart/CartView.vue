<template>
    <div class="hs-cart-page">
        <!-- 导航栏 -->
        <el-menu background-color="#545c64"><el-menu-item>this is a 导航栏</el-menu-item></el-menu>
        <!-- 主体部分 -->
        <el-container class="container">
            <div class="main">
                <el-breadcrumb class="currentPath" separator=">">
                    <el-breadcrumb-item :to="{ path: '/homepage/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>购物车</el-breadcrumb-item>
                </el-breadcrumb>
                <el-main class="mainContent">
                    <div class="cart">
                        <table>
                            <!-- 表头目录 -->
                            <thead>
                                <tr>
                                    <th width="120">
                                        <el-checkbox v-model="selectAll">全选</el-checkbox>
                                    </th>
                                    <th width="300">商品信息</th>
                                    <th width="100">大小</th>
                                    <th width="220">单价</th>
                                    <th width="180">数量</th>
                                    <th width="180">金额</th>
                                    <th width="140">操作</th>
                                </tr>
                            </thead>
                            <!-- 商品列表 -->
                            <tbody>
                                <!-- <tr v-for="i in cartStore.cartList" :key="i.id"> -->
                                <tr v-for="item in cartItems" :key="item.id">
                                    <td>
                                        <el-checkbox v-model="item.selected"
                                            @change="singleCheck(item, item.selected)"></el-checkbox>
                                    </td>
                                    <td>
                                        <div class="goods">
                                            <img src="@/assets/product/4.png" alt="图片~" class="pictureOfGoods" />
                                            <span class="name ellipsis">
                                                {{ item.name }}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <el-dropdown trigger="click">
                                            <span class="el-dropdown-link" @click="showDropdown = !showDropdown">
                                                尺码：<span>{{ item.selectedSize.value }}</span>
                                                <el-icon class="el-icon--right">
                                                    <arrow-down />
                                                </el-icon>
                                            </span>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-for="size in sizes" :key="size"
                                                        @click="selectSize(item, size)">
                                                        {{ size }}
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </td>

                                    <td class="tc">
                                        <p>&yen;{{ item.price }}</p>
                                    </td>
                                    <td class="tc">
                                        <el-input-number v-model="item.count"></el-input-number>
                                    </td>
                                    <td class="tc">
                                        <p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p>
                                    </td>
                                    <td class="tc">
                                        <p>
                                            <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                                @confirm="delCart(item)">
                                                <template #reference>
                                                    <!-- <a href="javascript:;">删除</a> -->
                                                    <el-button type="info">删除</el-button>
                                                </template>
                                            </el-popconfirm>
                                        </p>
                                    </td>
                                </tr>

                                <!-- 购物车列表为空： -->
                                <!-- <tr>
                                    <td colspan="6">
                                        <div class="cart-none">
                                            <el-empty description="购物车列表为空">
                                                <el-button type="primary">随便逛逛</el-button>
                                            </el-empty>
                                        </div>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                        <!-- 操作栏 -->
                        <div class="action">
                            <div class="selected-data">
                                已选择 {{ cartStore.selectedCount }} 件，商品合计：
                                <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
                            </div>
                            <div class="total">
                                <el-button size="large" type="primary" @click="$router.push('/checkout')">下单结算</el-button>
                            </div>
                        </div>
                    </div>
                </el-main>
            </div>
        </el-container>
    </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
const showDropdown = ref(false)
const sizes = ['S', 'M', 'L']
const cartItems = reactive([
    {
        id: 1,
        name: '商品1',
        picture: '../assets/product/1.png',
        price: 10,
        selectedSize: { value: 's' },
        count: 1,
        selected: false,
    },
    {
        id: 2,
        name: '商品2',
        picture: '../assets/product/1.png',
        price: 15,
        selectedSize: { value: 'm' },
        count: 2,
        selected: false,
    },
    {
        id: 3,
        name: '商品3',
        picture: '../assets/product/1.png',
        price: 20,
        selectedSize: { value: 'l' },
        count: 3,
        selected: false,
    },
]);

const cartStore = reactive({
    selectedCount: 0, // 静态已选择商品数量
    selectedPrice: 0 // 静态已选择商品价格
})

const selectSize = (item, size) => {
    if (!item.selectedSize) {
        item.selectedSize = { value: '' }
    }
    item.selectedSize.value = size
    showDropdown.value = false
}

const selectedItems = computed(() => {
    return cartItems.filter((item) => item.selected);
});

// 检查单选
const singleCheck = (item, checked) => {
    item.selected = checked;
    const selectedItemsArray = selectedItems.value;
    const count = selectedItemsArray.length;// 已选择的商品个数
    const price = selectedItemsArray.reduce((sum, item) => sum + item.price * item.count, 0);// 计算已选择商品的总价
    cartStore.selectedCount = count;
    cartStore.selectedPrice = price;
};

// 全选
const selectAll = computed({
    get: () => {
        return cartItems.every((item) => item.selected);
    },
    //   更新所有商品的选中状态，并重新计算已选择的商品数量和总价
    set: (value) => {
        cartItems.forEach((item) => {
            item.selected = value;
        });
        const count = value ? cartItems.length : 0;
        const price = selectedItems.value.reduce((sum, item) => sum + item.price * item.count, 0);
        cartStore.selectedCount = count;
        cartStore.selectedPrice = price;
    },
});

function delCart(item) {
    const index = cartItems.indexOf(item);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
}
</script>


<style scoped>
/* 样式规则 */
.container {
    background-color: #E6E8EB;
    height: 1000px;
}

.main {
    height: 100%;
    width: 100%;
    margin-left: 50px;
    margin-right: 50px;
}

.currentPath {
    margin: 20px;
}

.mainContent {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
}

.cart {
    background: #fff;
    color: #666;
}

td {
    text-align: center;
}

.pictureOfGoods {
    width: 100px;
    height: 100px;
}

.action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;
}

.selected-data a {
    margin-left: 20px;
}


.red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
    color: red;
}

.el-dropdown-link {
    width: 100px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 15%;
}
</style>