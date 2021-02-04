<template>
  <div class="selection-component">
    <div class="selection-show">
      <span>{{ selectData[currentIndex].value }}</span>
      <!-- 给箭头添加点击事件 -->
      <div class="arrow" @click="clickHandle"></div>
    </div>
    <div class="selection-list" v-show="flag">
      <ul>
        <li
          v-for="(ele, index) in selecterData"
          :key="index"
          @click="getValue(ele, index)"
        >
          {{ ele.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      flag: false, //下拉列表默认不显示
      
    };
  },
   props: {
        selecterData: {
            type: Array,
            default: function () {
                return [
                    {
                        value: "test",
                        id: 0,
                    },
                ];
            },
        },
    },
  methods: {
    clickHandle() {
      this.flag = !this.flag;
    },
    getValue(data, index) {
      console.log(data);
      this.currentIndex = index;
      this.flag=false;
    },
  },
};
</script>

<style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.selection-list li:hover {
  background: #e3e3e3;
}
</style>