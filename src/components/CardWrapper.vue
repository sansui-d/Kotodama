<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { ICardProps } from '@/constants/types'
import { useCardWrapperStore } from '@/stores/cardWrapperDataStore'
defineProps<ICardProps>()
const { cardData } = storeToRefs(useCardWrapperStore())
</script>

<template>
  <div class="card-warpper w-[50rem] h-[50rem] p-10 fixed top-2/4 left-2/4 translate-y-50 translate-x-50">
    <div></div>
    <div>{{ cardData.index }}</div>
    <div>{{ cardData.name }}</div>
    <div>{{ cardData.index }}</div>
    <div>{{ cardData.index }}</div>
    <div>{{ cardData.index }}</div>
  </div>
</template>

<style scoped></style>
