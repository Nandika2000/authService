const models = require('../../models');
const { CustomException } = require('../constants/customError');


const loginValidator = async(userName, password) => {
    const fetchedPassword = await models.loginDetails.findAll({attributes:['password'] ,where: {userName:`${userName}`}});
    if(fetchedPassword.length===0)
    {
       throw CustomException('USER NOT FOUND', 404);
    }
     if(fetchedPassword[0].dataValues.password!== password)
    {
        throw CustomException('WRONG PASSWORD', 401);   
    }
    else {
        return "LOGIN SUCCESSFUL";
    }
}
module.exports={
    loginValidator
}