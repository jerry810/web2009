<template>
  <div class="goods">
    <GoodsSearchandAdd/>
    <Goodslist/>
    <Pagination/>
    <GoodsAdd/>
    <GoodsEditor/>
  </div>
</template>

<script>
import Goodslist from './Goodslist'
import Pagination from './Pagination'
import GoodsSearchandAdd from './GoodsSearchandAdd'
import GoodsAdd from './GoodsAdd'
import GoodsEditor from './GoodsEditor'
export default {
 components:{
   Goodslist,
    Pagination,
    GoodsSearchandAdd,
    GoodsAdd,
    GoodsEditor
 }
}
</script>

<style scoped>

</style>