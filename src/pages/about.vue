<template>
  <div class="about-page">
    <span>不知江月待何人</span>
    <span class="version">版本:v1.0.0</span>
  </div>
</template>

<script setup></script>

<style lang="scss">
.about-page {
  width: 100%;
  height: 100vh;
  background-image: url('https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/user_bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #222;
  .version {
    margin-top: 2px;
    font-size: 14px;
    color: #888;
  }
}
</style>
