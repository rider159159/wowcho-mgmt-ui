export function checkObjKey(obj:any) {
  const objArray = Object.keys(obj)
  return objArray
}

export function scrollToError() {
  const errorMessage = document.querySelector('.errorMessage')
  const errorMessageRect = errorMessage ? errorMessage.getBoundingClientRect() : null
  if (errorMessageRect) {
    console.log(errorMessageRect.top + window.pageYOffset + 72)
    window.scrollTo({
      top: errorMessageRect.top + window.pageYOffset - 72,
      behavior: 'smooth'
    })
  }
}
