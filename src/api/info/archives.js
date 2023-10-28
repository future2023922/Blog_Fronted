import {request} from '../service'

export default {
  getArchives() {
    return request({
      url: '/archives/getArchivesList',
      method: 'get'
    })
  }
}
