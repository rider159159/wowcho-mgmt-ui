import { Field, Form, ErrorMessage, configure, defineRule } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ZhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import {
  email, required, min, max, integer, min_value as minValue
} from '@vee-validate/rules'
import { type App } from 'vue'
defineRule('min_value', minValue)

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('integer', integer)
// defineRule('confirmed', (value: string, [target]: any) => {
//   if (value === target) {
//     return true
//   }
//   return '兩次密碼需一致'
// })

defineRule('password', (value: string) => {
  if (required(value) &&
    min(value, { length: 8 }) &&
    max(value, { length: 20 })
  ) {
    return true
  }
  return '密碼必須在 8 至 20 碼之間'
})

export function setupVeeValidate (AppInstance: App<Element>) {
  AppInstance.component('VField', Field)
  AppInstance.component('VForm', Form)
  AppInstance.component('ErrorMessage', ErrorMessage)
}

configure({
  generateMessage: localize({
    ZhTW
  })
})
setLocale('ZhTW')
