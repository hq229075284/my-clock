<template>
  <div class="tomato-clock">
    <Clock ref="clockRef" @notify:complete="notify_complete"></Clock>
    <button @click="start">
      start
    </button>
    <button @click="end">
      end
    </button>
    <button @click="reset">
      reset
    </button>
    <Menu :configs="configs" v-slot="config">
      <div class="menu-cell">
        <div class="menu-name">
          {{ config.name }}
        </div>
      </div>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Clock from './Clock.vue'
import Menu from './Menu.vue'

const clockRef = ref<InstanceType<typeof Clock>>()

function start() {
  clockRef.value?.start()
}
function end() {
  clockRef.value?.end()
}
function reset() {
  clockRef.value?.reset()
}

let startAudio:HTMLAudioElement
function notify_start() {
  startAudio = document.createElement('audio')
  const audioSrc = 'http://m801.music.126.net/20230523160451/a2b125cd8d71c540a652d182bfd48afa/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/25079094413/8a75/9379/a93b/043a37c4180128c8e2c9f314f6128541.mp3'
  startAudio.src = audioSrc
  startAudio.loop = true
  startAudio.play()
}

function notify_complete() {
  startAudio.pause()
  const audioSrc = 'http://m801.music.126.net/20230523160451/a2b125cd8d71c540a652d182bfd48afa/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/25079094413/8a75/9379/a93b/043a37c4180128c8e2c9f314f6128541.mp3'
  const audio = document.createElement('audio')
  audio.src = audioSrc
  audio.play()
  function onClick() {
    audio.pause()
    window.removeEventListener('click', onClick)
  }
  window.addEventListener('click', onClick)
}

const configs = [
  {
    name: '常亮',
    icon: '',
    click() {
      console.log(1)
    },
  },
  {
    name: '氛围',
    icon: '',
    click() {
      console.log(2)
    },
  },
]

</script>
