import router from'./index'
import store from '../store'
router.beforeEach((to,from,next)=>{
    if(to.meta.isLogin){
        let token=store.state.login.user.token;
        if(token){
            next();
        }else{
            next({//跳转到登录页面
                name:"Login"
            })
        }
    }else{
        next();
    }
})

