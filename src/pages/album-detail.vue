<template>
  <div v-if="detail" class="albumDetailPage">
    <div class="header">
      <div class="desc">
        {{ detail.desc }}
      </div>
      <div class="num-info">
        共
        <span class="num">{{ detail.imagesCount }}</span>
        张照片
        <span class="num">{{ detail.videosCount }}</span>
        条视频
      </div>
    </div>
    <div class="content">
      <div class="date-item" v-for="item in detail.groupList">
        <div class="date">{{ item.date }}</div>
        <GridAssetCard :assets="item.list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import albumApi, { AlbumDetailEntity } from '@/api/albumApi'
import GridAssetCard from '@/components/gridAssetCard.vue'
import Taro, { useRouter } from '@tarojs/taro'
import { ref, watchEffect } from 'vue'

const Router = useRouter<{ id: string }>()
const id = Router.params.id

const detail = ref<AlbumDetailEntity>()

watchEffect(async () => {
  if (!id) return
  detail.value = await albumApi.getDetailById(+id)
  Taro.setNavigationBarTitle({
    title: detail.value.name
  })
})
</script>
<style lang="scss">
.albumDetailPage {
  padding: 4px;
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.header {
  padding: 16px 8vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  border-radius: 8px;
  color: #fff;
  .desc {
    text-align: center;
    font-size: 16px;
  }
  .num-info {
    display: flex;
    font-size: 14px;
    .num {
      padding: 0 4px;
      color: royalblue;
    }
  }
}
.content {
  margin-top: 12px;
  .date-item {
    padding: 8px;
    border-radius: 8px;
    background-color: #fff;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    .date {
      margin-left: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.64);
    }
  }
}
</style>
