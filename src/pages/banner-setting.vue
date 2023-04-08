<template>
  <div class="banner-setting">
    <DragList
      v-if="list.length"
      :list-data="list"
      :item-height="120"
      :columns="2"
      :vibrate="true"
      @change="onSortChange"
    >
      <template #item="{ item, index }">
        <div class="item">
          <image :src="item.url" class="mini-pic" mode="aspectFill" />
          <div class="del-icon" @click="selectDel(index)">
            <IconFont name="circle-close" />
          </div>
        </div>
      </template>
      <template #drag>
        <div class="drag-mask"></div>
      </template>
    </DragList>
    <nut-empty v-else description="快立即上传照片吧！" />
    <div v-if="list.length < 6" class="fab-btn">
      <nut-button shape="round" type="info" @click="toUpload">
        <template #icon>
          <IconFont name="uploader" />
        </template>
      </nut-button>
    </div>
  </div>

  <nut-dialog title="确认删除嘛？" v-model:visible="dialogShow" @cancel="dialogShow = false" @ok="handleDel" /> 
</template>

<script lang="ts" setup>
import userApi from '@/api/userApi'
import DragList from '@/components/dragList.vue'
import useToast from '@/hooks/useToast'
import useUpload from '@/hooks/useUpload'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { computed, ref } from 'vue'

interface SortItem {
  url: string
  fixed: boolean
}

const { showLoading, hideLoading } = useToast()
const dataStore = useDataStore()
const list = computed<SortItem[]>(() => (dataStore.userInfo.bannerList || []).map(it => ({ url: it, fixed: false })))

//排序逻辑
const onSortChange = async (list: SortItem[]) => {
  showLoading('更新中...')
  await userApi.updateUserInfo({ bannerList: list.map(it => it.url) })
  await dataStore.getUserInfo()
  hideLoading('更新成功')
}

// 新增逻辑
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
      onSortChange([...list.value, { url, fixed: false }])
    }
  })
}

//删除逻辑
const dialogShow = ref(false)
const curDelIndex = ref(0)
const selectDel = (index: number) => {
  curDelIndex.value = index
  dialogShow.value = true
}
const handleDel = () => {
  list.value.splice(curDelIndex.value, 1)
  onSortChange([...list.value])
}
</script>

<style lang="scss">
.banner-setting {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  padding: 8px;
  .item {
    padding: 8px;
    position: relative;
    width: 100%;
    line-height: 0;
    border-radius: 12px;
    .mini-pic {
      width: 100%;
      aspect-ratio: 16/9;
      height: auto;
      border-radius: 8px;
    }

    .del-icon {
      position: absolute;
      top: -2px;
      right: 0px;
      z-index: 999;
    }
  }
}

.drag-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.fab-btn {
  position: fixed;
  right: 12px;
  bottom: calc(32px + env(safe-area-inset-bottom));
}

.fish-drag-scroll {
  height: 100vh;
}
</style>
