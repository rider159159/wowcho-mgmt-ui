enum eCategory {
  Society = 1,
  Publishing = 2,
  VideoGame = 3,
  Entertainment = 4,
  Life = 5,
  Design = 6,
  Technology = 7,
  Leisure = 8
}

enum eAgeLimit {
  notLimited = 0, // 無限制
  r18 = 1// 18 禁
}

enum eStatus {
  draft = 0, // 草稿
  already = 1 // 上架
}

export interface IProposal {
  id?: string
  // 圖片網址
  image: string
  // 影片
  video: string
  // 活動名稱
  name: string
  // 活動分類
  category: eCategory | null
  // 活動簡介
  summary: string
  // 活動描述
  description: string
  // 目標金額
  targetPrice: number | null
  // 當前集資金額
  nowPrice: number | null
  // 當前購買人數
  nowBuyers: number | null
  // 募資開始時間
  startTime: number | null
  // 募資結束時間
  endTime: number | null
  // 年齡限制
  ageLimit: eAgeLimit
  // 客製化 URL
  customizedUrl: string | null
  // 狀態 0 = 草稿，前台看不到 1 = 上架
  status: eStatus
  // 關聯
  // 提案人
  ownerId: string
  // 募資方案 ID 列表
  planIdList: string[]
  // 留言id列表
  messageIdList: string[]
  // 常見問答id列表
  faqIdList: string[]

  // 客服聯絡方式
  contact: string
  // 風險與挑戰
  risk: string
  // 退換貨方式
  refund: string
}
