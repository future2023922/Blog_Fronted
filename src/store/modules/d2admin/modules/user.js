export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {
      name: '',
    }
  },
  getters: {
    name: state => {
      if(!state.info.name){
        return sessionStorage.getItem("name");
      }
      return state.info.name;
    }
  },
  mutations: {

    //这里是set方法
    setName(state,demoValue){
      state.info.name = demoValue
      sessionStorage.setItem("name",demoValue)
    }

  },

  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    async set ({ state, dispatch }, info) {
      // store 赋值
      state.info = info
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      }, { root: true })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    async load ({ state, dispatch }) {
      // store 赋值
      state.info = await dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      }, { root: true })
    }
  }
}
