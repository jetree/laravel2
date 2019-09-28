import { OK, CREATE, UNPROCESSABLE_ENTITY } from '../util'

const state = {
  user: null,
  apiState: null,
  loginErrorMessages: null,
  registerErrorMessages: null
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
  },
  setRegisterErrorMessages(state,message){
    state.registerMessages = message
  }
}

const actions = {
  async register(context,data){
    context.commit('setApiState',null)
    const response = await axios.post('/api/register',data)

    if(response.status === CREATE){
      context.commit('setApiState',true)
      context.commit('setUser',response.data)
      return false
    }

    context.commit('setApiState',false)
    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setRegisterErrorMessages',response.data.errors)
    }else{
      context.commit('error/setCode',response.status,{ root:true })
    }
  },

  async login(context,data){
    context.commit('setApiState',null)
    const response = await axios.post('/api/login',data)
    
    if(response.status === OK){
      context.commit('setApiState',true)
      context.commit('setUser',response.data)
      return false
    }
    
    context.commit('setApiState',false)
    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setLoginErrorMessages',response.data.errors)
    }else{
      context.commit('error/setCode',response.status,{ root:true })
    }
  },

  async logout(context){
    context.commit('setApiState',null)
    const  response = await axios.post('/api/logout')

    if (response.status === OK) {
      context.commit('setApiState', true)
      context.commit('setUser', null)
      return false
    }
    context.commit('setApiState',false)
    context.commit('error/setCode',response.status,{ root:true })


  },
  async currentUser(context){
    context.commit('setApiState', true)
    const response = await axios.get('/api/user')
    const user = response.data || null

    if (response.status === OK) {
      context.commit('setApiState', true)
      context.commit('setUser', user)
      return false
    }

    context.commit('setApiState', false)
    context.commit('error/setCode', response.status, { root: true })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}