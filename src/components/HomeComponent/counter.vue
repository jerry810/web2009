<template>
  <div class="counter-component">
      <div class="counter-btn" @click="min">-</div>
      <div class="counter-show">
            <input type="text" v-model="counter" @keyup="inputHandle">
        </div>
      <div class="counter-btn" @click="add">+</div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          counter:1
      }
  },
  props:{
  counterObj1:{

  }
  },

  methods:{/* 需求：购买数量最少是1，最大不能超过商品本身的数量 */
      min(){
          if(this.counter<=this.counterObj1.min){
              this.counter=this.counterObj1.min;
          }
          this.counter--;
      },
      add(){
        if(this.counter>=this.counterObj1.max){
           return;
        }
        this.counter++;
      },
      inputHandle(){
          var fix;//最终值
          if(typeof this.counter==="string"){
              /* 如果可以转换成数字，就转换成数字否则就是空字符串 */
               fix=Number(this.counter.replace(/\D/g,""))
          }else{
              //用户输入的值是数字但是不在范围之内
              fix=this.counterObj1.min;
          }
          if(fix<this.counterObj1.min||fix>counterObj1.max){
              fix=this.counterObj1.min;
          }
          this.counter=fix;
      }
  }
}
</script>

<style scoped>
.counter-component {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
}
.counter-show {
    float: left;
}
.counter-show input {
    border: none;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    height: 23px;
    line-height: 23px;
    width: 30px;
    outline: none;
    text-indent: 4px;
}
.counter-btn {
    border: 1px solid #e3e3e3;
    float: left;
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    cursor: pointer;
}
.counter-btn:hover {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
}
</style>