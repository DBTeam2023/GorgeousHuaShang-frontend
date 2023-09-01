
<script setup>
import { reactive, computed, ref, onMounted, onUnmounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import router from "@/router";
import { ElMessage } from 'element-plus' //消息框提示
import { getCartList, updateSize, deleteCartGoods } from '@/api/cart'

const cartList = ref([]);
const showDropdown = ref(false);
const sizes = ['S', 'M', 'L'];

// todo:
// 获取用户购物车列表
const getCart = () => {
    getCartList()
        .then(resp => {
            cartList.value = resp.data;
            // 暂时图片写的是网址url（写死）
            // for (const store of storeList.value) {
            //     const imageSrc = base64ToString(store.picture,'image/png');
            //     store.picture = imageSrc.value;
            // }
            console.log('获取购物车列表成功');
        })
        .catch((error) => {
            console.error('获取购物车列表失败', error);
        });
}

// 修改商品尺码属性
const modifySize = (item, newSize) => {
    showDropdown.value = false
    // 后端todo:修改属性（尺码）信息
    updateSize({
        id: item.productID,
        size: newSize
    })
        // 实际中可以不要这个消息框，这里只是在测试...
        .then(resp => {
            ElMessage({
                message: '修改尺码成功！',
                type: 'success',
            })
            console.log(resp);
        })
        .catch(err => {
            ElMessage({
                message: '修改尺码失败！',
                type: 'error',
            })
        });
}
// todo:生成订单
const generateOrder = () => {
    // 后端todo: 调用生成订单的API，并获取订单ID
    const orderID = ""; // 假设获取到的订单ID
    turnToPay(orderID);
};

// todo:跳转支付界面
function turnToPay() {
    //todo:跳转到支付界面，需要传递参数订单ID
    router.push({
        path: '/pay/',
        params: orderID,
    });
}

onMounted(() => {
    getCart();
})

// 计算属性————已选择的商品列表
const selectedItems = computed(() => {
    return cartList.value.filter((item) => item.isSelected);
})

// 计算属性————已选择的商品数量
const selectedCount = computed(() => {
    return selectedItems.value.length;
});

// 计算属性————已选择的商品总价
const selectedPrice = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.price * item.count, 0);
});

// 单选
const singleCheck = (item, checked) => {
    // todo:这里需不需要调用接口修改数据库中商品的单选状态？
    item.isSelected = checked;

};


// 全选
const selectAll = computed({
    get: () => {
        return cartList.value.every((item) => item.isSelected);
    },
    set: (value) => {
        cartList.value.forEach((item) => {
            // todo:这里需不需要调用接口修改数据库中商品的全选（单选）状态？
            item.isSelected = value;
        });
    },
});

// 单个删除商品
function singleDelCart(item) {
    const index = cartList.value.indexOf(item);
    if (index !== -1) {
        // 调用删除购物车商品的接口
        deleteCartGoods(item.pickID)
            .then(() => {
                console.log("删除购物车商品成功！");
                // 暂时后端还不能删除，所以这里暂时注释掉，用下面这句实现删除（测试）
                cartList.value.splice(index, 1);
                // 重新获取购物车列表数据
                // getCartList()
                //     .then((response) => {
                //         cartList.value = response.data;
                //         console.log("重新获取购物车商品列表数据成功！");
                //     })
                //     .catch((error) => {
                //         console.error('重新获取购物车商品列表数据失败:', error);
                //     });
            })
            .catch((error) => {
                console.error('删除购物车商品失败！', error);
            });
    }
}

// 批量删除选中的商品
function batchDelCart() {
    // 获取已选择商品的ID数组
    const ids = selectedItems.value.map((item) => item.pickID);

    // 调用删除购物车商品的接口
    deleteCartGoods(ids)
        .then(() => {
            console.log("删除购物车商品成功！");
            // 暂时后端还不能删除，所以这里暂时注释掉，用下面这句实现删除（测试）
            cartList.value = cartList.value.filter((item) => !ids.includes(item.pickID));

            // 重新获取购物车列表数据
            // getCartList()
            //     .then((response) => {
            //         cartList.value = response.data;
            //         console.log("重新获取购物车商品列表数据成功！");
            //     })
            //     .catch((error) => {
            //         console.error('重新获取购物车商品列表数据失败:', error);
            //     });
        })
        .catch((error) => {
            console.error('删除购物车商品失败！', error);
        });

}


</script>

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
                                    <th width="50">
                                        <el-checkbox v-model="selectAll">全选</el-checkbox>
                                        <!-- <XtxCheckbox :modelValue="selectAllButtonStatus" @update:modelValue="
                                            $store.dispatch('cart/selectedAll', $event)
                                            ">全选</XtxCheckbox> -->
                                    </th>
                                    <th width="450">商品信息</th>
                                    <th width="100">大小</th>
                                    <th width="220">单价</th>
                                    <th width="180">数量</th>
                                    <th width="180">金额</th>
                                    <th width="140">操作</th>
                                </tr>
                            </thead>
                            <!-- 商品列表 -->
                            <tbody>
                                <tr v-for="item in cartList" :key="item.productID">
                                    <td>
                                        <el-checkbox v-model="item.isSelected"
                                            @change="singleCheck(item, item.isSelected)"></el-checkbox>
                                    </td>

                                    <td>
                                        <div class="goods">
                                            <!-- 记得修改： 根据商品的id跳转-->
                                            <!-- <RouterLink :to="'/goodsdetail/' + item.id"> -->
                                            <RouterLink :to="'/goodsdetail/'">
                                                <img class="pictureOfGoods" :src="item.picture" :alt="item.name" />
                                            </RouterLink>
                                            <span class="product-name">
                                                {{ item.productName }}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <el-dropdown trigger="click">
                                            <span class="el-dropdown-link" @click="showDropdown = !showDropdown">
                                                尺码：<span>{{ item.selectedSize }}</span><el-icon><arrow-down /></el-icon>
                                            </span>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-for="size in sizes" :key="size"
                                                        @click="modifySize(item, size)">
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
                                                @confirm="singleDelCart(item)">
                                                <template #reference>
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

                        </div>
                        <div class="right">
                            <div class="selected-data">
                                已选择 {{ selectedCount }} 件商品，总价：
                                <span class="red">¥ {{ selectedPrice.toFixed(2) }} </span>
                            </div>
                            <div class="total">
                                <el-button size="large" type="primary" @click="turnToPay()">下单结算</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>
    </div>
</template>



<style scoped>
/* 样式规则 */
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
    /* margin-bottom: 100px; */
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

td {
    text-align: center;
}

.pictureOfGoods {
    width: 100px;
    height: 100px;
}

.cart-floatbar {
    position: sticky;
    height: 70px;
    width: 100%;
    /* 盒模型：元素的宽度和高度将包括其边框和内边距的计算，而不会受到内容区域的影响 */
    box-sizing: border-box;
    align-items: center;
    bottom: 0;
    /* left: 0; */
    z-index: 999;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0px -2px 4px rgba(0.1, 0.1, 0.1, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 10px;
}

.action-box {
    display: flex;
    background: #fff;
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