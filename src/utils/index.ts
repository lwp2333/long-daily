import { DateTypeEnum, MemorialDayEntity, MemorialDayTypeEnum } from '@/api/memorialDayApi'
import dayjs from 'dayjs'
import solarlunar from 'solarlunar'

/**
 *
 * @param month 阳历月份
 * @param day 阳历日
 * @returns 天数
 */
export const getBirthDaysBySolar = (month: number, day: number) => {
  const curYear = dayjs().year()
  const curYearBirth = `${curYear}-${month}-${day}`
  // 是否今年生日已过
  const isOver = dayjs().isAfter(curYearBirth, 'days')

  if (isOver) {
    const nextYearBirth = `${curYear + 1}-${month}-${day}`
    return {
      days: dayjs(nextYearBirth).diff(dayjs(), 'days') + 1,
      orginDate: nextYearBirth
    }
  }
  return {
    days: dayjs(curYearBirth).diff(dayjs(), 'days') + 1,
    orginDate: curYearBirth
  }
}
/**
 *
 * @param month 农历月份
 * @param day 农历日
 * @returns 天数
 */
export const getBirthDaysByLunar = (month: number, day: number) => {
  const curYear = dayjs().year()
  const curYearBirth = solarlunar.lunar2solar(curYear, month, day)
  const curYearBirthStr = `${curYearBirth.cYear}-${curYearBirth.cMonth}-${curYearBirth.cDay}`

  // 是否今年生日已过
  const isOver = dayjs().isAfter(curYearBirthStr, 'days')

  if (isOver) {
    const nextYearBirth = solarlunar.lunar2solar(curYear + 1, 1, 9)
    const nextYearBirthStr = `${nextYearBirth.cYear}-${nextYearBirth.cMonth}-${nextYearBirth.cDay}`

    return {
      days: dayjs(nextYearBirthStr).diff(dayjs(), 'days') + 1,
      orginDate: nextYearBirthStr
    }
  }
  return {
    days: dayjs(curYearBirthStr).diff(dayjs(), 'days') + 1,
    orginDate: curYearBirthStr
  }
}
/**
 *
 * @param dateA 阳历日期
 * @returns 计算至今累计天数
 */
export const getDaysBySolar = (date: string) => {
  return dayjs().diff(date, 'days') + 1
}
/**
 *
 * @param dateA 农历日期
 * @returns 计算至今累计天数
 */
export const getDaysByLunar = (date: string) => {
  const [lunarYear, lunarMonth, lunarDay] = date.split('-')[0]
  const res = solarlunar.lunar2solar(+lunarYear, +lunarMonth, +lunarDay)
  return dayjs().diff(`${res.cYear}-${res.cMonth}-${res.cDay}`, 'days') + 1
}
/**
 *
 * @param list 纪念日原始数据
 * @returns 计算排序后的数据
 */
export const sortMemorialDayList = (list: MemorialDayEntity[]) => {
  return list
    .map(it => {
      let days = 0
      let originDate = ''
      if (it.type === MemorialDayTypeEnum.cumulative) {
        // 累计日
        if (it.dateType === DateTypeEnum.solar) {
          // 阳历
          days = getDaysBySolar(it.date)
        } else {
          // 农历
          days = getDaysByLunar(it.date)
        }
      } else {
        const [, monthStr, dayStr] = it.date.split('-')
        const month = +monthStr
        const day = +dayStr
        // 按年周期 倒计日
        if (it.dateType === DateTypeEnum.solar) {
          // 阳历
          const res = getBirthDaysBySolar(month, day)
          days = res.days
          originDate = res.orginDate
        } else {
          // 农历
          const res = getBirthDaysByLunar(month, day)
          days = res.days
          originDate = res.orginDate
        }
      }
      return {
        ...it,
        days,
        originDate
      }
    })
    .sort((a, b) => a.days - b.days)
}

export const second2m_s = (num: number) => {
  //计算分
  const m = Math.floor(num / 60).toFixed(0)
  //计算秒
  const s = (num % 60).toFixed(0)
  //如果只有一位数，前面增加一个0
  return `${m.length == 1 ? '0' + m : m}:${s.length == 1 ? '0' + s : s}`
}
