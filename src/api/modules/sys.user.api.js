import { find, assign } from 'lodash'
import {request} from "@/api/service";
import user from "@/store/modules/d2admin/modules/user";

const users = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: 'Admin' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: 'Editor' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: 'User1' }
]

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // 模拟数据
    mock
      .onAny('/login')
      .reply(config => {
        const user = find(users, tools.parse(config.data))
        return user
          ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
          : tools.responseError({}, '账号或密码不正确')
      })
    // 接口请求
    return requestForMock({
      url: '/login',
      method: 'post',
      data
    })
  },
  userLogin(username,password){
    return request({
      url: '/user/login',
      method: 'post',
      data:{
        username,
        password
      }
    })
  },
  userRegister(userInfo){
    return request({
      url: '/user/addUser',
      method: 'post',
      data: userInfo
    })
  },
  getAllUser(current,limit){
    return request({
      url: `/user/getAllUser/${current}/${limit}`,
      method: 'get'
    })
  }
})

// export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
//   /**
//    * @description 登录
//    * @param {Object} data 登录携带的信息
//    */
//   SYS_USER_LOGIN (data = {}) {
//     // 接口请求
//     return request({
//       method: 'post',
//       data:{
//         url: '/user/login',
//         method: 'post',
//         data:{
//           username,
//           password
//         }
//       }
//     })
//   }
// })

