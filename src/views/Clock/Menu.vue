<template>
  <div class="tomato-clock-menu">
    <div v-for="(config,idx) in configs" :key="idx" class="menu-item">
      <slot v-bind="config"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRef } from 'vue'

const props = withDefaults(
  defineProps<{configs:any[]}>(),
  { configs: () => [] },
)

const configs = toRef(props, 'configs')
</script>

<style scoped lang="less">
.menu-item{
  font-size: 20px;
}
</style>
