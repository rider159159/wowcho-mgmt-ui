import dayjs from 'dayjs';

export function timeStampChange(timeStamp:number):string {
  return dayjs(timeStamp).format('YYYY-MM-DD')
}