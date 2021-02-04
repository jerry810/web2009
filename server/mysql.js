const mysql=require('mysql')

const client=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"goshop"
})

const sqlFn=(sql,arr,callback)=>{
   client.query(sql,arr,(error,result)=>{
       if(error){
           console.log(error);
           
           return;
       }else{//没有问题把结果返回
           callback(result);
       }
   })
}
module.exports=sqlFn