<template>
  <nut-button type="info" @click="handlePlayOrStop">
    <template #icon>
      <IconFont v-if="status === 'stop'" name="voice" />
      <IconFont v-else name="voice" class="nut-icon-am-breathe nut-icon-am-infinite" />
    </template>
    <span class="duration"> {{ duration }}s</span>
  </nut-button>
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

const getDuration = () => {
  if (AudioCtx.duration) {
    duration.value = Number(AudioCtx.duration.toFixed(0))
  } else {
    setTimeout(() => {
      getDuration()
    }, 0)
  }
}

const init = (url: string) => {
  AudioCtx = Taro.createInnerAudioContext()
  AudioCtx.volume = 1
  AudioCtx.src = url
  AudioCtx.onPlay(() => {
    status.value = 'playing'
  })
  AudioCtx.onCanplay(getDuration)
  AudioCtx.onEnded(() => {
    console.log('放完了啊')
    status.value = 'stop'
  })
  AudioCtx.onTimeUpdate(() => {
    curDuration.value = Number(AudioCtx.currentTime.toFixed(0))
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

<style lang="scss" scoped>
.duration {
  width: 120px;
  text-align: end;
}
</style>
