<template>
  <div class="albumPage">
    <nut-grid :border="false">
      <nut-grid-item>
        <div class="card">
          <div class="cover add_box" @click="navCreate">
            <IconFont name="image" :size="32" color="#2c68ff" />
            新建相册
          </div>
        </div>
      </nut-grid-item>
      <nut-grid-item v-for="item in albumList" :key="item.id">
        <div class="card" @click="navDetail">
          <image :src="item.coverUrl" mode="aspectFill" class="cover" />
          <div class="name">{{ item.name }}</div>
          <div class="info">{{ item.count }}张</div>
        </div>
      </nut-grid-item>
    </nut-grid>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

interface AlbumItem {
  id: number
  name: string
  coverUrl: string
  count: number
}

const albumList: AlbumItem[] = [
  {
    id: 1,
    name: '说说和日志相册',
    coverUrl: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky4.jpg?x-oss-process=style/images_convert',
    count: 350
  },
  {
    id: 2,
    name: '《人间凑数的日子》',
    coverUrl: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky5.jpg?x-oss-process=style/images_convert',
    count: 18
  },
  {
    id: 3,
    name: '刚刚好',
    coverUrl: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky8.jpg?x-oss-process=style/images_convert',
    count: 299
  }
]

const navCreate = () => {
  Taro.navigateTo({
    url: '/pages/album-create'
  })
}

const navDetail = () => {
  Taro.navigateTo({
    url: '/pages/album-detail'
  })
}
</script>
<style lang="scss">
.albumPage {
  padding: 4px 8px;
  width: 100%;
  min-height: 100vh;
  font-size: 12px;
  color: #fff;
}

.card {
  .cover {
    width: calc((100vw - 48px) / 2);
    height: auto;
    aspect-ratio: 1;
    border-radius: 4px;
  }
  .add_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f7f8fa;
    color: #2c68ff;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 2px;
  }
  .name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  .info {
    font-size: 12px;
    font-weight: 400;
    color: #888;
  }
}

.nut-grid-item__content {
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.content {
  padding: 32px 4px;
  width: 100%;
  height: 100%;
  background-color: #f6f7f8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.action {
  padding: 12px 32vw;
}
</style>
