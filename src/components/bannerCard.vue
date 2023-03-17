<template>
  <nut-swiper :init-page="props.initPage" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
    <nut-swiper-item v-for="item in props.list" :key="item">
      <image :src="item" class="banner" mode="aspectFill" />
    </nut-swiper-item>
  </nut-swiper>
</template>

<script lang="ts" setup>
interface Props {
  initPage?: number
  list: string[]
}

const props = withDefaults(defineProps<Props>(), {
  initPage: 0
})
</script>

<style lang="scss">
.nut-swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.nut-swiper-pagination {
  .active {
    background-color: #0066ff !important;
  }
}
.banner {
  width: 100vw;
  aspect-ratio: 16/9;
  height: auto;
}
</style>
