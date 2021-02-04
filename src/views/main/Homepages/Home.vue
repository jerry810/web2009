<template>
  <div class="index-warp">
    <div class="index-left">
      <Homenav />
      
    </div>
    <div class="index-right">
       <HomeSwiper />
       <HomeProductList/>
    </div>
   
  </div>
</template>

<script>
// @ is an alias to /src

import Homenav from "./Homenav";
import HomeSwiper from "./HomeSwiper";
import HomeProductList from './HomeProductList'
export default {
  name: "Home",
  components: {
    Homenav,
    HomeSwiper,
   HomeProductList
  },
};
</script>
<style lang="less" scoped>
.index-wrap {
    width: 1200px;
    margin: 0 auto;
}
.index-left {
    float: left;
    width: 300px;
    text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
</style>
