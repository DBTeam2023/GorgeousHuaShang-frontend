<template>
    <div class="hs-cart-page">
        <!-- 主体部分 -->
        <el-container class="container">
            <div class="main">
                <el-breadcrumb class="currentPath" separator=">">
                    <el-breadcrumb-item :to="{ path: '/homepage/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>购物车</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="cart-container">
                    <!-- 购物车商品列表 -->
                    <div class="cart">
                        <table>
                            <!-- 表头目录 -->
                            <thead>
                                <tr>
                                    <th width="100">
                                        <el-checkbox v-model="selectAll">全选</el-checkbox>
                                    </th>
                                    <th width="400">商品信息</th>
                                    <th width="100">属性</th>
                                    <th width="220">单价</th>
                                    <th width="180">数量</th>
                                    <th width="180">金额</th>
                                    <th width="140">操作</th>
                                </tr>
                            </thead>

                            <!-- 有效商品列表 -->
                            <tbody v-loading="loading">
                                <!-- 购物车列表为空： -->
                                <tr v-if="effectiveGoodsList.length === 0">
                                    <td colspan="7">
                                        <div class="cart-none">
                                            <el-empty description="购物车列表为空">
                                                <el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
                                            </el-empty>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="item in effectiveGoodsList" :key="item.pickID">
                                    <td>
                                        <el-checkbox v-model="item.isSelected"
                                            @change="singleCheck(item, item.isSelected)"></el-checkbox>
                                    </td>

                                    <td>
                                        <el-row class="goods" @click="turnToProduct(item)">
                                            <el-col :span="8">
                                                <div class="picture-container">
                                                    <img class="pictureOfGoods" :src="item.picture" :alt="加载失败" />
                                                </div>
                                            </el-col>
                                            <el-col class="text" :span="16">
                                                <div class="product-name">{{ item.productName }}</div>
                                                <div class="txt">{{ item.description }}</div>
                                            </el-col>
                                        </el-row>
                                    </td>
                                    <td>
                                        <span>{{ getPropertyValues(item.pickProperty) }}</span>
                                    </td>
                                    <td>
                                        <p>&yen;{{ item.price }}</p>
                                    </td>
                                    <td>
                                        <el-input-number v-model="item.count" @change="modifyCount(item)"></el-input-number>
                                    </td>
                                    <td>
                                        <p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p>
                                    </td>
                                    <td>
                                        <p>
                                            <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                                @confirm="singleDelCart(item)">
                                                <template #reference>
                                                    <el-button type="info">删除</el-button>
                                                </template>
                                            </el-popconfirm>
                                        </p>
                                    </td>

                                </tr>
                            </tbody>

                            <!-- 失效商品列表 -->
                            <p class="tit">失效商品</p>
                            <tbody>
                                <tr v-for="item in invalidGoodsList" :key="item.id">
                                    <td></td>
                                    <td>
                                        <el-row class="goods" @click="turnToProduct(item)">
                                            <el-col :span="8">
                                                <div class="picture-container">
                                                    <img class="pictureOfGoods" :src="item.picture" :alt="加载失败" />
                                                </div>
                                            </el-col>
                                            <el-col class="text" :span="16">
                                                <div class="product-name">{{ item.productName }}</div>
                                                <div class="txt">{{ item.description }}</div>
                                            </el-col>
                                        </el-row>
                                    </td>
                                    <td>
                                        <span>{{ getPropertyValues(item.pickProperty) }}</span>
                                    </td>
                                    <td>
                                        <p>&yen;{{ item.price }}</p>
                                    </td>
                                    <td><el-input-number v-model="item.count" @change="modifyCount(item)"
                                            @click="openFullScreen2"></el-input-number>
                                    </td>
                                    <td>
                                        <p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p>
                                    </td>
                                    <td>
                                        <p>
                                            <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                                @confirm="singleDelCart(item)">
                                                <template #reference>
                                                    <el-button type="info">删除</el-button>
                                                </template>
                                            </el-popconfirm>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="cart-floatbar">
                    <!-- 操作栏 -->
                    <div class="action-box">
                        <div class="left">
                            <el-checkbox v-model="selectAll">全选</el-checkbox>

                            <el-popconfirm title="确认删除所选中的商品吗?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="batchDelCart()">
                                <template #reference>
                                    <el-button type="info" style="margin-left:20px;">删除选中的商品</el-button>
                                </template>
                            </el-popconfirm>

                            <el-popconfirm title="确认删除所有失效的商品吗?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="batchDelInvalidCart()">
                                <template #reference>
                                    <el-button type="info" style="margin-left:20px;">删除所有失效商品</el-button>
                                </template>
                            </el-popconfirm>

                        </div>
                        <div class="right">
                            <div class="selected-data">
                                已选择 {{ selectedCount }} 件商品，总价：
                                <span class="red">¥ {{ selectedPrice.toFixed(2) }} </span>
                            </div>
                            <div class="total">
                                <el-button size="large" type="primary" @click="generateOrder()">下单结算</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import router from "@/router";
