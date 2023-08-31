<template>
  <div class="product-management">
    <h1 class="title">已上架商品管理</h1>
<!--    <el-row :gutter="20" class="filters">-->
<!--      <el-col :span="6">-->
<!--        <div class="search-box">-->
<!--          <el-icon><Search /></el-icon>-->
<!--          <el-input v-model="searchProductName" placeholder="商品名称"></el-input>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <el-button type="primary" @click="searchProducts">查询</el-button>-->
<!--        <el-button @click="resetFilters">重置</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row :gutter="20" class="product-list">
      <el-col :span="5.5" v-for="(product, index) in currentProducts" :key="index"  :gutter="20">
        <Card class="card">
        <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
          <img class="product-image" :src="product.imageurl" alt="Product Image" />
          <h3 class="product-name">{{ product.productName }}</h3>
          <div class="button-group">
            <el-button type="primary" size="small" @click="modifyInfo(products[index].productId)">修改</el-button>
<!--            <el-popconfirm title="确认删除吗？">-->
<!--              <template #reference>-->
<!--                <el-button type="danger" size="small" @click="deleteInfo(products[index].productId, index)">删除</el-button>-->
<!--              </template>-->
<!--            </el-popconfirm>-->
            <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                icon-color="#626AEF"
                title="Are you sure to delete this?"
                @confirm="deleteInfo(products[index].productId, index)"
            >
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </Card>
      </el-col>
    </el-row>
    <el-pagination
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>



  <el-dialog v-model="dialogFormVisible" title="修改商品">
    <el-form :model="modifyForm">
      <el-form-item label="ID相关" :label-width="formLabelWidth">
        <div>商店ID：{{modifyForm.storeId}} <br> 商品ID：{{modifyForm.productId}}   </div>
      </el-form-item>
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="modifyForm.productName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价格" :label-width="formLabelWidth">
        <el-input v-model="modifyForm.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="modifyForm.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <el-input v-model="modifyForm.property" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品类别" :label-width="formLabelWidth">
        <el-cascader v-model="classification" :options="options" />
         &ensp; {{modifyForm.classificationType}}
      </el-form-item>

      <el-radio-group v-model="modifyForm.radio1" class="ml-4">
        <el-radio :label="true" size="large">上架</el-radio>
        <el-radio :label="false" size="large">下架</el-radio>
      </el-radio-group>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmModify">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue';
import {ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination, ElMessage} from 'element-plus';
import Card from "@/components/common/Card.vue";
import { Search } from '@element-plus/icons-vue';
import {deleteSingleCommodity, getGoodsInPage, getSingleCommodity, updateCommodity} from "@/api/goods";
import {base64ToUrl} from "@/utils/photo";
import {useRoute} from "vue-router";

const route = useRoute()

let dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const products = ref([
  //   productId: ,
  //   productName: ,
  //   description: ,
  //   price: ,
  //   imageurl: ,
]);

const searchProductName = ref('');
const isHovered = reactive(Array(products.value.length).fill(false));
const currentPage = ref(1);
const pageSize = 8;

let total = ref();

onMounted(() => {
  getCommodities()
})

watch(currentPage, () => {
  getCommodities()
})

const getCommodities = () => {
  getGoodsInPage({
    pageSize: pageSize,
    pageIndex: currentPage.value,
    commodityId: null,
    storeId: route.query.storeid,
    pricemin: null,
    pricemax: null,
    type: null,
    name: null,
    description: ""
  })
      .then(resp => {
        products.value = []
        for (let i = 0; i < resp.data.records.length; i ++) {
          products.value.push({
            productId: resp.data.records[i].productId,
            productName: resp.data.records[i].productName,
            description: resp.data.records[i].description,
            price: resp.data.records[i].price,
            imageurl: base64ToUrl(resp.data.records[i].image.fileContents, resp.data.records[i].image.contentType),
          })
        }
        total.value = resp.data.total;
      })
      .catch(resp => {
        ElMessage("商品拉取失败")
      })
}


const filteredProducts = computed(() => {
  const searchText = searchProductName.value.trim().toLowerCase();
  if (searchText === '') {
    return products.value;
  } else {
    return products.value.filter(product => product.name.toLowerCase().includes(searchText));
  }
});

