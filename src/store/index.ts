import { defineStore } from 'pinia'
import type { ITomatoClockStore } from '@/views/Clock/type'
import merge from 'lodash/merge'

/**
 * 递归对象属性可选
 */
type recursionPartial<T>={
  [K in keyof T]?:T[K] extends object?recursionPartial<T[K]>:T[K]
}

export const TOMATO_CLOCK_STORE = 'TOMATO_CLOCK_STORE'
export const useTomatoClockStore = defineStore(TOMATO_CLOCK_STORE, {
  state() {
    const s:ITomatoClockStore = {
      restTime: 0,
      clockOption: {
        shortBreak: 5 * 60 * 1000,
        longBreak: 15 * 60 * 1000,
        longBreakPeriod: 4,
        duration: 0.2 * 60 * 1000,
      },
    }
    return s
  },
  actions: {
    updateState(nextState:recursionPartial<ITomatoClockStore>) {
      merge(this, nextState)
    },
  },
})
