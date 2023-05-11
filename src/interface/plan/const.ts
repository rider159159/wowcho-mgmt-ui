import { IPlan } from './interface'

export const plan:IPlan = {
  // 募資活動(主表) id
  proposalId: '',
	//圖片網址
  image: '', 
	//方案名稱
	name: '',
	//活動簡介
	summary: '',
	// 募資方案原價
	originalPrice: null,
	//募資方案折扣價格 (實際價格)
	actualPrice:null,
	//募資商品數量
	quantity: null,
	// 該方案已賣出數量
	nowBuyers: 0,
	// 出貨日期
	pickupDate:  null,
  // 給贊助者的話
  toSponsor: '',
  // 募資方案 - 規格，規格標題、選項
  specification: []
}
