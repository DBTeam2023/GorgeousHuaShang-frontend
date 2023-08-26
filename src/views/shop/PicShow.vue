<template>
  <div class="image-gallery">
    <div class="image-list">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-item"
        @click="deleteImage(index)"
      >
        <div class="delete-button">删除</div>
        <img :src="image.url" alt="Image" />
      </div>
    </div>
    <div
      v-if="images.length < maxImages"
      class="upload-box"
      @click="openFileBrowser"
    >
    <el-icon :style="{ fontSize: '32px'  }" class="upload-icon"><UploadFilled /></el-icon>
    </div>
  </div>
</template>


<!-- <script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus';
import {ref} from 'vue' -->

<script>
import { ref } from 'vue';
import {UploadFilled} from '@element-plus/icons-vue'
import { ElButton,ElIcon } from 'element-plus';

export default {
  components: {
    ElButton,
    ElIcon,
    UploadFilled,
  },
  props: {
    maxImages: {
      type: Number,
      default: 6,
    },
  },
  setup(props) {
    const images = ref([]);

    // 打开文件浏览器选择图片
    const openFileBrowser = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.addEventListener('change', handleFileSelect);
      input.click();
    };

    // 处理选择的文件
    const handleFileSelect = (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target.result;
          images.value.push({ url });
        };
        reader.readAsDataURL(file);
      }
    };

    // 删除图片
    const deleteImage = (index) => {
      images.value.splice(index, 1);
    };

    return {
      images,
      openFileBrowser,
      deleteImage,
    };
  },
};
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
}

.image-item {
  position: relative;
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.upload-box {
  position: relative;
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.upload-box:hover {
  position: relative;
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 2px dashed lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: lightblue;
}

.add-button {
  display: none; /* 删除原来的按钮样式 */
}

</style>
