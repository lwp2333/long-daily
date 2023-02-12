import solarlunar from 'solarlunar'
import dayjs from 'dayjs'

/**
 *
 * @param month 农历月份
 * @param day 农历日
 * @returns 天数
 */
export const computedBirthDays = (month: number, day: number) => {
  const getCurYear = dayjs().year()
  const curYearBirth = solarlunar.lunar2solar(getCurYear, month, day)
  const curYearBirthStr = `${curYearBirth.cYear}-${curYearBirth.cMonth}-${curYearBirth.cDay}`

  // 是否今年生日已过
  const isOver = dayjs().isAfter(curYearBirthStr, 'day')

  if (isOver) {
    const nextYearBirth = solarlunar.lunar2solar(getCurYear + 1, 1, 9)
    const nextYearBirthStr = `${nextYearBirth.cYear}-${nextYearBirth.cMonth}-${nextYearBirth.cDay}`
    return dayjs(nextYearBirthStr).diff(dayjs(), 'day') + 1
  }
  return dayjs(curYearBirthStr).diff(dayjs(), 'days') + 1
}
