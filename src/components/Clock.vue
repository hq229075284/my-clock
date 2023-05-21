<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Konva from 'konva'
import { type Stage } from 'konva/lib/Stage'

const containerRef = ref()
let stage:Stage
const canvasWidth = 400
const canvasHeight = 400
const outerRadius = 80
const innerRadius = 70
const layer = new Konva.Layer()

const center = [canvasWidth / 2, canvasHeight / 2]
function createStage() {
  stage = new Konva.Stage({
    container: containerRef.value,
    width: canvasWidth,
    height: canvasHeight,
  })

  const circle = new Konva.Circle({
    radius: (outerRadius + innerRadius) / 2,
    x: center[0],
    y: center[1],
    stroke: '#c0c0c0',
    strokeWidth: outerRadius - innerRadius,
  })

  const rect = new Konva.Rect({
    width: canvasWidth,
    height: canvasHeight,
    stroke: 'orange',
    strokeWidth: 2,
  })

  layer.add(rect)
  layer.add(circle)
  stage.add(layer)
}

let rectBar:Konva.Shape
let radian:number
function draw() {
  if (!rectBar) {
    rectBar = new Konva.Shape({
    // x: 10,
      fill: 'red',
      // stroke: 'red',
      sceneFunc(ctx, shape) {
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

        function getRadiusBetweenPoints<T extends {x:number, y:number}>(p1:T, p2:T) {
          return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) / 2
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
  } else {
    // rectBar.clearCache()
    // rectBar.draw()
    layer.draw()
  }
}

const startTime = Date.now()
const endTime = startTime + 10 * 1000
let rafId
function animation() {
  radian = 2 * Math.PI * (Math.min((Date.now() - startTime) / (endTime - startTime), 1))
  draw()

  if (radian < Math.PI * 2) {
    rafId = requestAnimationFrame(() => {
      animation()
    })
  } else {
    console.log('complete')
  }
}

onMounted(() => {
  createStage()
  animation()
})
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