const currentProducts = computed(() => {
  const startIndex = 0;
  const endIndex = startIndex + pageSize;
  return filteredProducts.value.slice(startIndex, endIndex);
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};


// ************** modify **************
let classification = ref("")
watch(classification, (newVal) => {
  const values = Object.values(classification.value);
  const combinedString = values.join(',');
  modifyForm.classificationType = combinedString;
  console.log(classification.value)
})


// setInterval(() => {
//   console.log(modifyForm)
// }, 1000)

const modifyForm = reactive({
  productName: '',
  price: '',
  description: '',
  classificationType: "",
  property: JSON.stringify({
    "尺寸": [
      "大",
      "中",
      "小",
    ],
    "颜色": [
      "红色",
      "绿色",
    ],
  }),
  radio1: true,
})


function modifyInfo(productId) {
  dialogFormVisible.value = true

  getSingleCommodity({
    commodityId: productId,
  })
      .then(resp => {
        modifyForm.storeId = resp.data.storeId
        modifyForm.productId = resp.data.productId
        modifyForm.productName = resp.data.productName
        modifyForm.description = resp.data.description
        modifyForm.classificationType = resp.data.classficationType // 后端这里就这样写的
        modifyForm.price = resp.data.price
        modifyForm.property = JSON.stringify(resp.data.property)
        // todo: 图片

        //   todo：修改的api, 后端要变成formdata，传给他string
        // updateCommodity({
        //   storeId: modifyForm.storeId,
        //   productId: modifyForm.productId,
        //   productName: modifyForm.productName,
        //   description: modifyForm.description,
        //   price: modifyForm.price,
        //
        // })

      })
      .catch(resp => {
        ElMessage({
          message: '无法获取该商品信息！',
          type: 'warning',
        })
      })
}


function confirmModify() {
  dialogFormVisible.value = false
}

function deleteInfo(productId, index) {
  deleteSingleCommodity({
    commodityId: productId,
  })
      .then(resp => {
        ElMessage({
          message: '成功删除',
          type: 'success',
        })

        products.value.splice(index, 1)
      })
      .catch(resp => {
        ElMessage({
          message: '删除失败',
          type: 'warning',
        })
      })
}


const options = [
  {
    value: "配饰",
    label: "配饰",
    children: [
      {
        value: "民族",
        label: "民族",
        children: [
          {
            value: "头饰",
            label: "头饰",
          },
          {
            value: "耳饰",
            label: "耳饰",
          },
          {
            value: "腰饰",
            label: "腰饰",
          },
          {
            value: "项链",
            label: "项链",
          },
          {
            value: "手饰",
            label: "手饰",
          }
        ],
      }
    ],
  },
  {
    value: "男装",
    label: "男装",
    children: [
      {
        value: "上衣",
        label: "上衣",
        children: [
          {
            value: "麻布大褂",
            label: "麻布大褂",
          },
          {
            value: "鱼皮衣",
            label: "鱼皮衣",
          },
          {
            value: "羊皮大衣",
            label: "羊皮大衣",
          },
          {
            value: "土布衣",
            label: "土布衣",
          },
          {
            value: "中山装",
            label: "中山装",
          },
          {
            value: "马褂",
            label: "马褂",
          },
          {
            value: "长袍",
            label: "长袍",
          },
        ]
      },
      {
        value: "下衣",
        label: "下衣",
        children: [
          {
            value: "腰裙",
            label: "腰裙",
          },
          {
            value: "膝裤",
            label: "膝裤",
          },
          {
            value: "裤裙",
            label: "裤裙",
          },
          {
            value: "长裤",
            label: "长裤",
          },
        ]
      },
      {
        value: "鞋",
        label: "鞋",
        children: [
          {
            value: "长筒靴",
            label: "长筒靴",
          },
          {
            value: "牛皮靴",
            label: "牛皮靴",
          },
          {
            value: "布鞋",
            label: "布鞋",
          },
          {
            value: "草鞋",
            label: "草鞋",
          },
        ]
      },
      {
        value: "民族",
        label: "民族",
        children: [
          {
            value: "汉族",
            label: "汉族",
          },
          {
            value: "蒙古族",
            label: "蒙古族",
          },
          {
            value: "回族",
            label: "回族",
          },
          {
            value: "藏族",
            label: "藏族",
          },
          {
            value: "维吾尔族",
            label: "维吾尔族",
          },
          {
            value: "苗族",
            label: "苗族",
          },
          {
            value: "彝族",
            label: "彝族",
          },
          {
            value: "壮族",
            label: "壮族",
          },
          {
            value: "布依族",
            label: "布依族",
          },
          {
            value: "朝鲜族",
            label: "朝鲜族",
          },
          {
            value: "满族",
            label: "满族",
          },
          {
            value: "侗族",
            label: "侗族",
          },
          {
            value: "瑶族",
            label: "瑶族",
          },
          {
            value: "白族",
            label: "白族",
          },
          {
            value: "土家族",
            label: "土家族",
          },
          {
            value: "哈尼族",
            label: "哈尼族",
          },
          {
            value: "哈萨克族",
            label: "哈萨克族",
          },
          {
            value: "傣族",
            label: "傣族",
          },
          {
            value: "黎族",
            label: "黎族",
          },
          {
            value: "僳僳族",
            label: "僳僳族",
          },
          {
            value: "佤族",
            label: "佤族",
          },
          {
            value: "畲族",
            label: "畲族",
          },
          {
            value: "高山族",
            label: "高山族",
          },
          {
            value: "拉祜族",
            label: "拉祜族",
          },
          {
            value: "水族",
            label: "水族",
          },
          {
            value: "东乡族",
            label: "东乡族",
          },
          {
            value: "纳西族",
            label: "纳西族",
          },
          {
            value: "景颇族",
            label: "景颇族",
          },
          {
            value: "柯尔克孜族",
            label: "柯尔克孜族",
          },
          {
            value: "土族",
            label: "土族",
          },
          {
            value: "达斡尔族",
            label: "达斡尔族",
          },
          {
            value: "仫佬族",
            label: "仫佬族",
          },
          {
            value: "羌族",
            label: "羌族",
          },
          {
            value: "布朗族",
            label: "布朗族",
          },
          {
            value: "撒拉族",
            label: "撒拉族",
          },
          {
            value: "毛南族",
            label: "毛南族",
          },
          {
            value: "仡佬族",
            label: "仡佬族",
          },
          {
            value: "锡伯族",
            label: "锡伯族",
          },
          {
            value: "阿昌族",
            label: "阿昌族",
          },
          {
            value: "普米族",
            label: "普米族",
          },
          {
            value: "塔吉克族",
            label: "塔吉克族",
          },
          {
            value: "怒族",
            label: "怒族",
          },
          {
            value: "乌孜别克族",
            label: "乌孜别克族",
          },
          {
            value: "俄罗斯族",
            label: "俄罗斯族",
          },
          {
            value: "鄂温克族",
            label: "鄂温克族",
          },
          {
            value: "崩龙族",
            label: "崩龙族",
          },
          {
            value: "保安族",
            label: "保安族",
          },
          {
            value: "裕固族",
            label: "裕固族",
          },
          {
            value: "京族",
            label: "京族",
          },

          {
            value: "塔塔尔族",
            label: "塔塔尔族",
          },

          {
            value: "独龙族",
            label: "独龙族",
          },

          {
            value: "鄂伦春族",
            label: "鄂伦春族",
          },

          {
            value: "赫哲族",
            label: "赫哲族",
          },

          {
            value: "门巴族",
            label: "门巴族",
          },

          {
            value: "珞巴族",
            label: "珞巴族",
          },

          {
            value: "基诺族",
            label: "基诺族",
          },
        ]
      }
    ],
  },
  {
    value: "女装",
    label: "女装",
    children: [
      {
        value: "上衣",
        label: "上衣",
        children: [
          {
            value: "坎肩",
            label: "坎肩",
          },
          {
            value: "鱼皮衣",
            label: "鱼皮衣",
          },
          {
            value: "羊皮大衣",
            label: "羊皮大衣",
          },
          {
            value: "土布衣",
            label: "土布衣",
          },
          {
            value: "长袍",
            label: "长袍",
          },
        ]
      },
      {
        value: "下衣",
        label: "下衣",
        children: [
          {
            value: "凤尾裙",
            label: "凤尾裙",
          },
          {
            value: "裤裙",
            label: "裤裙",
          },
          {
            value: "筒裙",
            label: "筒裙",
          },
          {
            value: "长裤",
            label: "长裤",
          },
        ]
      },
      {
        value: "鞋",
        label: "鞋",
        children: [
          {
            value: "长筒靴",
            label: "长筒靴",
          },
          {
            value: "牛皮靴",
            label: "牛皮靴",
          },
          {
            value: "布鞋",
            label: "布鞋",
          },
          {
            value: "草鞋",
            label: "草鞋",
          },
          {
            value: "绣花鞋",
            label: "绣花鞋",
          },
          {
            value: "锦鞋",
            label: "锦鞋",
          },
        ]
      },
      {
        value: "民族",
        label: "民族",
        children: [
          {
            value: "汉族",
            label: "汉族",
          },
          {
            value: "蒙古族",
            label: "蒙古族",
          },
          {
            value: "回族",
            label: "回族",
          },
          {
            value: "藏族",
            label: "藏族",
          },
          {
            value: "维吾尔族",
            label: "维吾尔族",
          },
          {
            value: "苗族",
            label: "苗族",
          },
          {
            value: "彝族",
            label: "彝族",
          },
          {
            value: "壮族",
            label: "壮族",
          },
          {
            value: "布依族",
            label: "布依族",
          },
          {
            value: "朝鲜族",
            label: "朝鲜族",
          },
          {
            value: "满族",
            label: "满族",
          },
          {
            value: "侗族",
            label: "侗族",
          },
          {
            value: "瑶族",
            label: "瑶族",
          },
          {
            value: "白族",
            label: "白族",
          },
          {
            value: "土家族",
            label: "土家族",
          },
          {
            value: "哈尼族",
            label: "哈尼族",
          },
          {
            value: "哈萨克族",
            label: "哈萨克族",
          },
          {
            value: "傣族",
            label: "傣族",
          },
          {
            value: "黎族",
            label: "黎族",
          },
          {
            value: "僳僳族",
            label: "僳僳族",
          },
          {
            value: "佤族",
            label: "佤族",
          },
          {
            value: "畲族",
            label: "畲族",
          },
          {
            value: "高山族",
            label: "高山族",
          },
          {
            value: "拉祜族",
            label: "拉祜族",
          },
          {
            value: "水族",
            label: "水族",
          },
          {
            value: "东乡族",
            label: "东乡族",
          },
          {
            value: "纳西族",
            label: "纳西族",
          },
          {
            value: "景颇族",
            label: "景颇族",
          },
          {
            value: "柯尔克孜族",
            label: "柯尔克孜族",
          },
          {
            value: "土族",
            label: "土族",
          },
          {
            value: "达斡尔族",
            label: "达斡尔族",
          },
          {
            value: "仫佬族",
            label: "仫佬族",
          },
          {
            value: "羌族",
            label: "羌族",
          },
          {
            value: "布朗族",
            label: "布朗族",
          },
          {
            value: "撒拉族",
            label: "撒拉族",
          },
          {
            value: "毛南族",
            label: "毛南族",
          },
          {
            value: "仡佬族",
            label: "仡佬族",
          },
          {
            value: "锡伯族",
            label: "锡伯族",
          },
          {
            value: "阿昌族",
            label: "阿昌族",
          },
          {
            value: "普米族",
            label: "普米族",
          },
          {
            value: "塔吉克族",
            label: "塔吉克族",
          },
          {
            value: "怒族",
            label: "怒族",
          },
          {
            value: "乌孜别克族",
            label: "乌孜别克族",
          },
          {
            value: "俄罗斯族",
            label: "俄罗斯族",
          },
          {
            value: "鄂温克族",
            label: "鄂温克族",
          },
          {
            value: "崩龙族",
            label: "崩龙族",
          },
          {
            value: "保安族",
            label: "保安族",
          },
          {
            value: "裕固族",
            label: "裕固族",
          },
          {
            value: "京族",
            label: "京族",
          },

          {
            value: "塔塔尔族",
            label: "塔塔尔族",
          },

          {
            value: "独龙族",
            label: "独龙族",
          },

          {
            value: "鄂伦春族",
            label: "鄂伦春族",
          },

          {
            value: "赫哲族",
            label: "赫哲族",
          },

          {
            value: "门巴族",
            label: "门巴族",
          },

          {
            value: "珞巴族",
            label: "珞巴族",
          },

          {
            value: "基诺族",
            label: "基诺族",
          },
        ]
      }
    ],
  },
]




</script>

<style scoped>

.card{
  width: 240px;
  height: 325px;
  margin-top: 20px
}

.product-management {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.filters {
  margin-bottom: 20px;
}

.product-list {
  margin-bottom: 20px;
}

.product-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-image {
  border-radius: 20px;
  width: 100%;
  height: 100%;
}


.product-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-actions {
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
</style>
