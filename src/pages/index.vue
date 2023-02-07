<template>
  <div class="index-page">
    <div class="user-info">
      <image class="avatar" mode="aspectFill" src="https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/chun.png" />
      <div class="desc">
        <span class="label">入驻已经</span>
        <span class="days-num">
          132
          <span class="unit">天</span>
        </span>
      </div>
    </div>

    <div class="app-list">
      <div class="app-item" style="margin-bottom: -12px;">
        <svgIcon name="tupian" :size="36" />
        <div class="name">相册</div>
        <div class="desc">5个</div>
      </div>
      <div class="app-item" style="margin-bottom: 12px;">
        <svgIcon name="rili" :size="36" />
        <div class="name">纪念日</div>
        <div class="desc">8个</div>
      </div>
      <div class="app-item" style="margin-bottom: -12px;">
        <svgIcon name="list" :size="36" />
        <div class="name">人生清单</div>
        <div class="desc">12个</div>
      </div>
    </div>

    <div class="bottom-round"></div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss">
.index-page {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to top, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
  padding-top: calc(48px + env(safe-area-inset-top));
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.user-info {
  position: fixed;
  width: 48vw;
  height: 72px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(16px);
  border-top-right-radius: 36px;
  border-bottom-right-radius: 36px;

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #ee609c;
  }
  .desc {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .label {
      font-size: 14px;
      color: #222;
    }
    .days-num {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      .unit {
        display: inline-block;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}

.app-list {
  position: fixed;
  left: 0;
  bottom: 12px;
  width: 100vw;
  height: 100px;
  z-index: 999;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .app-item {
    width: 96px;
    height: 96px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right: 16px;
    }
    .icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    .name {
      font-size: 14px;
      font-weight: 400;
      color: #000;
    }
    .desc {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
    }
  }
}

.bottom-round {
  position: fixed;
  left: -50vw;
  bottom: -186vw;
  width: 200vw;
  height: auto;
  aspect-ratio: 1;
  background-color: #fff;
  border-radius: 72%;
}
</style>
