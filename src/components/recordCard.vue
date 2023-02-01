<template>
  <div class="recordCard">
    <svgIcon name="record" :size="64" @click="" />
    <nut-countdown :time="maxTime" ref="CountDown" :autoStart="false" format="mm:ss:SS" />
    <div class="control">
      <nut-button v-if="!hasStart" size="mini" type="info" @click="start"> 开始 </nut-button>
      <nut-button v-else size="mini" type="info" @click="resume"> 继续 </nut-button>
      <nut-button size="mini" type="info" @click="pause">暂停</nut-button>
      <nut-button size="mini" type="info" @click="stop">结束</nut-button>
      <!-- <nut-button size="mini" type="info" @click="reset">重新录制</nut-button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import svgIcon from './svgIcon.vue'
import Taro from '@tarojs/taro'

const CountDown = ref()
const maxTime = ref(1000 * 60 * 5)

const hasStart = ref(false)
const AudioCtx = Taro.createInnerAudioContext()

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
  CountDown.value.pause() // 开始计时
  AudioCtx.src = res.tempFilePath
  AudioCtx.play() // 播放
  // AudioCtx.pause() // 暂停

  // AudioCtx.stop() // 停止
})

// 开始录音
const start = () => {
  RecordManager.start({
    format: 'wav',
  })
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
// 重置录音
const reset = () => {
  CountDown.value.reset()
  hasStart.value = false
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
