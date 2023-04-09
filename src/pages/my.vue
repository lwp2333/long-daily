<template>
  <div class="myPage">
    <div class="header">
      <div class="top">
        <image :src="userInfo.avatar" mode="aspectFill" class="avatar" />
        <div class="right">
          <div class="nickName">{{ userInfo.nickName }}</div>
          <div class="signature">{{ userInfo.signature }}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="info">
          <span class="num"> {{ assetTypeCount.imageCount }}</span>
          张照片
        </div>
        <div class="info">
          <span class="num"> {{ assetTypeCount.videoCount }}</span>
          条视频
        </div>
        <div class="info">
          <span class="num"> {{ assetTypeCount.audioCount }} </span>
          条录音
        </div>
      </div>
    </div>

    <nut-cell-group>
      <nut-cell title="个人信息" is-link @click="handleNav('/pages/edit-userInfo')" />
      <nut-cell title="设置轮播图" is-link @click="handleNav('/pages/banner-setting')" />
      <nut-cell title="回收站" is-link @click="waiting" />
      <nut-cell title="关于小程序" is-link @click="handleNav('/pages/about')" />
    </nut-cell-group>
    <nut-cell title="空间切换" is-link @click="waiting" />
    <nut-cell title="退出" is-link @longpress="clearToken" />
  </div>
</template>

<script lang="ts" setup>
import useToast from '@/hooks/useToast'
import { useDataStore } from '@/store/dataStore'
import Taro from '@tarojs/taro'
import { computed } from 'vue'
// import { IconFont } from '@nutui/icons-vue-taro'

const dataStore = useDataStore()
const { showToast } = useToast()

const userInfo = computed(() => dataStore.userInfo)

const assetTypeCount = computed(() => dataStore.assetTypeCount)

const handleNav = (url: string) => {
  Taro.navigateTo({
    url
  })
}

const waiting = () => {
  showToast('wait for the next version')
}
const clearToken = () => {
  Taro.removeStorageSync('token')
  Taro.reLaunch({
    url: '/pages/splash'
  })
}
</script>
<style lang="scss">
.myPage {
  width: 100%;
  min-height: 100vh;
  // background-color: #f6f7f8;
  background-image: url('https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/user_bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  padding-top: calc(48px + env(safe-area-inset-top));
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  color: #000;
  padding-left: 8px;
  padding-right: 8px;
}

.header {
  padding: 16px 12px;
  background-color: #fff;
  border-radius: 12px;
  .top {
    padding: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .bottom {
    margin-top: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .info {
      display: flex;
      align-items: baseline;
      padding: 0px 12px;
      font-size: 12px;
      line-height: 14px;
      color: rgba(0, 0, 0, 0.6);
      text-align: center;
      &:not(:last-child) {
        border-right: rgba(0, 0, 0, 0.2) 1rpx solid;
      }
      .num {
        color: royalblue;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        margin-right: 4px;
      }
    }
  }
}

.right {
  margin-left: 8px;
  .nickName {
    font-size: 16px;
    font-weight: 500;
  }
  .signature {
    font-size: 14px;
    font-weight: 300;
    color: #222;
  }
}

.card {
  border-radius: 12px;
  background-color: #fff;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
