import {request} from '../service'

export default {
  //获取某篇博客的评论列表
  getCommentOfBlogList (blogId) {
    return request({
      url: `/blog/comment/getCommentList/${blogId}/`,
      method: 'get',
    })
  },

// 回复/发布评论
  replyComments(comment){
    return request({
      url: '/blog/comment/addComment/',
      method: 'post',
      data: comment
    })
  },

  deletedComments(commentId){
    return request({
      url: `/blog/comment/deleteComment/${commentId}`,
      method: 'delete'
    })
  },

//  获取后台所有博客的评论列表
  getCommentList (current, limit, queryBlog) {
    return request({
      url: `/blog/getAllOfAllBlog/${current}/${limit}`,
      method: 'post',
      data: queryBlog
    })
  },



}
