<script setup lang="ts">
import CardList from '@/components/CardList.vue'
import CardWrapper from '@/components/CardWrapper.vue'
import { kotodama } from '@/constants/constants'
</script>

<template>
  <div class="title text-center text-lg text-emerald-400">Dragon Raja - Kotodama</div>
  <div class="card-list">
    <CardList :cardListData="kotodama" />
  </div>
  <CardWrapper />
</template>

<style scoped></style>
