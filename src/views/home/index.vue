<script lang="ts" setup>
const router = useRouter()
const projectsList = ref([
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-1'
  },
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-2'
  },
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-3'
  }
])

function toProject (item:any) {
  router.push({
    name: 'projects',
    params: {
      id: item.id
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div @click="toProject(item)" v-for="(item,index) in projectsList" :key="index" class="rounded-xl cursor-pointer">
      <div class="flex flex-col w-full">
        <img :src="item.image" alt="">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
  <div class="container m-auto gap-10 flex justify-between items-start">
    <admin-menu active="dashboard" />
    <div class="w-full">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium recusandae voluptas aliquam quisquam esse corrupti fugit sint consequuntur voluptates fuga reprehenderit error, totam quam voluptatibus nemo illum veniam. Dignissimos fugiat numquam consequuntur soluta impedit dolorem placeat exercitationem a ipsam, iste possimus cumque, quod, repellendus itaque libero corporis sapiente vel voluptate eos quam. Deleniti magnam, vitae dolor voluptate ad, ducimus veniam voluptatum necessitatibus labore quasi officia natus quo quas eius architecto inventore quibusdam illum est amet aliquid laudantium incidunt. Perspiciatis nihil voluptatem quae, cupiditate blanditiis placeat commodi tempore eaque illo laboriosam illum, non porro ut iure hic, quia velit similique exercitationem nam quasi veniam sapiente! Consectetur accusantium quo ipsum neque tenetur laboriosam magni ut saepe praesentium nihil! Aliquid quidem debitis enim, maxime ex quis voluptatem molestias temporibus nesciunt molestiae, dignissimos itaque quos modi sint rerum, at libero dolore illum ipsum totam qui? Autem qui maiores labore rerum veritatis natus eaque, magni dolorem optio architecto eveniet sapiente, magnam dolorum molestiae? Cum aliquid voluptatem fugiat suscipit officia minus rerum, soluta exercitationem quae, blanditiis enim accusantium maiores nihil! Vitae magnam repellat alias explicabo impedit eum nobis aliquid nulla, esse tempora minus atque. Dignissimos provident ducimus mollitia nihil doloremque alias quasi. Dolores, debitis. Eveniet, quo itaque. Deleniti saepe assumenda ea dolor, adipisci cupiditate provident beatae exercitationem error molestias expedita vero sapiente voluptates reiciendis quod voluptatum sequi ex accusamus veniam id! Sit quas sunt veritatis deleniti asperiores eius, maxime cupiditate ullam nemo voluptatum voluptates eveniet ratione? Alias reiciendis laudantium repellat dolorem dolorum quia. Sapiente maiores consequatur quibusdam perspiciatis quis nihil aliquid dolorum beatae explicabo culpa consectetur nobis, inventore esse reprehenderit. Aliquam repudiandae voluptate a soluta, unde inventore blanditiis, laudantium, possimus quasi vel esse perferendis? Nesciunt placeat quisquam exercitationem. Nobis incidunt enim itaque in at ipsa earum iste nostrum, quod corporis consequatur natus iusto distinctio porro dolorem! Natus quam, culpa enim soluta quibusdam possimus impedit unde dolores optio perferendis iure explicabo accusamus, similique vero illum quae veniam tenetur, corrupti sunt quisquam. Ratione doloremque porro dolorum eveniet eum assumenda dolore in, ab, delectus praesentium mollitia possimus, laudantium sit illum soluta aliquam! Voluptate, mollitia quisquam unde laudantium accusamus nesciunt. Culpa ratione dolorum debitis ipsa! Quo, illo beatae perspiciatis tempore officiis repellat incidunt cum veritatis praesentium neque fugit saepe consectetur exercitationem velit eius culpa reiciendis nemo temporibus, obcaecati et magnam similique. Facilis ipsam ea nulla dicta at in amet quidem, est tempora, corporis voluptatibus aliquam eligendi consequuntur sint! Rerum facilis et quaerat excepturi animi, natus placeat sequi nostrum non quisquam! Ipsa explicabo voluptatem voluptas provident distinctio culpa quibusdam ratione, commodi odio. Adipisci nostrum doloribus omnis assumenda! Consequuntur corrupti labore quisquam dicta libero laudantium ea illo repellat culpa voluptate ut, dignissimos ex laborum maxime deleniti repellendus quibusdam quae, eligendi exercitationem excepturi adipisci ab aliquid cum fugiat! Quisquam quo, autem voluptatibus officiis aperiam tempora distinctio error cupiditate delectus eius rem harum ex iure nulla dolorem? Voluptate, nostrum dolorem deleniti molestias aliquid ratione officiis voluptates laborum maiores commodi dolor odio ipsum tempore atque ipsam repellendus laboriosam itaque minima praesentium ullam doloremque magni inventore.
    </div>
  </div>
</template>
