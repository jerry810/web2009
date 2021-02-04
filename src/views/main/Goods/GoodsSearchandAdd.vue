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
 methods:{
   searchHandle(){
    if(this.search.context){
       //查询操作
     this.$api.search({
       search:this.search.context
     }).then(res=>{
       if(res.data.status==200){
           //将数据传递给兄弟元素  传递的是数组因此接收也是数组
       this.$bus.$emit("searchData",res.data.result)
       console.log(res.data);
       }
     
       
     })
    }else{
      console.log('请输入数据');
      
    }
   },
   addHandle(){
     //将true发送给对话框组件
     this.$bus.$emit("Add",true);
   }
 }
}
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    width:1200px;
    margin:0 auto;

    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 900px;
            margin-left:20px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>