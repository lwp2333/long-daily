<template>
  <div class="life-inventory-page">
    <div v-if="lifeInventoryList.length" class="tag-box">
      <div
        v-for="item in lifeInventoryList"
        :key="item.id"
        :class="getClassNames(item)"
        @longpress="handleChangeStatus(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <nut-empty v-else description="快开始添加人生清单吧！" />
    <div class="action">
      <nut-button size="small" type="info" @click="createShow = true">
        <template #icon>
          <IconFont name="add" />
        </template>
        新增
      </nut-button>
    </div>
    <CreateLifeInventory v-model:visible="createShow" />
  </div>
</template>

<script setup lang="ts">
import lifeInventoryApi, { LifeInventoryStatusEnum, LifeInventoryEntity } from '@/api/lifeInventoryApi'
import CreateLifeInventory from '@/components/createLifeInventory.vue'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import { computed, ref } from 'vue'

const dataStore = useDataStore()

const lifeInventoryList = computed(() => dataStore.lifeInventoryList)

const getClassNames = (item: LifeInventoryEntity) => {
  return [item.status === LifeInventoryStatusEnum.finish ? item.color : 'color-0', item.fontSize]
}

const createShow = ref(false)

const handleChangeStatus = (item: LifeInventoryEntity) => {
  const nextStatus =
    item.status === LifeInventoryStatusEnum.finish ? LifeInventoryStatusEnum.unFinish : LifeInventoryStatusEnum.finish
  lifeInventoryApi
    .updateById(item.id, {
      status: nextStatus
    })
    .then(() => {
      dataStore.getLifeInventory()
    })
}
</script>

<style lang="scss">
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
      padding: 0px 4px;
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

  .selected {
    border: 1px solid #495aff;
    border-radius: 12px;
  }
  .color-0 {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%),
      radial-gradient(at top center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%) #989898;
    background-blend-mode: multiply, multiply;
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

.action {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  left: 0;
  bottom: 0;
  background-color: #fff;
  padding: 16px 8vw;
  box-shadow: 0 6px 15px rgb(0 0 0 / 20%);
}
</style>
