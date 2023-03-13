<template>
  <div class="time-machine-page">
    <nut-swiper :init-page="swiperState.page" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item v-for="item in swiperState.bannerList" :key="item">
        <image :src="item" mode="aspectFill" class="banner" />
      </nut-swiper-item>
    </nut-swiper>
    <div class="content">
      <div class="plog-card" v-for="item in [1, 2, 3, 4]" :key="item">
        <div class="top">
          <nut-avatar size="32">
            <img src="https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/chun.png" />
          </nut-avatar>
          <div class="infoBox">
            <div class="name">五边形的男人</div>
            <div class="time">2022-12-06 17:32</div>
          </div>
          <IconFont name="more-s" :size="18" @click="openAction" />
        </div>
        <div class="middle">
          该生学习态度端正,学习认真,已经过国家英语四级,有较强的思维本事和动手本事。吃苦耐劳朴实大方,
          思想上要求提高,进取向党组织靠拢,学习勤奋努力喜欢体育运...
        </div>
        <AssetCard :assets="[]" />
      </div>
    </div>
  </div>
  <nut-action-sheet
    v-model:visible="actionState.show"
    :menu-items="(actionState.menuItems as any)"
    cancel-txt="取消"
    @choose="selected"
  >
  </nut-action-sheet>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { onMounted, reactive, ref } from 'vue'
import AssetCard from '@/components/assetCard.vue'
// import useAsset from '@/hooks/useAsset'
interface SwiperState {
  page: number
  bannerList: string[]
}
const swiperState = reactive<SwiperState>({
  page: 1,
  bannerList: [] as string[]
})
onMounted(() => {
  setTimeout(() => {
    swiperState.bannerList = [
      'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner1.jpg',
      'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner2.jpg',
      'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner3.jpg'
    ]
  }, 320)
})

const actionState = reactive({
  show: false,
  menuItems: [
    {
      id: 'Edit',
      name: '编辑'
    },
    {
      id: 'Del',
      name: '删除',
      color: 'red'
    }
  ]
})

const openAction = () => {
  actionState.show = true
}

const selected = (item: unknown) => {
  console.log(item)
  Taro.vibrateLong()
}
</script>
<style lang="scss">
.time-machine-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.nut-swiper-item {
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.banner {
  width: calc(100% - 8px);
  height: 200px;
  border-radius: 12px;
}
.content {
  padding: 8px;
  width: 100%;
}

.plog-card {
  width: 100%;
  // min-height: 220px;
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .infoBox {
      flex: 1;
      margin-left: 8px;
      .name {
        font-size: 13px;
        font-weight: 500;
        color: #000;
      }
      .time {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .middle {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
}

.popclass {
  padding-bottom: 36px;
}
</style>
