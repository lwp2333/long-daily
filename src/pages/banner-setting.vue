<template>
  <div class="banner-setting">
    <BannerCard v-if="flag" v-bind="state" />
    <div class="list">
      <div class="item" v-for="(item, index) in state.list" :key="index">
        <image :src="item" class="mini-pic" mode="aspectFill" />
        <div class="control-box">
          <nut-button size="small" type="info" :disabled="index === 0" @click="toUp(index)">
            <template #icon>
              <IconFont name="triangle-up" />
            </template>
            上移
          </nut-button>
          <nut-button size="small" type="info" :disabled="index === state.list.length - 1" @click="toDown(index)">
            <template #icon>
              <IconFont name="triangle-down" />
            </template>
            下移
          </nut-button>
        </div>
      </div>
    </div>
    <nut-empty v-if="state" description="快立即上传照片吧！" />
    <div class="fab-btn">
      <nut-button shape="round" type="info" @click="toUpload">
        <template #icon>
          <IconFont name="uploader" />
        </template>
      </nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BannerCard from '@/components/bannerCard.vue'
import useUpload from '@/hooks/useUpload'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro, { nextTick } from '@tarojs/taro'
import { reactive, ref } from 'vue'

const state = reactive({
  initPage: 0,
  list: [] as string[]
})
const flag = ref(true)

const refreshSwipe = () => {
  flag.value = false
  nextTick(() => {
    state.initPage = 0
    flag.value = true
  })
}

const toDown = (index: number) => {
  const temp = state.list[index]
  state.list[index] = state.list[index + 1]
  state.list[index + 1] = temp
  refreshSwipe()
}

const toUp = (index: number) => {
  const temp = state.list[index]
  state.list[index] = state.list[index - 1]
  state.list[index - 1] = temp
  refreshSwipe()
}

const { startUpload } = useUpload()
const toUpload = () => {
  Taro.chooseImage({
    count: 1,
    sourceType: ['album', 'camera'],
    async success(res) {
      const cropInfo = await Taro.cropImage({
        src: res.tempFilePaths[0],
        cropScale: '16:9' as any
      })
      const url = await startUpload(cropInfo.tempFilePath)
      state.list.push(url)
    }
  })
}
</script>

<style lang="scss">
.banner-setting {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  .list {
    margin-top: 8px;
    padding: 4px 8px;
    .item {
      padding: 8px;
      width: 100%;
      line-height: 0;
      background-color: #fff;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
      .mini-pic {
        width: 50%;
        aspect-ratio: 16/9;
        height: auto;
        border-radius: 8px;
      }
      .control-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-right: 24px;
      }
    }
  }
}

.fab-btn {
  position: fixed;
  right: 12px;
  bottom: calc(32px + env(safe-area-inset-bottom));
}
</style>
