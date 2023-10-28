import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  //用户后台
  {
    path: '/',
    redirect: { name: 'login' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')

      },
      {
        path: 'blogList',
        name: 'blogList',
        meta: {
          title: '博客列表',
          auth: true
        },
        component: _import('admin/blog/blogList')
      },
      {
        path: 'addBlog',
        name: 'blogInfo',
        meta: {
          title: '发布博客',
          auth: true
        },
        component: _import('admin/blog/blogInfo')
      },
      {
        path: 'blogInfo/:id', //相当于sql语句中的where id =？
        name: 'blogInfo',
        meta: {
          title: '编辑博客',
          auth: true
        },
        component: _import('admin/blog/blogInfo'),
        hidden: true
      },
      {
        path: 'blogCategory',
        name: 'blogCategory',
        meta: {
          title: '分类管理',
          auth: true
        },
        component: _import('admin/blog/blogCategory')
      },
      {
        path: 'blogComment',
        name: 'blogComment',
        meta: {
          title: '评论管理',
          auth: true
        },
        component: _import('admin/blog/blogComment')
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        meta: {
          title: '个人中心',
          auth: true
        },
        component: _import('admin/user/personalCenter')
      },
      {
        path: 'userList',
        name: 'userList',
        meta: {
          title: '用户列表',
          auth: true
        },
        component: _import('admin/user/userList')
      },

      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  //用户前台
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '进入网站',
      auth: true
    },
    component: _import('frontDesk/home')
  },

  // {
  //   path: '/blog',
  //   name: 'blog',
  //   meta: {
  //     title: '博客',
  //     auth: true
  //   },
  //   component: _import('frontDesk/blog')
  // },
  {
    path: '/blogDetail',
    name: 'blogDetail',
    meta: {
      title: '博客',
      auth: true
    },
    component: _import('frontDesk/blogDetail')
  },
  {
    path: '/archives',
    name: 'archive',
    meta: {
      title: '归档',
      auth: true
    },
    component: _import('frontDesk/archives')
  },


]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  },
//  注册
  {
    path: '/regist',
    name: 'regist',
    component: _import('system/regist')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
