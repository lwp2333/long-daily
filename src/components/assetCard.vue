<template>
  <div class="assetCard">
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

type ShowType = 'single' | 'double' | 'grid'

const imgList = ref([
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky1.webp?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky2.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky3.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky4.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky5.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky8.jpg?x-oss-process=style/images_convert'
])

const showType = computed<ShowType>(() => {
  switch (imgList.value.length) {
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
