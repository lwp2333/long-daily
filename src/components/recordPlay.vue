<template>
  <div class="record-play">
    <div class="control" @click="handlePlayOrStop">
      <SvgIcon v-if="status === 'stop'" name="play" :size="24" />
      <SvgIcon v-else name="pause" :size="24" />
    </div>
    <nut-progress :percentage="percentage" :show-text="false" size="small" stroke-color="#0064fa" />
    <div class="duration">{{ second2m_s(duration - curDuration) }}</div>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { onUnmounted } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import SvgIcon from './svgIcon.vue'
import { second2m_s } from '@/utils/index'

// 不遵循静音
Taro.setInnerAudioOption({
  obeyMuteSwitch: false
})

type Status = 'stop' | 'playing'

interface Props {
  src: string
}
const props = defineProps<Props>()
const src = computed(() => props.src)
const status = ref<Status>('stop')
const duration = ref<number>(0)
const curDuration = ref<number>(0)

let AudioCtx: Taro.InnerAudioContext

const getDuration = () => {
  if (AudioCtx.duration) {
    duration.value = Number(AudioCtx.duration.toFixed(2))
  } else {
    setTimeout(() => {
      getDuration()
    }, 0)
  }
}

const percentage = computed(() => {
  if (!curDuration.value || !duration.value) {
    return 0
  }
  return (curDuration.value / duration.value) * 100
})

const init = (url: string) => {
  AudioCtx = Taro.createInnerAudioContext()
  AudioCtx.volume = 1
  AudioCtx.src = url
  AudioCtx.onPlay(() => {
    console.log('开始播放')
    status.value = 'playing'
  })
  AudioCtx.onCanplay(getDuration)

  AudioCtx.onStop(() => {
    console.log('暂停播放')
    status.value = 'stop'
  })
  AudioCtx.onEnded(() => {
    console.log('播放结束')
    status.value = 'stop'
    curDuration.value = 0
  })
  AudioCtx.onTimeUpdate(() => {
    curDuration.value = Number(AudioCtx.currentTime.toFixed(2))
  })
}

watchEffect(() => {
  init(src.value)
})

onUnmounted(() => {
  AudioCtx.destroy()
})

const handlePlayOrStop = () => {
  if (status.value === 'playing') {
    AudioCtx.stop()
  } else {
    AudioCtx.play()
  }
}
</script>

<style lang="scss">
.record-play {
  width: 100%;
  height: 32px;
  padding: 8px 12px;
  background: #f6f7f8;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .control {
    margin-right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dot {
    width: 8px;
    height: 8px;
    background: #0064fa;
    border-radius: 50%;
  }
  .duration {
    margin-left: 2px;
    font-size: 12px;
    font-size: #888;
  }
}

.nut-progress-outer {
  background-color: #ccc !important;
  height: 1.6px;
}
</style>
