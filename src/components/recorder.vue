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
    <div class="recordCard">
      <svgIcon name="record" :size="64" />
      <nut-countdown :time="maxTime" ref="CountDown" :autoStart="false" format="mm:ss:SS" />
      <div class="control">
        <nut-button v-if="!hasStart" size="mini" type="info" @click="start"> 开始 </nut-button>
        <nut-button v-else size="mini" type="info" @click="resume"> 继续 </nut-button>
        <nut-button size="mini" type="info" @click="pause">暂停</nut-button>
        <nut-button size="mini" type="info" @click="stop">结束</nut-button>
      </div>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import svgIcon from './svgIcon.vue'
import Taro from '@tarojs/taro'
import { computed } from 'vue'

interface Props {
  visible?: boolean
}

interface Event {
  (
    event: 'change',
    data: {
      /** 录音总时长，单位：ms */
      duration: number
      /** 录音文件大小，单位：Byte */
      fileSize: number
      /** 录音文件的临时路径 */
      tempFilePath: string
    }
  ): void
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
const CountDown = ref()
const maxTime = ref(1000 * 60 * 5)

const hasStart = ref(false)

const RecordManager = Taro.getRecorderManager()

RecordManager.onStart(() => {
  CountDown.value.start() // 开始计时
  hasStart.value = true
})

RecordManager.onPause(() => {
  CountDown.value.pause() // 开始计时
})

RecordManager.onResume(() => {
  CountDown.value.start() //继续计时
})
RecordManager.onStop(res => {
  CountDown.value.pause() // 暂停计时
  emit('change', res)
  hanldeClose()
})

// 开始录音
const start = () => {
  RecordManager.start({ format: 'mp3' })
}
// 暂停录音
const pause = () => {
  RecordManager.pause()
}
// 继续录音
const resume = () => {
  RecordManager.resume()
}
// 停止录音
const stop = () => {
  RecordManager.stop()
}

const hanldeClose = () => {
  show.value = false
}
</script>

<style lang="scss">
.recordCard {
  width: calc(100vw - 32px);
  margin: 0 auto;
  min-height: 160px;
  background-color: #fff;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.nut-countdown {
  font-size: 12px;
  color: #000;
}
.control {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
