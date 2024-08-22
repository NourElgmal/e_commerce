//coupon
const mongoose=require('mongoose');
const sch=mongoose.Schema({
    code:{
        type:String,
        require:[true,'coupon is req'],
        trim:true,
        unique:[true,'coupon is unique'],
    },
    expires:{
        type:Date,
        default:Date.now,
    },
    discount:Number
},{timestamps:true});
module.exports.coupon_model=mongoose.model("coupon_model",sch);
