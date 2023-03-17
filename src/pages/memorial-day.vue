<template>
  <div class="memorial-day-page">
    <template v-for="(item, index) in list">
      <div v-if="index === 0" class="day-item-big" @longpress="handleAction(item.id)">
        <span class="name">{{ item.name }}</span>
        <text class="big-num">
          <text class="unit">
            {{ item.type === MemorialDayTypeEnum.countdown ? '还有' : '累计' }}
          </text>
          {{ item.days }}
          <text class="unit">天</text>
        </text>
        <span class="desc" v-if="item.type === MemorialDayTypeEnum.countdown">
          目标日： {{ item.originDate }}（阳历）
        </span>
        <span class="desc" v-else>
          起始日：
          {{ item.date }}
          {{ item.dateType === DateTypeEnum.lunar ? '（农历）' : '阳历）' }}
        </span>
        <span class="tag">最近的纪念日</span>
        <svgIcon class="big-svg" :name="item.icon" :size="120" />
      </div>
      <div v-else class="day-item" @longpress="handleAction(item.id)">
        <svgIcon :name="item.icon" :size="32" />
        <span class="name">{{ item.name }}</span>
        <span class="num">{{ item.days }}天</span>
      </div>
    </template>
    <nut-empty v-if="!list.length" description="快开始添加纪念日吧！" />
  </div>

  <div class="fixed-action" @click="openCreate">
    <svgIcon name="add" :size="48" />
  </div>

  <createMemorialDay v-model:visible="show" :id="curId" />

  <nut-action-sheet
    v-model:visible="actionState.show"
    :menu-items="(actionState.menuItems as any)"
    cancel-txt="取消"
    @choose="selected"
  >
  </nut-action-sheet>
  <nut-dialog content="确定删除嘛？" v-model:visible="delShow" @cancel="hanldeDelCancel" @ok="hanldeDelConfirm" />
</template>

<script lang="ts" setup>
import memorialDayApi, { DateTypeEnum, MemorialDayTypeEnum } from '@/api/memorialDayApi'
import createMemorialDay from '@/components/createMemorialDay.vue'
import svgIcon from '@/components/svgIcon.vue'
import { useDataStore } from '@/store/dataStore'
import { sortMemorialDayList } from '@/utils'
import { menuItems } from '@nutui/nutui-taro/dist/types/__VUE/actionsheet/index.taro.vue'
import Taro from '@tarojs/taro'
import { computed, reactive, ref, watchEffect } from 'vue'

const dataStore = useDataStore()

const list = computed(() => sortMemorialDayList(dataStore.memorialDayList))

watchEffect(() => {
  dataStore.getMemorialDayData()
})

const show = ref(false)
const openCreate = () => {
  show.value = true
}

const curId = ref<number>()
const handleAction = (id: number) => {
  Taro.vibrateShort()
  curId.value = id
  actionState.show = true
}

const actionState = reactive({
  show: false,
  menuItems: [
    {
      name: '编辑'
    },
    {
      name: '删除',
      color: 'red'
    }
  ]
})

const selected = ({ name }: menuItems) => {
  if (name === '编辑') {
    show.value = true
  } else {
    delShow.value = true
  }
}
const delShow = ref(false)

const hanldeDelCancel = () => {
  curId.value = undefined
  delShow.value = false
}
const hanldeDelConfirm = () => {
  memorialDayApi.deleteById(curId.value!).then(() => {
    Taro.showToast({
      title: '删除成功'
    })
    dataStore.getMemorialDayData()
  })
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

.nut-empty__description {
  color: #fff;
}
</style>
