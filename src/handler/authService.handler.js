const services= require('../services/authService.services')

const loginValidator = async(req,res) => {
const userName= req.body.userName;
const password = req.body.password;
try{
await services.loginValidator(userName,password);
res.status(200).json({message: "SUCCESS"});
}
catch(err)
{
    res.status(err.code).json({message:err.message });
}
}
module.exports ={
    loginValidator
}