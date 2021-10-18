import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
  state: {
    user: null,
    createUserData: null,
    userSuccessMsg : false,
    userValidateMsg : null,
  },

//   MUTATIONS
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    setCreateUserData(state, data){
        state.createUserData = data;
    },
    setSuccessMsg(state , msg ){
        state.userSuccessMsg = msg
    },
    setUserValidateMsg(state, validateMsg){
        state.userValidateMsg = validateMsg
    }

  },

 //   ACTIONS
  actions: {
    login({ commit }, credentials) {
      return axios.post("/auth/login", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },
    logout({ commit }) {
      commit("setUserData", null);
    },

    validateUser( {commit} ,userData ) {
      axios
        .post("/user/validate", userData)
        .then((data) => {
            if(data){
                commit("setCreateUserData", userData)
                commit("setUserValidateMsg" , null)
                router.push({
                    name: "user-confirm",
                });
            }
        })
        .catch((err) => {
            commit("setUserValidateMsg" , err.response.data)
        });
    },

    createUser({ commit }, userData){
        axios.post('/user/create',userData)
            .then(data=>{
                if(data){
                  if(data){
                    commit("setSuccessMsg", true);
                    commit("setCreateUserData", null)
                    router.push({
                      name:'user-list'
                    })
                  }
                   
                }
            })
            .catch(err=>console.log(err))
    },

    cancelCreateUser( {commit} ){
        commit("setCreateUserData", null)
        
    }
  },

//   GETTERS
  getters: {
    isLoggedIn: (state) => !!state.user,
    createUserData:(state)=>{
        if (state.createUserData) {
            return state.createUserData;
          }
    },
    userType: (state) => {
      if (state.user && state.user.user.role) {
        return state.user.user.role;
      }
      return -1;
    },
    userId: (state) => {
      if (state.user && state.user.user.id) {
        return state.user.user.id;
      }
    },
    userName: (state) => {
      if (state.user && state.user.user.name) {
        return state.user.user.name;
      }
    },
    userSuccessMsg: (state)=> {
        if(state.userSuccessMsg){
            return state.userSuccessMsg
        }
    },
    userValidateMsg: (state)=> {
        if(state.userValidateMsg){
            return state.userValidateMsg
        }
    },
  },
  plugins: [createPersistedState()],
});
