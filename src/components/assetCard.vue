<template>
  <div class="assetCard">
    <template v-if="type === 'images'">
      <image v-if="showType === 'single'" :src="imgList[0].url" mode="aspectFill" class="big_pic" />
      <nut-grid v-if="showType === 'grid'" :gutter="0" :column-num="3" :border="false">
        <nut-grid-item v-for="(item, index) in imgList" :key="index">
          <image :src="item.url" mode="aspectFill" class="mini_pic" />
        </nut-grid-item>
      </nut-grid>
      <nut-grid v-if="showType === 'double'" :gutter="0" :column-num="2" :border="false">
        <nut-grid-item v-for="(item, index) in imgList" :key="index">
          <image :src="item.url" mode="aspectFill" class="mini_pic" />
        </nut-grid-item>
      </nut-grid>
    </template>
    <template v-if="type === 'video'">
      <nut-grid :gutter="0" :column-num="3" :border="false">
        <nut-grid-item v-for="(item, index) in videoList" :key="index">
          <div class="video-item" @click="handlePreviewVideo(index)">
            <!-- 视频封面 -->
            <image :src="poster" mode="aspectFill" class="video_pic" />
            <div class="mask">
              <IconFont name="play-start" :size="28" color="#fff" />
            </div>
          </div>
        </nut-grid-item>
      </nut-grid>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { AssetEntity, AssetTypeEnum } from '@/api/assetApi'
import { toRefs } from 'vue'
import { computed } from 'vue'
import Taro from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'

interface Props {
  assets: AssetEntity[]
}
const props = defineProps<Props>()
const { assets } = toRefs(props)

const type = computed(() => {
  const findImage = assets.value.find(it => it.type === AssetTypeEnum.image)
  const findVideo = assets.value.find(it => it.type === AssetTypeEnum.video)
  return findImage ? 'images' : findVideo ? 'video' : 'unknown'
})

const imgList = computed(() => assets.value.filter(it => it.type === AssetTypeEnum.image))
const videoList = computed(() => assets.value.filter(it => it.type === AssetTypeEnum.video))

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

const poster =
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/weapp/oqy5602kT2ptTR4NmbbbM-xkP3ZA/20230315/31ae36d0.jpg?x-oss-process=style/images_convert'

// 预览本地缓存视频
const handlePreviewVideo = (index: number) => {
  const url = videoList.value[index].url
  const poster = ''
  Taro.previewMedia({
    sources: [{ type: 'video', url, poster }]
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
}

.half_pic {
  width: 100%;
  height: 120px;
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

.video-item {
  position: relative;
  width: 100%;
  line-height: 0;
  .video_pic {
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
</style>
