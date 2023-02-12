<template>
  <img :width="sizeFormat" :height="sizeFormat" :src="src" @click="emit('click')" />
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import Taro, { ENV_TYPE } from '@tarojs/taro'
import useAsset from '@/hooks/useAsset'

interface Props {
  name: string
  size: number
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

const { name, size } = toRefs(props)
const src = useAsset(name)

const sizeFormat = computed(() => {
  if (Taro.getEnv() === ENV_TYPE.WEAPP) return `${Taro.pxTransform(size.value)}`
  return size.value
})
</script>
