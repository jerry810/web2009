<template>
  <div class="head">
    <!-- 查询需要使用form表单 -->               <!-- 输入框需要阻止默认事件 -->
    <el-form ref="searchForm"  :model="search" @submit.native.prevent>
     <el-form-item>
                                   <!-- 按键事件中的回车事件 -->
       <el-input v-model="search.context" @keyup.enter.native="searchHandle"/>
     </el-form-item>
      <el-form-item>
       <el-button type="primary" @click="searchHandle">查询</el-button>
     </el-form-item>
      <el-form-item>
       <el-button type="primary" @click="addHandle">添加</el-button>
     </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
 data(){
   return{
     search:{
       context:""
     }
   }
 },
 props:{
searchHandle:{
    type:Function,
    required:true
}
 },
 methods:{
   searchHandle(){
    this.searchHandle({search:this.search.context}).then(res=>{
        console.log(res.data);
        this.$bus.$emit("onSearch",res.data.result)
    })
   },
   addHandle(){
     this.$bus.$emit("onFlag",true);
    
   }
 }
}
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    margin:0 auto;
    width:1200px;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1000px;
           
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>