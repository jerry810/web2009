<template>
  <el-dialog
    title="选择规格参数"
    :visible.sync="dialogTreeVisible"
    width="60%"
    :before-close="handleClose"
  >
    <PubTree @onTree="getTreeData" />
    <!-- 用户动态添加对话框 -->
    <el-dialog
      title="添加规格参数"
      :visible.sync="dialogParamsVisible"
      width="60%"
      :before-close="handleClose"
      append-to-body
    >
      <el-button @click="addParamsMoudleHandle">添加主结构</el-button>

      <el-form :model="paramsModule" ref="paramsModule">
        <el-form-item
          v-for="(item, index) in paramsModule.paramsList"
          :key="index"
          label="规格参数"
          ><!-- input绑定的是最外层大的value -->
          <!-- 给删除主结构的方法传递参数，具体删除哪一个主结构 -->
          <el-button @click="removeParamsMoudleHandle(index)"
            >删除主结构</el-button
          >
          <el-input v-model="item.value" style="width: 90%" />
          <!-- 承载子结构 -->
          <div
            v-for="(childrenItem, childrenIndex) in item.children"
            :key="childrenIndex"
          >
            <!-- 将主结构中的具体的下标传给子结构 -->
            <el-button @click="addChildren(index)">添加子结构</el-button>
            <div style="width:80% mrgin-left:80px">
              <span>规格参数子结构</span>
              <el-input v-model="childrenItem.childrenValue" syle="width:60%" />
              <!-- 第一个index表示删除哪个主结构，第二个index表示删除主结构中的哪一个子结构 -->
              <el-button @click="removeChildren(index, childrenIndex)"
                >删除子结构</el-button
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogParamsVisible = false">取 消</el-button>
        <!-- 添加规格参数 -->
        <el-button type="primary" @click="addParamsHandle">确 定</el-button>
      </span>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogTreeVisible = false">取 消</el-button>
      <!-- 点击外层对话框让内层对话框显示 -->
      <el-button type="primary" @click="dialogParamsVisible = true"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import PubTree from "../../../components/PubTree";
export default {
  components: {
    PubTree,
  },
  data() {
    return {
      dialogParamsVisible: false, //二级对话框
      dialogTreeVisible: false, //一级对话框
      treeData: {},
      paramsModule: {
        paramsList: [
          {
            value: "",
            children: [
              {
                childrenValue: "",
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    /**** *
     * 添加主结构
     *
     * ***/
    addParamsMoudleHandle() {
      this.paramsModule.paramsList.push({
        value: "",
        children: [
          {
            childrenValue: "",
            value: "",
          },
        ],
      });
    },
    /***
     *
     *
     * 添加子结构
     */
    addChildren(index) {
      this.paramsModule.paramsList[index].children.push({
        childrenValue: "",
        value: "",
      });
    },
    /****
     *
     *
     * 删除主结构
     */
    removeParamsMoudleHandle(index) {
      //从index开始，删除1个
      this.paramsModule.paramsList.splice(index, 1);
    },
    /***
     *
     * 删除子结构
     */
    removeChildren(index, childrenIndex) {
      this.paramsModule.paramsList[index].children(childrenIndex, 1);
    },
    /***
     *
     * 获取规格参数内容
     */
    getTreeData(data) {
      console.log(data);
      this.treeData = data;
    },
    /***
     *
     * 添加规格参数
     */
    addParamsHandle() {
      this.$api
        .insertItemParam({
          itemCatId: this.treeData.cid,
          /* 数据在传递的时候要么传递字符串，要么传递基本数据类型，不能传递数组 因此需要将数组转换成字符串*/
          content:JSON.stringify(this.paramsModule.paramsList),
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.status===200){
              //关闭两个对话框
              this.dialogParamsVisible=false;
              this.dialogTreeVisible=false;
              //视图重新刷新  调用网络请求
              this.$bus.$emit("refresh",true);
          }
        })
        .catch(error);
    },
  },
  mounted() {
    this.$bus.$on("onFlag", (flag) => {
      this.dialogTreeVisible = flag;
    });
  },
};
</script>

<style>
</style>