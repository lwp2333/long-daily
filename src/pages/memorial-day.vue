<template>
  <div class="memorial-day-page">
    <div class="day-item-big">
      <span class="name">她的生日</span>
      <text class="big-num">
        <text class="unit">还有</text>
        250
        <text class="unit">天</text>
      </text>
      <span class="desc"> 目标日：2023年10月29日 </span>
      <span class="tag">最近的纪念日</span>
      <svgIcon class="big-svg" name="dangao" :size="120" />
    </div>
    <div class="day-item">
      <svgIcon name="shengri" :size="32" />
      <span class="name">我的生日还有</span>
      <span class="num">310天</span>
    </div>
    <div class="day-item">
      <svgIcon name="love" :size="32" />
      <span class="name">xxxxxx</span>
      <span class="num">0天</span>
    </div>
  </div>

  <div class="fixed-action" @click="openCreate">
    <svgIcon name="add" :size="48" />
  </div>

  <createMemorialDay v-model:visible="show" />
</template>

<script lang="ts" setup>
import createMemorialDay from '@/components/createMemorialDay.vue'
import svgIcon from '@/components/svgIcon.vue'
import { ref } from 'vue'

const show = ref(false)
const openCreate = () => {
  show.value = true
}
</script>
<style lang="scss">
.memorial-day-page {
  width: 100%;
  min-height: 100vh;
  background-color: #ff445a;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 32px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.day-item {
  padding: 16px;
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  .name {
    margin-left: 8px;
    flex: 1;
    font-size: 16px;
    color: #222;
  }
  .num {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.32);
  }
}

.day-item-big {
  position: relative;
  width: 100%;
  height: 142px;
  padding: 20px;
  border-radius: 14px;
  background-color: #fff;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .tag {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    padding: 4px 8px;
    border-top-right-radius: 14px;
    border-bottom-left-radius: 14px;
    font-size: 14px;
    color: #222;
    background-color: rgb(255, 229, 42);
  }
  .big-num {
    font-size: 32px;
    font-weight: 500;
    color: #ff445a;
    .unit {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.42);
    }
  }
  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.42);
  }

  .big-svg {
    position: absolute;
    bottom: -8px;
    right: -20px;
  }
}

.fixed-action {
  position: fixed;
  right: 24px;
  bottom: 48px;
  background-color: #fff;
  line-height: 0;
  border-radius: 12px;
}
</style>
