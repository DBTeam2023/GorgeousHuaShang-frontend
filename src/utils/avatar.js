// 获取头像图片链接函数
// 使用示例见最下方
import { ref } from 'vue';
import { getUserAvatar } from '@/api/userinfo'; 

export function getAvatar(callback) {
    getUserAvatar()
      .then(resp => {
        console.log('获取头像成功');
        // 方法1：直接点击imageSrc.value不可见（blob:http://localhost:8080/...）
        const imageSrc = ref('');
  
        const decodedData = atob(resp.data.fileContents);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
          uint8Array[i] = decodedData.charCodeAt(i);
        }
  
        const blob = new Blob([uint8Array], { type: 'image/png' });
        imageSrc.value = URL.createObjectURL(blob);
        console.log(imageSrc.value);

        // 方法2： 直接点击imageSrc.value可见（data:image/png;base64,...）
        // const imageSrc =ref('');
        // const imgString = resp.data.fileContents;//fileContents是返回响应中的base64字符串
        // imageSrc.value = 'data:image/png;base64,' + imgString;//进行简单字符串连接
        // console.log(imageSrc.value);

  
        //将结果通过回调函数传递，参数1错误信息，参数2位imageSrc的值
        callback(null,imageSrc.value);
      })
      .catch(error => {
        console.error('获取头像失败', error);
        callback(error,null);
      });
  };

// 使用示例
// import {getAvatar} from '@/utils/avatar';

// getAvatar((error,imgSrc) => {
//     if(error){
//         //获取头像失败操作处理
//     }
//     else{
//         //获取头像成功操作处理
//         // imgSrc为头像图片链接，直接使用不用.value！！！
//     }
// })
