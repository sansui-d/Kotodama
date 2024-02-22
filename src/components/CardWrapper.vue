<script setup lang="ts">
import { ref } from 'vue'
import type { ICardProps } from '@/constants/types'
import Switch from '@/components/Switch.vue'
defineProps<{ cardData?: ICardProps; onClose?: () => void }>()
const tab = ref(true)
const onSwitchChange = () => {
  tab.value = !tab.value
}
</script>

<template>
  <div class="card-warpper rounded-2xl bg-neutral-400 w-[50rem]
     h-[30rem] p-10 fixed top-2/4 left-2/4 translate-y-50 translate-x-50">
    <div class="card-tab">
      <Switch :leftText="'info'" :rightText="'pic'" :value="tab" :onChange="onSwitchChange" />
    </div>
    <div class="close" @click="onClose"></div>
    <div>{{ cardData?.index }}</div>
    <div>{{ cardData?.name }}</div>
    <div>{{ cardData?.saying }}</div>
    <div v-if="tab">{{ cardData?.introduction }}</div>
    <img v-else src="../../public/favicon.png" />
  </div>
</template>

<style lang="less" scoped>
.card-tab {
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translate(-50%);
  display: flex;

  &-info {
    margin-right: 1rem;
  }
}

.close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
  cursor: pointer;

  &:hover::after {
    background-color: aqua;
  }

  &:hover::before {
    background-color: aqua;
  }
}

.close::before,
.close::after {
  content: '';
  width: 1px;
  height: 100%;
  background: #333;
  display: block;
  transform: rotate(45deg) translateX(0px);
  position: absolute;
  left: 50%;
  top: 0;
}

.close::after {
  transform: rotate(-45deg) translateX(0px);
}
</style>
