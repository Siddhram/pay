const mongoose=require('mongoose');
function connection() {
mongoose.connect(process.env.MONGODB_URL).then(()=>{
 console.log('mongodb connected');
}).catch((err)=>{
    console.log(err);
});
   
}
module.exports={connection};