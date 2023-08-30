<template>
  <div class="shop-container">
    <div class="shop-header">
      <div class="shop-icon-container">
        <img :src="shopIcon" alt="Shop Icon" class="shop-icon" />
<!--        <input type="file" ref="imageInput" style="display:none" @change="handleImageChange" accept="image/*">-->
<!--        <button class="upload-image-button" @click="uploadImage">上传图片</button>-->
      </div>
      <h1 class="shop-name">{{ shopName }}</h1>
      <div class="shop-rating">
        <el-rate v-model="shopRating" disabled></el-rate>
      </div>
    </div>
    <div class="shop-content">
      <h3 class="section-title">店铺简介</h3>
      <p class="section-text">{{ shopDescription }}</p>
      <h3 class="section-title">店铺地址</h3>
      <p class="section-text">{{ shopAddress }}</p>
    </div>
    <div class="shop-actions">
      <el-button type="primary" @click="dialogVisible = true">修改信息</el-button>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="修改店铺信息"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="80px" ref="form">
<!--      <el-form-item label="店铺头像">-->
<!--        <el-input :v-model="infoForm.shopIcon" readonly :placeholder='picURL'></el-input>-->
<!--        <input type="file" ref="imageInput2" style="display:none" @change="handleIconChange" accept="image/*">-->
<!--        <button class="upload-image-button" @click.prevent="uploadIcon">请上传图片</button>-->
<!--      </el-form-item>-->
      <el-form-item label="店铺名称">
        <el-input v-model="infoForm.shopName"/>
      </el-form-item>
      <el-form-item label="店铺简介">
        <el-input v-model="infoForm.shopDescription"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="infoForm.shopAddress"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveChanges">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { ElRate, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox } from 'element-plus';

const shopIcon = ref('https://picsum.photos/200/200');
const shopName = ref('我是斯黛拉姐姐的狗');
const shopRating = ref(4);
const shopDescription = ref('这是一家很不错的店铺。');
const shopAddress = ref('北京市朝阳区');
const dialogVisible = ref(false);
const infoForm = ref({
  shopIcon: '',
  shopName: '',
  shopDescription: '',
  shopAddress: '',
});
let picURL = ref("")

const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭对话框吗？')
    .then(() => {
      done();
    })
    .catch(() => {
      // 处理错误
    });
};

const saveChanges = () => {
  if (infoForm.value.shopIcon) {
    shopIcon.value = infoForm.value.shopIcon;
  }
  if (infoForm.value.shopName) {
    shopName.value = infoForm.value.shopName;
  }
  if (infoForm.value.shopDescription) {
    shopDescription.value = infoForm.value.shopDescription;
  }
  if (infoForm.value.shopAddress) {
    shopAddress.value = infoForm.value.shopAddress;
  }
  dialogVisible.value = false;
  resetForm();
};

const resetForm = () => {
  infoForm.value.shopIcon = '';
  infoForm.value.shopName = '';
  infoForm.value.shopDescription = '';
  infoForm.value.shopAddress = '';
  picURL = '';
};

const uploadIcon = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const file = event.target.files[0];
    picURL = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      infoForm.value.shopIcon = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
};

const handleIconChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    form.value.shopIcon = e.target.result;
  };
  reader.readAsDataURL(file);
};

</script>

<style scoped>
.shop-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shop-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.shop-icon-container {
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 20px;
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.shop-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-image-button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  text-align: center;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.upload-image-button:hover {
  opacity: 1;
}

.shop-name {
  margin-top: 10px;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.shop-rating {
  margin-top: 10px;
}

.shop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-text {
  font-size: 16px;
  line-height: 1.5;
  max-width: 600px;
  margin-top: 10px;
  margin-bottom: 40px;
}

.shop-actions {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
