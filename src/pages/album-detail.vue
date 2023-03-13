<template>
  <div class="albumDetailPage">
    <div class="header">
      <div class="desc">
        {{ detail.desc }}
      </div>
      <div class="num-info">
        当前相册共
        <span class="num">{{ detail.imagesCount }}</span>
        张照片
        <span class="num">{{ detail.videosCount }}</span>
        条视频
      </div>
    </div>
    <div class="content">
      <div class="date-item" v-for="item in detail.groupList">
        <div class="date">{{ item.date }}</div>
        <nut-grid :column-num="4" :border="false">
          <nut-grid-item v-for="(asset, index) in item.list" :key="index" @click="openPreview(item.list, index)">
            <img class="mini_pic" :src="asset.url" />
          </nut-grid-item>
        </nut-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import albumApi from '@/api/albumApi'
import { AssetEntity } from '@/api/assetApi'
import Taro, { useRouter } from '@tarojs/taro'
import { reactive, watchEffect } from 'vue'

interface ListItem {
  date: string
  list: AssetEntity[]
}

interface DataModel {
  name: string
  desc: string
  imagesCount: number
  videosCount: number
  groupList: ListItem[]
}

const Router = useRouter<{ id: string }>()
const id = Router.params.id

const detail = reactive<DataModel>({
  name: '',
  desc: '',
  imagesCount: 0,
  videosCount: 0,
  groupList: []
})

watchEffect(async () => {
  if (!id) return
  const res = await albumApi.getDetailById(+id)
  detail.name = res.name
  detail.desc = res.desc
  Taro.setNavigationBarTitle({
    title: res.name
  })
})

const openPreview = (images: AssetEntity[], index: number) => {
  const urls = images.map(it => it.url.replace('?x-oss-process=style/images_convert', ''))
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

.header {
  padding: 16px 8vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  border-radius: 12px;
  color: #fff;
  .desc {
    text-align: center;
    font-size: 14px;
  }
  .num-info {
    display: flex;
    font-size: 12px;
    .num {
      padding: 0 4px;
      color: royalblue;
    }
  }
}

.date-item {
  .date {
    margin-left: 8px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.64);
  }
}

.mini_pic {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
.nut-grid-item__content {
  padding: 1px;
}

.nut-grid-item__text {
  display: none;
}
</style>
