<script setup lang="ts">
import type { ICardProps } from '@/constants/types'
defineProps<{cardData?:ICardProps; onClose?: ()=>void }>();

</script>

<template>
  <div
    class="card-warpper rounded-2xl bg-neutral-400 w-[50rem] h-[30rem] p-10 fixed top-2/4 left-2/4 
           translate-y-50 translate-x-50"
  >
    <div class="close" @click="onClose"></div>
    <div>{{ cardData?.index }}</div>
    <div>{{ cardData?.name }}</div>
    <div>{{ cardData?.saying }}</div>
    <div>{{ cardData?.introduction }}</div>
  </div>
</template>

<style lang="less" scoped>
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
