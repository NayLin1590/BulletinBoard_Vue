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
    userSuccessMsg: false,
    userValidateMsg: null,
    userDeleteMsg: false,
    userUpdateMsg: false,
    changePasswordMsg: false,
    changePasswordValidateMsg:null,

    createPostData: null,
    postValidateMsg: null,
    postSuccessMsg: false,
    postDeleteMsg: false,
    postEditId: null,
    editPostData: null,
    editPostValidateMsg: null,
    editPostMsg: false,
  },

  //   MUTATIONS
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    setCreateUserData(state, data) {
      state.createUserData = data;
    },
    setUserValidateMsg(state, validateMsg) {
      state.userValidateMsg = validateMsg;
    },
    setUserSuccessMsg(state, msg) {
      state.userSuccessMsg = msg;
    },
    setUserDeleteMsg(state, msg) {
      state.userDeleteMsg = msg;
    },
    setUserUpdateMsg(state, msg) {
      state.userUpdateMsg = msg;
    },
    setChangePasswordMsg(state, msg){
      state.changePasswordMsg =msg
    },
    setChangePasswordValidateMsg(state, msg){
      state.changePasswordValidateMsg =msg
    },

    // Post Section
    setCreatePostData(state, data) {
      state.createPostData = data;
    },
    setPostValidateMsg(state, validateMsg) {
      state.postValidateMsg = validateMsg;
    },
    setPostSuccessMsg(state, msg) {
      state.postSuccessMsg = msg;
    },
    setPostDeleteMsg(state, msg) {
      state.postDeleteMsg = msg;
    },
    setpostEditId(state, id) {
      state.postEditId = id;
    },
    setEditPostData(state, data) {
      state.editPostData = data;
    },
    setEditPostValidateMsg(state, data) {
      state.editPostValidateMsg = data;
    },
    setEditPostMsg(state, msg) {
      state.editPostMsg = msg;
    },
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

    validateUser({ commit }, userData) {
      axios
        .post("/user/validate", userData)
        .then((data) => {
          if (data) {
            commit("setCreateUserData", userData);
            commit("setUserValidateMsg", null);
            router.push({
              name: "user-confirm",
            });
          }
        })
        .catch((err) => {
          commit("setUserValidateMsg", err.response.data);
          setTimeout(() => {
            commit("setUserValidateMsg", null);
          }, 2000);
        });
    },

    createUser({ commit }, userData) {
      axios
        .post("/user/create", userData)
        .then((data) => {
          if (data) {
            if (data) {
              commit("setUserSuccessMsg", true);
              commit("setCreateUserData", null);
              router.push({
                name: "user-list",
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },
    cancelCreateUser({ commit }) {
      commit("setCreateUserData", null);
    },

    editUser({ commit }, userData) {
      axios.patch("/user/edit", userData).then((data) => {
        if (data) {
          commit("setUserUpdateMsg", true);
          router.push({
            name: "user-list",
          });
        }
      });
    },
    changePassword({ commit }, passwordData){
      axios.post("/user/changePassword",passwordData)
        .then(data=>{
          if(data){
            commit("setChangePasswordMsg", true)
            router.push({
              name: "user-list",
            });
          }
        })
        .catch(err=>{
          commit("setChangePasswordValidateMsg",err.response.data)
          setTimeout(() => {
            commit("setChangePasswordValidateMsg",null)
          }, 3000);
        })
    },

    userSuccessMsg({ commit }, msg) {
      commit("setUserSuccessMsg", msg);
    },
    userDeleteMsg({ commit }, msg) {
      commit("setUserDeleteMsg", msg);
    },
    userUpdateMsg({ commit }, msg) {
      commit("setUserUpdateMsg", msg);
    },
    changePasswordMsg({ commit }, msg){
      commit("setChangePasswordMsg", msg)
    },

    // post create section
    validatePost({ commit }, postData) {
      axios
        .post("/post/validateCreate", postData)
        .then((data) => {
          if (data) {
            commit("setCreatePostData", postData);
            commit("setPostValidateMsg", null);
            router.push({
              name: "post-confirm",
            });
          }
        })
        .catch((err) => {
          commit("setPostValidateMsg", err.response.data);
          setTimeout(() => {
            commit("setPostValidateMsg", null);
          }, 2000);
        });
    },
    createPost({ commit }, postData) {
      axios
        .post("/post/create", postData)
        .then((data) => {
          if (data) {
            if (data) {
              commit("setPostSuccessMsg", true);
              commit("setCreatePostData", null);
              setTimeout(() => {
                commit("setPostSuccessMsg", null);
              }, 3000);
              router.push({
                name: "post-list",
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },
    cancelCreatePost({ commit }) {
      commit("setCreatePostData", null);
    },
    postDeleteMsg({ commit }, msg) {
      commit("setPostDeleteMsg", msg);
      setTimeout(() => {
        commit("setPostDeleteMsg", null);
      }, 3000);
    },
    // post edit section
    postEditId({ commit }, id) {
      commit("setpostEditId", id);
    },
    validateEditPost({ commit }, postData) {
      axios
        .post("/post/validateEdit", postData)
        .then((data) => {
          if (data) {
            commit("setEditPostData", postData);
            commit("setEditPostValidateMsg", null);
            router.push({
              name: "post-edit-confirm",
            });
          }
        })
        .catch((err) => {
          commit("setEditPostValidateMsg", err.response.data);
          setTimeout(() => {
            commit("setEditPostValidateMsg", null);
          }, 2000);
        });
    },
    saveEditPost({ commit }, editData) {
      axios
        .patch("/post/update", editData)
        .then((data) => {
          if (data) {
            if (data) {
              commit("setEditPostMsg", true);
              setTimeout(() => {
                commit("setEditPostMsg", null);
              }, 3000);
              commit("setEditPostData", null);
              commit("setpostEditId", null);
              router.push({
                name: "post-list",
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },

  //   GETTERS
  getters: {
    isLoggedIn: (state) => !!state.user,

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
    // ----------------User Creation Section------------------
    createUserData: (state) => {
      if (state.createUserData) {
        return state.createUserData;
      }
    },
    userValidateMsg: (state) => {
      if (state.userValidateMsg) {
        return state.userValidateMsg;
      }
    },
    userSuccessMsg: (state) => {
      if (state.userSuccessMsg) {
        return state.userSuccessMsg;
      }
    },
    userDeleteMsg: (state) => {
      if (state.userDeleteMsg) {
        return state.userDeleteMsg;
      }
    },
    userUpdateMsg: (state) => {
      if (state.userUpdateMsg) {
        return state.userUpdateMsg;
      }
    },
    changePasswordMsg: (state) => {
      if (state.changePasswordMsg) {
        return state.changePasswordMsg;
      }
    },
    changePasswordValidateMsg:(state)=>{
      if(state.changePasswordValidateMsg){
        return state.changePasswordValidateMsg
      }
    },
    // --------------end----------------

    // --------------post creation section-------------------
    createPostData: (state) => {
      if (state.createPostData) {
        return state.createPostData;
      }
    },
    postValidateMsg: (state) => {
      if (state.postValidateMsg) {
        return state.postValidateMsg;
      }
    },
    postSuccessMsg: (state) => {
      if (state.postSuccessMsg) {
        return state.postSuccessMsg;
      }
    },
    postDeleteMsg: (state) => {
      if (state.postDeleteMsg) {
        return state.postDeleteMsg;
      }
    },
    postEditId: (state) => {
      if (state.postEditId) {
        return state.postEditId;
      }
    },
    editPostData: (state) => {
      if (state.editPostData) {
        return state.editPostData;
      }
    },
    editPostValidateMsg: (state) => {
      return state.editPostValidateMsg;
    },
    editPostMsg: (state) => {
      return state.editPostMsg;
    },
    // --------------end----------------
  },
  plugins: [createPersistedState()],
});
