<template>
  <div class="time-machine-page">
    <BannerCard v-bind="swiperState" />
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
  <div class="fab-btn">
    <nut-button shape="round" type="info" @click="navCreate">
      <template #icon>
        <IconFont name="uploader" />
      </template>
    </nut-button>
  </div>
  <nut-action-sheet
    v-model:visible="actionState.show"
    :menu-items="(actionState.menuItems as any)"
    cancel-txt="取消"
    @choose="selected"
  />
</template>

<script lang="ts" setup>
import AssetCard from '@/components/assetCard.vue'
import BannerCard from '@/components/bannerCard.vue'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { reactive } from 'vue'

const swiperState = reactive({
  initPage: 1,
  list: [
    'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner1.jpg',
    'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner2.jpg',
    'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner3.jpg'
  ]
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

const navCreate = () => {
  Taro.navigateTo({
    url: '/pages/time-machine-create'
  })
}
</script>
<style lang="scss">
.time-machine-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
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

.fab-btn {
  position: fixed;
  right: 12px;
  bottom: calc(32px + env(safe-area-inset-bottom));
}
</style>
