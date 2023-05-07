import { App } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

export function setupVueDatepicker(AppInstance:App<Element>) {
  AppInstance.component('VueDatePicker', VueDatePicker);
}