import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

//标签页
export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },

  {
    title: '博客管理',
    icon: 'folder-o',
    children: [
      { path: '/blogList', title: '博客列表' },
      { path: '/addBlog', title: '发布博客' },
      { path: '/blogCategory', title: '分类管理' },
    ]
  },

])


//左侧栏
export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },

  {
    title: '博客管理',
    icon: 'folder-o',
    children: [
      { path: '/blogList', title: '博客列表' },
      { path: '/addBlog', title: '发布博客' },
      { path: '/blogCategory', title: '分类管理' },

    ]
  },

])
