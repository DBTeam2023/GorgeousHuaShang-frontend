<template>
  <div class="add-product">
    <h1 class="title">新增商品</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="card">
          <!-- 图片选择框 -->
          <div class="image-container">
            <el-upload ref="uploadRef" :class="uploadClass" action="' '" :headers="token" list-type="picture-card"
              :auto-upload="false" :on-remove="handleRemove" :on-preview="handlePreview" :on-change="handleImageChange"
              :show-file-list="isSelectedShow">
              <el-icon>
                <Plus />
              </el-icon>
              <template #tip v-if="uploadClass === 'showUpload'">
                <div class="el-upload__tip">
                  请上传不超过500KB的png文件
                </div>
              </template>

            </el-upload>
            <!-- 插槽可见 -->
            <el-dialog v-model="dialogVisible" height="705px">
              <div class="picture-container">
                <img w-full :src="dialogImageUrl" alt="Preview Image" class="picture" />
              </div>
            </el-dialog>
          </div>
          <!-- 输入框 -->
          <el-input v-model="productName" placeholder="请输入商品名称"></el-input>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="card">
          <h3 class="subtitle">商品信息</h3>
          <el-form label-width="80px" class="form">
            <el-form-item label="单件价格">
              <el-input v-model.number="price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品详情">
              <el-input type="textarea" v-model="description" rows="6"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-form-item label="商品属性">
      <el-input type="textarea" v-model="property" placeholder="请按要求输入商品属性" rows="5"></el-input>
    </el-form-item>
    <div class="m-4">
      <p>设置商品种类</p>
      <el-cascader v-model="classification" :options="options" @change="handleChange" />
    </div>

    <!-- 进度条显示上传进度 -->
    <div class="upload-container">
      <el-progress v-if="showProgress" :percentage="50" :indeterminate="true"><span></span></el-progress>
    </div>

    <div class="button-container">
      <el-button type="primary" class="submit-button" @click="addNewCommodity">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, reactive } from 'vue';
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { Plus } from '@element-plus/icons-vue'
import { createNewCommodity } from "@/api/store";

// 商品图片上传逻辑：
const dialogImageUrl = ref('')  //上传图片的url
const dialogVisible = ref(false) //缩略图是否可见
const uploadRef = ref(null) //对el-upload的引用
const fileList = reactive([]) //选择的图片列表
const isSelectedShow = ref(true) //是否显示上传的图片列表
const showProgress = ref(false) //是否显示进度条

//el-upload类，根据fileList的大小选择是否显示上传框
const uploadClass = computed(() => {
  return fileList.length >= 1 ? 'hideUpload' : 'showUpload';
})

// 选择图片后操作：
const handleImageChange = (File, FileList) => {
  console.log('Change');

  // const isJPG = File.raw.type === 'image/jpeg';  //文件类型jpg
  const isPNG = File.raw.type === 'image/png';  //文件类型png

  const isLt500K = File.raw.size / 1024 / 1024 < 0.5;// 文件大小转换为MB单位,判断是否小于5MB

  // 文件格式错误
  if (!isPNG) {
    ElMessage.error('上传图片只能是PNG格式!');
    uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表
    isSelectedShow.value = false;  //不显示上传的文件列表
    return false;
  }
  // 文件过大
  else if (!isLt500K) {
    ElMessage.error('上传图片大小不能超过500KB!');
    uploadRef.value.clearFiles();  //调用el-upload的clearFiles()函数清空已经选择的文件列表
    isSelectedShow.value = false;  //不显示上传的文件列表
    return false;
  }
  else {
    fileList.push(File);     //将新选择的文件File加入fileList中
    isSelectedShow.value = true;   //显示上传的文件列表
    return true;
  }
}

// 图片预览
const handlePreview = (uploadFile) => {
  console.log('Preview');
  dialogImageUrl.value = uploadFile.url;//图片链接
  dialogVisible.value = true;//el-dialog插槽可见
}



// 创建商品逻辑：
const route = useRoute();

const handleChange = (value) => {
  console.log(value)
}

let classification = ref("")
watch(classification, (newVal) => {
  const values = Object.values(classification.value);
  const combinedString = values.join(',');
  classificationType.value = combinedString;
})

let productName = ref("");
let price = ref()
let description = ref("")
let classificationType = ref("")
let property = ref(JSON.stringify({
  "尺寸": [
    "大",
    "中",
    "小",
  ],
  "颜色": [
    "红色",
    "绿色",
  ],
}))

function addNewCommodity() {
  let formData = new FormData();
  formData.append('StoreId', route.query.storeid);
  formData.append('ProductName', productName.value);
  formData.append('Description', description.value);
  formData.append('Price', price.value);
  formData.append('Property', property.value);
  formData.append('ClassficationType', classificationType.value);
  formData.append('IsDeleted', false);

  // 商品图片上传：
  console.log('商品图片上传');
  showProgress.value = true; //显示进度条
  fileList.forEach(file => {
    formData.append('image', file.raw);//将文件添加到formData
  })
  //发送请求到自定义————创建商品API
  createNewCommodity(formData)
    .then(resp => {
      ElMessage({
        message: '创建成功!',
        type: 'success',
      })
      showProgress.value = false; //取消进度条显示
      fileList.splice(0, 1);//删除fileList的第一个元素
      uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表
    })
    .catch(resp => {
      ElMessage({
        message: '创建失败!',
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
.add-product {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 10px;
}

.card {
  padding: 20px;
  margin-bottom: 20px;
  height: 270px;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 10%;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.upload {
  width: 104px;
  height: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.upload-text {
  margin-top: 10px;
}

.submit-button {
  margin-top: 20px;
}

.el-row {
  margin-left: -10px;
  margin-right: -10px;
}

.el-col {
  padding: 10px;
}

.reset-button {
  margin-left: 10px;
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  /* 水平居中对齐 */
}

.submit-button {
  margin-right: 10px;
  /* 设置按钮间距 */
}

.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-progress--line {
  margin-top: 20px;
  margin-left: 5%;
  width: 50%;
}
</style>
