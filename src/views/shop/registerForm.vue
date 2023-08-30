<template>
    <ElForm class="register-form" ref="registerRef" :model="registerParam" :rules="registerRules">
        <div style="display: flex; justify-content: center;">
            <div class="image-container" @click="openFileBrowser">
  <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
  <div class="overlay" v-if="!imageUrl">
    <el-icon :style="{ fontSize: '32px' }" class="upload-icon"><UploadFilled /></el-icon>
  </div>
  <img :src="imageUrl" alt="上传的图片" class="uploaded-image" v-if="imageUrl">
</div>
  </div>
        <ElFormItem prop="username">
            <ElInput placeholder="请输入店铺名字" :prefix-icon="House" v-model="registerParam.username" size="large"></ElInput>
        </ElFormItem>
        <ElFormItem prop="password">
            <ElInput placeholder="请输入店铺简介" :prefix-icon="ChatSquare" v-model="registerParam.password" size="large"></ElInput>
        </ElFormItem>
        <ElFormItem prop="email">
            <ElInput placeholder="请输入店铺地址" :prefix-icon="Location" v-model="registerParam.email" size="large"></ElInput>
        </ElFormItem>
        <ElFormItem>
            <ElButton type="primary" class="register-btn" size="large" @click="submit(registerRef)">新建</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup>
import { House,ChatSquare, Location, Message } from '@element-plus/icons-vue';
import { reactive, ref,onMounted } from 'vue';
import {UploadFilled} from '@element-plus/icons-vue'
import { ElButton,ElIcon } from 'element-plus';

const registerParam = reactive({
  username: "",
  password: "",
  email: ""
});
const canvasRef = ref(null);
const canvasWidth = ref(200);
const canvasHeight = ref(200);
const registerRef = ref();
const registerRules = reactive({
  username: [{ required: true, message: "名字不能为空", trigger: 'blur' }],
  password: [{
    required: true,
    message: "简介不能为空",
    trigger: 'blur'
  }],
  email: [{ required: true, message: "地址不能为空", trigger: 'blur' }]
});

const submit = (formEl) => {
  if (!formEl) {
    return false;
  }
  formEl.validate(async (validate) => {
    if (validate) {
      console.log("开始做注册的逻辑");
    } else {
      return false;
    }
  });
};

const imageUrl = ref(null);

function openFileBrowser() {
  const input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imageUrl.value = reader.result;
    });

    reader.readAsDataURL(file);
  });

  input.click();
}
</script>

<style scoped>
.image-container:hover {
  position: relative;
  width: 200px;
  height: 200px;
  margin-right: 10px;
  margin-bottom: 18px;
  border: 2px dashed lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: lightblue;
}
.image-container {
    position: relative;
  width: 200px;
  height: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.register-form {
    grid-row: 1;
    grid-column: 1;
    opacity: 0;
    transition: 1s ease-in-out;
    /* 上下 | 左右 */
    padding: 1% 25%;
    z-index: 0;
}

.register-form.sign-up-model {
    opacity: 1;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    z-index: 1;
}

.register-title{
    text-align: center;
    color: #444;
}
.register-btn{
    width: 100%;
    font-size: 18px;
}
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px dashed #ccc;
  cursor: pointer;
  margin-bottom: 20px;
}
.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px dashed #ccc;
  cursor: pointer;
  margin-bottom: 20px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.upload-icon {
  font-size: 32px;
  color: lightblue;
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
}
</style>
