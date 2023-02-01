<template>
  <img :width="sizeFormat" :height="sizeFormat" :src="src" @click="emit('click')" />
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import useSvg from '@/hooks/useSvg'

interface Props {
  name: string
  size: number
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

const { name, size } = toRefs(props)
const src = useSvg(name)

const sizeFormat = computed(() => `${Taro.pxTransform(size.value)}`)
</script>
