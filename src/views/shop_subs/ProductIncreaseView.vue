<template>
  <div class="add-product">
    <h1 class="title">新增商品</h1>
    <el-form :model="form" label-width="80px">
      <el-form-item label="商品名">
        <el-input v-model="form.productName"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述">
        <el-input v-model="form.shopDescription"></el-input>
      </el-form-item>
      <el-form-item label="单件价格">
        <el-input v-model.number="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="初始库存量">
        <el-input v-model.number="form.stock" type="number"></el-input>
      </el-form-item>
      <el-form-item label="上传展示图片">
        <el-upload
          action="/upload"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :file-list="fileList"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, ElUpload } from 'element-plus';

export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElUpload,
  },
  setup() {
    const form = reactive({
      productName: '',
      shopDescription: '',
      price: null,
      stock: null,
    });
    // const fileList = ref([]);

    // const beforeUpload = (file) => {
    //   // 在这里可以添加图片上传前的校验逻辑
    // };

    // const handleUploadSuccess = (response, file, fileList) => {
    //   // 图片上传成功后的处理逻辑
    // };

    // const handleUploadError = (error, file, fileList) => {
    //   // 图片上传失败后的处理逻辑
    // };

    const submitForm = () => {
      // 提交表单的处理逻辑
    };

    const resetForm = () => {
      // 重置表单的处理逻辑
    };

    return {
      form,
      submitForm,
      resetForm,
    };
  },
};
</script>

<style>
.add-product {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
