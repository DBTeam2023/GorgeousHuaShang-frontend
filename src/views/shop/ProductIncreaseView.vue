<template>
  <div class="add-product">
    <h1 class="title">新增商品</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="card">
          <div class="image-container" @click="openImagePicker">
            <img class="product-image" :src="selectedImage ? selectedImage : placeholderImage" alt="Product Image" />
          </div>
          <el-input v-model="productName" placeholder="请输入商品名称"></el-input>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="card">
          <h3 class="subtitle">商品信息</h3>
          <el-form :model="form" label-width="80px" class="form">
            <el-form-item label="单件价格">
              <el-input v-model.number="form.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="初始库存">
              <el-input v-model.number="form.stock" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品详情">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="card">
          <div class="image-list">
            <ImageGallery></ImageGallery>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="button-container">
      <el-button type="primary" class="submit-button" @click="submitForm">确定</el-button>
      <el-button class="reset-button" @click="resetForm">重置</el-button>
    </div>
  </div>
  <div></div>
</template>

<script>
import { ref } from 'vue';
import ImageGallery from './PicShow.vue';

export default {
  name: 'AddProduct',
  components: {
    ImageGallery,
  },
  data() {
    return {
      selectedImage: '',
      placeholderImage: 'https://via.placeholder.com/200', // Placeholder image URL
      productName: '',
      form: {
        price: null,
        stock: null,
        description: '',
      },
      fileList: [], // List of uploaded files
    };
  },
  methods: {
    openImagePicker() {
        // 打开文件选择对话框（示例: 使用<input type="file">元素）
        // 更新所选图片
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.addEventListener('change', (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.selectedImage = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        });

        fileInput.click();
    },
    beforeUpload(file) {
      // Before uploading the file
      // You can perform validation here if needed
    },
    handleUploadSuccess(response, file) {
        // 处理成功的文件上传
        // 在此处更新fileList
        this.fileList.push({
          url: response.url,
          name: file.name,
          // 其他属性...
        });
      // 其他方法...
    },
    handleUploadError(error, file) {
      // Handle file upload error
    },
    submitForm() {
      // Perform form submission logic
      // You can access the form data and uploaded files here
      console.log(this.productName);
      console.log(this.form);
      console.log(this.fileList);
    },
    resetForm() {
    // 将表单字段重置为初始值
    this.formData.field1 = '';
    this.formData.field2 = '';
    // ...
  },
  },
};
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
