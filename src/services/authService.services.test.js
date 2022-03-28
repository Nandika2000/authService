const { CustomException } = require("../constants/customError");
const { loginValidator } = require("./authService.services");
const models = require('../../models');
describe('loginValidator function', ()=> {
    it('should throw customException if user is not found', async()=>{
        try{
        jest.spyOn(models.loginDetails,'findAll').mockReturnValue([]);
        await loginValidator('Nandika','abc');}
        catch(err)
        {
            expect(err.message).toEqual('USER NOT FOUND');
            expect(err.code).toStrictEqual(404);
        }
    });
    it('should throw customException if password is not same', async()=>{
        try{
        jest.spyOn(models.loginDetails,'findAll').mockReturnValue([{ dataValues: {
            'password':'abd'}
        }]);
        await loginValidator('Nandika','abc');
        }
        catch(err)
        {
            expect(err.message).toEqual('WRONG PASSWORD');
            expect(err.code).toStrictEqual(401);
        }
    });
    it('should not throw any error if password is validated', async()=>{
        jest.spyOn(models.loginDetails,'findAll').mockReturnValue([{ dataValues: {
            'password':'abd'}
        }]);
        const msg = await loginValidator('Nandika','abd');
        expect(msg).toEqual('LOGIN SUCCESSFUL');
    })
})