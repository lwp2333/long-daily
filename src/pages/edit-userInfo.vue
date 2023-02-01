<template>
  <div class="editUserInfoPage">
    <div class="top">
      <button class="avatar_btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <img class="avatar" :src="userInfo.avatar" />
      </button>
    </div>
    <nut-cell-group>
      <nut-cell title="昵称" :desc="userInfo.nickName" is-link />
      <nut-cell title="性别" :desc="userInfo.gender" is-link />
      <nut-cell title="生日" :desc="userInfo.birthday" is-link />
      <nut-cell title="简介" :desc="userInfo.signature" is-link />
    </nut-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const userInfo = reactive({
  avatar:
    'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  nickName: '五边形的男人',
  gender: '男',
  birthday: '1996-11-16',
  signature: '集中一点 登峰造极！'
})
const onChooseAvatar = (e: any) => {
  userInfo.avatar = e.detail.avatarUrl
}
</script>

<style lang="scss">
.editUserInfoPage {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  // background-image: url('https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/user_bg.png');
  // background-size: contain;
  // background-repeat: no-repeat;
  padding-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));

  .action {
    padding: 12px 32%;
    margin-top: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.top {
  margin-top: 24px;
  margin-bottom: 24px;
  .avatar_btn {
    width: 64px;
    height: 64px;
    padding: 0;
    background-color: transparent;
    line-height: 0;
    border-radius: 50%;
    &::after {
      border: none;
    }
  }

  .avatar {
    width: 64px;
    height: 64px;
    object-fit: contain;
    border-radius: 50%;
  }
}

.nut-cell__value {
  color: rgba(0, 0, 0, 0.4);
}

.content {
  width: 100%;
  min-height: 36vh;
}
</style>
