<script setup lang="ts">
import Card from '@/components/Card.vue'
import { BLOODLINE_ORIGIN, RISK_LEVEL } from '@/constants/enum'
</script>

<template>
  <div class="title text-center text-lg text-emerald-400">Dragon Raja - Kotodama</div>
  <div class="card-list">
    <Card index="1" name="皇帝" :blood="BLOODLINE_ORIGIN.BLACK" :risk="RISK_LEVEL.NONE" />
  </div>
</template>

<style scoped></style>
