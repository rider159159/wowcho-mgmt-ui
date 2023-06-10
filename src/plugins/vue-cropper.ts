import { App } from 'vue'
import VueCropper from 'vue-cropper'

export function setupVueCropper(AppInstance:App<Element>) {
  AppInstance.use(VueCropper)
}
