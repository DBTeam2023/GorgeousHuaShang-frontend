<template>
    <ElForm class="register-form" ref="registerRef" :model="registerParam" :rules="registerRules">
<!--        <div style="display: flex; justify-content: center;">-->
<!--            <div class="image-container" @click="openFileBrowser">-->
<!--              <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">-->
<!--              <div class="overlay" v-if="!imageUrl">-->
<!--                <el-icon :style="{ fontSize: '32px' }" class="upload-icon"><UploadFilled /></el-icon>-->
<!--              </div>-->
<!--              <img :src="imageUrl" alt="上传的图片" class="uploaded-image" v-if="imageUrl">-->
<!--            </div>-->
<!--        </div>-->
        <ElFormItem prop="username">
            <ElInput placeholder="请输入店铺名字" :prefix-icon="House" v-model="registerParam.storeName" size="large"></ElInput>
          <ElInput placeholder="请输入店铺描述" :prefix-icon="House" v-model="des" size="large" style="margin-top: 10px;"></ElInput>
          <ElInput placeholder="请输入店铺地址" :prefix-icon="House" v-model="address" size="large"  style="margin-top: 10px;"></ElInput>
        </ElFormItem>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="1" size="large">管理员</el-radio>
          <el-radio label="0" size="large">非管理员</el-radio>
        </el-radio-group>
        <ElFormItem>
            <ElButton type="primary" class="register-btn" size="large" @click="submit(registerParam)">新建</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup>
import { House,ChatSquare, Location, Message } from '@element-plus/icons-vue';
import { reactive, ref,onMounted } from 'vue';
import {UploadFilled} from '@element-plus/icons-vue'
import {ElButton, ElIcon, ElMessage} from 'element-plus';
import {addStore} from "@/api/store";

let radio1 = ref("1")
const des = ref("默认描述");
const address = ref("默认地址")

const registerParam = reactive({
  storeName: "",
  isManager: radio1
});
// setInterval(() => {
//   console.log(registerParam)
// }, 1000)
const submit = (formEl) => {
  // console.log(formEl)
  if (formEl.storeName === "") {
    return false;
  }

  const formdata = new FormData();

  formdata.append("storeName", registerParam.storeName);
  formdata.append("isManager", radio1.value);
  formdata.append("des", des.value);
  formdata.append("address", address.value);

  addStore(formdata)
      .then(resp => {
        ElMessage.success("新建成功！");
        window.location.reload();
      })
      .catch(resp => {
        ElMessage({
          message: "新建失败！",
          type: "warning",
        });
      })
};

// const imageUrl = ref(null);

// function openFileBrowser() {
//   const input = document.createElement('input');
//   input.type = 'file';
//
//   input.addEventListener('change', () => {
//     const file = input.files[0];
//     const reader = new FileReader();
//
//     reader.addEventListener('load', () => {
//       imageUrl.value = reader.result;
//     });
//
//     reader.readAsDataURL(file);
//   });
//
//   input.click();
// }
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
