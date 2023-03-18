<template>
  <div class="assetCard">
    <template v-if="type === 'image'">
      <div v-if="showType === 'single'" class="image-item" @click="handlePreview(0, 'image')">
        <image :src="getThumbPic(imageList[0].url)" mode="heightFix" class="big_pic" />
      </div>
      <nut-grid v-else :gutter="0" :column-num="showType === 'grid' ? 3 : 2" :border="false">
        <nut-grid-item v-for="(item, index) in imageList" :key="index">
          <div class="image-item" @click="handlePreview(index, 'image')">
            <image :src="getThumbPic(item.url)" mode="aspectFill" class="mini_pic" />
          </div>
        </nut-grid-item>
      </nut-grid>
    </template>
    <template v-if="type === 'video'">
      <nut-grid :gutter="0" :column-num="3" :border="false">
        <nut-grid-item v-for="(item, index) in videoList" :key="index">
          <div class="video-item" @click="handlePreview(index, 'video')">
            <!-- 视频封面 -->
            <image :src="getThumbPic(item.poster)" mode="aspectFill" class="video_pic" />
            <div class="mask">
              <IconFont name="play-start" :size="32" color="rgba(255,255,255,.64)" />
            </div>
          </div>
        </nut-grid-item>
      </nut-grid>
    </template>
    <template v-if="type === 'audio'">
      <div v-for="item in audioList" class="audio-item" :key="item.id">
        <RecordPlay :src="item.url" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { AssetEntity, AssetTypeEnum } from '@/api/assetApi'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { computed, toRefs } from 'vue'
import RecordPlay from './recordPlay.vue'

interface Props {
  assets: AssetEntity[]
}
const props = defineProps<Props>()
const { assets } = toRefs(props)

const type = computed(() => {
  const findImage = assets.value.find(it => it.type === AssetTypeEnum.image)
  const findVideo = assets.value.find(it => it.type === AssetTypeEnum.video)
  const findAudio = assets.value.find(it => it.type === AssetTypeEnum.audio)

  return findImage ? 'image' : findVideo ? 'video' : findAudio ? 'audio' : 'unknown'
})

const imageList = computed(() => assets.value.filter(it => it.type === AssetTypeEnum.image))
const videoList = computed(() => assets.value.filter(it => it.type === AssetTypeEnum.video))
const audioList = computed(() => assets.value.filter(it => it.type === AssetTypeEnum.audio))

const showType = computed(() => {
  switch (assets.value.length) {
    case 1:
      return 'single'
    case 4:
      return 'double'
    default:
      return 'grid'
  }
})

// 获取缩略图
const getThumbPic = (url: string) => {
  // return url
  return `${url}?x-oss-process=style/images_convert`
}

const handlePreview = (current: number, type: 'image' | 'video') => {
  Taro.previewMedia({
    current,
    sources: [...imageList.value, ...videoList.value].map(it => {
      const { url, poster } = it
      return {
        url,
        poster,
        type
      }
    })
  })
}
</script>

<style lang="scss">
.assetCard {
  width: 100%;
}

.big_pic {
  width: 100%;
  height: 240px;
  border-radius: 2px;
}

.mini_pic {
  border-radius: 2px;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}

.image-item {
  width: 100%;
  line-height: 0;
}

.video-item {
  position: relative;
  width: 100%;
  line-height: 0;
  .video_pic {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 2px;
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
  padding: 2px;
}

.nut-grid-item__text {
  display: none;
}
</style>
