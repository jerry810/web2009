<template>
  <div>
    <!-- 自定义字段名称 -->
    <el-tree
      :props="defaultProps"
      lazy
      :load="loadNode"
      @node-click="handleNodeClick"
      :render-content="renderContent"
      :expand-on-click-node="false"
    >
    </el-tree>
    <!-- 点击添加按钮弹出对话框 -->
    <el-dialog
      title="增加子导航"
      :visible.sync="dialogAddNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="navForm" ref="navForm">
        <el-form-item label="导航名字">
          <el-input type="text" v-model="navForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" dialogAddNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNav"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改子导航 -->
    <el-dialog
      title="修改子导航"
      :visible.sync="dialogEditorNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="navEditorForm" ref="navEditorForm">
        <el-form-item label="导航名字">
          <el-input type="text" v-model="navEditorForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" dialogEditorNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorNav"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      dialogAddNavVisible: false,
      dialogEditorNavVisible:false,
      navForm: {
        name: "",
      },
      navEditorForm:{//修改对话框
        name:""
      },
      navContent:{}
    };
  },
  /* 在app.vue上配置了页面整体刷新之后，哪个页面使用，就使用这个，该组件中哪里使用哪里用 */
  inject:["reload"],
  methods: {
    http(id, resolve) {
      this.$api.selectContentCategoryByParentId(id).then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          return resolve(res.data.result);
        } else {
          return resolve([]);
        }
      });
    },
//tree事件
    loadNode(node, resolve) {
      if (node.level == 0) {
        this.http({ id: 1 }, resolve);
      }
      if (node.level >= 1) {
        //存储pid
        this.navContent=node.data;
        this.$bus.$emit("onData",node.data);
        console.log(node.data);
        
        this.http(
          {
            id: node.data.pid,
          },
          resolve
        );
      }
    },
    handleNodeClick(node) {

    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node,data)}
            >
              添加子分类
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除子分类
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.editor(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    },
    /***
     * 添加按钮
     */
    append(node,data) {
        this.navContent=node.data;
      this.dialogAddNavVisible = true;
    },
    //删除按钮
    remove(node,data) {
        this.$api.deleteContentCategoryById({
            pid:node.data.pid
        }).then(res=>{
            console.log(res.data);
            if(res.data.status===200){
                this.reload();//调用方法，页面整体刷新
            }
            
        })
    },
    //修改按钮
    editor(node,data) {
        this.navContent=data;
        this.dialogEditorNavVisible=true;
    },
    /***
     *
     * 对话框关闭按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    /* 确定添加子导航按钮事件 */
    addNav(){
     this.$api.insertContentCategory({
         pid:this.navContent.pid,
         name:this.navForm.name
     }).then(res=>{
         console.log(res.data);
         if(res.data.status===200){
             this.dialogAddNavVisible=false;
         }
     })
    
    },
    /***
     * 
     * 
     * 修改子导航确定按钮
     */
    editorNav(){
            this.$api.updateContentCategory({
    pid:this.navContent.pid,
    name:this.navEditorForm.name

}).then(res=>{
    if(res.data.status===200){
        this.dialogEditorNavVisible=false;
    }
})
    }
  },
};
</script>

<style>
</style>