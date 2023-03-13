<template>
  <div class="assetCard">
    <template v-if="type === 'images'">
      <image v-if="showType === 'single'" :src="imgList[0]" mode="aspectFill" class="big_pic" />
      <nut-grid v-if="showType === 'grid'" :gutter="0" :column-num="3" :border="false">
        <nut-grid-item v-for="(item, index) in imgList" :key="index">
          <image :src="item" mode="aspectFill" class="mini_pic" />
        </nut-grid-item>
      </nut-grid>
      <nut-grid v-if="showType === 'double'" :gutter="0" :column-num="2" :border="false">
        <nut-grid-item v-for="(item, index) in imgList" :key="index">
          <image :src="item" mode="aspectFill" class="mini_pic" />
        </nut-grid-item>
      </nut-grid>
    </template>
    <template v-if="type === 'video'"> </template>
    <template v-if="type === 'audio'">
      <RecordPlay src="https://cdn200.oss-cn-hangzhou.aliyuncs.com/media/demo.mp3" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { AssetEntity, AssetTypeEnum } from '@/api/assetApi'
import { toRefs } from 'vue'
import { computed } from 'vue'
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
  return findImage ? 'images' : findVideo ? 'video' : findAudio ? 'audio' : 'unknown'
})

const imgList = computed(() => assets.value.filter(it => it.type === AssetTypeEnum.image).map(it => it.url))

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
</style>
