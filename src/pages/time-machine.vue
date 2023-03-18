<template>
  <div class="time-machine-page">
    <BannerCard :initPge="initPage" :list="userInfo.bannerList || []" />
    <div class="content">
      <div class="plog-card" v-for="item in plogList" :key="item.id">
        <div class="top">
          <image :src="userInfo.avatar" mode="aspectFill" class="avatar" />
          <div class="infoBox">
            <div class="name">{{ userInfo.nickName }}</div>
            <div class="time">{{ item.lastUpdateTime }}</div>
          </div>
          <IconFont name="more-s" :size="18" @click="openAction(item)" />
        </div>
        <div class="middle">
          {{ item.content }}
        </div>
        <AssetCard :assets="item.assets" />
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
  <!-- 确定删除 -->
  <nut-dialog
    title="确定删除嘛？"
    v-model:visible="confirmShow"
    footer-direction="vertical"
    @cancel="confirmShow = false"
    @ok="delConfirm"
  />
</template>

<script lang="ts" setup>
import plogApi, { PlogEntity } from '@/api/plogApi'
import AssetCard from '@/components/assetCard.vue'
import BannerCard from '@/components/bannerCard.vue'
import useToast from '@/hooks/useToast'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { computed, reactive, ref, watchEffect } from 'vue'

const { showToast, showLoading, hideLoading } = useToast()
const dataStore = useDataStore()
const userInfo = computed(() => dataStore.userInfo || [])
const plogList = computed(() => dataStore.plogList)

const loading = ref(false)

usePullDownRefresh(async () => {
  await dataStore.refreshPlogList()
  Taro.stopPullDownRefresh()
  showToast('刷新成功')
})

useReachBottom(async () => {
  loading.value = true
  await dataStore.loadMorePlogList()
  loading.value = false
})

watchEffect(() => {
  dataStore.getUserInfo()
})

const initPage = ref(0)

const actionState = reactive({
  show: false,
  menuItems: [
    // {
    //   id: 'Edit',
    //   name: '编辑',
    //   disable: true
    // },
    {
      id: 'Del',
      name: '删除',
      color: 'red'
    }
  ]
})

const curId = ref(0)
const confirmShow = ref(false)
const openAction = (item: PlogEntity) => {
  curId.value = item.id
  actionState.show = true
}

const selected = (item: any) => {
  if (item.id === 'Del') {
    confirmShow.value = true
  }
}

const delConfirm = async () => {
  await plogApi.delectById(curId.value)
  // 通过store来删除本地数据
  await dataStore.delPlogById(curId.value)
  curId.value = 0
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
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
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
