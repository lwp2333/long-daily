<template>
  <div class="editUserInfoPage">
    <div class="top">
      <button class="avatar_btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <img class="avatar" :src="userInfo.avatar" />
        <svgIcon name="edit" :size="16" class="edit-icon" />
      </button>
    </div>
    <nut-cell-group>
      <nut-cell title="昵称" :desc="userInfo.nickName" is-link @click="openEidtNickName" />
      <nut-cell title="性别" @click="openEditGender">
        <template #link>
          <div class="custom-right">
            <svgIcon :name="userInfo.gender" :size="16" />
            ({{ mapGender[userInfo.gender] }})
            <IconFont name="right" :size="16" color="#979797" />
          </div>
        </template>
      </nut-cell>
      <nut-cell title="生日" :desc="userInfo.birthday" is-link @click="openSelectDate" />
      <nut-cell title="简介" :desc="userInfo.signature" is-link @click="openEditSignature" />
    </nut-cell-group>
  </div>
  <!-- 昵称修改 -->
  <nut-dialog
    title="昵称修改"
    v-model:visible="nickNameEditShow"
    @cancel="cancelEditNickName"
    @ok="confirmEditNickName"
  >
    <template #default>
      <nut-textarea v-model="nickName" :max-length="8" limit-show placeholder="请输入昵称" />
    </template>
  </nut-dialog>
  <nut-dialog title="性别修改" v-model:visible="genderEditShow" @cancel="cancelEditGender" @ok="confirmEditGender">
    <template #default>
      <nut-radio-group v-model="gender" direction="horizontal">
        <nut-radio
          v-for="item in [GenderEnum.male, GenderEnum.female, GenderEnum.unknown]"
          shape="button"
          :label="item"
        >
          <svgIcon :name="item" :size="20" />({{ mapGender[item] }})
        </nut-radio>
      </nut-radio-group>
    </template>
  </nut-dialog>

  <!-- 生日修改 -->
  <nut-popup position="bottom" v-model:visible="showDatePopup">
    <nut-date-picker
      v-if="showDatePopup"
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      :is-show-chinese="false"
      @confirm="popupConfirm"
      @cancel="showDatePopup = false"
    />
  </nut-popup>
  <!-- 简介修改 -->
  <nut-dialog
    title="简介修改"
    v-model:visible="signatureEditShow"
    @cancel="cancelEditSignature"
    @ok="confirmEditSignature"
  >
    <template #default>
      <nut-textarea v-model="signature" :max-length="32" limit-show placeholder="请输入简介" />
    </template>
  </nut-dialog>
</template>

<script lang="ts" setup>
import userApi, { GenderEnum } from '@/api/userApi'
import useUpload from '@/hooks/useUpload'
import { mapGender, useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { computed, nextTick, ref, watchEffect } from 'vue'

const dataStore = useDataStore()
watchEffect(() => {
  dataStore.getUserInfo()
})

const userInfo = computed(() => dataStore.userInfo)

const { startUpload } = useUpload()

const onChooseAvatar = async (e: any) => {
  const avatar = await startUpload(e.detail.avatarUrl)
  userApi.updateUserInfo({ avatar }).then(() => {
    refresh()
  })
}
// const { multiProgress, startUploadMutile } = useUpload()
// const onChooseMutileFile = async () => {
//   const fileList = await Taro.chooseMedia({
//     sourceType: ['album'],
//     mediaType: ['image', 'video'],
//     count: 9,
//     maxDuration: 30
//   })

//   const tmp = fileList.tempFiles.map(it => it.tempFilePath)
//   const res = await startUploadMutile(tmp)
// }

// watch(multiProgress, val => {
//   console.log('val:', val)
// })

// 刷新数据
const refresh = () => {
  dataStore.getUserInfo()
}

// 更改姓名
const nickName = ref('')
const nickNameEditShow = ref(false)
const openEidtNickName = () => {
  nickName.value = userInfo.value.nickName
  nextTick(() => {
    nickNameEditShow.value = true
  })
}
const cancelEditNickName = () => {
  nickNameEditShow.value = false
}
const confirmEditNickName = () => {
  userApi.updateUserInfo({ nickName: nickName.value }).then(() => {
    Taro.showToast({
      title: '操作成功'
    })
    dataStore.getUserInfo()
  })
}
// 更改生日
const showDatePopup = ref(false)
const minDate = new Date(1900, 1, 1)
const maxDate = new Date(2100, 12, 30)
const currentDate = ref(new Date())
const openSelectDate = () => {
  currentDate.value = dayjs(userInfo.value.birthday).toDate()
  nextTick(() => {
    showDatePopup.value = true
  })
}
const popupConfirm = ({ selectedOptions }) => {
  const birthday = selectedOptions.map((val: any) => val.text).join('-')
  userApi
    .updateUserInfo({
      birthday
    })
    .then(() => {
      Taro.showToast({
        title: '操作成功'
      })
      dataStore.getUserInfo()
    })
  showDatePopup.value = false
}
const signature = ref()
const signatureEditShow = ref(false)
const openEditSignature = () => {
  signature.value = userInfo.value.signature
  signatureEditShow.value = true
}
const cancelEditSignature = () => {
  signatureEditShow.value = false
}
const confirmEditSignature = () => {
  userApi.updateUserInfo({ signature: signature.value }).then(() => {
    Taro.showToast({
      title: '操作成功'
    })
    dataStore.getUserInfo()
  })
}

const gender = ref(GenderEnum.unknown)
const genderEditShow = ref(false)

const openEditGender = () => {
  gender.value = userInfo.value.gender
  genderEditShow.value = true
}
const cancelEditGender = () => {
  genderEditShow.value = false
}
const confirmEditGender = () => {
  userApi.updateUserInfo({ gender: gender.value }).then(() => {
    Taro.showToast({
      title: '操作成功'
    })
    dataStore.getUserInfo()
  })
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
    position: relative;
    padding: 0;
    background-color: transparent;
    line-height: 0;
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
  .edit-icon {
    position: absolute;
    right: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
  }
}

.custom-right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nut-cell__value {
  color: rgba(0, 0, 0, 0.4);
}

.content {
  width: 100%;
  min-height: 36vh;
}

.nut-input {
  padding: 0;
}
.nut-textarea {
  padding: 0;
  textarea {
    height: 64px;
  }
}
</style>
