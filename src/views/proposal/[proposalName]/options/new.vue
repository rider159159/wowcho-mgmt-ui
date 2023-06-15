<script setup lang="ts">

import { plan, Ispecification, IinputItem } from '@/interface'
import type { Ref } from 'vue'
import { Swal, toast } from '@/plugins'
import { fetchPlan } from '@/api'
import { scrollToError, checkObjKey } from '@/composables'

const route = useRoute()
const router = useRouter()

const tempPlan = JSON.parse(JSON.stringify(plan))
const formBody = ref(tempPlan)
// 送出表單時，判斷用
const formControl = ref(false)

const inputItem:IinputItem = {
  optionText: '',
  showError: false
}
// 規格輸入框
const inputList:Ref<Array<IinputItem>> = ref([

])

// 添加方按規格
function addSpecification() {
  if (formBody.value.specification.length >= 2) return
  const specification:Ispecification = {
    title: '',
    option: [],
    id: new Date().getTime()
  }

  specification.id = new Date().getTime()
  formBody.value.specification.push(specification)
  inputList.value.push(JSON.parse(JSON.stringify(inputItem)))
}

// 添加規格選項
function addOptionItem(index:number, itemOption:string) {
  // 請輸入正確的規格選項。
  if (itemOption.length <= 0) {
    return Swal.fire({
      icon: 'warning',
      title: '請輸入正確的規格選項。'
    })
  }
  // 移除輸入框
  inputList.value[index].optionText = ''
  formBody.value.specification[index].option.push(itemOption)
}
// 刪除規格
function delSpecification(index:number) {
  formBody.value.specification.splice(index, 1)
  inputList.value.splice(index, 1)
}

// 刪除規格選項
function delOptionItem(index:number, idx:number) {
  formBody.value.specification[index].option.splice(idx, 1)
}

// 規格錯誤
function specificationError () {
  if (formBody.value.specification.length > 0) {
    formBody.value.specification.forEach((item:any) => {
      if (item.option.length <= 0 || item.title.length <= 0) {
        return Swal.fire({
          icon: 'warning',
          title: '方案規格請輸入，規格標題、規格選項。'
        })
      }
    })
  }
}

async function submitForm() {
  formControl.value = true
  specificationError()
  const formData = JSON.parse(JSON.stringify(formBody.value))
  formData.proposalUrl = route.params.proposal
  const res = await fetchPlan.create(formData)
  if (res.status !== 'Success') return
  toast.success('新增募資方案成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  setTimeout(() => {
    router.push({
      name: 'optionIndex',
      params: {
        proposal: route.params.proposal
      }
    })
  }, 2100)
}

function onInvalidSubmit({ errors }:any) {
  if (checkObjKey(errors).length > 0) {
    scrollToError()
  }
}
</script>

