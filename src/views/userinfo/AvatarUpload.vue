<template>
    <ImgUpload ref="ImgUploadRef" @uploadPicture = "uploadAvatar"
                                  :showProgress="showProgress" />
</template>

<script setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus';
    import { modifyUserAvatar,getUserAvatar } from '@/api/userinfo'
    import { base64ToUrl } from '@/utils/photo'
    import ImgUpload from '@/components/common/ImgUpload.vue';
    import store from '@/store'

    const showProgress = ref(false);//是否显示进度条
    const ImgUploadRef = ref(null);

    const uploadAvatar = (val) =>{
        // 将图片发送到后端服务器
        val.fileList.forEach(file => {
            const formData = new FormData();
            formData.append('avatar',file.raw);//将文件添加到formData

            //发送请求到自定义上传API
            modifyUserAvatar(formData)
            .then(resp => {
                val.fileList.splice(0, 1);//删除fileList的第一个元素
                ImgUploadRef.value.$refs.uploadRef.clearFiles();

                getUserAvatar()
                .then(resp => {
                    // 转为可见链接
                    const imageUrl = base64ToUrl(resp.data.fileContents,'image/png');
                    store.commit('setUserPhoto', imageUrl);
                })
                .catch(error => {
                    callback(error,null);
                });
                ElMessage.success('图片上传成功！')
                showProgress.value = false; //取消进度条显示
            })
            .catch(err => {
                ElMessage.error('图片上传失败，请重试！')
                showProgress.value = false; //取消进度条显示
            }) 
        });
    }

</script>

