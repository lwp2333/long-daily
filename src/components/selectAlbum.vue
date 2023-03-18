<template>
  <nut-popup
    :visible="show"
    :style="{
      height: '52vh'
    }"
    round
    lock-scroll
    destroyOnClose
    close-on-click-overlay
    position="bottom"
    @clickOverlay="hanldeClose"
  >
    <div class="album-list">
      <nut-radio-group v-model="selectValue" @change="handleChange">
        <nut-radio v-for="item in albumList" :key="item.id" :label="item.id">
          <div class="album-item">
            <image :src="item.coverUrl" class="cover" mode="aspectFill" />
            <div class="right">
              <div class="name">{{ item.name }}</div>
              <div class="num-info">
                共<span class="num">{{ item.assetCount }}</span>
                张照片/视频
              </div>
            </div>
          </div>
        </nut-radio>
      </nut-radio-group>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { useDataStore } from '@/store/dataStore'
import { computed, toRefs, watchEffect } from 'vue'

interface Props {
  visible?: boolean
  modelValue?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['change', 'update:visible', 'update:modelValue'])

const { visible, modelValue } = toRefs(props)

const show = computed({
  get: () => visible?.value || false,
  set: (val: boolean) => {
    emit('update:visible', val)
  }
})

const selectValue = computed({
  get: () => modelValue?.value || 0,
  set: (val: number) => {
    emit('update:modelValue', val)
  }
})

const dataStore = useDataStore()

watchEffect(async () => {
  await dataStore.getAlbumList()
})

const albumList = computed(() => dataStore.albumList)

const hanldeClose = () => {
  show.value = false
}

const handleChange = () => {
  show.value = false
}
</script>

<style lang="scss" scoped>
.album-list {
  width: 100%;
  overflow: auto;
  padding: 16px;
  .album-item {
    padding: 4px 8px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    .cover {
      width: 48px;
      height: auto;
      aspect-ratio: 1;
      margin-right: 8px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      .name {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.54);
      }
      .num-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.48);
        .num {
          color: royalblue;
          padding: 0 2px;
        }
      }
    }
  }
}

.nut-radio-group {
  width: 100%;
}
.nut-radio__label {
  margin-left: 4px;
}
</style>
