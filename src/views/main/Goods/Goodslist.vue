<template>
  <div class="table">
    <el-table :data="tableData">
      <el-table-column
        show-overflow-tooltip
        label="产品编号"
        width="100"
        prop="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品名称"
        width="200"
        prop="title"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品图片"
        width="100"
        prop="image"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品卖点"
        width="100"
        prop="sellPoint"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品价格"
        width="100"
        prop="price"
      ></el-table-column>
     
      <el-table-column
        show-overflow-tooltip
        label="产品数量"
        width="100"
        prop="num"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="产品描述"
        prop="descs"
      ></el-table-column>
      <!-- 给表格增加删除按钮和编辑按钮 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.http(1);
    //兄弟组件通过该语句接收
    this.$bus.$on("page", (page) => {
      console.log(page);
      this.http(page);
    });
    this.$bus.$on("searchData", (data) => {
      console.log(data);
      this.tableData = data; //赋值操作，让页面重绘
    });
    this.$bus.$on("refresh", (flag) => {
      //接收到通知刷新页面
      this.http(1);
    });
  },
  methods: {
    http(page) {
      this.$api.selectTbItemAllByPage({ page }).then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          this.tableData = res.data.result;
        }
      });
    },
    //编辑按钮
    handleEdit(index, row) {
        this.$bus.$emit("Editor",row)
    },
    //删除按钮
    handleDelete(index, row) {
      //删除是危险动作，需要提前问用户是否确定删除
      console.log(row);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          this.$api
            .deleteItemById({
              id: row.id,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                //删除失败
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            });
        })
        .catch(() => {
          //取消删除
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.table {
  width: 1100px;
  margin: 0 auto;
}
</style>