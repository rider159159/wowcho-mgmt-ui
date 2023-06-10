import { setupDayjs } from './dayjs'
import { setupGSAP } from './gsap'
import { setupSweetAlert } from './sweet-alert'
import { setupVeeValidate } from './vee-validate'
import { setupVueDatepicker } from './vue-datepicker'
import { setupVueCropper } from './vue-cropper'

import { type App } from 'vue'

export function setupPlugins (AppInstance: App<Element>) {
  setupGSAP(AppInstance)
  setupSweetAlert(AppInstance)
  setupDayjs(AppInstance)
  setupVeeValidate(AppInstance)
  setupVueDatepicker(AppInstance)
  setupVueCropper(AppInstance)
}
export * from './toast'
export * from './sweet-alert'
export * from './dayjs'
