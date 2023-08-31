<template>
  <div class="shop-container">
    <div class="shop-header">
      <div class="shop-icon-container">
        <img :src="infoForm.shopIcon" alt="Shop Icon" class="shop-icon" />
<!--        <input type="file" ref="imageInput" style="display:none" @change="handleImageChange" accept="image/*">-->
<!--        <button class="upload-image-button" @click="uploadImage">上传图片</button>-->
      </div>
      <h1 class="shop-name">{{ infoForm.shopName }}</h1>
      <div class="shop-rating">
        <el-rate v-model="infoForm.score" disabled></el-rate>
      </div>
    </div>
    <div class="shop-content">
      <h3 class="section-title">店铺简介</h3>
      <p class="section-text">{{ infoForm.description }}</p>
      <h3 class="section-title">店铺地址</h3>
      <p class="section-text">{{ infoForm.address }}</p>
    </div>
    <div class="shop-actions">
      <el-button type="primary" @click="dialogVisible = true">修改信息</el-button>
    </div>
    <div class="shop-actions">
      <el-button type="primary" @click="dialogVisibleForManager = true"
      style="margin-top: 30px;">邀请管理员</el-button>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="修改店铺信息"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="infoForm" label-width="80px" ref="form">
<!--      <el-form-item label="店铺头像">-->
<!--        <el-input :v-model="infoForm.shopIcon" readonly :placeholder='picURL'></el-input>-->
<!--        <input type="file" ref="imageInput2" style="display:none" @change="handleIconChange" accept="image/*">-->
<!--        <button class="upload-image-button" @click.prevent="uploadIcon">请上传图片</button>-->
<!--      </el-form-item>-->
      <el-form-item label="店铺评分">
        <el-input v-model="infoForm.score"/>
      </el-form-item>
      <el-form-item label="店铺简介">
        <el-input v-model="infoForm.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveChanges">保存</el-button>
      </span>
    </template>
  </el-dialog>



  <el-dialog
      v-model="dialogVisibleForManager"
      title="邀请管理员"
      width="30%"
      :before-close="handleClose"
  >
    <el-form label-width="80px" ref="form">
      <el-form-item label="卖家账号">
        <el-input v-model="account"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleForManager = false">取消</el-button>
        <el-button type="primary" @click="saveChangesForManager">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import {ElRate, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox, ElMessage} from 'element-plus';
import {addStoreAddress, addStoreDescription, getStoreInfo} from "@/api/store";
import {useRoute} from "vue-router";

const route = useRoute();

const dialogVisible = ref(false);
const dialogVisibleForManager = ref(false)

const infoForm = reactive({
  shopIcon: 'https://picsum.photos/200/200',
  shopName: '',
  description: '',
  address: '',
  score: 4,
  storeId: "",
});

const account = ref();

onMounted(() => {
  getStoreInfo({
    storeId: route.query.storeid
  })
      .then(resp => {
        infoForm.shopName = resp.data.storeName;
        infoForm.score = resp.data.score;
        infoForm.address = resp.data.address;
        infoForm.storeId = resp.data.storeId;
        infoForm.description = resp.data.description;
      })
      .catch(resp => {
        ElMessage.error('商店信息获取异常');
      })
})

function saveChangesForManager() {
//   todo: 邀请别人

  dialogVisibleForManager.value = false;
}

async function saveChanges() {
  try {
    const addDescription = addStoreDescription({
        storeId: infoForm.storeId,
        des: infoForm.description,
    });
    const addAddress = addStoreAddress({
      storeId: infoForm.storeId,
      address: infoForm.address,
    });

    const [descriptionResult, addressResult] = await Promise.all([addDescription, addAddress]);

    ElMessage({
      message: '修改成功',
      type: 'success',
    })

    dialogVisible.value = false;
  } catch (error) {
    ElMessage({
      message: '修改失败',
      type: 'warning',
    })
  }
}

const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭对话框吗？')
    .then(() => {
      done();
    })
    .catch(() => {
      // 处理错误
    });
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
