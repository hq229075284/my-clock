<template>
  <div class="tomato-clock-menu">
    <div v-for="(config,idx) in configs" :key="idx">
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
