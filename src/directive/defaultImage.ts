import { DirectiveBinding } from 'vue';

function replaceImageOnError(imageElement: HTMLImageElement, defaultImageSrc: string): void {
  imageElement.onerror = () => {
    imageElement.src = defaultImageSrc;
  };
}

export const defaultImage = {
  beforeMount(el: HTMLImageElement, binding: DirectiveBinding): void {
    replaceImageOnError(el, binding.value);
  },

  updated(el: HTMLImageElement, binding: DirectiveBinding): void {
    replaceImageOnError(el, binding.value);
  },
};