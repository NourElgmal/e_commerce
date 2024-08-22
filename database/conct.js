const  mongoose= require("mongoose");

const conct=()=>{
    mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{console.log("tmam conact")})
    .catch((e)=>{console.log(e)});
}
module.exports=conct;