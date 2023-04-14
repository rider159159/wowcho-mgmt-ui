# 渦潮 - 後台
- 需要 node 版本 16 以上，16.19 穩定啟動。
- 有使用 autoImport 套件，引入 Vue components 時，無需使用 import 方式引入元件，直接在 `<template>` 引入即可。

## 資料夾結構介紹
  - public 放置圖片
  - api 串接後端 Api 的資料夾
  - components 元件的資料夾
  - interface 存放 TypeScrip interface 
  - plugins 存放套件資料夾 
  - router 放置路由相關功資料夾
  - views 你要顯示頁面的資料夾
  - store 放置 Pinia 資源 (類似 VueX) 的資料夾
  - style 放置 scss 資料夾
  - utils 部分常用可以拆出來方法，主要是配合不同套件，如 axios 封裝、gasp 各個動畫效果，可存放於此資料夾
  - composable 每個元件可重複使用，並可獨立的方法，可存放於此資料夾

## Coding Style

### 元件內 composition
  - 定義變數儘量使用 ref() 為主，命名上變數採小駝峰方式，如 : `const projectList = ref<any>([])`
  - 函式命名採小駝峰方式，第一個單字通常為動詞方式，若該函式僅呼叫 API、資料處理則，無特別功能則採用具名函式 ，如: `function getProductAll() {}` 、 `function createProduct() {}`
  - 元件內使用順序為 script > template > style

### Vue component
  - components 底下需根據功能、頁面開設對應資料夾，將 component 放置於資料夾下
  - components 底下元件檔名皆為大駝峰式，如: ProposalCard
  - 其他元件、頁面引入 components 元件時也以大寫方式引入 如:`<Header></Header>`
  - views 若確認無多層及，可直接將元件放於 views 下，若有可能產生多層及 router ，將元件放於資料夾下做區分
  - views 下元件以小駝峰式命名

### UnoCSS
  - 採用最基本功能，樣式寫於 class 上，支援多數 tailwind 、 wind 語法
  - 對版型產生較大影響的語法如: position 、 display 放至於 class 前方
  - 同樣樣式遇至斷點時則會由小至大依序排列，並且會將相同屬性語法會寫至一起
  ```HTML
    <button class="block md:flex items-center justify-center rounded-full md:rounded-35px lg:rounded-20px border border-blue text-blue text-18px fw-700 h-50px min-w-50px">
      <p class="hidden md:inline">返回</p>
    </button>
  ``` 
### 路由
  - path 中以全小寫，可以使用 _ 做單字間隔，如: proposal_card。
  - router/index 中的 name 則以小駝峰命名。

### stores
- Store 中常數命名使用全大寫，可以使用 _ 做單字間隔，如: USER_INFO_REF。
  - 若 Store 中常數為物件，物件中屬性採小駝峰命名。
- Store (pinia) 主要功能是儲存共用資料，打 API 不會在這裡使用。

### 推薦 VSCode 套件
  - UnoCSS: https://marketplace.visualstudio.com/items?itemName=antfu.unocss
  - 若使用上述套件，無法產生 UnoCSS 則須多添加 WindiCSS IntelliSense: https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense
  - 上述套件皆會和 Tailwind CSS IntelliSense 衝突，若使用此專案開發時，請關閉此套件。

### eslint 設定
  - 使用上 plugin:vue/vue3-essential 、 standard-with-typescript 的擴展，主要為無分號。


## 操作