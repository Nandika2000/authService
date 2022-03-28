const { CustomException } = require('../constants/customError');
const services= require('../services/authService.services')
const handler = require('../handler/authService.handler')
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockRequest = () => {
    const req = {};
    req.body = { "userName":'Nandika', "password":'abd'};
    return req;
  };
  describe('loginValidator function', ()=>{
      it('should catch error if user is not found',async()=>{
        jest.spyOn(services, 'loginValidator').mockRejectedValue(CustomException('USER NOT FOUND', 404));
        const res = mockResponse();
        const req = mockRequest();
        await handler.loginValidator(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'USER NOT FOUND' });
      });
      it('should catch error if password doesnt match',async()=>{
        jest.spyOn(services, 'loginValidator').mockRejectedValue(CustomException('WRONG PASSWORD', 401));
        const res = mockResponse();
        const req = mockRequest();
        await handler.loginValidator(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'WRONG PASSWORD' });
      });
      it('should return a response if username and password is correct', async()=>{
        jest.spyOn(services, 'loginValidator').mockResolvedValue('LOGIN SUCCESSFUL');
        const res = mockResponse();
        const req = mockRequest();
        await handler.loginValidator(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'SUCCESS' });
      })
  })