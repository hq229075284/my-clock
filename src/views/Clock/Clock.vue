<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Konva from 'konva'
import { type Stage } from 'konva/lib/Stage'
import { type Layer } from 'konva/lib/Layer'
import { useTomatoClockStore } from '@/store/index'
import dayjs from 'dayjs'
import { Text } from 'konva/lib/shapes/Text'

const tomatoClockStore = useTomatoClockStore()

const containerRef = ref<HTMLDivElement>()

let stage:Stage|undefined
let layer:Layer

const emit = defineEmits(['notify:complete'])
function createStage() {
  const div = containerRef.value
  if (!div) {
    return
  }
  const { clientWidth, clientHeight } = div
  return new Konva.Stage({
    container: div,
    width: clientWidth,
    height: clientHeight,
  })
}

function createLayer() {
  return new Konva.Layer()
}

function drawCircle() {
  if (!stage) return
  const outerRadiusPercent = 1
  const innerRadiusPercent = 0.9
  const maxRadius = Math.min(stage.getAttr('width') / 2, stage.getAttr('height') / 2)
  const radius = maxRadius * ((outerRadiusPercent + innerRadiusPercent) / 2)
  const strokeWidth = maxRadius * (outerRadiusPercent - innerRadiusPercent)

  const circle = new Konva.Circle({
    radius,
    x: stage.getAttr('width') / 2,
    y: stage.getAttr('height') / 2,
    stroke: '#c0c0c0',
    strokeWidth,
  })

  layer.add(circle)

  return circle
}

let rafId:number
const startTime = ref(-1)
let endTime = 0
const started = computed(() => startTime.value > 0)
function getRadian() {
  return 2 * Math.PI * (Math.min((Date.now() - startTime.value) / (endTime - startTime.value), 1))
}

function notify() {
  emit('notify:complete')
}
function drawRectBar() {
  const created = !!layer.findOne('#rectBar')
  if (created) {
    /*  */
  } else {
    const rectBar = new Konva.Shape({
      id: 'rectBar',
      fill: 'red',
      // stroke: 'red',
      sceneFunc(ctx, shape) {
        if (!stage) return
        if (!started.value) return

        const outerRadiusPercent = 1
        const innerRadiusPercent = 0.9
        const maxRadius = Math.min(stage.getAttr('width') / 2, stage.getAttr('height') / 2)
        const outerRadius = maxRadius * outerRadiusPercent
        const innerRadius = maxRadius * innerRadiusPercent
        const center = [stage.getAttr('width') / 2, stage.getAttr('height') / 2]
        const radian = getRadian()
        const startRadian = -Math.PI / 2

        const p1 = {
          x: center[0] + Math.cos(startRadian + radian) * outerRadius,
          y: center[1] + Math.sin(startRadian + radian) * outerRadius,
        }
        const p2 = {
          x: center[0] + Math.cos((3 / 2) * Math.PI) * outerRadius,
          y: center[1] + Math.sin((3 / 2) * Math.PI) * outerRadius,
        }
        const p3 = {
          x: center[0] + Math.cos((3 / 2) * Math.PI) * innerRadius,
          y: center[1] + Math.sin((3 / 2) * Math.PI) * innerRadius,
        }
        const p4 = {
          x: center[0] + Math.cos(startRadian + radian) * innerRadius,
          y: center[1] + Math.sin(startRadian + radian) * innerRadius,
        }

        function getRadiusBetweenPoints<T extends {x:number, y:number}>(point1:T, point2:T) {
          return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2) / 2
        }

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        // p1 -> p2
        ctx.arc(center[0], center[1], outerRadius, startRadian + radian, (3 / 2) * Math.PI)
        // p2 -> p3
        ctx.arc(
          (p2.x + p3.x) / 2,
          (p2.y + p3.y) / 2,
          getRadiusBetweenPoints(p2, p3),
          (3 / 2) * Math.PI,
          (5 / 2) * Math.PI,
        )
        // p3 -> p4
        ctx.arc(
          center[0],
          center[1],
          innerRadius,
          (3 / 2) * Math.PI,
          startRadian + radian,
          true,
        )
        // p4 -> p1
        ctx.arc(
          (p4.x + p1.x) / 2,
          (p4.y + p1.y) / 2,
          getRadiusBetweenPoints(p4, p1),
          startRadian + radian - Math.PI,
          startRadian + radian,
        )

        ctx.fillStrokeShape(shape)
      },
    })
    layer.add(rectBar)
  }
}
function drawText() {
  if (!stage) return
  const ms = Math.ceil(Math.max(0, endTime - Date.now()) / 1000) * 1000
  const restTime = dayjs('1970/01/01 00:00:00').add(ms, 'millisecond').format('mm:ss')
  let centerText:Text = layer.findOne('#centerText')
  if (centerText) {
    if (started.value) {
      centerText.text(restTime)
    } else {
      centerText.text('')
    }
  } else {
    centerText = new Konva.Text({
      id: 'centerText',
      fill: '#333',
      text: restTime,
      fontSize: 0.2 * Math.min(stage.getAttr('width'), stage.getAttr('height')),
      // stroke: 'red',
    })
    layer.add(centerText)
  }
  const { width, height } = centerText.measureSize(restTime)
  centerText.setAttr('x', stage.getAttr('width') / 2 - width / 2)
  centerText.setAttr('y', stage.getAttr('height') / 2 - height / 2)
}
function animation() {
  const now = Date.now()
  drawRectBar()
  drawText()
  layer.draw()
  if (now < endTime) {
    rafId = requestAnimationFrame(() => {
      animation()
    })
  } else {
    // complete
    reset()
    notify()
  }
}

function end() {
  startTime.value = -1
  cancelAnimationFrame(rafId)
}
function start() {
  startTime.value = Date.now()
  endTime = startTime.value + tomatoClockStore.clockOption.duration
  animation()
}
function reset() {
  end()
  drawText()
  layer.draw()
}
onMounted(() => {
  stage = createStage()
  if (stage) {
    layer = createLayer()
    stage.add(layer)
    drawCircle()
  }
})

defineExpose({ end, start, reset })
</script>

<template>
  <div ref="containerRef">
  </div>
</template>

<style scoped>
div {
  border: 1PX solid;
  width: 400PX;
  height: 400PX;
}
</style>
