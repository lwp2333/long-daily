<template>
  <div class="empty-page">
    <RecordPlay :src="audioCache?.tempFilePath || url" />

    <nut-button type="info" @click="openRecoder">打开录音</nut-button>
    <!-- 录音 -->
    <Recorder v-model:visible="recorderShow" @change="handleRecorderChange" />
  </div>
</template>

<script lang="ts" setup>
import RecordPlay from '@/components/recordPlay.vue'
import Recorder from '@/components/recorder.vue'
import { RecorderItem } from '@/components/recorder.vue'
import useToast from '@/hooks/useToast'
import useUpload from '@/hooks/useUpload'
import { ref } from 'vue'

const url = 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/media/demo.mp3'

const { showLoading, hideLoading } = useToast()
const { startUpload } = useUpload()

const audioCache = ref<RecorderItem>()

// 录音
const recorderShow = ref(true)
const openRecoder = () => {
  recorderShow.value = true
}
const handleRecorderChange = async (record: RecorderItem) => {
  showLoading('上传中...')
  const url = await startUpload(record.tempFilePath)
  record.tempFilePath = url
  audioCache.value = record
  hideLoading()
}
</script>

<style lang="scss">
.empty-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
