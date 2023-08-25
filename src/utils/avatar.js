import { ref } from 'vue';
import { getUserAvatar } from '@/api/userinfo'; // 替换为实际的获取用户头像的 API 方法
import store from '@/store'; // 替换为实际的 Vuex store 导入

const getAvatar = () => {
    getUserAvatar()
      .then(resp => {
        console.log('获取头像成功');
        const imageSrc = ref('');
  
        const decodedData = atob(resp.data.fileContents);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
          uint8Array[i] = decodedData.charCodeAt(i);
        }
  
        const blob = new Blob([uint8Array], { type: 'image/png' });
        imageSrc.value = URL.createObjectURL(blob);
        console.log(imageSrc.value);
  
        store.commit('setUserPhoto', imageSrc);
      })
      .catch(error => {
        console.error('获取头像失败', error);
      });
  };

  export default getAvatar;
