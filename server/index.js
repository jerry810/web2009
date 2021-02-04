const express=require('express')
const app=express();
const cors=require('cors')
const bodyParser=require("body-parser")
const router=require('./router')
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}))
//让前端将上传的图片显示在页面上，第一步：后台配置静态文件托管
/* 如果想前端把上传的图片显示在页面上，需要后台做配合，使用静态文件托管的方式将图片生成网址 */
app.use(express.static("upload"))
app.use('/api',router);
app.listen(4000,()=>{
    console.log('4000');
    
})
