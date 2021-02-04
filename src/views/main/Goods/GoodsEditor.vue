<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="EditordialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-form label-width="70px" :model="editorForm" ref="editorForm">
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
            <el-button type="primary" @click="EditordialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="editorForm.name" />
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="editorForm.sellPoint" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="editorForm.num" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="editorForm.price" />
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
        <!-- 富文本编辑器 -->    <!-- 此处将网络请求后的数据回传到组件中 -->
        <GoodsWangEdter @onEditer="getEditor"  :currentData="editorData"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click=" EditordialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editorGoodsHandle">确 定</el-button>
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
     EditordialogVisible: false, //外层对话框
      editorForm: {//添加的表单
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
       url:""
      },
      editorData:"",//存储富文本数据
      currentData:{},//当前数据
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
   //确定按钮事件  编辑商品事件 重新提交数据
   editorGoodsHandle(){
    this.$api.updateTbItem({
     id:this.currentData.id,
     cid:this.treeData.cid,
     title:this.editorForm.name,
     sellPoint:this.editorForm.sellPoint,
     price:this.editorForm.price,
     num:this.editorForm.num,
     desc:this.editorData,
     image:this.uploadData.url
    }).then(res=>{
        console.log(res.data);
        
    }).catch(error=>{
        console.log(error);
        
    })
   }
  },
  mounted() {
    this.$bus.$on("Editor", (row) => {
      this.EditordialogVisible = true;
      this.currentData=row;//当前数据 
      //获取预更新数据，响应在视图上
    this.$api.preUpdateItem({
        id:row.id
    }).then(res=>{
        console.log(res.data);
        //赋值
        this.treeData.name=res.data.result[0].cid;
        this.editorForm.name=res.data.result[0].title;
        this.editorForm.sellPoint=res.data.result[0].sellPoint;
        this.editorForm.price=res.data.result[0].price;
        this.editorForm.num=res.data.result[0].num;
        this.uploadData.url=res.data.result[0].image;
        this.editorData=res.data.result[0].descs;//此处需要把数据传递到富文本中

    })
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