<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录|注册</span>
      </div>
      <!-- 内容部分嵌套一个tab标签 -->
      <el-tabs v-model="currentIndex" stretch @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <!-- :model属性的目的是绑定输入框中的数据 -->
          <el-form
            :model="loginForm"
            status-icon
            ref="loginForm"
            :rules="rules"
          >
            <!-- label属性视图显示的输入框前面的名字 -->
            <!-- prop是匹配验证规则的 -->
            <el-form-item label="用户名" label-width="60px" prop="username">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <!-- 给label-width的宽度可以让名字和输入框放在同一行显示 -->
            <el-form-item label="密码" label-width="60px" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- 按钮提交时要把ref属性值提交 -->
              <el-button type="primary" @click="submitForm('loginForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            :rules="rules"
            status-icon
            ref="registerForm"
          >
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input type="text" v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px">
              <el-input type="text" v-model="registerForm.email" />
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input type="password" v-model="registerForm.password" />
            </el-form-item>
            <el-form-item
              label="确认密码"
              label-width="80px"
              prop="configurePassword"
            >
              <el-input
                type="password"
                v-model="registerForm.configurePassword"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import api from '../api'
import {mapMutations} from 'vuex'
export default {
  data() {
    //验证规则
    //用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不可以为空"));
      } else {
        callback(); //响应输入框中的图标
      }
    };
    //密码验证
    var validatePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不可以为空"));
      } else if (value.length < 3) {
        callback(new Error("密码长度不够，请输入六位密码"));
      } else {
        callback();
      }
    };
    var validateConfigurePassword=(rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    }
    return {
      currentIndex: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        configurePassword: "",
        email: "",
      },
      active:"login",//默认的tab.name=login
      rules: {
        //验证规则和触发事件
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        configurePassword:[{validator:validateConfigurePassword,trigger: "blur"}]
      },
    };
  },
  methods: {
    ...mapMutations("login",["setUser"]),
      submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            if(this.active==="login"){
                //登录  
                console.log(this.loginForm);
                api.login(this.loginForm).then(res=>{
                  console.log(res.data);
                  if(res.data.status===200){
                     this.setUser(res.data);
                     localStorage.setItem("ego",JSON.stringify(res.data))
                     this.$router.push('/');
                  }else{
                    //给用户提示
                    const h=this.$createElement;
                    this.$notify({
                      title:"登录失败",
                      message:h("用户名密码错误")
                    })
                  }
                })
            }else{
                //注册
                  console.log(this.registerForm);
                  api.register(this.registerForm).then(res=>{
                    console.log(res.data);
                    if(res.data.status===200){
                       const h=this.$createElement;
                    this.$notify({
                      title:"注册成功",
                     
                    })
                    }else{
                       const h=this.$createElement;
                    this.$notify({
                      title:"注册失败",
                     
                    })
                    }
                  })
            }
        
        } else {
          return;
        }
      });
    },
    handleClick(tab,e){
        //根据tab的name属性就可以知道是哪一个标签
          console.log(tab.name);
       this.active=tab.name;
    }
  },
};
</script>

<style scoped lang="less">
.login {
  width: 1200px;
  margin: 0 auto;
  .box-card {
    width: 500px;
    margin: 70px auto;
  }
}
</style>