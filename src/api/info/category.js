import {request} from '../service'

export default {
//  获取分类信息
  getCategoryList(){
    return request({
      url:'/blog/category/getAllOfAllCategory',
      method: 'get'
    })
  },
  getBlogCount(){
    return request({
      url:'/blog/category/getCategoryBlogCount',
      method: 'get'
    })
  },
  //  添加分类
  addCategory(categoryQuery){
    return request({
      url:'/blog/category/addCategory',
      method: 'post',
      data: categoryQuery
    })
  },

//  删除分类
  deleteCategoryById (id) {
    return request({
      url: `/blog/category/deleteCategory/${id}`,
      method: 'delete'
    })
  },
//  因为有$emit的存在，所以不需要专门获取分类的信息，可直接传值
//  编辑分类
  updateCategory(category) {
    return request({
      url: '/blog/category/updateCategory/',
      method: 'post',
      data: category
    })
  }

}
