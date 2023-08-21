<template>
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="card-group">
        <ElCard v-for="card in cards" :key="card.id" :header="card.title" :body-style="{ padding: '0' }">
          <a :href="card.link" target="_blank">
            <img :src="card.image" style="width: 100%">
            <div style="padding: 14px;">
              {{ card.subtitle }}
            </div>
          </a>
        </ElCard>
      </div>
    </div>
  </template>

  <script>
  import { ref } from 'vue'

  export default {

    setup() {
      const title = ref('请选择您的店铺')
      const cards = ref([
        {
          id: 1,
          title: 'Destination A',
          subtitle: 'Some description about destination A',
          image: 'https://picsum.photos/id/1018/400/200',
          link: 'https://www.example.com/destination-a'
        },
        {
          id: 2,
          title: 'Destination B',
          subtitle: 'Some description about destination B',
          image: 'https://picsum.photos/id/1015/400/200',
          link: 'https://www.example.com/destination-b'
        },
        {
          id: 3,
          title: 'Destination C',
          subtitle: 'Some description about destination C',
          image: 'https://picsum.photos/id/1016/400/200',
          link: 'https://www.example.com/destination-c'
        }
      ])

    //    // 发起 GET 请求，并将返回的数据保存在响应式数据中
    //    axios.get('https://example.com/cards')
    //     .then(response => {
    //       cards.value = response.data
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })

      return {
        title,
        cards
      }
    }
  }
  </script>

  <style scoped>
  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 24px;
  }

  h1 {
    text-align: center;
    margin-bottom: 24px;
  }

  .card-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
  }

  .el-card__header {
    font-size: 20px;
    font-weight: bold;
    padding: 14px;
  }

  .el-card__body {
    cursor: pointer;
    transition: box-shadow 0.2s ease-in-out;
  }

  .el-card__body:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;
    margin: 0 auto;
  }

  .el-card__body > a {
    color: inherit;
    text-decoration: none;
  }

  .el-card__body > a:hover {
    color: #409EFF;
  }
  </style>
