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

// 計算千分位
export function numberWithCommas(value:string|number) {
  const stringValue = typeof value === 'number' ? value.toString() : value;
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}