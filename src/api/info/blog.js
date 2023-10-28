import {request} from '../service'

export default {
  //获取后台所有博客列表
  getBlogList (current, limit, queryBlog) {
    return request({
      url: `/blog/getAllOfAllBlog/${current}/${limit}`,
      method: 'post',
      data: queryBlog
    })
  },
  //添加博客信息
  addBlog (blogQuery) {
    return request({
      url: '/blog/addBlog/',
      method: 'post',
      data: blogQuery
    })
},
  //删除某篇博客
  deleteBlogById (id) {
    return request({
      url: `/blog/deleteBlog/${id}`,
      method: 'delete'
    })
  },
  //获取某篇博客及作者的信息
  getBlog (blogId) {
    return request({
      url: `/blog/getBlog/${blogId}`,
      method: 'get',
    })
  },
//  更新某篇博客
  updateBlog(blogQuery) {
    return request({
      url: '/blog/updateBlog/',
      method: 'post',
      data: blogQuery
    })
  }


}
