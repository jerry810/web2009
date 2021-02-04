<template>
<!-- 获取数据引出需要使用ref -->
  <div ref="editor" style="text-align:left">富文本编辑器</div>
</template>

<script>
import wangEditor from 'wangeditor'
export default {
   data(){
       return{
            editor: null,//编辑器对象
            editorData: '',//承载的数据
       }
   },
   props:{
    currentData:{
      type:String,
      default:""
    }
   },
   watch:{
     //监听currentData数据的变化
     currentData(newVal,oldVal){
       //可以给wangEditor设置内容的方案
       this.editor.txt.html(newVal);
     }
   },
   mounted(){
       //获取dom元素
       this.editor=new  wangEditor(this.$refs.editor);
       // 配置 onchange 回调函数，将数据同步到 vue 中
   this.editor.config.onchange = (newHtml) => {
       console.log(newHtml);
       
       this.editorData = newHtml;
       //将数据回传到父级
       this.$emit("onEditer",  this.editorData);
    }
    //自定义菜单配置
  this.editor.config.menus=[
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            "emoticon", // 表情
            "image", // 插入图片
            "table", // 表格
            "code", // 插入代码
            "undo", // 撤销
            "redo", // 重复
    ]
       // 创建编辑器
   this.editor.create()
   },
   beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style>

</style>