import { OK, UNPROSESSABLE_ENTITY } from '../util'

const state = {
  user: null,
  apiState: null,
  loginErrorMessages: null
}

const getters = {
  check: state => !!state.user,
  username: state => state.user ? state.user.name : ''

}

const mutations = {
  setUser(state,user){
    state.user = user
  },
  setApiState(state,status){
    state.status = status
  },
  setLoginErrorMessages(state,messages){
    state.loginErrorMessages = messages
  }
}

const actions = {
  async register(context,data){
    const response = await axios.post('/api/register',data)
    context.commit('setUser',response.data)
  },
  async login(context,data){
    context.comit('setApiState',null)
    const response = await axios.post('/api/login',data)
    
    if(response.status === OK){
      context.commit('setApiState',true)
      context.commit('setUser',response.data)
      return false
    }
    
    context.commit('setApiState',false)
    if(response.status === UNPROSESSABLE_ENTITY){
      context.commit('setLoginErrorMessages',response.errors)
    }else{
      context.commit('error/setCode',response.state,{ root:true })
    }
  },
  async logout(context){
    const  response = await axios.post('/api/logout')
    context.commit('setUser',null)
  },
  async currentUser(context){
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser',user)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}