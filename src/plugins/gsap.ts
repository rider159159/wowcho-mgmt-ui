import { App } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function setupGSAP(AppInstance:App<Element>) {
  AppInstance.provide('$gsap', gsap);
}
