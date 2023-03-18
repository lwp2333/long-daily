<template>
  <nut-popup
    v-model:visible="show"
    :style="{
      height: '32vh'
    }"
    round
    lock-scroll
    destroyOnClose
    close-on-click-overlay
    position="bottom"
    @clickOverlay="hanldeClose"
  >
    <nut-noticebar background="#E6F0FF" color="#0066FF">
      <template #left-icon>
        <IconFont name="clock" color="#0066ff" />
      </template>
      <nut-countdown :time="maxTime" ref="CountDown" :autoStart="false" format="mm:ss:SS" />
    </nut-noticebar>
    <div class="recordCard">
      <svgIcon v-if="status === 'pending'" name="record" :size="64" @click="start" />
      <div v-else class="control">
        <svgIcon v-if="status === 'pause'" name="play" :size="64" @click="resume" />
        <svgIcon v-else name="record-pause" :size="64" @click="pause" />
        <svgIcon name="recording" :size="64" @longpress="stop" />
      </div>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import svgIcon from './svgIcon.vue'
import Taro from '@tarojs/taro'
import { computed } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro'

export interface RecorderItem {
  /** 录音总时长，单位：ms */
  duration: number
  /** 录音文件大小，单位：Byte */
  fileSize: number
  /** 录音文件的临时路径 */
  tempFilePath: string
}
type Status = 'pending' | 'recording' | 'pause'

interface Props {
  visible?: boolean
}

interface Event {
  (event: 'change', data: RecorderItem): void
  (event: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Event>()

const { visible } = toRefs(props)

const show = computed({
  get: () => visible?.value || false,
  set: (val: boolean) => {
    emit('update:visible', val)
  }
})
const hanldeClose = () => {
  show.value = false
}

const status = ref<Status>('pending')

const CountDown = ref()
const maxTime = ref(1000 * 60 * 5)

const RecordManager = Taro.getRecorderManager()

RecordManager.onStart(() => {
  CountDown.value.start() // 开始计时
  status.value = 'recording'
})

RecordManager.onPause(() => {
  CountDown.value.pause() // 暂停计时
  status.value = 'pause'
})

RecordManager.onResume(() => {
  CountDown.value.start() //继续计时
  status.value = 'recording'
})
RecordManager.onStop(res => {
  CountDown.value.pause() // 暂停计时
  status.value = 'pending'
  emit('change', res)
  hanldeClose()
})

// 开始录音
const start = () => {
  Taro.vibrateShort()
  RecordManager.start({ format: 'mp3' })
}
// 暂停录音
const pause = () => {
  Taro.vibrateShort()
  RecordManager.pause()
}
// 继续录音
const resume = () => {
  Taro.vibrateShort()
  RecordManager.resume()
}
// 停止录音
const stop = () => {
  Taro.vibrateLong()
  RecordManager.stop()
}
</script>

<style lang="scss">
.recordCard {
  width: 100%;
  height: calc(32vh - 72px);
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  .control {
    width: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nut-countdown {
    margin-top: 24px;
    font-size: 14px;
    color: #000;
  }
}
</style>
