<template>
  <div class="recordPlay">
    <nut-button type="primary" @click="handlePlayOrStop">
      <template #icon>
        <IconFont v-if="status === 'stop'" name="voice" />
        <IconFont v-else name="voice" class="nut-icon-am-breathe nut-icon-am-infinite" />
      </template>
      <span class="duration"> 32 '</span>
    </nut-button>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { onUnmounted } from 'vue'
import { computed, ref, watchEffect } from 'vue'

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

const init = (url: string) => {
  AudioCtx = Taro.createInnerAudioContext()
  AudioCtx.volume = 0.8
  AudioCtx.src = url
  AudioCtx.onPlay(() => {
    status.value = 'playing'
  })
  AudioCtx.onCanplay(() => {
    duration.value = AudioCtx.duration
  })
  AudioCtx.onStop(() => {
    status.value = 'stop'
  })
  AudioCtx.onTimeUpdate(() => {
    curDuration.value = AudioCtx.currentTime
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
    status.value = 'stop'
    // AudioCtx.stop()
  } else {
    status.value = 'playing'
    // AudioCtx.play()
  }
}
</script>

<style lang="scss">
.recordPlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.duration {
  margin-left: 32px;
}
</style>
