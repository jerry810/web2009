<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-form label-width="70px" :model="addForm" ref="addForm">
      <el-form-item label="商品类别">
        <el-button type="primary" @click="dialogCategoryHandle" style="float:left"
          >类别选择</el-button
        >
        <!-- 显示对应选择的数据，有数据则显示无数据即为空 -->
        <span class="treeData">{{treeData.name}}</span>
        <!-- 嵌套的对话框需要在内层对话框中加入append-to-body属性 -->
        <el-dialog
          label-width="50%"
          append-to-body
          title="类别选择"
          :visible.sync="dialogCategoryVisible"
        > <!-- 父级接收子级传递的数据 -->
          <GoodsTree @Tree="getTreeData"/>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="addForm.name" />
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="addForm.sellPoint" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="addForm.num" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="addForm.price" />
      </el-form-item>
        <el-form-item label="商品图片">
                <el-button type="primary" class="location" @click="dialogUploadHandle" style="float:left">图片上传</el-button>
                <img :src="uploadData.url" alt="" class="upload-img">
                <el-dialog
                    width="50%"
                    append-to-body
                    title="图片上传"
                    :visible.sync="dialogUploadVisible"
                >
                    <GoodsUpLoad @onUpload="getUpload"/>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogUploadVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
      <el-form-item label="商品描述">
        <!-- 富文本编辑器 -->
        <GoodsWangEdter @onEditer="getEditor"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addGoodsHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import GoodsTree from "./GoodsTree";
import GoodsUpLoad from './GoodsUpLoad'
import GoodsWangEdter from './GoodsWangEdter'
export default {
  components: {
    GoodsTree,
    GoodsUpLoad,
    GoodsWangEdter
  },
  data() {
    return {
      dialogVisible: false, //外层对话框
      addForm: {//添加的表单
        name: "",
        sellPoint: "",
        num: "",
        price: "",
      },
      dialogCategoryVisible: false, //内层对话框
      dialogUploadVisible:false,//图片上传
      treeData:{//存储tree组件中获取的数据 类别选择
         name:"",
         cid:""
      },
      uploadData:{//存储图片上传的数据

      },
      editorData:"",//存储富文本数据
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dialogCategoryHandle() {
      //点击让内层的对话框显示
      this.dialogCategoryVisible = true;
    },
    dialogUploadHandle(){
      this.dialogUploadVisible=true;
    },//读取子级组件tree中传递的数据 类别的数据 并让对应的名字在页面上显示
    getTreeData(data){
     console.log(data);
     this.treeData=data;
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
   //获取富文本数据
   getEditor(data){
      console.log(data);
      this.editorData=data;
   },
   //确定按钮事件  添加商品事件
   addGoodsHandle(){
      this.$api.insertTbItem({
        cid:this.treeData.cid,
        title:this.addForm.name,
        sellPoint:this.addForm.sellPoint,
        price:this.addForm.price,
        num:this.addForm.num,
        desc:this.editorData,
        image:this.uploadData.url
      }).then(res=>{
        console.log(res.data);
        if(res.data.status===200){
          this. dialogVisible=false;//关闭外层对话框
          //刷新视图  通知list组件刷新视图
          this.$bus.$emit("refresh",true)
        }
      }).catch(error=>{
        console.log(error);
        
      })
   }
  },
  mounted() {
    this.$bus.$on("Add", (flag) => {
      this.dialogVisible = flag;
    });
  },
};
</script>

<style scoped>
.treeData{
  float: left;
  margin-left: 10px;
}
.upload-img{
  width:300px;
  float: left;
}
</style>