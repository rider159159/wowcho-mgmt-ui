import { App } from 'vue';
import Swal from 'sweetalert2';

export function setupSweetAlert(AppInstance:App<Element>) {
  AppInstance.provide('$swal', Swal);
}
export { Swal };
