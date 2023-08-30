<template>
  <div class="add-product">
    <h1 class="title">新增商品</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="card">
          <div class="image-container" >
<!--            <img class="product-image" :src="selectedImage ? selectedImage : placeholderImage" alt="Product Image" />-->

            这里放图片

          </div>
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
            <el-form-item label="初始库存">
              <el-input v-model.number="stock" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品详情">
              <el-input type="textarea" v-model="description"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <div class="m-4">
      <p>设置商品种类</p>
      <el-cascader v-model="value" :options="options" @change="handleChange" />
    </div>

    <div class="button-container">
      <el-button type="primary" class="submit-button" @click="submitForm">确定</el-button>
      <el-button class="reset-button" @click="resetForm">重置</el-button>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import { ref } from 'vue';

const handleChange = (value) => {
  console.log(value)
}

let productName= ref("");
let price = ref()
let stock = ref()
let description = ref("")

function submitForm() {


      console.log(productName.value);
    };
function resetForm() {
    // 将表单字段重置为初始值
    this.formData.field1 = '';
    this.formData.field2 = '';
    // ...
  };

// value: ,
// label: ,
// children: [
//
// ],


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

    ],
  },
  {
    value: "女装",
    label: "女装",
    children: [

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
  height: 200px;
  border: 1px dashed #ccc;
  cursor: pointer;
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
  justify-content: center; /* 水平居中对齐 */
}

.submit-button {
  margin-right: 10px; /* 设置按钮间距 */
}
</style>
