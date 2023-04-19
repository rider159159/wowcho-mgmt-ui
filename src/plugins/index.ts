import { setupDayjs } from './dayjs';
import { setupGSAP } from './gsap';
import { setupSweetAlert } from './sweet-alert';

import { App } from 'vue';
import './vee-validate';

export function setupPlugins(AppInstance:App<Element>) {
  setupGSAP(AppInstance);
  setupSweetAlert(AppInstance);
  setupDayjs(AppInstance);
}