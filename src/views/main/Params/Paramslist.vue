<template>
  <div class="params">
    <el-table :data="tableData">
      <!-- show-overflow-tooltip超出长度的部分隐藏  -->
      <el-table-column
        prop="id"
        label="规格参数ID"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="itemCatId"
        label="产品关联ID"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="paramData"
        label="规格参数内容"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="80px">
        <template slot-scope="scope">
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
    this.$bus.$on("page", (data) => {
      console.log(data);
      this.http(data);
    });
    this.$bus.$on("onSearch", (data) => {
      console.log(data);
      this.tableData = data;
    });
    //视图重新刷新
    this.$bus.$on("refresh", () => {
      this.http(1);
    });
  },
  methods: {
    http(page) {
      this.$api.selectItemParamAll({ page }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.result;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .paramsDelete({
              id: row.id,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1);
              }else{
                  //删除失败
                    this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            });
        })
        .catch(() => {
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
.params {
  width: 1200px;
  margin: 0 auto;
}
</style>