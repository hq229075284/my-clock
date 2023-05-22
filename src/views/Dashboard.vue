<template>
  <div class="dashboard">
    <div class="grid">
      <div
        class="grid-item"
        v-for="moduleItem in moduleList"
        :key="moduleItem.key"
        @click="toPage(moduleItem)"
      >
        <div>{{ moduleItem.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const router = useRouter()

const moduleList = reactive(new Array(12).fill({
  key: 'clock',
  name: '番茄钟',
}))

function toPage(item:typeof moduleList[0]) {
  router.push({ path: `/${item.key}` })
}
</script>

<style lang="less" scoped>
.dashboard{
  .grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap:10px;
    // @media screen and (max-width>1000) {
    //   grid-gap:20px;
    //   grid-template-columns: repeat(5, 1fr);
    // }
  }
  .grid-item{
    position: relative;
    &::before{
      content: '';
      display: block;
      width: 100%;
      padding-top:100%;
    }
    >div{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background-color: red;
    }
  }
}
</style>
