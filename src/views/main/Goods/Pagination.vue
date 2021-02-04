<template>
  <div>
    <!-- layout属性代表上一页下一页以及页码  页码的大小由total传递-->
    <el-pagination
      background
      layout="prev, pager, next,jumper"
      :total="total"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //默认显示第一页
      total:0
    };
  },
  mounted() {
      this.$api.total().then(res=>{
      if(res.data.status==200){
         this.total=res.data.result[0]["count(*)"];
      }
      })
  },
  methods: {
    sizeChangeHandle() {},
    currentChangeHandle(val) {
      console.log(val);
      this.$bus.$emit("page",val);//通过挂载在原型上的方法去将值传递给兄弟组件
    },
  },
};
</script>

<style>
</style>