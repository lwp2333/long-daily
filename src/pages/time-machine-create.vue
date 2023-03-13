<template>
  <div class="time-machine-create">
    <nut-textarea v-model="formModel.content" limit-show :max-length="120" placeholder="记下此刻的欢喜～" />
    <div class="type-box">
      <div class="type-item"><IconFont name="image" :size="12" color="#0066ff" />相册/拍摄</div>
      <div class="type-item"><IconFont name="play-start" :size="12" color="#0066ff" />视频</div>
      <div class="type-item" @click="openRecoder"><IconFont name="microphone" :size="12" color="#0066ff" />录音</div>
    </div>
    <div class="upload-box">
      <div class="add">
        <IconFont name="image" :size="20" />
      </div>
    </div>
    <nut-cell-group>
      <nut-cell title="上传到">
        <template v-slot:link>
          <div class="cell-right" @click="openSelectAlbum">
            <template v-if="albumInfo">
              <image class="mini-cover" :src="albumInfo.coverUrl" mode="aspectFill" />
              <span class="gray-text">{{ albumInfo.name }}</span>
            </template>
            <template v-else>
              <span class="gray-text">请选择</span>
            </template>
            <IconFont name="right" color="#ccc" />
          </div>
        </template>
      </nut-cell>
    </nut-cell-group>

    <RecordPlay v-if="recorderModel" :src="recorderModel.tempFilePath" />

    <div class="action">
      <nut-button block type="info">发布</nut-button>
    </div>
    <!-- 选择相册 -->
    <selectAlbum v-model="formModel.albumId" v-model:visible="selectAlbumShow" />
    <!-- 录音 -->
    <Recorder v-model:visible="recorderShow" @change="handleRecorderChange" />
  </div>
</template>

<script lang="ts" setup>
import RecordPlay from '@/components/recordPlay.vue'
import Recorder from '@/components/recorder.vue'
import selectAlbum from '@/components/selectAlbum.vue'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import { computed, reactive, ref } from 'vue'

interface FormModel {
  content: string
  fileList: { url: string; uid: string }[]
  albumId: number
}

interface RecorderItem {
  duration: number
  fileSize: number
  tempFilePath: string
}

const dataStore = useDataStore()
const albumList = computed(() => dataStore.albumList)

const formModel = reactive<FormModel>({
  content: '',
  fileList: [],
  albumId: 0
})

// 选择相册
const selectAlbumShow = ref(false)
const albumInfo = computed(() => {
  return albumList.value.find(it => it.id === formModel.albumId)
})
const openSelectAlbum = () => {
  selectAlbumShow.value = true
}

// 打开录音
const recorderShow = ref(false)

const recorderModel = ref<RecorderItem>()
const openRecoder = () => {
  recorderShow.value = true
}
const handleRecorderChange = (record: RecorderItem) => {
  recorderModel.value = record
}
</script>
<style lang="scss">
.time-machine-create {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.gray-text {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}

.nut-cell__title {
  justify-content: center;
}
.cell-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mini-cover {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-right: 4px;
}

.upload-box {
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  .add {
    width: calc((100vw - 36px) / 3);
    height: auto;
    aspect-ratio: 1;
    border-radius: 4px;
    background-color: #f6f7f8;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right: 2px;
    }
  }
}

.action {
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;
  background-color: #fff;
  padding: 16px 12vw;
}

.type-box {
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #f6f7f8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.type-item {
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-radius: 8px;
  background-color: #f6f7f8;
  color: rgba(0, 0, 0, 0.72);
  &:not(:last-child) {
    margin-right: 12px;
  }
}
</style>
