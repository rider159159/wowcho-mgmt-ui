import { type App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import permission from './permission'
import DefaultLayout from '../components/layoutWrapper/DefaultLayout.vue'
import AdminMenuLayout from '../components/layoutWrapper/AdminMenuLayout.vue'
import FullWidthLayout from '@/components/layoutWrapper/FullWidthLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/routerDemo',
      name: 'routerDemo',
      component: async () => await import('../views/routerDemo.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: async () => await import('../views/demo.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // TODO: 以上範例用，上線移除
    // 首頁
    // {
    //   path: '/',
    //   name: 'home',
    //   component: async () => await import('../views/home/index.vue'),
    //   meta: {
    //     keepAlive: false,
    //     layout: DefaultLayout
    //   }
    // },
    // 登入
    {
      path: '/login',
      name: 'login',
      component: async () => await import('../views/login/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 註冊
    {
      path: '/signup',
      name: 'signup',
      component: async () => await import('../views/signup/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 錯誤頁面
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: async () => await import('../views/error.vue'),
      meta: {
        keepAlive: false
      }
    },
    // 關於我們
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue'),
      meta: {
        keepAlive: false,
        layout: FullWidthLayout
      }
    },
    // 使用條款
    {
      path: '/terms_of_use',
      name: 'termsOfUse',
      component: () => import('../views/termsOfUse/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 隱私權條款
    {
      path: '/privacy_publicy',
      name: 'privacyPublicy',
      component: () => import('../views/privacyPublicy/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 常見問題
    {
      path: '/common_problem',
      name: 'commonProblem',
      component: () => import('../views/commonProblem/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 提案諮詢頁面
    {
      path: '/proposalConsulation',
      name: 'proposalConsulation',
      component: async () => await import('../views/proposalConsulation/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 提案紀錄 router-view
    {
      path: '/proposal',
      name: 'proposal',
      component: async () => await import('../views/proposal.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      },
      children: [
        // 提案紀錄列表
        {
          path: '',
          name: 'proposalIndex',
          component: async () => await import('../views/proposal/index.vue'),
          meta: {
            keepAlive: false,
            layout: DefaultLayout
          }
        },
        // 新增提案
        {
          path: 'new',
          name: 'proposalNew',
          component: async () => await import('../views/proposal/new.vue'),
          meta: {
            keepAlive: false,
            layout: DefaultLayout
          }
        },
        // 提案紀錄列表 router-view
        {
          path: ':proposal',
          name: 'proposalName',
          component: async () => await import('../views/proposal/[proposalName].vue'),
          children: [
            // 查看提案計畫草稿預覽
            {
              path: '',
              name: 'proposalNameIndex',
              component: async () => await import('../views/proposal/[proposalName]/index.vue')
            },
            // 查看募資提案上線進度與數據統計
            {
              path: 'dashboard',
              name: 'dashboard',
              component: async () => await import('../views/proposal/[proposalName]/dashboard.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              }
            },
            // 修改提案計畫
            {
              path: 'edit',
              name: 'proposalEdit',
              component: async () => await import('../views/proposal/[proposalName]/edit.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              }
            },
            // 方案 router-view
            {
              path: 'options',
              name: 'option',
              component: async () => await import('../views/proposal/[proposalName]/options.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              },
              children: [
                // 方案列表
                {
                  path: '',
                  name: 'optionIndex',
                  component: async () => await import('../views/proposal/[proposalName]/options/index.vue')
                },
                // 方案新增
                {
                  path: 'new',
                  name: 'optionNew',
                  component: async () => await import('../views/proposal/[proposalName]/options/new.vue')
                },
                // 方案編輯
                {
                  path: ':optionId/edit',
                  name: 'optionEdit',
                  component: async () => await import('../views/proposal/[proposalName]/options/[optionId].vue')
                }
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
                  component: () => import('../views/proposal/[proposalName]/backers/index.vue')
                },
                // 贊助訂單詳情
                {
                  path: ':id',
                  name: 'backersDetail',
                  component: () => import('../views/proposal/[proposalName]/backers/[id].vue')
                }
              ]
            },
            // 公告 router-view
            {
              path: 'announce',
              name: 'announce',
              component: async () => await import('../views/proposal/[proposalName]/announce.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              },
              children: [
                // 公告列表
                {
                  path: '',
                  name: 'announce',
                  component: async () => await import('../views/proposal/[proposalName]/announce/index.vue')
                },
                // 新增公告
                {
                  path: 'new',
                  name: 'announceNew',
                  component: async () => await import('../views/proposal/[proposalName]/announce/new.vue')
                },
                // 公告細節 router-view
                {
                  path: ':announceId',
                  name: 'announceId',
                  component: async () => await import('../views/proposal/[proposalName]/announce/announceId.vue'),
                  children: [
                    // 公告詳情
                    {
                      path: '',
                      name: 'announceIdIndex',
                      component: async () => await import('../views/proposal/[proposalName]/announce/[announceID]/index.vue')
                    },
                    // 更新公告
                    {
                      path: 'edit',
                      name: 'announceIdEdit',
                      component: async () => await import('../views/proposal/[proposalName]/announce/[announceID]/edit.vue')
                    }
                  ]
                }
              ]
            },
            // 商品留言 router-view
            {
              path: 'comments',
              name: 'comments',
              component: async () => await import('../views/proposal/[proposalName]/comments.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              },
              children: [
                // 商品留言列表
                {
                  path: '',
                  name: 'commentsIndex',
                  component: async () => await import('../views/proposal/[proposalName]/comments/index.vue')
                },
                // 商品留言新增
                {
                  path: 'new',
                  name: 'commentsNew',
                  component: async () => await import('../views/proposal/[proposalName]/comments/new.vue')
                }
              ]
            },
            // 退款 router-view
            {
              path: 'refunds',
              name: 'refunds',
              component: async () => await import('../views/proposal/[proposalName]/refunds.vue'),
              children: [
                // 退款列表
                {
                  path: '',
                  name: 'refundsIndex',
                  component: async () => await import('../views/proposal/[proposalName]/refunds/index.vue')
                },
                // 退款詳情
                {
                  path: ':refundID',
                  name: 'refundsContent',
                  component: async () => await import('../views/proposal/[proposalName]/refunds/[refundID].vue')
                }
              ]
            },
            // 常見問答 router-view
            {
              path: 'faqs',
              name: 'faqs',
              component: async () => await import('../views/proposal/[proposalName]/faqs.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              },
              children: [
                // 常見問答列表
                {
                  path: '',
                  name: 'faqsIndex',
                  component: async () => await import('../views/proposal/[proposalName]/faqs/index.vue')
                },
                // 常見問答編輯
                {
                  path: ':faqID/edit',
                  name: 'faqsEdit',
                  component: async () => await import('../views/proposal/[proposalName]/faqs/[faqID].vue')
                },
                // 常見問答新增
                {
                  path: 'new',
                  name: 'new',
                  component: async () => await import('../views/proposal/[proposalName]/faqs/new.vue')
                }
              ]
            },
            // 提案金流設定
            {
              path: 'payment',
              name: 'payment',
              component: async () => await import('../views/proposal/[proposalName]/payment.vue'),
              meta: {
                keepAlive: false,
                layout: AdminMenuLayout
              }
            },
            // 提案商業檔案設定
            // {
            //   path: 'businessProfile',
            //   name: 'businessProfile',
            //   component: async () => await import('../views/proposal/[proposalName]/profile.vue'),
            //   meta: {
            //     keepAlive: false,
            //     layout: AdminMenuLayout
            //   }
            // },
            // 即時客服 Router-view
            {
              path: 'onlinechat',
              name: 'onlinechat',
              component: async () => await import('../views/proposal/[proposalName]/onlinechat.vue')
            }

          ]
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: async () => await import('../views/proposal/[proposalName]/profile.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    {
      path: '/',
      name: 'home',
      component: async () => await import('../views/home/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    }
  ]
})

export function setupRouter (AppInstance: App<Element>): void {
  permission(router)
  AppInstance.use(router)
}

export default router
