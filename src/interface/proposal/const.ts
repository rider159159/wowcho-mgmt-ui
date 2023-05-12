import { IProposal } from './interface'

export const proposal:IProposal = {
  image:'',
  video: '',
  name: '',
  category: null,
	// 簡介
  summary:'',
	// 細節介紹
	description:'',
	// 目標集資金額
	targetPrice:null,
	// 當前集資金額
	nowPrice:0,
	// 當前購買人數
	nowBuyers:0,
	//募資開始時間
	startTime:null,
	//募資結束時間
	endTime: null,
	// 年齡限制
	ageLimit:0,
	// 客製化 URL
	customizedUrl:'',
	// 狀態 0 = 草稿，前台看不到 1 = 上架
	status: 1,
	// 關聯
	// 提案人
	ownerId: '',
	// 募資方案 ID 列表
	planIdList: [],
	// 留言id列表
	messageIdList: [],
	// 常見問答id列表
	faqIdList: [],

	// 客服聯絡方式
	serviceContact: '',
	// 風險與挑戰
	risksChallenge: '',
	// 退換貨方式
	returnGoods: '',
}