import { ElMessage } from 'element-plus' //消息框提示
import { getCartList, addCartByGoods, deleteCartGoods, createOrder } from '@/api/cart'
import { checkPermission } from '@/utils/auth';
import { base64ToUrl } from "@/utils/photo";
import { ElLoading } from 'element-plus' //loading图标

// 获取购物车的所有商品的列表
const cartList = ref([]);
// 每个商品的数量的集合（数组）
let countArray;
// 加载标识
const loading = ref(true);

// 提取 cartList 中的 count 值组成数组countArray
function getCountArray() {
    const countArray = cartList.value.map(item => ({
        pickID: item.pickID,
        count: item.count
    }));
    return countArray;
}

onMounted(() => {
    // 0.角色授权
    checkPermission(["buyer"]);
    // 1.获取购物车
    getCart();
})

// 获取用户购物车列表
const getCart = () => {
    loading.value = true;
    getCartList()
        .then(resp => {
            for (let i = 0; i < resp.data.items.length; i++) {
                const pickInfo = resp.data.items[i].pick.commodityInfo[0];
                cartList.value.push({
                    productID: resp.data.items[i].pick.commodityId,
                    productName: resp.data.items[i].pick.productName,
                    storeID: resp.data.items[i].pick.storeId,
                    pickID: pickInfo.pickId,
                    picture: base64ToUrl(pickInfo.image.fileContents, pickInfo.image.contentType),
                    price: pickInfo.price,
                    pickProperty: pickInfo.property,
                    stock: pickInfo.stock,
                    description: pickInfo.description,
                    isDeleted: pickInfo.isDeleted,
                    count: resp.data.items[i].count,
                })
            }
            countArray = getCountArray();
        })
        .catch((error) => {
            console.log(error)
            if (error.response.data.code === 500) {
            }
            else {
                ElMessage.error("购物车列表获取失败！")
            }
        })
        .finally(() => {
            loading.value = false;
        });
}

// 下单结算————生成订单
const generateOrder = () => {
    // 提取pickID和count
    const orderCreate = selectedItems.value.map((item) => ({
        pickId: item.pickID,
        number: item.count,
    }));
    // 调用生成订单的API，并]获取订单ID并跳转至支付页面
    createOrder({ orderCreate })
        .then(resp => {
            ElMessage.success("订单创建成功，正在跳转支付页面")
            //   跳转支付
            router.push({
                path: '/pay/',
                query: {
                    orderId: resp.data.orderID
                }
            })
        })
        .catch(resp => {
            ElMessage.error("订单创建失败")
        })
};

// 计算属性————有效商品列表
const effectiveGoodsList = computed(() => {
    return cartList.value.filter((item) => !item.isDeleted && item.stock > 0);
})

// 计算属性————无效商品列表
const invalidGoodsList = computed(() => {
    return cartList.value.filter((item) => item.isDeleted || item.stock === 0);
})

// 计算属性————已选择的商品列表
const selectedItems = computed(() => {
    return effectiveGoodsList.value.filter((item) => item.isSelected);
})

// 计算属性————已选择的商品数量
const selectedCount = computed(() => {
    return selectedItems.value.length;
});

// 计算属性————已选择的商品总价
const selectedPrice = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.price * item.count, 0);
});

// 获取商品的pick款式信息
const getPropertyValues = (pickProperty) => {
    return Object.values(pickProperty).join('; ');
};

// 加载动画
const openFullScreen2 = () => {

}

