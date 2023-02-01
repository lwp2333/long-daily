<template>
  <div class="albumDetailPage">
    <div class="info">当前相册共320张照片 24条视频</div>

    <div class="content">
      <div class="date-item">
        <div class="date">2022/11/29</div>

        <nut-grid :column-num="3" :border="false">
          <nut-grid-item v-for="(item, index) in imgList" :key="index" @click="openPreview(imgList, index)">
            <img class="mini_pic" :src="item" />
          </nut-grid-item>
        </nut-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { ref } from 'vue'

Taro.setNavigationBarTitle({
  title: '说说和日志相册'
})
const imgList = ref([
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky1.webp?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky2.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky3.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky4.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky5.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky8.jpg?x-oss-process=style/images_convert'
])
const openPreview = (images: string[], index: number) => {
  const urls = images.map(it => it.replace('?x-oss-process=style/images_convert', ''))
  Taro.previewImage({
    current: urls[index],
    urls
  })
}
</script>
<style lang="scss">
.albumDetailPage {
  padding: 4px 8px;
  width: 100%;
  min-height: 100vh;
}

.mini_pic {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 2px;
}
.nut-grid-item__content {
  padding: 2px;
}
</style>
