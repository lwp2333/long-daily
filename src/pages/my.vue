<template>
  <div class="myPage">
    <div class="header">
      <div class="top">
        <nut-avatar size="48">
          <img :src="userInfo.avatar" />
        </nut-avatar>
        <div class="right">
          <div class="nickName">{{ userInfo.nickName }}</div>
          <div class="signature">{{ userInfo.signature }}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="info"><span class="num">220</span>照片</div>
          <div class="info"><span class="num">32</span>视频</div>
          <div class="info"><span class="num">10</span>录音</div>
        </div>
        <div class="backup">
          <!-- 回收站
          <IconFont name="rect-right" size="28rpx" color="#f3812e" /> -->
        </div>
      </div>
    </div>

    <nut-cell-group>
      <nut-cell title="个人信息" is-link @click="handleNav('/pages/edit-userInfo')"></nut-cell>
      <nut-cell title="设置轮播图" is-link></nut-cell>
      <nut-cell title="回收站" is-link></nut-cell>
      <nut-cell title="关于小程序" is-link></nut-cell>
    </nut-cell-group>
    <nut-cell title="空间切换" is-link></nut-cell>
  </div>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from '@/store/userStoree'
import Taro from '@tarojs/taro'
import { computed } from 'vue'
// import { IconFont } from '@nutui/icons-vue-taro'

const userStore = useUserInfoStore()

const userInfo = computed(() => userStore.$state)

const handleNav = (url: string) => {
  Taro.navigateTo({
    url
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
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .info {
        padding: 0px 12px;
        font-size: 12px;
        line-height: 14px;
        color: rgba(0, 0, 0, 0.6);
        &:not(:last-child) {
          border-right: rgba(0, 0, 0, 0.2) 1rpx solid;
        }
        .num {
          color: royalblue;
          font-size: 16px;
          font-weight: 400;
          line-height: 16px;
          margin-right: 4px;
        }
      }
    }
    .backup {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 14px;
      color: #f3812e;
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
</style>
