<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="查询内容" name="first">
     <ul>
       <li v-for="(item,index) in Data" :key="index">
         <img :src="item.image" alt="">
       </li>
     </ul>
    </el-tab-pane>
    <el-tab-pane label="修改内容" name="second">修改内容</el-tab-pane>
    <el-tab-pane label="删除内容" name="third">
      <el-button @click="deleteHandle">删除</el-button>
    </el-tab-pane>
    <el-tab-pane label="增加内容" name="fourth">
      <el-form label-width="70px" :model="addContentForm" ref="addContentForm">
        <el-form-item label="广告名称">
          <el-input  type="text" v-model="addContentForm.name"/>
        </el-form-item>
        <el-form-item label="广告图片">
            <img :src="uploadData.url" alt="" class="upload-img">
        <GoodsUpLoad @onUpload="getUpload"/>
        </el-form-item>
        <el-form-item label="广告地址">
            
        <el-input type="text" v-model="addContentForm.url"/>
        </el-form-item>
        <el-button @click="clickHandle">确定</el-button>
      </el-form>
    </el-tab-pane>
   
  </el-tabs>
</template>

<script>
import GoodsUpLoad from '../Goods/GoodsUpLoad'
export default {
  components:{
GoodsUpLoad
  },
  data(){
    return{
     content:{},
      activeName: 'first',
      addContentForm:{
        name:"",
        url:""
      },
      uploadData:{
        
      },
      Data:[]
    }
  },
   methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
       //读取图片上传的数据
   getUpload(data){
     console.log(data);
     if(data.url){
       //图片显示在页面上的第二步：图片路径替换
       data.url=data.url.replace("upload","http://localhost:4000");
     }
     this. uploadData=data;
     
   },
  //确定按钮  提交数据库
   clickHandle(){
     console.log(this.content.pid);
     
      this.$api.insertTbContent({
        pid:this.content.pid,
        name:this.addContentForm.name,
        url:this.addContentForm.url,
        image:this.uploadData.url

      }).then(res=>{
      
        
      })
   },
   //删除按钮 提交数据库删除数据
deleteHandle(){
  console.log(this.content);
  
   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteContentByIds({
              id: this.content.id,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1);
              }else{
                  //删除失败
                    this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
}
    },
  mounted(){
    this.$bus.$on("onData",data=>{
    console.log(data);
    this.content=data;
    console.log(data.pid);
    //内容增加
    
    /* 查询 */
    this.$api.contentlectTbContentAllByCategoryId({
      pid:this.content.pid
    }).then(res=>{
     console.log(res.data);
     
      this.Data=res.data.result;
      
    })
    
    })
  }
}
</script>

<style scoped>
.upload-img{
  width:50px;
  height:50px;
}
</style>