<template>
  <VForm @submit="submitForm" @invalid-submit="onInvalidSubmit" v-slot="{ errors }" class="container mx-auto px-3 py-6">
    <h4 class="text-h2 font-bold leading-h2 mb-4">新增募資方案</h4>
    <p class="w-full text-gray2 text-h5 mb-56px">可以在此頁面中設定，募資計畫中的商品方案。</p>
    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6">募資商品基本資訊</h5>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div>
        <MyLabel title="回饋方案名稱" label="name" :require="true" class="mb-6"
          remark="長度限制12字，請勿加入數量、價格折扣等等行銷字樣。"
          :class="{'errorMessage !mb-1':errors.name}"
          >
          <VField v-model="formBody.name" id="name" name="name" label="募資商品名稱" placeholder="請輸入方案名稱" rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.name}" />
        </MyLabel>
        <span v-if="errors.name" class="block text-#FF5D71 mb-3 text-14px">{{ errors.name }}</span>
      </div>
      <div>
        <MyLabel title="回饋方案數量" label="quantity" class="mb-6" remark="若不填寫，則會是無限制數量。">
          <input v-model="formBody.quantity" type="number" id="quantity" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3">
        </MyLabel>
      </div>
      <div>
        <MyLabel title="方案實際價格" label="actualPrice" :require="true" class="mb-6" remark="此價格是贊助者實際購買時的折扣價格。"
          :class="{'errorMessage !mb-1':errors.actualPrice}"
          >
          <VField v-model="formBody.actualPrice" id="actualPrice" type="number"  name="actualPrice" label="實際價格" placeholder="請輸入實際價格" rules="required|min_value:0|integer"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.actualPrice}" />
        </MyLabel>
        <span v-if="errors.actualPrice" class="block text-#FF5D71 mb-3 text-14px">{{ errors.actualPrice }}</span>
      </div>
      <div>
        <MyLabel title="方案原始價格" label="originalPrice" :require="true" class="mb-6" remark="系統會將實際價格與原始價格進行折扣計算，將折扣顯示於募資活動畫面上。"
          :class="{'errorMessage !mb-1':errors.originalPrice}"
          >
          <VField v-model="formBody.originalPrice" id="originalPrice" type="number"  name="originalPrice" label="原始價格" placeholder="請輸入原始價格" rules="required|min_value:0|integer"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.originalPrice}" />
        </MyLabel>
        <span v-if="errors.originalPrice" class="block text-#FF5D71 mb-3 text-14px">{{ errors.originalPrice }}</span>
      </div>
      <div class="xl:col-span-2">
        <MyLabel title="募資方案預覽圖" label="image" :require="true" class="mb-6" remark="請上傳小於 1MB 的圖片,建議尺寸為 600 x 200 像素 (3:1),方案圖片可於上線後修改。"
          :class="{'errorMessage !mb-1':errors.image}"
        >
          <div class="flex flex-col items-start">
            <img v-if="formBody.image" :src="formBody.image" class="mb-4 max-h-500px w-auto">
            <CropperAndUpload v-model="formBody.image" :fixedNumber="[3,1]" :error="errors.image ? true: false" class="self-start"></CropperAndUpload>
          </div>
        </MyLabel>
        <VField v-model="formBody.image" name="image" label="募資商品預覽圖" rules="required" class="hidden"></VField>
        <span class="block text-#FF5D71 mb-3 text-14px">{{ errors.image }}</span>
      </div>
      <div>
        <MyLabel title="出貨日期" :require="true" class="w-full" :class="{'errorMessage !mb-1':errors.pickupDate}">
          <VField v-model="formBody.pickupDate"  name="pickupDate" id="pickupDate" label="出貨日期" rules="required" type="number">
            <VueDatePicker v-model="formBody.pickupDate" :min-date="new Date()" :format="'yyyy/MM/dd HH:mm'" model-type="timestamp" locale="zh-TW" auto-apply>
              <template #dp-input="{ value }">
                <input :value="value" type="text"  placeholder="請選擇出貨時間" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
                  :class="{'!border-#FF5D71':errors.pickupDate}">
              </template>
            </VueDatePicker>
          </VField>
        </MyLabel>
        <span class="block text-#FF5D71 mb-3 text-14px">{{ errors.pickupDate }}</span>
      </div>
    </div>
    <div :class="{'errorMessage !mb-1':errors.summary}">
      <div class="flex pb-4 mb-6 mt-56px border-b-2 b-line">
        <span class="text-#FF5D71 mr-1">*</span>
        <h5 class="w-full text-brand1 text-h4">方案簡介</h5>
      </div>
      <ul class="list-disc text-14px text-gray2 pl-4 mb-4">
        <li>此選項介紹該方案內容，商品金額、分期付款、贊助數量，等等資訊介紹，可以無需在此介紹。</li>
        <li>簡短扼要地介紹品項描述，可縮短贊助人決定時間，提升使用者體驗。</li>
        <li>接受 Markdown 語法。</li>
      </ul>
      <VField v-model="formBody.summary" name="summary" id="summary" label="方案內容" rules="required" type="text">
        <Markdown v-model="formBody.summary" :class="{'ckError': errors.summary }"></Markdown>
      </VField>
      <span v-if="errors.summary" class="block text-#FF5D71 mb-3 text-14px">{{ errors.summary }}</span>
    </div>

    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6 mt-56px">方案規格</h5>
    <button @click.prevent="addSpecification" class="w-130px bg-brand-1 text-white hover:bg-brand-2 duration-300 py-2 rounded-3xl" :class="{ 'bg-gray4 text-gray3 !hover:bg-gray4 hover:text-gray3': formBody.specification.length >= 2 }">新增規格</button>
    <div v-for="(item,index) in formBody.specification" :key="item.id" class="first:mt-4 relative bg-gray4 rounded-4 p-6 my-6">
      <img @click="delSpecification(index)" class="w-24px absolute top-[-12px] right-[-12px] cursor-pointer" src="/close2.svg" alt="">
      <div class="grid gird-cols-1 xl:grid-cols-2 gap-6 pb-4">
        <div class="w-full">
          <p class="mb-3">規格{{ index+1 }}</p>
          <input v-model="formBody.specification[index].title" type="text" placeholder="例如：顏色" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3">
        </div>
        <div class="w-full">
          <p class="mb-3">新增選項</p>
          <div class="relative w-full flex items-center">
            <input v-model="inputList[index].optionText" type="text"  placeholder="例如：白色" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3">
            <div @click="addOptionItem(index, inputList[index].optionText)" class="flex items-center absolute right-24px cursor-pointer">
              <span class="text-brand2 mr-1">新增</span>
              <img src="/plan/add.svg">
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-4 flex-wrap">
        <div v-for="(optionItem,idx) in item.option" @click="delOptionItem(index,idx)" :key="`id_${idx}`" class="flex rounded-8px cursor-pointer px-4 py-2 text-brand2 b-2 b-brand2 items-center">
          <p class="mr-1">{{ optionItem }}</p>
          <img src="/plan/close.svg" alt="">
        </div>
      </div>
    </div>

    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6 mt-56px">給贊助人的話</h5>
    <ul class="list-disc text-14px text-gray2 pl-4 mb-4">
      <li>此選項介紹該方案內容，商品金額、分期付款、贊助數量，等等資訊介紹，可以無需在此介紹。</li>
      <li>簡短扼要地介紹品項描述，可縮短贊助人決定時間，提升使用者體驗。</li>
      <li>接受 Markdown 語法。</li>
    </ul>
    <Markdown v-model="formBody.toSponsor" class="mb-6"></Markdown>
    <FooterProposal>
      <button type="submit" class="mt-4 lg:mt-0 px-6 py-3 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存方案</button>
    </FooterProposal>
  </VForm>
</template>
