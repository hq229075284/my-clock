export interface ITomatoClockOption{
  /**
   * 一个番茄钟持续时间,单位：毫秒
   */
  duration:number
  /**
   * 短休息时长,单位：毫秒
   */
  shortBreak:number
  /**
   * 长休息时长,单位：毫秒
   */
  longBreak:number
  /**
   * 长休息间隔周期（几个番茄钟）
   */
  longBreakPeriod:number
}

export interface ITaskOption{
  /**
   * 任务对应的番茄钟数量
   */
  numberOfTomatoClockAllocated:number
}

export interface ITomatoClockStore{
  /**
   * 剩余时间
   */
  restTime:number
  /**
   * 番茄钟配置项
   */
  clockOption:ITomatoClockOption
}
