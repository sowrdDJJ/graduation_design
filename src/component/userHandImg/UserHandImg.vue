<template>
  <van-uploader
  v-model="fileList"
  multiple
  :max-count="1"/>
</template>

<script>
export default {
  name: 'UserHandImg',
  data () {
    return {
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true }
      ]
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
