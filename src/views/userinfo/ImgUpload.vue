<template>
    <!-- 图片选择框 -->
    <div class="upload-container" >
      <el-upload 
        ref="uploadRef"
        :class="uploadClass"
        action="' '"  
        :headers="token"
        list-type="picture-card"
        :auto-upload="false"
        :on-remove="handleRemove"
        :on-preview="handlePreview"
        :on-change="handleChange"
        :show-file-list="isSelectedShow"
      >
        <el-icon><Plus /></el-icon>
        <template #tip v-if="uploadClass === 'showUpload'">
          <div class="el-upload__tip">
            不超过500KB的png文件
          </div>
        </template>

      </el-upload>
      <!-- 插槽可见 -->
      <el-dialog v-model="dialogVisible" height="705px">
          <div class="picture-container">
            <img w-full :src="dialogImageUrl" alt="Preview Image" class="picture"/>
          </div>
      </el-dialog>

    </div>

    <!-- 进度条显示上传进度 -->
    <div class="upload-container">
      <el-progress v-if="showProgress" :percentage="50" :indeterminate="true"><span></span></el-progress>
    </div>

    <!-- 保存修改 -->
    <div class="upload-container" style="margin:30px 0 20px 0">
        <el-button color="#ffcc00" @click="onSubmit" class="btn-save">保存</el-button>
        <el-button color="graniso" @click="onCancel">取消</el-button>
    </div>
</template>
  
<script setup>
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import store from '@/store'

import { modifyUserAvatar,getUserAvatar } from '@/api/userinfo'
import { base64ToUrl } from '@/utils/photo'

const dialogImageUrl = ref('')  //上传图片的url
const dialogVisible = ref(false) //缩略图是否可见

const uploadRef = ref(null) //对el-upload的引用

const fileList = reactive([]) //选择的图片列表

const isSelectedShow = ref(true) //是否显示上传的图片列表

const showProgress = ref(false) //是否显示进度条

//el-upload类，根据fileList的大小选择是否显示上传框
const uploadClass = computed(()=>{
  return fileList.length >=1 ? 'hideUpload':'showUpload';
})

// 选择图片后操作：
const handleChange = (File, FileList) =>{
  console.log('Change');

  // const isJPG = File.raw.type === 'image/jpeg';  //文件类型jpg
  const isPNG = File.raw.type === 'image/png';  //文件类型png

  const isLt500K = File.raw.size / 1024 / 1024 < 0.5;// 文件大小转换为MB单位,判断是否小于5MB

  // 文件格式错误
  if(!isPNG) {
    ElMessage.error('上传图片只能是PNG格式!');
    uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表
    isSelectedShow.value = false;  //不显示上传的文件列表
    return false;
  }
  // 文件过大
  else if(!isLt500K){
    ElMessage.error('上传图片大小不能超过500KB!');
    uploadRef.value.clearFiles();  //调用el-upload的clearFiles()函数清空已经选择的文件列表
    isSelectedShow.value = false;  //不显示上传的文件列表
    return false;
  }
  else{
    fileList.push(File);     //将新选择的文件File加入fileList中
    isSelectedShow.value = true;   //显示上传的文件列表
    return true;
  }
}

// 图片预览
const handlePreview = (uploadFile) =>{
  console.log('Preview');
  dialogImageUrl.value = uploadFile.url;//图片链接
  dialogVisible.value = true;//el-dialog插槽可见
}

// 取消选择
const handleRemove = (uploadFile,uploadFiles) =>{
  console.log('Remove');
  fileList.splice(0, 1);//删除fileList的第一个元素
  
}

// 上传图片到后端数据库
const onSubmit = () =>{
  console.log('Submit');
  // 获取文件列表
  if(fileList.length < 1){
    ElMessage('请选择一张图片！');
    return;
  }
  showProgress.value = true; //显示进度条

  // // 将图片发送到后端服务器
  fileList.forEach(file => {
    const formData = new FormData();
    formData.append('avatar',file.raw);//将文件添加到formData
    //发送请求到自定义上传API
    modifyUserAvatar(formData)
    .then(resp => {
      ElMessage.success('图片上传成功！')
      showProgress.value = false; //取消进度条显示
      fileList.splice(0, 1);//删除fileList的第一个元素
      uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表

      getUserAvatar()
      .then(resp => {
        console.log('获取头像成功');
        // 转为可见链接
        const imageUrl = base64ToUrl(resp.data.fileContents,'image/png');
        store.commit('setUserPhoto', imageUrl);
      })
      .catch(error => {
        console.error('获取头像失败', error);
        callback(error,null);
      });
    })
    .catch(err => {
      ElMessage.error('图片上传失败，请重试！')
      showProgress.value = false; //取消进度条显示
    }) 
  });
}

// 取消选择
const onCancel = () =>{
  console.log('Cancel');
  fileList.splice(0, 1);//删除fileList的第一个元素
  uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表
  showProgress.value = false; //取消进度条显示
};

</script>



<style lang='scss'>
  // 强行覆盖elementUI的格式
  .hideUpload .el-upload--picture-card {
      display: none;   
  }

  .hideUpload .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width:100%;
    height:100%;
    object-fit: cover;
    object-position: center;
  }

  .upload-container .showUpload .el-upload__tip{
    color:white;
    text-align: center;
  }
</style>
  
<style lang='scss' scoped>
  .picture-container {
    margin:0 auto; 
    width:500px;
    height:500px;
    overflow: hidden; /* 隐藏超出容器的部分 */
  }

   .picture-container .picture {
    // display: block;
    width:100%;
    height:100%;
    object-fit:cover;
    object-position: center;
  }

  .upload-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-progress--line {
    margin-top:20px;
    margin-left:5%;
    width: 50%;
  }

  .btn-save{
    color:white;
  }
</style>
  