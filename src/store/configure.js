const configure = {
  state: {
    HOST: 'http://localhost:9090', // 后台访问的根目录
    activeName: '' // 当前选中的菜单名
  },
  getters: {
    activeName: state => {
      let activeName = state.activeName
      if (!activeName) {
        activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
      }
      return activeName
    }
  },
  mutations: {
    setActiveNames: (state, activeName) => {
      state.activeName = activeName
      window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
    }
  }
}

export default configure
