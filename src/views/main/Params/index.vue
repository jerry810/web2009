<template>
  <div class="params">
    <PubHeader :searchHandle="$api.paramsSearch"/>
    <Paramslist/>
    <PubPagination :total="2"/>
    <ParamsAdd/>
  </div>
</template>

<script>
import Paramslist from './Paramslist'
import PubPagination from '../../../components/PubPagination'
import PubHeader from '../../../components/PubHeader'
import ParamsAdd from './ParamsAdd'
export default {
  components:{
    Paramslist,
    PubPagination,
     PubHeader,
     ParamsAdd
  }
}
</script>

<style scoped>
.params{
  width:1100px;
  margin:0 auto;
}
</style>