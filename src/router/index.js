import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import PostList from "../pages/post/PostList";
import UserList from "../pages/user/UserList";
import UserRegister from "../pages/user/UserRegister"
import UserConfirm from "../pages/user/UserConfirm"
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/post",
        name: "post-list",
        component: PostList,
    },
    {
        path: "/user",
        name: "user-list",
        component: UserList,
    },
    {
        path: "/register",
        name: "user-register",
        component: UserRegister,
    },
    {
        path: "/confirm",
        name: "user-confirm",
        component: UserConfirm,
    },
    {
        path: "/*",
        redirect: "/post",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    const createUserData = store.getters.createUserData;
    const userType = store.getters.userType;
    if (!loggedIn && to.name != "login" && to.name != "post-list") {
        return next("/login");
    }
    next();
    if(loggedIn && to.name == "login"){
        return next("/post")
    }
    next();
    
    if(!createUserData && to.name == "user-confirm" && userType == 0){
        return next("/register")
    }
    
    next();
   
    if(loggedIn && userType == 1 && to.name == "user-list"){
        return next("/login")
    }
    next();
    if(loggedIn && to.name == "user-register" && userType == 1){
        return next("/login")
    }
    
});

export default router;
