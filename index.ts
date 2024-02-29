export interface CoolingTimerConfig {
  /** 冷却时间 */
  time: number
  /** 持续性冷却：每触发一次就向后延续一段时间 */
  isContinue?: boolean
}

type Timeout = NodeJS.Timeout

export class CoolingTimer {
  /** 冷却定时器 */
  private coolingTimer: Timeout | number | null = null

  /** 是否冷却完成 */
  private isDone: boolean = true

  /** 参数配置 */
  private config: CoolingTimerConfig = { time: 1000, isContinue: false }

  constructor(config?: CoolingTimerConfig) {
    if (config) this.config = { ...this.config, ...config }
  }

  /** 获取是否冷却完成状态 */
  get done() {
    const { isDone, coolingTimer, config } = this
    const { time, isContinue } = config

    if (!coolingTimer || isContinue) {
      clearTimeout(this.coolingTimer as Timeout)
      this.coolingTimer = setTimeout(() => {
        this.isDone = true
        this.coolingTimer = null
      }, time)
    }
    this.isDone = false

    return isDone
  }
}
