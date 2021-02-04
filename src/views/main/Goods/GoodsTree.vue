<template>
  <!-- 懒加载 -->
  <el-tree
    :props="defaultProps"
    :load="loadNode"
    lazy
    @node-click="handleNodeClick"
  ></el-tree>
</template>

<script>
export default {
  data() {
    return {
      //自定义属性名要和返回的字段名一致
      defaultProps: {
        children: "children",
        label: "name",
      },
      data: [],
    };
  },
  methods: {
    //当选择了之后，该函数中可以显示出具体选择的数据
    handleNodeClick(data) {
      //此处采用事件回传的方式将数据传递给父级组件
      console.log(data);
      this.$emit("Tree",data);
    },
    //懒加载通过该函数适配数据，而不采用mounted
    loadNode(node, resolve) {
      if (node.level == 0) {
        //代表第一层数据
        this.$api.selectItemCategoryByParentId().then((res) => {
          if (res.data.status === 200) {
              //有数据就将具体的数组返回
              return resolve(res.data.result)
          }else{
              //没有数据就返回空数组
              return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        //代表第二层及其以后的数据
          this.$api.selectItemCategoryByParentId({
              id:node.data.cid
          }).then((res) => {
          if (res.data.status === 200) {
              //有数据就将具体的数组返回
              return resolve(res.data.result)
          }else{
              //没有数据就返回空数组
              return resolve([]);
          }
        });
      }
    },
  },
};
</script>

<style>
</style>