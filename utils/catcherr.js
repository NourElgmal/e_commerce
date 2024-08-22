const AppErr = require("./Apperr");

module.exports.catcherror=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((e)=>{next(new AppErr(e.message, 500))})
    };
}