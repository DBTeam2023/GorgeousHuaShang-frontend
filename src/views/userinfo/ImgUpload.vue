<template>
  <el-card>
    <!-- 提示语 -->
    <!-- <div class="upload-container" v-if="uploadClass === 'showUpload'">
      <h4>点击选择图片</h4>
    </div> -->
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
            不超过5MB的jpg/png文件
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

    <!-- 保存修改 -->

    <div class="upload-container" style="margin-top:30px">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
    </div>
  </el-card>
</template>
  
<script setup>
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import store from '@/store'

import { modifyUserAvatar } from '@/api/userinfo'

const dialogImageUrl = ref('')  //上传图片的url
const dialogVisible = ref(false) //缩略图是否可见

const uploadRef = ref(null) //对el-upload的引用

const fileList = reactive([]) //选择的图片列表

const isSelectedShow = ref(true) //是否显示上传的图片列表

//el-upload类，根据fileList的大小选择是否显示上传框
const uploadClass = computed(()=>{
  return fileList.length >=1 ? 'hideUpload':'showUpload';
})


// 图片上传成功操作
// const handlePictureSuccess = (response, uploadFile) => {
//   imageUrl.value = URL.createObjectURL(uploadFile.raw)
// }

// 图片上传前检查操作
// const beforePictureUpload = (rawFile) => {
//   console.log("beforePictureUpload");
//   if (rawFile.type !== 'image/jpeg') {
//     ElMessage.error('picture picture must be JPG format!')
//     return false
//   } else if (rawFile.size / 1024 / 1024 > 10) {
//     ElMessage.error('picture picture size can not exceed 2MB!')
//     return false
//   }
//   return true
// }

const token ={
  Authorization:"Bearer " + localStorage.getItem("jwtToken"),
}

// 选择图片后操作：
const handleChange = (File, FileList) =>{
  console.log('Change');

  const isJPG = File.raw.type === 'image/jpeg';  //文件类型jpg
  const isPNG = File.raw.type === 'image/png';  //文件类型png

  const isLt500K = File.raw.size / 1024 / 1024 < 0.5;// 文件大小转换为MB单位,判断是否小于5MB

  // 文件格式错误
  if(!isPNG && !isJPG) {
    ElMessage.error('上传图片只能是JPG/PNG格式!');
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
  console.log('fileList',fileList)

  // // 将图片发送到后端服务器
  fileList.forEach(file => {
    const formData = new FormData();
    formData.append('file',file.raw);//将文件添加到formData


    //发送请求到自定义上传API
    modifyUserAvatar(formData)
    .then(resp => {
      console.log(resp);
      ElMessage.success('图片上传成功！')
      fileList.splice(0, 1);//删除fileList的第一个元素
      uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表
      //修改store对应的用户头像
      store.commit("setUserPhoto",resp.data.pictureURL); 
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('图片上传失败，请重试！')
    })
    
  });


}

// 取消选择
const onCancel = () =>{
  console.log('Cancel');
  fileList.splice(0, 1);//删除fileList的第一个元素
  uploadRef.value.clearFiles();//调用el-upload的clearFiles()函数清空已经选择的文件列表
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
  </style>
  