export function calculateDiscount(originPrice:number = 0, discountPrice:number = 0) {
  let discountString:string = (discountPrice/originPrice).toFixed(2);
  let discount:number
  if (discountString.slice(-1) === '0') {
    discountString = discountString.slice(0,-1)
    discount = Number(discountString) * 10
    return discount
  }
  discount = Number(discountString) * 100
  return discount
}