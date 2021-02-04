<template>
  <div class="index-left-block">
      <h2>全部产品</h2>
      <div v-for="(ele,index) in  product" :key="index">
          <h3>{{ele.title}}</h3>
          <ul>
              <li v-for="(ele,index) in ele.list" :key="index">
                  <a :href="ele.url">
                      {{ele.name}}
                  </a>
                  <span class="hot-tag" v-if="ele.hot">hot</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
 data(){
     return{
         product:[
             {
                 title:"手机应用类型",
                 list:[
                     {
                         id:1,
                         name:"三星pro",
                         url:"http://iwenwiki.com",
                         hot: true,
                     },
                     {
                         id:2,
                         name:"安全管家",
                         url:"http://iwenwiki.com",
                          hot: false
                     },
                     {
                         id:3,
                         name:"金山毒霸",
                         url:"http://iwenwiki.com",
                          hot: false,
                     }
                 ]
             },
             {
                 title:"PC产品类",
                 list:[ {
                            id: 1,
                            name: "WebStorom",
                            url: "http://iwenwiki.com",
                            hot: false,
                        },
                        {
                            id: 2,
                            name: "Hbuilder",
                            url: "http://iwenwiki.com",
                            hot: true,
                        },
                        {
                            id: 3,
                            name: "Sublime4",
                            url: "http://iwenwiki.com",
                            hot: false,
                        },
                        {
                            id: 4,
                            name: "Sublime3",
                            url: "http://iwenwiki.com",
                            hot: false,
                        },
                        {
                            id: 5,
                            name: "Sublime2",
                            url: "http://iwenwiki.com",
                            hot: false,
                        },
                        {
                            id: 6,
                            name: "Sublime1",
                            url: "http://iwenwiki.com",
                            hot: false,
                        },
                    ],
             }
         ]
     }
 }
}
</script>

<style scoped lang="less">
.index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    width:200px;
    float:left;
    border:1px solid #999;
    font-size: 16px;
}
.index-left-block .hr {
    margin-bottom: 20px;
    height: 1px;
    width: 100%;
    background: #ddd;
}
.index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
}
.index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
}
.index-left-block ul {
    padding: 10px 15px;
}
.index-left-block li {
    padding: 5px;
    a {
        color: #222;
    }
}
.hot-tag {
    background: red;
    color: #fff;
}
</style>