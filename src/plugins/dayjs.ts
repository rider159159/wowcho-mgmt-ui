import { App } from 'vue';
import dayjs from 'dayjs';

export function setupDayjs(AppInstance:App<Element>) {
  AppInstance.provide('$dayjs', dayjs);
}

export { dayjs }