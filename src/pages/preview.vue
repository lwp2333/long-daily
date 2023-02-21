<template>
  <div class="preview-page">
    <nut-swiper :init-page="1" :loop="true" ref="swiper" @change="change">
      <nut-swiper-item v-for="(item, index) in imageList" :key="index">
        <image :src="item" mode="aspectFit" class="img" :show-menu-by-longpress="true" />
      </nut-swiper-item>
      <template v-slot:page>
        <div class="index-num">{{ current }}/4</div>
      </template>
    </nut-swiper>
    <view class="nut-swiper-btns">
      <span class="nut-swiper-btns__left" @click="handlePrev">
        <IconFont name="left" color="#fff" :size="16" />
      </span>
      <span class="nut-swiper-btns__left" @click="handleNext">
        <IconFont name="right" color="#fff" :size="16" />
      </span>
    </view>
    <!-- <div class="action"></div> -->
  </div>
</template>
<script lang="ts" setup>
import { usePreviewStore } from '@/store/previewStore'
import { IconFont } from '@nutui/icons-vue-taro'
import { computed, Ref, ref } from 'vue'
const previewStore = usePreviewStore()
const swiper = ref(null) as Ref
const imageList = computed(() => previewStore.imageList)
const current = ref(1)

const change = (index: number) => {
  current.value = index
}
const handlePrev = () => {
  swiper.value.prev()
}
const handleNext = () => {
  swiper.value.next()
}
</script>

<style lang="less">
.preview-page {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.72);
}
.img {
  width: 100%;
  height: 100vh;
}
.nut-swiper-btns {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 48%;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.action {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  width: 100vw;
  height: 54px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: calc(env(safe-area-inset-bottom));
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.index-num {
  position: fixed;
  left: 0;
  top: 40px;
  z-index: 9999;
  width: 100vw;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
}
</style>
