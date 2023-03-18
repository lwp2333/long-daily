<template>
  <nut-grid v-if="assets.length" :gutter="0" :column-num="3" :border="false">
    <nut-grid-item v-for="(item, index) in assets" :key="index">
      <div class="image-item" @click="handlePreview(index)">
        <image v-if="item.type === AssetTypeEnum.image" :src="getThumbPic(item.url)" mode="aspectFill" class="image" />
      </div>
      <div v-if="item.type === AssetTypeEnum.video" class="video-item" @click="handlePreview(index)">
        <!-- 视频封面 -->
        <image :src="item.poster" mode="aspectFill" class="video-poster" />
        <div class="mask">
          <IconFont name="play-start" :size="32" color="rgba(255,255,255,.64)" />
        </div>
      </div>
    </nut-grid-item>
  </nut-grid>
</template>

<script lang="ts" setup>
import { AssetEntity, AssetTypeEnum } from '@/api/assetApi'
import { toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'

interface Props {
  assets: AssetEntity[]
}
const props = defineProps<Props>()
const { assets } = toRefs(props)

// 获取缩略图
const getThumbPic = (url: string) => {
  // return url
  return `${url}?x-oss-process=style/images_convert`
}

// 预览
const handlePreview = (current: number) => {
  const sources = assets.value.map(it => {
    const { type, url, poster } = it
    return {
      type: type as 'video' | 'image',
      url,
      poster
    }
  })
  Taro.previewMedia({
    current,
    sources
  })
}
</script>

<style lang="scss">
.gridAssetCard {
  width: 100%;
}

.image-item {
  position: relative;
  width: 100%;
  line-height: 0;
  .image {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
}

.video-item {
  position: relative;
  width: 100%;
  line-height: 0;
  .video-poster {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.28);
  }
}

.nut-grid-item__content {
  padding: 1px;
}

.nut-grid-item__text {
  display: none;
}
</style>
