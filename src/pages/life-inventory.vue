<template>
  <div class="life-inventory-page">
    <div class="tag-box">
      <div class="small color-5">small</div>
      <div class="default color-4">default</div>

      <nut-badge color="transparent" top="22" right="8">
        <template #icon>
          <IconFont name="checklist" :size="24" color="#43e97b" />
        </template>
        <div class="middle color-3">middle</div>
      </nut-badge>

      <nut-badge color="transparent" top="22" right="8">
        <template #icon>
          <IconFont name="checklist" :size="24" color="#43e97b" />
        </template>
        <div class="large color-2">large</div>
      </nut-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFont } from '@nutui/icons-vue-taro'
</script>

<style lang="less">
.life-inventory-page {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding-top: 12px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));

  .tag-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0px 8px;
      color: #fff;
      line-height: 28px;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  .small {
    font-size: 12px;
  }
  .default {
    font-size: 16px;
  }
  .middle {
    font-size: 20px;
  }
  .large {
    font-size: 24px;
  }

  .color-1 {
    background-image: linear-gradient(to right, #b3ffab 0%, #12fff7 100%);
  }
  .color-2 {
    background-image: linear-gradient(-225deg, #b6cee8 0%, #f578dc 100%);
  }
  .color-3 {
    background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
  }
  .color-4 {
    background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
  }
  .color-5 {
    background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
  }
}
</style>
