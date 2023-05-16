import { App } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router"
import permission from './permission';
import DefaultLayout from '../components/layoutWrapper/DefaultLayout.vue'
import AdminMenuLayout from '../components/layoutWrapper/AdminMenuLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/routerDemo',
      name: 'routerDemo',
      component: () => import('../views/routerDemo.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // TODO: 以上範例用，上線移除
    // 首頁
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // 登入
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // 註冊
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // 錯誤頁面
    {
      path: "/:catchAll(.*)",
      name: 'error',
      component: () => import('../views/error.vue'),
      meta: {
        keepAlive: false,
      }
    },
    // 提案諮詢頁面
    {
      path: '/proposalConsulation',
      name: 'proposalConsulation',
      component: () => import('../views/proposalConsulation/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // 提案紀錄 router-view
    {
      path: '/proposal',
      name: 'proposal',
      component: () => import('../views/proposal.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      },
      children: [
        // 提案紀錄列表
        {
          path: '',
          name: 'proposalIndex',
          component: () => import('../views/proposal/index.vue'),
          meta: {
            keepAlive: false,
            layout: DefaultLayout 
          },
        },
        // 新增提案
        {
          path: 'new',
          name: 'proposalNew',
          component: () => import('../views/proposal/new.vue'),
          meta: {
            keepAlive: false,
            layout: DefaultLayout 
          },
        },
        // 提案紀錄列表 router-view
        {
          path: ':proposal',
          name: 'proposalName',
          component: () => import('../views/proposal/[proposalName].vue'),
          children: [
            // 查看提案計畫草稿預覽
            {
              path: '',
              name: 'proposalNameIndex',
              component: () => import('../views/proposal/[proposalName]/index.vue'),
            },
            // 查看募資提案上線進度與數據統計
            {
              path: 'dashboard',
              name: 'dashboard',
              component: () => import('../views/proposal/[proposalName]/dashboard.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
            },
            // 修改提案計畫
            {
              path: 'edit',
              name: 'proposalEdit',
              component: () => import('../views/proposal/[proposalName]/edit.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
            },
            // 方案 router-view
            {
              path: 'options',
              name: 'option',
              component: () => import('../views/proposal/[proposalName]/options.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
              children: [
                // 方案列表
                {
                  path: '',
                  name: 'optionIndex',
                  component: () => import('../views/proposal/[proposalName]/options/index.vue'),
                },
                // 方案新增
                {
                  path: 'new',
                  name: 'optionNew',
                  component: () => import('../views/proposal/[proposalName]/options/new.vue'),
                },
                // 方案編輯
                {
                  path: ':optionId/edit',
                  name: 'optionEdit',
                  component: () => import('../views/proposal/[proposalName]/options/[optionId].vue'),
                },
              ]
            },
            // 贊助訂單 router-view
            {
              path: 'backers',
              name: 'backers',
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
              children: [
                // 贊助訂單列表
                {
                  path: '',
                  name: 'backersList',
                  component: () => import('../views/proposal/[proposalName]/backers/index.vue'),
                },
                // 贊助訂單詳情
                {
                  path: ':id',
                  name: 'backersDetail',
                  component: () => import('../views/proposal/[proposalName]/backers/[id].vue'),
                }
              ]
            },
            // 公告 router-view
            {
              path: 'announce',
              name: 'announce',
              component: () => import('../views/proposal/[proposalName]/announce.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
              children: [
                // 公告列表
                {
                  path: '',
                  name: 'announce',
                  component: () => import('../views/proposal/[proposalName]/announce/index.vue'),
                },
                // 新增公告
                {
                  path: 'new',
                  name: 'announceNew',
                  component: () => import('../views/proposal/[proposalName]/announce/new.vue'),
                },
                // 公告細節 router-view
                {
                  path: ':announceId',
                  name: 'announceId',
                  component: () => import('../views/proposal/[proposalName]/announce/announceId.vue'),
                  children: [
                    // 公告詳情
                    {
                      path: '',
                      name: 'announceIdIndex',
                      component: () => import('../views/proposal/[proposalName]/announce/[announceID]/index.vue'),
                    },
                    // 更新公告
                    {
                      path: 'edit',
                      name: 'announceIdEdit',
                      component: () => import('../views/proposal/[proposalName]/announce/[announceID]/edit.vue'),
                    },
                  ]
                },
              ]
            },
            // 商品留言 router-view
            {
              path: 'comments',
              name: 'comments',
              component: () => import('../views/proposal/[proposalName]/comments.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
              children: [
                // 商品留言列表
                {
                  path: '',
                  name: 'commentsIndex',
                  component: () => import('../views/proposal/[proposalName]/comments/index.vue'),
                },
                // 商品留言新增
                {
                  path: 'new',
                  name: 'commentsNew',
                  component: () => import('../views/proposal/[proposalName]/comments/new.vue'),
                },
              ]
            },
            // 退款 router-view
            {
              path: 'refunds',
              name: 'refunds',
              component: () => import('../views/proposal/[proposalName]/refunds.vue'),
              children: [
                // 退款列表
                {
                  path: '',
                  name: 'refundsIndex',
                  component: () => import('../views/proposal/[proposalName]/refunds/index.vue'),
                },
                // 退款詳情
                {
                  path: ':refundID',
                  name: 'refundsContent',
                  component: () => import('../views/proposal/[proposalName]/refunds/[refundID].vue'),
                },
              ]
            },
            // 常見問答 router-view
            {
              path: 'faqs',
              name: 'faqs',
              component: () => import('../views/proposal/[proposalName]/faqs.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
              children: [
                // 常見問答列表
                {
                  path: '',
                  name: 'faqsIndex',
                  component: () => import('../views/proposal/[proposalName]/faqs/index.vue'),
                },
                // 常見問答編輯
                {
                  path: ':faqID/edit',
                  name: 'faqsEdit',
                  component: () => import('../views/proposal/[proposalName]/faqs/[faqID].vue'),
                },
                // 常見問答新增
                {
                  path: 'new',
                  name: 'new',
                  component: () => import('../views/proposal/[proposalName]/faqs/new.vue'),
                },
              ]
            },
            // 提案金流設定
            {
              path: 'payment',
              name: 'payment',
              component: () => import('../views/proposal/[proposalName]/payment.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
            },
            // 提案商業檔案設定
            {
              path: 'businessProfile',
              name: 'businessProfile',
              component: () => import('../views/proposal/[proposalName]/profile.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout 
              },
            },
            // 即時客服 Router-view
            {
              path: 'onlinechat',
              name: 'onlinechat',
              component: () => import('../views/proposal/[proposalName]/onlinechat.vue'),
            },

          ]
        },
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
  ],
})

export function setupRouter(AppInstance:App<Element>) {
  permission(router);
  AppInstance.use(router);
}

export default router