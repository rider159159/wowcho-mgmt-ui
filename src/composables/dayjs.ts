import dayjs from 'dayjs'

// 2023/10/03 14:03:02
export function dateTime(timestamp: number|string) :string {
  return timestamp ? dayjs(timestamp).format('YYYY/MM/DD HH:mm:ss') : '-'
}

// 2023/10/03
export function dateYYYYMMDD(timestamp:number|string) :string {
  return timestamp ? dayjs(timestamp).format('YYYY/MM/DD') : '-'
}

export function dateYYYYMM(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('YYYY/MM') : '-'
}

export function dateTimeWithDash(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('YYYY-MM-DD HH:mm:ss') : '-'
}

export function dateWithDashYYYYMM(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('YYYY-MM') : '-'
}

export function dateWithDashYYYYMMDD(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('YYYY-MM-DD') : '-'
}

export function dateTimeMMDDYYYY(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('MM/DD/YYYY HH:mm:ss') : '-'
}

export function dateMMDDYYYY(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('MM/DD/YYYY') : '-'
}

export function timeHHMMSS(timestamp: number) :string {
  return timestamp ? dayjs(dayjs.unix(timestamp)).format('HH:mm:ss') : '-'
}

export function timeStampChange (timeStamp: number): string {
  return dayjs(timeStamp).format('YYYY-MM-DD')
}

// 剩餘 23 天
export function formatRemainingTime(timeStamp:any) {
  const currentTime = dayjs()
  const targetTime = dayjs(timeStamp)
  const diff = targetTime.diff(currentTime, 'day')
  return diff < 0 ? 'expired' : diff
}
