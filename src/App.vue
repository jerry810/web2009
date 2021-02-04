<template>
  <div id="app">
    <!-- 整体刷新 让路由删除再重新添加即可 -->
  <router-view v-if="isRouterActive"></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  
  },
  data(){
    return{
      isRouterActive:true
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterActive=false;
      this.$nextTick(()=>{//DOM更新完成
        this.isRouterActive=true;
      })
    }
  }
}
</script>

<style>

</style>
