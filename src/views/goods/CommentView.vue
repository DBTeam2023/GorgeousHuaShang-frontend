<template>
  <u-comment :config="config" @submit="submit" @like="like">
  </u-comment>
</template>

<script setup>
import emoji from '../../emoji/emoji'
import { reactive } from 'vue'
import { UToast, createObjectURL } from 'undraw-ui'

const config = reactive({
  user: {
    id: 1,
    username: 'jack',
    avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2, 3]
  },
  emoji: emoji,
  comments: [],
  total: 10
})

let temp_id = 100
// 提交评论事件
const submit = ({ content, parentId, files, finish, reply }) => {
    let str = '提交评论:' + content + ';\t父id: ' + parentId + ';\t图片:' + files + ';\t被回复评论:'
  console.log(str, reply)

  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  let contentImg = files.map(e => createObjectURL(e)).join('||')

  const comment = {
    id: String((temp_id += 1)),
    parentId: parentId,
    uid: config.user.id,
    address: '来自江苏',
    content: content,
    likes: 0,
    createTime: '1分钟前',
    contentImg: contentImg,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 6,
      homeLink: `/${(temp_id += 1)}`
    },
    reply: null
  }
  setTimeout(() => {
    finish(comment)
    UToast({ message: '评论成功!', type: 'info' })
  }, 200)
}
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id, finish) => {
  console.log('点赞: ' + id)
  setTimeout(() => {
    finish()
  }, 200)
}

config.comments = [
  {
    id: '1',
    parentId: null,
    uid: '1',
    // address: '来自上海',
    content:
      '张靖凯好帅好帅呜呜呜[喝酒]',
    likes: 2,
    contentImg: 'https://gitee.com/undraw/undraw-ui/raw/master/public/docs/normal.webp',
    createTime: '1分钟前',
    user: {
      username: '落🤍尘',
      avatar: 'https://picsum.photos/id/1018/50/50',
      level: 6,
      homeLink: '/1'
    }
  }
]
</script>