function modifyCount(item) {
    // 加载中loading的动画
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    const pickID = item.pickID
    console.log(countArray)
    const changedItem = countArray.find(item => item.pickID === pickID);
    // value是+1或-1，作为number参数
    const value = item.count - changedItem.count;
    console.log(value)
    //  添加购物车————修改数量
    addCartByGoods({
        pickId: changedItem.pickID,
        number: value,
    })
        .then(resp => {
            ElMessage.success("数量修改成功")
        })
        .catch(resp => {
            ElMessage.error("数量修改失败")
        })
        .finally((resp) => {
            loading.close()
        })
}

// 单选
const singleCheck = (item, checked) => {
    item.isSelected = checked;
};

// 全选
const selectAll = computed({
    get: () => {
        return effectiveGoodsList.value.every((item) => item.isSelected);
    },
    set: (value) => {
        effectiveGoodsList.value.forEach((item) => {
            item.isSelected = value;
        });
    },
});

// 单个删除商品
function singleDelCart(item) {
    const index = cartList.value.indexOf(item);
    const ids = [item.pickID];
    const pickIds = ids.map(item => ({ pickId: item }));
    if (index !== -1) {
        // 调用删除购物车商品的接口
        deleteCartGoods(pickIds)
            .then(() => {
                // 前端列表实现删除即可
                cartList.value.splice(index, 1);
            })
            .catch((error) => {
                console.log(invalidGoodsList.value)
                console.log(error)
                ElMessage.error("删除购物车商品失败！")
            });
    }
}

// 批量删除选中的商品
function batchDelCart() {
    // 获取已选择商品的ID数组
    const ids = selectedItems.value.map((item) => item.pickID);
    const pickIds = ids.map(item => ({ pickId: item }));
    // 调用删除购物车商品的接口
    deleteCartGoods(pickIds)
        .then(() => {
            // 前端列表实现删除即可
            cartList.value = cartList.value.filter((item) => !ids.includes(item.pickID));
        })
        .catch((error) => {
            ElMessage.error('删除购物车商品失败！');
        });
}

// 批量删除失效商品
function batchDelInvalidCart() {
    // 获取失效商品的ID数组
    const ids = invalidGoodsList.value.map((item) => item.pickID);
    const pickIds = ids.map(item => ({ pickId: item }));
    // 调用删除购物车商品的接口
    deleteCartGoods(pickIds)
        .then(() => {
            // 前端列表实现删除即可
            cartList.value = cartList.value.filter((item) => !ids.includes(item.pickID));
        })
        .catch((error) => {
            ElMessage.error("删除购物车无效商品失败！")
        });
}

// 跳转至对应商品详情页面面
function turnToProduct(item) {
    router.push({
        path: '/goodsdetail/',
        query: {
            productName: item.productName,
            goodsId: item.productID,
            storeId: item.storeID
        }
    });
}
</script>


<style scoped>
/* 样式规则 */
.tit {
    color: #666;
    font-size: 18px;
    line-height: 60px;
    font-weight: bolder;
    text-align: center;
}

.container {
    background-color: #E6E8EB;
    height: 100%;
    width: 100%;
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

.cart-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    display: block;
    overflow: auto;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #000;
}

tbody tr {
    height: 110px;
}

td {
    text-align: center;
}

.cart-floatbar {
    position: sticky;
    height: 70px;
    width: 100%;
    /* 盒模型：元素的宽度和高度将包括其边框和内边距的计算，而不会受到内容区域的影响 */
    box-sizing: border-box;
    align-items: center;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0px -2px 4px rgba(0.1, 0.1, 0.1, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #D7EBFB;
}

.action-box {
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 40px;
}

.right {
    display: flex;
    align-items: center;
    justify-content: center;
}

.selected-data {
    margin-right: 20px;
}

.red {
    font-size: 18px;
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

.style-info {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.goods {
    left: 0;
    width: 90%;
    height: 100%;
    padding: 10px;
    border-radius: 5px;
}

.goods:hover {
    box-shadow: 0px -2px 4px rgba(0.1, 0.1, 0.1, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.picture-container {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    overflow: hidden;
    /* 隐藏超出容器的部分 */
}

.picture-container .pictureOfGoods {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.product-name {
    font-size: 14px;
    font-weight: 700;
    color: #333;
    text-align: left;
    margin-bottom: 15px;
}

.txt {
    text-align: left;
    color: #888;
    font-size: 8px;
}
</style>