<template>
  <div class="shop-container">
    <div class="shop-header">
      <div class="shop-icon-container">
        <img :src="infoForm.shopIcon" alt="Shop Icon" class="shop-icon" />
        <button class="upload-image-button" @click="dialogUploadVisible = true">上传图片</button>
        <el-dialog v-model="dialogUploadVisible" title="修改头像">
          <div>
            <ImgUpload ref="ImgUploadRef" 
                @uploadPicture = "uploadAvatar"
                @onCancel = "handleCancel"
                :showProgress="showProgress"/>
          </div>
        </el-dialog>
      
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
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="修改店铺信息"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="infoForm" label-width="80px" ref="form">
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

</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import {ElRate, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox, ElMessage, ElStep} from 'element-plus';
import {addStoreAddress, addStoreDescription, getStoreInfo, setStoreAvatar, getStoreAvatar, setScore} from "@/api/store";
import {useRoute} from "vue-router";
import ImgUpload from '@/components/common/ImgUpload.vue';
import { base64ToUrl } from '@/utils/photo';


const route = useRoute();

const dialogVisible = ref(false);
const dialogUploadVisible = ref(false); 
const showProgress = ref(false);//显示图片上传进度
const handleCancel = () =>{
  dialogUploadVisible.value = false;
}


const infoForm = reactive({
  shopIcon: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  shopName: '',
  description: '',
  address: '',
  score: 4,
  storeId: "",
});

const account = ref();

const ImgUploadRef = ref(null);//上传图片组件的引用

const getAvatar = () =>{
    // 获取头像信息
    getStoreAvatar({
      storeId:infoForm.storeId,
    })
    .then(resp => {
        // 转为可见链接
        if(resp.data === null){
          infoForm.shopIcon='https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
        }
        else{
          const imageUrl = base64ToUrl(resp.data.fileContents,'image/png');
          infoForm.shopIcon = imageUrl;
        }

    })
    .catch(error => {
        ElMessage('获取店铺头像失败！')
        console.log(error);
    });
}

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
        getAvatar();
      })
      .catch(resp => {
        ElMessage.error('商店信息获取异常');
      })
})

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
    const addScore = setScore({
      storeId: infoForm.storeId,
      score: infoForm.score
    })


    const [descriptionResult, addressResult, scoreResult] = await Promise.all([addDescription, addAddress, addScore]);

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

// 修改头像
const uploadAvatar = (val) => {
  val.fileList.forEach(file => {
    const formData = new FormData();
    formData.append('image',file.raw);//将文件添加到formData
    formData.append('imageName',infoForm.storeId);

    setStoreAvatar(formData)
    .then(resp => {
        val.fileList.splice(0, 1);
        ImgUploadRef.value.$refs.uploadRef.clearFiles();
        getAvatar();
        ElMessage.success('店铺头像修改成功！')
        showProgress.value = false; //取消进度条显示
        dialogUploadVisible.value = false;
    })
    .catch(err => {
        ElMessage.error('图片上传失败，请重试！')
        showProgress.value = false; //取消进度条显示
    }) 
  });
}

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
