import dayjs from 'dayjs'
// 时间过滤
export const formaTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
